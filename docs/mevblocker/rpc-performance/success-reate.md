---
sidebar_position: 4
---

# Success Rate

We define the success rate as the number of transactions that were successfully executed
on-chain divided by the number of transactions submitted through an RPC. This implies
that all transactions which landed on-chain but reverted are considered as unsuccessful.
Out of the 273 transactions submitted, MEV Blocker, Blink and Flashbots successfully
executed their transactions with a rate of exceeding 90%, while Merkel’s success rate was
lower at 74We assign one color to each RPC that we’ll keep for the following plots.

![successRate](/img/mevblocker/success_rate_1.png)