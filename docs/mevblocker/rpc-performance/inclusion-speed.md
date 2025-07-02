---
sidebar_position: 2
---

# Inclusion Speed

We now consider the number of blocks between submission and inclusion for the transactions
which were successfully executed on-chain. Here, we consider all the successful transactions
for each RPC provider, as defined for the success rate.

![Speed](/img/mevblocker/ispeed_1.png)

We plot the box plot of the distribution to time to inclusion (measured in number of blocks),
with the minimum, the 10th percentile, the average , the 90th percentile and the maximum
value. represents the standard deviation of the each set.
We notice that the mean and standard deviation rank the RPC service providers in the same
order. This transaction sample demonstrates MEV Blocker fastest execution, followed by
Flashbots, then Blink and finally Merkle.
Flashbot’s execution shows a single large outlier with a time to inclusion of 7 blocks, where
the second largest is 4 blocks. This value does not significantly affect the mean and standard
deviation, as the sample size is significant enough to compensate for it. With this detail
accounted for, the box plot shows consistent performance results.