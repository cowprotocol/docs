---
sidebar_position: 2
---

# Solvers

CoW Protocol delivers optimal price outcomes by leveraging an open solver competition for order matching. 

![Solvers](/img/concepts/solvers.png)

Solvers are bonded third parties that execute trades on behalf of users through an [intent-based delegated execution model](intents). 

Once a user submits an [intent](intents), the protocol groups it alongside other intents in a batch auction.
As soon as a batch is "closed for orders", meaning that it stops considering new orders, the protocol runs a [competition](/cow-protocol/reference/core/auctions) where solvers submit solutions for the intents in the batch. 

Whichever solver offers the best [solution](/cow-protocol/reference/core/auctions/the-problem#solution) for the batch auction (defined as the solver that provides the most surplus to user orders) gets to execute the orders.

In order to incentivize a healthy competition and guarantee the best outcome for user orders, solvers get awarded COW tokens each time they solve a batch. 
