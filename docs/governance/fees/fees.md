---
sidebar_position: 3
---

# Fees

:::note

This documentation refers to CoW Protocol fees.

:::

The purpose of this page is to let users know which fee models are active at any point in time, so they know what fees they will encounter when using CoW Protocol (either directly or through CoW Swap).

## Current Fees

### Surplus fee on out-of-market limit orders

> **Definition:** 50% of surplus on out-of-market limit orders, capped at 0.98% of the total volume of the order
>
> **Eligible orders:** the fee only applies to out-of-market limit orders and discrete TWAP orders where the order is not executable at the time it is generated
>
> **Fee calculation:** surplus \* 0.5 **OR** volume \* 0.0098 [whichever number is lower]

### Quote improvement fee on market orders

> **Definition:** 50% of positive quote improvement on market orders (aka swaps), capped at 0.98% of the total volume of the order
>
> **Eligible orders:** all market orders (including in-market limit and TWAP orders) where the user receives a better price than they were quoted
>
> **Fee calculation:** quote improvement \* 0.5 **OR** volume \* 0.0098 [whichever number is lower]

### Volume Fee

> **Definition:** A tiered fee based on the total volume of the order, adjusted by asset type
>
> **Eligible orders:** all orders
>
> **Fee structure:**
> - **Standard Assets:** 2 basis points (bps)
> - **Correlated Assets (Stables/RWAs):** 0.3 basis points (bps)
> 
> **Fee calculation:**
> - **Standard**: Volume * 0.0002
> - **Correlated:** Volume * 0.00003 


:::note

**Surplus** is defined as the difference between the executed price and the minimum execution price for an order

**Quote improvement** is defined as the difference between the executed price and the quoted price for an order, so long as the value is positive (if the value is negative, no fee is taken)

All protocol fees are charged in the surplus token, i.e. in the buy token for sell orders and the sell token for buy orders.

:::

### Partner fees

Partners may charge a fee when integrating CoW Protocol.
See the [Partner Fee](/governance/fees/partner-fee) section of these docs for details on how the partner fee is calculated, with examples and payment details.

## How fees are charged

Fees are not charged as separate transfers. They are part of the execution of an order: the user receives less of the buy token (for sell orders) or pays more of the sell token (for buy orders) than they would have in a fee-free execution. Solvers keep these amounts as part of the settlement; the weekly [accounting](/cow-protocol/reference/core/auctions/accounting) then charges solvers for them, converted to the chain's native token.

The fees of an order are fully determined by publicly available data:

1. **The on-chain execution**: the executed sell and buy amounts of the trade.
2. **The order's fee policies**: an ordered list of fees, fixed when the order is created. Protocol fees come first (the surplus or quote improvement fee, followed by the volume fee), then any [partner fees](/governance/fees/partner-fee) in the order they appear in the order's [app data](/cow-protocol/reference/core/intents/app-data).
3. **The quote** at order creation, used as the reference for quote improvement fees.

Fees are computed iteratively, starting from the executed amounts and processing the list of fee policies in reverse order. Each step computes the fee of one policy from the current amounts and removes it from the execution; the resulting amounts are the input for the next policy. Because each step undoes one fee, the amounts after the last step are the fee-free execution of the order.

The factor of a fee policy always refers to the amounts *before* that fee was charged. Since the computation starts from amounts that already have the fee deducted, the formulas use modified factors. With `amount` denoting the current executed amount in the surplus token:

- **Volume fee** with factor `f`: the fee is `amount * f / (1 - f)` for sell orders and `amount * f / (1 + f)` for buy orders.
- **Surplus and quote improvement fee** with factor `f`: the fee is `improvement * f / (1 - f)`, where the improvement is `amount - reference` for sell orders and `reference - amount` for buy orders; if the execution is not better than the reference, the fee is zero. The reference is the limit price of the order for surplus fees; for quote improvement fees it is the quoted amount, adjusted for the network fee of the quote and never beyond the limit price of the order. Each of these policies also carries a volume cap factor: the fee is capped at what a volume fee policy with that factor would charge.

### Example

A user places a market order selling 1 ETH, and the quote promises 10,000 USDC after network fees. The order carries three fee policies, in this order:

1. Quote improvement fee of 50%, capped at 0.98% of volume (protocol)
2. Volume fee of 2 bps (protocol)
3. Volume fee of 1% (partner)

On-chain, the order settles and the user receives **9,902.96901 USDC**. All fees are computed in the surplus token of the order (here the buy token, USDC) by processing the fee policies in reverse order:

| Step | Fee policy | Amount after fee | Fee | Amount before fee |
|------|-----------|------------------|-----|-------------------|
| 1 | Volume fee 1% (partner) | 9,902.96901 | 9,902.96901 \* 0.01 / 0.99 = **100.02999** | 10,002.999 |
| 2 | Volume fee 2 bps (protocol) | 10,002.999 | 10,002.999 \* 0.0002 / 0.9998 = **2.001** | 10,005 |
| 3 | Quote improvement fee 50% (protocol, reference 10,000) | 10,005 | (10,005 - 10,000) \* 0.5 / 0.5 = **5** | 10,010 |

(The cap in step 3 would allow a fee of up to 10,005 \* 0.0098 / 0.9902, about 99.02 USDC, so it does not bind.)

In total, 107.03099 USDC of fees are charged: 7.001 USDC of protocol fees and 100.02999 USDC of partner fees. The last step recovers the fee-free execution of the order: without fees, the user would have received 10,010 USDC for their 1 ETH.

The computed fees of every trade, including partner fees, are exposed in the `executedProtocolFees` field of the [trades API endpoint](https://api.cow.fi/docs/#/default/get_api_v1_trades).

Note that fees are order dependent: the amount a fee policy is computed on includes the fees of all policies that come before it in the list, but not of those that come after it. In the example above, the partner volume fee is computed on the execution after both protocol fees have been deducted. In particular, partners can also charge a price improvement fee, the partner version of the quote improvement fee. Since it comes last in the list and uses the raw quote as reference, it can be zero even if the fee-free execution is better than the quote.

:::note

This section describes the current implementation. The ordering of fee policies and the references used for surplus and quote improvement fees may change through governance decisions.

:::
