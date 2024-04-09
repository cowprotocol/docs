---
sidebar_position: 2
---

# Reasoning behind the Fee

## Why this fee mechanism?

An intuitive notion of fairness dictates that each builder should pay for the value of MEV Blocker transactions it uses. At the same time, an important objective of the mechanism is to be as non-distortionary as possible: it should not affect the decision to include or not include a transaction by a builder. A fee constructed simply as a fraction of the tip of each MEV Blocker transaction risks creating distortion. Furthermore, on the implementation side, it would require a new API.

The proposed solution instead does not require any new API and is unlikely to create distortions. It is also built to be correct *on average*: if builders do not disconnect and win more or less the same fraction of blocks between periods, they end up paying with a month delay the average value of MEV transactions they received during the previous week.

It is also important to stress that this is the first iteration of the fee mechanism. For example, in the future, we may compute the fee as a fraction of the MEV Blocker tx value included by non-winning builders for the same slot. Intuitively, that would be a proxy for the value from MEV Blocker available to the winning builder, independent of this builder's decision to include this or that transaction. This mechanism cannot be implemented now because Agnostic relay does not store any data regarding blocks built by non-winning builders, but this could change later.

## Who pays the fee?

To understand who pays the fee incidence, we need to consider two cases. If a single builder receives MEV Blocker flow, then introducing the fee is at the expense of this builder's profits: if this builder wins, it wins less (by an amount equal to the fee) and is less likely to win because it will bid lower. If, for simplicity, we ignore this second effect, on average, the builder pays 20% of the value of MEV transactions as a fee while keeping the remaining 80% as profits.

At the other extreme, suppose that all builders are connected to MEV Blocker, and hence, after the fee is introduced, they all have to pay it. Now, for all builders, winning a block is less valuable by an amount equal to the fee. For the moment, let's think of the auction as a second-price auction: the winning builder is the one who bids the highest but only pays the second-highest bid. One of the most famous results in auction theory is that, in a second-price auction, bidders should bid their true valuation, which for each builder is the value of its block minus MEV blocker fee. This implies that the winning bidder earns the value of its block minus MEV blocker fee, and pays in the auction the second-highest bid, which is the second most valuable block minus MEV blocker fee. Hence, the winning builder earns less but pays less, and its profit margin remains the same. In equilibrium, the only impact of MEV blocker's fee is that all bids are lower, and hence, payments to validators are lower. In equilibrium, the fee is paid indirectly by the validator.

Note that the auction is not exactly a second-price auction. It starts as an ascending English auction, where bidders gradually increase their bids. Due to latency, the final part is similar to a first-price sealed bid auction. Despite these complexities, the auction's dynamics are similar to a second-price auction because each builder aims to outbid the second-highest bid by a small margin. Also, since the value a builder gets from creating a block doesn't depend on other builders' blocks (i.e., the auction is in private values), the revenue equivalence theorem says that all auction formats yield the same expected payoff to its participants. Hence, even if the auction is not in second price, we can analyze its equilibrium as if it were in second price.

To summarize, we hope that builders will stay connected to MEV Blocker and that the fee will reduce the payments to validators (i.e., MEV). At the same time, we expect the mechanism to be overall beneficial to builders, including in the case where only one or a few builders connect (and end up paying the fee out of their profits).

## Possible Challenges

The main possible challenge (and where the above reasoning would fail) is when builders have blocks of very low value, so imposing a fee turns the value of winning negative. In such cases, builders connected to MEV blocker may not bid. As a consequence, either a non-connected builder wins the block, or a validator creates a vanilla block, or the block is empty. To check whether this possibility is empirically relevant, we calculated what the fee would have been and checked how many times the block won by a builder had a lower value than the fee (see [this Dune query](https://dune.com/queries/3565473)). We found 18 such cases in 2024 so far. For context, there were more than 630.000 blocks mined so far in 2024.

A final possible challenge is that the mechanism is designed to be "correct" on average, in the sense that, on average, a builder who does not disconnect pays with one period delay 20% of the value of MEV blocker transactions it received. However, averages may be misleading, especially for small builders. Therefore, for each connected builder, we will keep track of the value of MEV blocker transactions received during a month and the total fee paid to MEV blocker in the subsequent month. If we find cases in which the fee paid exceeds the value received, we will consider adjustments to the fee mechanism (for example, instead of charging 20%, charging 15% or 10%).