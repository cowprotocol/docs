---
sidebar_position: 3
---

# Batch auctions
CoW Protocol collects and aggregates [intents](./intents) off-chain and settles them together in groups, known as *batches*.
The right to settle the orders in a batch is then "auctioned off" through a competition to the [solver](./solvers) offering the most surplus for the orders in the batch. 

![Batch Auctions](/img/concepts/batch-auctions.png)

Batch auctions provide several benefits:

- [**MEV Protection**](../benefits/mev-protection): Batch auctions allow for Uniform Clearing Prices (UCPs), where an asset that appears multiple times across orders in the same batch settles for a consistent price.
  This makes transaction order irrelevant within the block, undermining the ability for MEV bots to extract value.
- **[Coincidence of Wants](../how-it-works/coincidence-of-wants)**: When multiple orders trade the same assets within a batch, there may be an opportunity for a peer-to-peer swap that doesn't tap on-chain liquidity. The mechanism of Coincidence of Wants (CoW) relies on batch auctions.
- **Enforcing the [Ethereum Best Bid Offer (EBBO)](/cow-protocol/reference/core/auctions/competition-rules#governance)**: Ensuring that the settlement solution is at least as good as the on-chain price a user could get directly from an AMM.
