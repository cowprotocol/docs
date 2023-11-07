---
sidebar_position: 1
---

# Market Orders

Market orders are orders to buy or sell tokens as soon as possible at the current market rate. In the context of CoW Swap, when you place a market order, you agree to get, at minimum, the current AMM on-chain price. If the solvers are able to find optimizations within the batch auction your order is settled with, you may also get a better price.

Market orders are fill or kill, meaning that they either execute entirely or will not execute at all. Thanks to CoW Swap’s delegated trading model, market orders are different from other venue market orders, as the order is placed gaslessly, and the user isn't charged any fees in the event of order expiration or failure.
