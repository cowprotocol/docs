---
sidebar_position: 4
---

# MEV Protection

Finally, batch auctions provide permissionless MEV protection. Thanks to the uniform clearing price mechanism, transaction order does not matter so MEV bots have no incentive to frontrun or sandwich trades. Batch auctions also provide MEV protection through Coincidence of Wants matching. When two orders trade directly with each other, there is no room for MEV bots to intervene.  Furthermore, solvers (not traders) bear the cost of sandwich attacks against the batch. The reason is that solvers are responsible for providing the solution they announced during the competition, and therefore have the incentive to deploy sophisticated strategies to prevent MEV extraction.
