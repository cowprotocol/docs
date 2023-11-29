---
sidebar_position: 4
---

# MEV Protection

Finally, batch auctions provide permissionless MEV protection. Thanks to the uniform clearing price mechanism, transaction order does not matter, so MEV bots have no incentive to frontrun or sandwich trades. Batch auctions also provide MEV protection through Coincidence of Wants, because there is no room for MEV bots to intervene when two orders trade directly.  Furthermore, solvers (not traders) bear the cost of sandwich attacks against the batch. The reason is that solvers are responsible for providing the solution they announced during the competition even if prices moved unfavorably (because of a sandwich attack or any other reason) between the time they proposed their solution and the time the winning solution is settled on-chain. Solvers, therefore, have the incentive to deploy sophisticated strategies to prevent MEV extraction, including setting an appropriate slippage tolerance, using a private RPC endpoint like [Mev Blocker](https://mevblocker.io/), and working directly with private market makers.
