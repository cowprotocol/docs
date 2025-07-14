---
sidebar_position: 3
---

# Fair Combinatorial Auction

CoW Protocol collects and aggregates [intents](./intents) off-chain and auctions them off to [solvers](./solvers). The auction is combinatorial because each solver can submit multiple bids. A solver can submit multiple bids on individual orders, in which case each "bid" represents the best price this solver can provide to an individual order. However, a solver can also submit "batched" bids, that is, bids on groups of orders. 

The protocol filters out ``unfair'' batched bids, which are those delivering less to an order than some available "non-batched" bids. It then selects the combination of winning bids that maximizes the surplus received by the orders that are part of the auction (subject to some computational constraints due to the combinatorial nature of the problem).

![The Auctions](/img/concepts/batch-auctions.png)

The fair combinatorial auction provide several benefits:

- [**MEV Protection**](../benefits/mev-protection): Fair combinatorial auctions allow for Uniform Directing Clearing Prices (UDP), where a directed asset pair that appears multiple times across orders in the same auction settles for a consistent price.
  This makes transaction order irrelevant within the block, undermining the ability for MEV bots to extract value.
- **[Coincidence of Wants](../how-it-works/coincidence-of-wants)**: When multiple orders trade the same assets within an auction, there may be an opportunity for a peer-to-peer swap that doesn't tap on-chain liquidity, which a solver could exploit by submitting a batched bid.
- **Fairness**: Ensuring that each order receives as much as it would have received had that order been auctioned off alone.
