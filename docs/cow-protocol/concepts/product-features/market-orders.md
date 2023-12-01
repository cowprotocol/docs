---
sidebar_position: 1
---

# Market orders

Market orders are orders to buy or sell tokens as soon as possible at the current market rate.
They are essentially limit orders where the limit price is close to or below the current market rate.
In the context of CoW Protocol, when you place a market order, you agree to get, at minimum, the best price the protocol can find by quoting solvers for your order.
This price is reduced by a user-defined "slippage tolerance" to ensure the trade executes even in volatile market conditions.

:::note

Unlike other DEXs, your slippage tolerance cannot be extracted by MEV Bots (cf. [MEV Protection](../batch-auctions/mev-protection)).
If the solvers are able to find optimizations within the batch auction your order is settled with, you may also get a better price.

:::

Market orders are _fill or kill_, meaning that they either execute entirely or will not execute at all. 
Thanks to CoW Protocol’s delegated trading model, market orders are different from other venue market orders, as orders are placed gaslessly and the user isn't charged any fees in the event of order expiration or failure.
Market orders automatically expire once their deadline is reached, and can be cancelled both gaslessly (as of the next auction) or immediately via an on-chain transcation.
