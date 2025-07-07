---
sidebar_position: 3
---

# Swap Price Improvement

Then, we focus only on the swaps and start by observing the quality of the execution which
can be measured by the relative price of the swap between the different executions. Here,
we compare each RPC service to MEV Blocker, when both have executed the swap. For
every trade, we compute price improvement = price(RPC)/price(MEV Blocker) -1, and we
measure it in bps. This can be rewritten price improvement = output(RPC)/output(MEV
Blocker) -1, with output the amount of tokens received from the swap. Both formulas are
similar because the inputs of the transactions are identical. The results show that on average
Mev Blocker performs better than all other RPCs: it is on average 9bps better than Blink
and Merkle, and 21 bps better than Flashbots.

We also check the statistical significance of our results by performing a t-test with “H0: price improvement = 0”. Intuitively, the p-value computed by this test represents the probability that, in truth, there is no difference between MEV blocker and the comparison RPC, and therefore the difference we measure in our data is purely random noise. This probability is
below 10% for Flashbot, meaning that the difference between MEV blocker and Flashbot is
statistically significant at the 10% level. The difference between MEV blocker and the other
2 RPCs instead is not significant at any standard significance level.

![priceImprovement](/img/mevblocker/price_improvement_1.png)


![priceImprovement](/img/mevblocker/price_improvement_2.png)
