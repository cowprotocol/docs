---
sidebar_position: 3
---

# Fees

:::Note

This documentation refers to CoW Protocol fees. Builders connected to MEV blocker also pay a fee, which is discussed [here](/mevblocker/builders/fees/subscription-fees).

:::

[CIP-34](https://snapshot.org/#/cow.eth/proposal/0xe358941aa3f3aeaf94d40e6904c9bb530c98f88e363c2f309d9898b0ffb16c1f) directs the core team of CoW DAO to spend 6 months testing fee models for the purpose of generating revenue from CoW Protocol (starting January 16, 2024).
It also directs the core team to keep the DAO up to date on the progress of the testing.

The purpose of this page is to let users know which fee models are active at any point in time, so they know what fees they will encounter when using CoW Protocol (either directly or through CoW Swap).

## Current Fees

### Surplus fee on out-of-market limit orders

> **Definition:** 50% of surplus on out-of-market limit orders, capped at 1% of the total volume of the order
>
> **Eligible orders:** the fee only applies to out-of-market limit orders and discrete TWAP orders where the order is not executable at the time it is generated
>
> **Fee calculation:** surplus \* 0.5 **OR** volume \* 0.01 [whichever number is lower]

### Quote improvement fee on market orders

> **Definition:** 50% of positive quote improvement on market orders (aka swaps), capped at 1% of the total volume of the order
>
> **Eligible orders:** all market orders (including in-market limit and TWAP orders) where the user receives a better price than they were quoted
>
> **Fee calculation:** quote improvement \* 0.5 **OR** volume \* 0.01 [whichever number is lower]

### Volume fee on Gnosis Chain orders (excluding token pairs with correlated prices)

[//]: # 'If updating the list of stable coins, do not forget to update the actual code where this is handled on CoW Swap'
[//]: # 'https://github.com/cowprotocol/cowswap/blob/develop/libs/common-const/src/tokens.ts#L293-L302'

> **Definition:** 10 basis points on the total volume of the order
>
> **Eligible orders:** all market orders, limit orders, and TWAPs made on Gnosis Chain, excluding tokens with correlated prices when traded for each other.
>
> **Fee calculation:** volume \* 0.001


:::note

**Surplus** is defined as the difference between the executed price and the minimum execution price for an order

**Quote improvement** is defined as the difference between the executed price and the quoted price for an order, so long as the value is positive (if the value is negative, no fee is taken)

:::

### Partner fees

Partners may charge a fee when integrating CoW Protocol.
See the [Partner Fee](/governance/fees/partner-fee) section of these docs for details on how the partner fee is calculated, with examples and payment details.
