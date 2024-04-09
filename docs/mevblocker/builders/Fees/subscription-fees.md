---
sidebar_position: 1
---

# The Fee

All builders connected to MEV Blocker will pay a per-block-won fee recomputed every period (for example, every month). In practice, at the beginning of period $t$ a builder decides whether to receive flow from MEV blocker. If it decides to do so, for every block won during period $t$ it will pay a per-block fee calculated as a percentage of the the average per-block-won value of exclusive MEV Blocker transactions during the previous period. Mathematically, the per-block fee for period $t$ is a percentage of:

$$ M_{t-1} = {A_{t-1}-B_{t-1} \over C_{t-1}} $$

Where

$A_{t-1}$  = Total MEV Blocker transaction value during period $t-1$, excluding rebates.
$B_{t-1}$  = Total value of MEV blocker transactions also in the mempool during period $t-1$.
$C_{t-1}$  = Number of blocks mined by builders receiving MEV blocker transactions during period $t-1$.

Initially, the fee will be 20% of the above value, and the length of the period will be one month, but these variables may be adjusted later. This [dune query](https://dune.com/queries/3560043/5990842) calculates the fee for the past 12 months (note that the query is preliminary and may be updated). The per-block won fee for March would have been 0.00048 ETH, and that for April (according to March data so far) will be 0.00059 ETH. Builders who wish to connect or disconnect should announce their intention at least 24 hours before the beginning of the new period (i.e., 24 hours before the fee update).

:::note Off-chain accounting

Despite the fact that the fee is per block, it will not be paid with each block: we will keep track of it off-chain and settle it weekly. Hence, the settlement period for the payment (one week) differs from the frequency at which the per-block won fee is computed (one month). Builders are expected to settle their payment within 24 hours from the beginning of the new settlement period using the dedicated [smart contract](##MEV-Blocker-Fee-Management-Smart-Contract).

:::

We'll compute the value of the per-block won fee using publicly available data, in a format that is easy to verify (for example, as a Dune query). The process for [posting](####2.-Billing-and-Subscription-Fees) this value on-chain, as well as posting builder's dues and payment is documented below in the [smart contract section](##MEV-Blocker-Fee-Management-Smart-Contract).

Finally, for builders who won fewer than 1% of blocks during a given week, the fee will be adjusted so that these builders pay as if they won exactly 1% of blocks during the week. In practice, at the end of each week, these builders pay:

$$ 1\% (total\ blocks\ mined\ during\ the\ previous\ week) * 20\% M_{t-1} $$

The rationale for this adjustment is that connecting a builder to MEV blocker poses a risk because of the potential leaking of transactions to the public mempool, which should be evaluated against the benefit of faster inclusion of MEV blocker transactions. We believe the risk outweighs the benefit for builders who win less than 1% of blocks. Although we do not want to penalize builders who may temporarily fall below this threshold too harshly, we also want to discourage builders that pose risk to the MEV Blocker service, from connecting in the first place.