---
sidebar_position: 1
---

# Definitions

**Conditional Order**: An intent by a smart-contract to place `0..n` discrete orders under some programmatic logic. For example, a conditional order may only be valid if the price of an asset reaches a certain level.

**Discrete Order**: A single order submitted to the CoW Protocol API (ie. `GPv2Order.Data`)

**Gas-less**: An expression that does not require a user make a transaction on the blockchain, and therefore does not require the user to pay gas.

**Intent**: A user's desire to swap `sellAmount` of `sellToken` for `buyAmount` of `buyToken`. This is non-prescriptive, and allows for the execution path to be determined by the CoW Protocol. Also known as a discrete order.

**Order**: An intent to swap `sellAmount` of `sellToken` for `buyAmount` of `buyToken`. May be used interchangeably with intent.

**Surplus**: The price improvement on a user's limit price.
