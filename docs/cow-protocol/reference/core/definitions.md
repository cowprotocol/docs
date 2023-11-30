---
sidebar_position: 1
---

# Definitions

**Intent**: A user's desire to swap `sellAmount` of `sellToken` for `buyAmount` of `buyToken`. This is non-prescriptive, and allows for the execution path to be determined by the CoW Protocol. Also known as a discrete order.

**Order**: An intent to swap `sellAmount` of `sellToken` for `buyAmount` of `buyToken`. May be used interchangeably with intent.

**Discrete Order**: A single order submitted to the CoW Protocol API (ie. `GPv2Order.Data`)

**Conditional Order**: An intent by a smart-contract to place `0..n` discrete orders under some programmatic logic. For example, a conditional order may only be valid if the price of an asset reaches a certain level.

**Surplus**: The price improvement on a user's limit price.

**Gas-less**: An expression that does not require a user make a transaction on the blockchain, and therefore does not require the user to pay gas in the native token.

**EBBO**: Ethereum Best Bid and Offer. The highest bid price and lowest ask (offered) price for a token, sourced from among well known DEXs (Uniswap, Sushiswap, Balancer) as defined by the rules of the solver competition.
