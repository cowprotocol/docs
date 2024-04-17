---
sidebar_position: 2
---

# MEV Blocker Endpoints

Depending on their needs, MEV Blocker users can choose multiple endpoints to send their transactions.

![Endpoints](/img/mevblocker/Endpoints_protection.png)

- **[Fast](https://rpc.mevblocker.io/fast)** - focused on getting transactions included on-chain as fast as possible while forwarding rebates.
- **[No reverts](https://rpc.mevblocker.io/noreverts)** - focused on getting transactions included on-chain without any possibility of reverting. If a transaction is no longer valid, it will stop being broadcast to builders at no cost to the user.
- **[Full Privacy](https://rpc.mevblocker.io/fullprivacy)**—is focused on getting transactions included on-chain directly via builder without sharing them with searchers. This method does not offer a rebate. Keep in mind that builders will see your transaction information (which is unavoidable in Ethereum).
- **[No Checks](https://rpc.mevblocker.io/nochecks)** - focused on letting transactions go through the endpoint no matter if their simulation fails. This endpoint doesn't perform transaction simulation in pending block and only sends as private transactions (not bundles).
- **[Max Backruns ](https://rpc.mevblocker.io/maxbackruns)** - focused on getting as many backruns as possible. This endpoint shares all received transactions with searchers no matter what.
