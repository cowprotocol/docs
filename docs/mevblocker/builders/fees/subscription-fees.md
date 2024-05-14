---
sidebar_position: 1
---

# The Fee

All builders connected to MEV Blocker will pay a per-block-won fee recomputed every period (for example, every month). In practice, at the beginning of period $t$ a builder decides whether to receive flow from MEV Blocker. If it decides to do so, for every block won during period $t$ it will pay a per-block fee calculated as a percentage of the the average per-block-won value of exclusive MEV Blocker transactions during the previous period. Mathematically, the per-block fee for period $t$ is a percentage of:

$$ M_{t-1} = {A_{t-1}-B_{t-1} \over C_{t-1}} $$

Where

$A_{t-1}$  = Total MEV Blocker transaction value during period $t-1$, excluding rebates.
$B_{t-1}$  = Total value of MEV Blocker transactions also in the mempool during period $t-1$.
$C_{t-1}$  = Number of blocks mined by builders receiving MEV Blocker transactions during period $t-1$.

Initially, the fee will be 20% of the above value, and the length of the period will be one month, but these variables may be adjusted later. This [dune query](https://dune.com/queries/3560043/5990842) calculates the fee for the past 12 months (note that the query is preliminary and may be updated). The per-block won fee for March would have been 0.00048 ETH, and that for April (according to March data so far) will be 0.00059 ETH. Builders who wish to connect or disconnect should announce their intention at least 24 hours before the beginning of the new period (i.e., 24 hours before the fee update).

:::note Off-chain accounting

Despite the fact that the fee is per block, it will not be paid with each block: we will keep track of it off-chain and settle it weekly. Hence, the settlement period for the payment (one week) differs from the frequency at which the per-block won fee is computed (one month). Builders are expected to settle their payment within 24 hours from the beginning of the new settlement period using the dedicated [smart contract](fee-management-smart-contract).

:::

We'll compute the value of the per-block won fee using publicly available data, in a format that is easy to verify (for example, as a Dune query). The process for [posting](fee-management-smart-contract#billing-and-subscription-fees) this value on-chain, as well as posting builders' dues and payment is documented below in the [smart contract section](fee-management-smart-contract).

Finally, for builders who won fewer than 1% of blocks during a given week, the fee will be adjusted so that these builders pay as if they won exactly 1% of blocks during the week. In practice, at the end of each week, these builders pay:

$$ 1\% (total\ blocks\ mined\ during\ the\ previous\ week) * 20\% M_{t-1} $$

The rationale for this adjustment is that connecting a builder to MEV Blocker poses a risk because of the potential leaking of transactions to the public mempool, which should be evaluated against the benefit of faster inclusion of MEV Blocker transactions. We believe the risk outweighs the benefit for builders who win less than 1% of blocks. Although we do not want to penalize builders who may temporarily fall below this threshold too harshly, we also want to discourage builders that pose a risk to the MEV Blocker service from connecting in the first place.

# Reasoning behind the Fee

## Why this fee mechanism?

An intuitive notion of fairness dictates that each builder should pay for the value of MEV Blocker transactions it uses. At the same time, an important objective of the mechanism is to be as non-distortionary as possible: it should not affect the decision to include or not include a transaction by a builder. A fee constructed simply as a fraction of the tip of each MEV Blocker transaction risks creating distortion. Furthermore, on the implementation side, it would require a new API.

The proposed solution instead does not require any new API and is unlikely to create distortions. It is also built to be correct *on average*: if builders do not disconnect and win more or less the same fraction of blocks between periods, they end up paying with a month delay the average value of MEV transactions they received during the previous week.

It is also important to stress that this is the first iteration of the fee mechanism. For example, in the future, we may compute the fee as a fraction of the MEV Blocker tx value included by non-winning builders for the same slot. Intuitively, that would be a proxy for the value from MEV Blocker available to the winning builder, independent of this builder's decision to include this or that transaction. This mechanism cannot be implemented now because Agnostic relay does not store any data regarding blocks built by non-winning builders, but this could change later.

## Who pays the fee?

To understand who pays the fee incidence, we need to consider two cases. If a single builder receives MEV Blocker flow, introducing the fee is at the expense of this builder's profits: if this builder wins, it wins less (by an amount equal to the fee) and is less likely to win because it will bid lower. If, for simplicity, we ignore this second effect the builder pays, on average, 20% of the value of MEV transactions as a fee while keeping the remaining 80% as profits.

At the other extreme, suppose that all builders are connected to MEV Blocker, and hence, after the fee is introduced, they all have to pay it. Now, for all builders, winning a block is less valuable by an amount equal to the fee. For the moment, let's think of the auction as a second-price auction: the winning builder is the one who bids the highest but only pays the second-highest bid. One of the most famous results in auction theory is that, in a second-price auction, bidders should bid their true valuation, which for each builder is the value of its block minus the MEV Blocker fee. This implies that the winning bidder earns the value of its block minus MEV Blocker fee, and pays in the auction the second-highest bid, which is the second most valuable block minus the MEV Blocker fee. Hence, the winning builder earns less but pays less, and its profit margin remains the same. In equilibrium, the only impact of MEV Blocker's fee is that all bids are lower, and hence, payments to validators are lower. In equilibrium, the fee is paid indirectly by the validator.

Note that the auction is not exactly a second-price auction. It starts as an ascending English auction, where bidders gradually increase their bids. Due to latency, the final part is similar to a first-price sealed bid auction. Despite these complexities, the auction's dynamics are similar to a second-price auction because each builder aims to outbid the second-highest bid by a small margin. Also, since the value a builder gets from creating a block doesn't depend on other builders' blocks (i.e., the auction is in private values), the revenue equivalence theorem says that all auction formats yield the same expected payoff to its participants. Hence, even if the auction is not in second price, we can analyze its equilibrium as if it were in second price.

To summarize, we hope that builders will stay connected to MEV Blocker and that the fee will reduce the payments to validators (i.e., MEV). At the same time, we expect the mechanism to be overall beneficial to builders, including in the case where only one or a few builders connect (and end up paying the fee out of their profits).

## Possible Challenges

The main possible challenge (and where the above reasoning would fail) is when builders have blocks of very low value, so imposing a fee turns the value of winning negative. In such cases, builders connected to MEV Blocker may not bid. As a consequence, either a non-connected builder wins the block, or a validator creates a vanilla block, or the block is empty. To check whether this possibility is empirically relevant, we calculated what the fee would have been and checked how many times the block won by a builder had a lower value than the fee (see [this Dune query](https://dune.com/queries/3565473)). We found 18 such cases in 2024 so far. For context, there were more than 630,000 blocks validated so far in 2024.

A final possible challenge is that the mechanism is designed to be "correct" on average, in the sense that, on average, a builder who does not disconnect pays with one period delay 20% of the value of the MEV Blocker transactions it received. However, averages may be misleading, especially for small builders. Therefore, for each connected builder, we will keep track of the value of MEV Blocker transactions received during a month and the total fee paid to MEV Blocker in the subsequent month. If we find cases in which the fee paid exceeds the value received, we will consider adjustments to the fee mechanism (for example, instead of charging 20%, charging 15% or 10%).