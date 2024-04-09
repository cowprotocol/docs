---
sidebar_position: 1
---

# MEV Blocker Endpoints 
As a MEV Blocker user, you can choose across three different endpoints based on your transaction needs.

[Fast](https://rpc.mevblocker.io/fast) - focused on getting your transaction included onchain as fast as possible while forwarding you a rebate.

[No Revert](https://rpc.mevblocker.io/noreverts) - focused on getting your transaction included onchain without any possibilities of reverting. In case your transaction is no longer valid it will stop being broadcasted to builders at no cost for the user.

[Full Privacy](https://rpc.mevblocker.io/fullprivacy) - focused on getting your transaction included onchain directly via builder. This method does not offer a rebate, but guarantees that the information your transaction carries remains private in terms of searchers. Keep in mind that builders will see your transaction information as this is the way PoS works in Ethereum, and thus can act maliciously, although in theory, they shouldn’t as its not in their interest.

[No Checks](https://rpc.mevblocker.io/nochecks) - focused on letting transactions go through the endpoint no matter if they simulation fails. This endpoint doesn't perform transaction simulation in pending block and only sends as private transactions(not bundles).

[Max Backruns](https://rpc.mevblocker.io/maxbackruns) - focused on getting you as many backruns as possible. This endpoint shares all received transactions with searchers no matter what.

