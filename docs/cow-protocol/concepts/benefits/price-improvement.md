---
sidebar_position: 3
---

# Price improvement

In addition to [MEV protection](./mev-protection), another major benefit of CoW Protocol is optimal price execution that leads to price improvement and order surplus.

All orders on CoW Protocol have the ability to capture surplus.
This means that if there is a positive difference between the quote you receive before placing your order and the price that the order executes at, you will receive the difference as surplus.
CoW Protocol even offers surplus on [limit orders](../order-types/limit-orders) and [TWAP orders](../order-types/twap-orders)!

When orders do not receive significant price surplus, [solvers](../introduction/solvers) still find the optimal execution path for each trade across all available on-chain and off-chain liquidity.
With CoW Protocol, users can receive better prices than they would on another DEX or DEX aggregator thanks to:

- **Efficient Order Routing:** Solvers search all available on-chain liquidity to get the best rates for the trades in a batch at the time the orders are executed.
  Sometimes a solver will split a trade between multiple liquidity sources to reduce price impact.
- **Private Off-Chain Liquidity**: Solvers may also have access to private market maker liquidity that provides better prices that on-chain liquidity and is not indexed by other DEXs or aggregators.
- **Coincidence of Wants**: Peer-to-peer [Coincidences of Wants](../how-it-works/coincidence-of-wants) match traders against each other and give better prices because they cost less in gas and avoid liquidity provider fees charged by AMMs. CoWs provide additional gas savings in cases where orders share the same direction and trading pairs — they all get grouped into a single order rather than executing individually
