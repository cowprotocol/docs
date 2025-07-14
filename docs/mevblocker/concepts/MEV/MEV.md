---
sidebar_position: 3
---

MEV is a controversial topic within any chain. MEV Blocker’s goal is to diminish all the MEV that hurts or goes against the users, while maximizing all the MEV that can work to the advantage of the user. 

## **Without MEV Blocker**

Ethereum’s default mempool is a wild west where MEV bots (aka searchers) can exploit transactions of unsuspecting traders (aka your users) taking their money bit by bit over time

![image.png](/img/mevblocker/mevblocker_1.png)

1. The wallet submits user-initiated txs to the public mempool.
2. Anyone can view mempool txs. Builders select them based on fees and value.
3. MEV bots exploit mempool transactions for profit, targeting slippage exploitation.
4. MEV bots create bundles and submit them to builders with a bribe to enforce the order.
5. Builders assemble the most valuable bundles to create the most profitable block for validators.
6. Validators choose the most valuable block from builders to maximize earnings. Once selected, all txs (user, MEV, bribes) are executed onchain.

## **With MEV Blocker**

The structured mempool incentivizes searchers to bundle transactions for builders so they’re included in the next block without frontrunning or sandwiching traders (by giving searchers a cut of backrun opportunities)

![image.png](/img/mevblocker/mevblocker_2.png)

1. The wallet submits user-initiated txs to MEV Blocker’s virtual mempool.
2. Builders must pay a subscription fee to access MEV Blocker's tx flow.
3. Connected builders can access MEV Blocker flow and select txs based on fees and value.
4. MEV Blocker shares txs with searchers via backrun bundles, returning 90% to the user.
5. MEV bots create bundles and submit them to builders with a bribe to enforce the order.
6. Builders assemble the most valuable bundles to create the most profitable block for validators.
7. Validators choose the most valuable block from builders to maximize earnings. Once selected, all txs (user, MEV, bribes) are executed onchain.
8. MEV Blocker shares 50% of the subscription fee from builders with wallet flow originators.
