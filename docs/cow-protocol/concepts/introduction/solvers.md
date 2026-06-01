---
sidebar_position: 2
---

# Solvers

CoW Protocol delivers optimal price outcomes by leveraging an open solver competition for order matching. 

![Solvers](/img/concepts/solvers.png)

Solvers are independent, bonded participants that compete to construct valid settlement solutions for user-signed intents through CoW Protocol’s [intent-based delegated execution model](intents). Solvers are bonded third parties that execute trades on behalf of users through an  

Once a user submits an [intent](intents), the protocol groups it alongside other intents in a batch auction.
As soon as a batch is "closed for orders", meaning that it stops considering new orders, the protocol runs a [competition](/cow-protocol/reference/core/auctions) where solvers submit solutions for the intents in the batch. 

The solver whose [solution](/cow-protocol/reference/core/auctions/the-problem#solution) generates the greatest surplus for the batch is selected to submit the winning settlement solution. 

Solvers are compensated in COW tokens for successful settlement submissions, incentivizing them to compete to find better prices and submit valid solutions for user-signed intents. 

## How Solvers Work

Solvers can move tokens on behalf of the user using the `ERC-20` approvals that the user granted to the [vault relayer](/cow-protocol/reference/contracts/core/vault-relayer) contract.
The [settlement](/cow-protocol/reference/contracts/core/settlement) contract, meanwhile, verifies the signature of the user's intent and ensures that execution happens according to the limit price and quantity specified by the user.

Solvers do not receive ERC-20 approvals from users. Token transfers occur through the protocol’s smart contracts, using the ERC-20 approvals that users grant to the [vault relayer](/cow-protocol/reference/contracts/core/vault-relayer) contract. The [settlement](/cow-protocol/reference/contracts/core/settlement) contract verifies each user’s signed intent and enforces the applicable limit price, quantity and settlement constraints.

Anyone with some DeFi knowledge and ability to code an optimizations algorithm can create a solver.
