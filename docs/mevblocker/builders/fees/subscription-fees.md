---
sidebar_position: 1
---

# The Fee

All builders connected to MEV Blocker will pay a per-block-won fee recomputed every period (for example, every month). In practice, at the beginning of period $t$ a builder decides whether to receive flow from MEV Blocker. If it decides to do so, for every block won during period $t$, it will pay a per-block fee calculated as a percentage of the average per-block-won value of MEV Blocker transactions during the previous period. Mathematically, the per-block fee for period $t$ is a percentage of:

$$ M_{t-1} = {A_{t-1}-B_{t-1} \over C_{t-1}} $$

Where

$A_{t-1}$  = Total MEV Blocker transaction value during period $t-1$, excluding rebates.
$B_{t-1}$  = Total value of MEV Blocker transactions also in the mempool during period $t-1$.
$C_{t-1}$  = Number of blocks mined by builders receiving MEV Blocker transactions during period $t-1$.

Currently, the fee is 50% of the above value, and the length of the period is one month. Builders who wish to connect or disconnect should announce their intention at least 48 hours before the beginning of the new period (i.e., 24 hours before the fee update).

:::note Off-chain accounting

Despite the fact that the fee is per block, it is not paid with each block: we keep track of it off-chain and settle it weekly. Hence, the settlement period for the payment (one week) differs from the frequency at which the per-block won fee is computed (one month). Builders are expected to settle their payment within 24 hours from the beginning of the new settlement period using the dedicated [smart contract](fee-management-smart-contract).

:::

We compute the value of the per-block won fee using publicly available data, in a format that is easy to verify (a Dune query). The process for [posting](fee-management-smart-contract#billing-and-subscription-fees) this value on-chain, as well as posting builders' dues and payment is documented below in the [smart contract section](fee-management-smart-contract).

Finally, for builders who won fewer than 1% of blocks during a given week, the fee is adjusted so that these builders pay as if they won exactly 1% of blocks during the week. In practice, at the end of each week, these builders pay:

$$ 1\% (total\ blocks\ mined\ during\ the\ previous\ week) * 20\% M_{t-1} $$

The rationale for this adjustment is that connecting a builder to MEV Blocker poses a risk because of the potential leaking of transactions to the public mempool, which should be evaluated against the benefit of faster inclusion of MEV Blocker transactions. We believe the risk outweighs the benefit for builders who win less than 1% of blocks. Although we do not want to penalize builders who may temporarily fall below this threshold too harshly, we also want to discourage builders who pose a risk to the MEV Blocker service from connecting in the first place.

# Reasoning behind the Fee

## Why this fee mechanism?

An intuitive notion of fairness dictates that each builder should pay for the value of MEV Blocker transactions it uses. At the same time, an important objective of the mechanism is to be as non-distortionary as possible: it should not affect a builder's decision to include or not include a transaction. The above fee mechanism is unlikely to create distortions: an MEV-blocker-connected builder who wins the block pays the same fee independently of which MEV blocker transactions it uses and in which order. It is also built to be correct *on average*: if builders do not disconnect and win more or less the same fraction of blocks between periods, they pay with a month delay the average value of MEV transactions they received during the previous week. Last, but not least, its goal is to reduce the payment from builders to validators (i.e., MEV), as we explain below.

## Who pays the fee?

To understand the fee incidence, we need to consider two cases. If a single builder receives MEV Blocker flow, introducing the fee is at the expense of this builder's profits: the builder pays, on average, 20% of the value of MEV transactions as a fee while keeping the remaining 80% as profits. On the other hand, suppose that all builders are connected to MEV Blocker, so they all have to pay for it. Now, for all builders, winning a block is less valuable by an amount equal to the fee. For the moment, let's think of the auction as a second-price auction: the winning builder is the one who bids the highest but only pays the second-highest bid. One of the most famous results in auction theory is that, in a second-price auction, bidders should bid their true valuation, which for each builder is the value of its block minus the MEV Blocker fee. This implies that the winning bidder earns the value of its block minus MEV Blocker fee, and pays in the auction the second-highest bid, which is the second most valuable block minus the MEV Blocker fee. Hence, the winning builder earns less but pays less, and its profit margin remains the same. In equilibrium, the only impact of MEV Blocker's fee is that all bids are lower, and hence, payments to validators are lower: the fee is paid indirectly by the validator.

Note that the PBS auction is not exactly a second-price auction. It starts as an ascending English auction, where bidders gradually increase their bids. Due to latency, the final part is similar to a first-price sealed bid auction. Despite these complexities, the auction's dynamics are similar to a second-price auction because each builder aims to outbid the second-highest bid by a small margin. Also, since the value a builder gets from creating a block doesn't depend on other builders' blocks (i.e., the auction is in private values), the revenue equivalence theorem says that all auction formats yield the same expected payoff to its participants. Hence, even if the auction is not in second price, we can analyze its equilibrium as if it were in second price.

To summarize, if most builders connect to MEV Blocker, then the fee reduces the payments to validators (i.e., MEV). At the same time,  the mechanism is beneficial to builders overall, including in cases where only one or a few builders connect (and end up paying the fee out of their profits).

