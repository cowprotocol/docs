---
sidebar_position: 3
---

# Fair Combinatorial Batch Auction

CoW Protocol collects and aggregates [intents](./intents) off-chain and auctions them off to [solvers](./solvers). The auction is combinatorial because each solver can submit multiple bids. A solver can submit multiple bids on individual orders, in which case each "bid" represents the best price this solver can provide to an individual order. However, a solver can also submit "batched" bids, that is, bids on groups of orders.

The protocol removes any "unfair" batched bids - ones that would give an order a worse outcome than a regular, single bid. Then, from the remaining options, it picks the mix of bids that gives traders the most total value possible, while staying within the system's computational limits.

![The Auctions](/img/concepts/batch-auctions.png)

The fair combinatorial auction provides several benefits:

- [**MEV Protection**](../benefits/mev-protection): Fair combinatorial auctions allow for Uniform Directed Clearing Prices (UDP), where a directed asset pair that appears multiple times across orders in the same auction settles for a consistent price. This makes transaction order irrelevant within the block, undermining the ability for MEV bots to extract value.
- **[Coincidence of Wants](../how-it-works/coincidence-of-wants)**: When multiple orders trade the same assets within an auction, there may be an opportunity for a peer-to-peer swap that doesn't tap on-chain liquidity, which a solver could exploit by submitting a batched bid.
- **Fairness**: Ensuring that each order receives as much as it would have received had that order been auctioned off alone.
