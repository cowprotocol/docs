---
sidebar_position: 2
---

# Solvers

CoW Protocol delivers optimal price outcomes by leveraging an open solver competition for order matching. 

![Solvers](/img/concepts/solvers.png)

Solvers are bonded third parties that execute trades on behalf of users through an [intent-based delegated execution model](intents). 

Once a user submits an [intent](intents), the protocol groups it alongside other intents in a batch.
As soon as a batch is "closed for orders", meaning that it stops considering new orders, the protocol runs a [competition](/cow-protocol/reference/core/auctions) where solvers submit solutions for the intents in the batch. 

Whichever solver offers the best [solution](/cow-protocol/reference/core/auctions/the-problem#solution) for the batch (defined as the solver that provides the most surplus to user orders) gets to execute the orders.

Solvers are compensated in COW tokens for settling batches, incentivizing them to compete to find better prices and win the right to execute user intents. 

## How Solvers Work

Solvers can move tokens on behalf of the user using the ERC-20 approvals that the user granted to the [vault relayer](/cow-protocol/reference/contracts/core/vault-relayer) contract.
The [settlement](/cow-protocol/reference/contracts/core/settlement) contract, meanwhile, verifies the signature of the user's intent and ensures that execution happens according to the limit price and quantity specified by the user.

Anyone with some DeFi knowledge and ability to code an optimizations algorithm can create a solver.
