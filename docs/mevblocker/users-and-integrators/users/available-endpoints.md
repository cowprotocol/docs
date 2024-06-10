---
sidebar_position: 1
---

# MEV Blocker Endpoints

MEV Blocker users can choose from several different endpoints depending on their particular needs. 

![Endpoints](/img/mevblocker/Endpoints_protection.png)

**[Fast](https://rpc.mevblocker.io/fast)** - Used to get transactions included on-chain as fast as possible while also finding users a rebate.  

**[No Revert](https://rpc.mevblocker.io/noreverts)** - Used to get transactions included on-chain without any possibility of reverting. If a transaction is no longer valid, it will stop being broadcast to builders at no extra cost to the user.

**[Full Privacy](https://rpc.mevblocker.io/fullprivacy)** - Used to get transactions included on-chain directly via a builder. This method does not offer a rebate, but guarantees that the information a user's transaction carries remains private. Users should keep in mind that builders will still see their transaction information due to the architecture of PoS on Ethereum and can theoretically act maliciously. In theory, however, they shouldn't, as it's not in their interest. 
  
**[Max Backruns](https://rpc.mevblocker.io/maxbackruns)** - Used to get as many backruns for transactions as possible. This endpoint shares all received transactions with searchers no matter what.

**[No Checks](https://rpc.mevblocker.io/nochecks)** - Used to let transactions go through the endpoint even if the simulation fails. This endpoint doesn't perform a transaction simulation in the pending block and only sends private transactions (not bundles).
