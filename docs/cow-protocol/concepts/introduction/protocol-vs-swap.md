---
sidebar_position: 2
---

# What is CoW Protocol and What is CoW Swap?

While they are interrelated, there are important differences between CoW Protocol and CoW Swap.

![](https://lh7-eu.googleusercontent.com/lbCTU1vsfFIlHQf8cx23A4ehOUQYbXKad7URPXjFUu3rG0XsMJlQpBeNP3iAPx85HUrQNAsdOWIc8XSQMflZ0nozpD_r0hQo_qBObAO_NAhx_KiQWTnTdjIWo5x69C4J0PJqWbAXJ_a-6g37qxjhfkc)

CoW Protocol is a fully permissionless trading protocol that relies on intents and batch auctions to give users the best prices and protect orders from Maximal Extractable Value (MEV.) 

The protocol groups orders together into “batches” and relies on a competition between third parties known as “solvers” to find the best outcomes for each order in the batch. Solvers search all available on-chain liquidity and even tap off-chain private inventory to find the optimal execution path for each trade. If two orders in a batch are swapping opposite assets, they may even be matched together in a peer-to-peer “Coincidence of Wants” (CoW) trade. 

Once solvers have proposed their solutions, the protocol picks the “winning” solver to settle each batch of orders. The protocol defines the winning solver as the solver that can maximize surplus for traders. This usually happens by either having the most optimal CoW, finding the best liquidity sources, or a combination of both in a single settlement.

**CoW Protocol UIs**

To date, CoW Swap, Balancer UI, and several other protocols have integrated CoW Protocol natively in their trading interfaces. CoW Swap was the first trading interface built on top of the protocol and remains the main trading venue of choice for CoW Protocol users. Since CoW Swap is the “native” front-end of CoW Protocol, the UI includes with some unique feature such as:  

- Cookie fortunes
- Wallet history
- Overview of your tokens
- Token page
- Games
- Moo sound
