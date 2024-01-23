---
sidebar_position: 3
---

# Fees

[CIP-34](https://snapshot.org/#/cow.eth/proposal/0xe358941aa3f3aeaf94d40e6904c9bb530c98f88e363c2f309d9898b0ffb16c1f) directs the core team of CoW DAO to spend 6 months testing fee models for the purpose of generating revenue from CoW Protocol (starting January 16, 2024).
It also directs the core team to keep the DAO up to date on the progress of the testing.

The purpose of this page is to let users know which fee models are active at any point in time, so they know what fees they will encounter when using CoW Protocol (either directly or through CoW Swap).


## Current Fees

### Surplus fee on out-of-market limit orders[^surplus]

> **Definition:** 50% of surplus on out-of-market limit orders, capped at 1% of the total volume of the order
> 
> **Eligible orders:** the fee only applies to out-of-market limit orders and discrete TWAP orders where the order is not executable at the time it is generated (there are no fees charged on market orders at this point in time)
> 
> **Fee calculation:** surplus * 0.5 **OR** volume * 0.01 [whichever number is lower]

[^surplus]: Surplus is defined as the difference between the minimum execution price and the executed price of an order
