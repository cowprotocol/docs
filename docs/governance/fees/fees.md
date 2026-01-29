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
> -**Standard**: Volume * 0.0002
> - **Correlated:** Volume * 0.00003 


:::note

**Surplus** is defined as the difference between the executed price and the minimum execution price for an order

**Quote improvement** is defined as the difference between the executed price and the quoted price for an order, so long as the value is positive (if the value is negative, no fee is taken)

:::

### Partner fees

Partners may charge a fee when integrating CoW Protocol.
See the [Partner Fee](/governance/fees/partner-fee) section of these docs for details on how the partner fee is calculated, with examples and payment details.
