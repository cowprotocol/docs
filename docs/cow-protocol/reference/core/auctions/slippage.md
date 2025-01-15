---
sidebar_position: 4
---

# Slippage accounting

Slippage accounting, that is taking place in all chains the protocol operates on, is performed on a per settlement/transaction basis according to the following two primary components. The SQL source code can be found on [GitHub](https://github.com/cowprotocol/solver-rewards/blob/main/queries/dune_v2/period_slippage.sql) or [Dune Analytics](https://dune.com/queries/3093726)

## Batch-wise token imbalance

The token balance sheet represents a classified account of all incoming and outgoing token transfers relative to the settlement contract. Classification categories are `USER_{IN/OUT}`, `AMM_{IN/OUT}` and `PHANTOM_TRANSFER`

### Classifying transfers

In all cases `IN` represents settlement contract as `recipient` and `OUT` as `sender`!

- `USER_{IN/OUT}` transfers are those emitted by the Settlement contract's `Trade` Event (with `USER_IN` adjusted for fees).
- `AMM_{IN/OUT}` classification is assigned to all on-chain transfers that are **NOT** user transfers
- `PHANTOM_TRANSFER` represents token transfers associated with _internalized buffer trades_. In brief, these are transfers related to AMM interactions that were "skipped" for the purpose of gas optimization in favour of using the settlement contract's [internal holdings](/cow-protocol/reference/core/definitions#buffers). The process for including this "off-chain" data is rather involved, so we dedicate an entire section to it below.

:::note

`AMM_IN/OUT` also captures `WETH` token (un)wraps.

:::

### Phantom transfers (aka internalized token imbalance)

As mentioned above, as a form of gas optimization, solvers may indicate whether certain AMM interactions may be "internalized" if the settlement contract has sufficient balance and would be willing to facilitate the trade with their own funds. Solvers are expected to provide the `complete` and `reduced` _call-data_ which serves as proof that there was indeed a liquidity source on the competition block that would have filled the trade with the quoted amounts. Internal token imbalances are computed by simulating the transactions with both the `complete` and `reduced` call-data, parsing the transfers and take the difference. This difference represents a **very close approximation** of the "phantom" transfers that would have happened if the settlement had not been internalized.

Note the use of the term _approximation_ in this context means that the simulations happened on the **competition block** which is strictly earlier than the **settlement block** where the transaction was mined. It may happen that the state of skipped liquidity sources changes between these blocks, but this process fairly and accurately captures the solver's "intent" (anything else is essentially slippage anyway). This process is deemed to be deterministic, up-to potential disagreement between transaction simulators.

Please find the source code for internal imbalances at https://github.com/cowprotocol/solver-rewards/tree/main/internal_transfers

## Evaluation in ETH (aka Token Prices)

Token prices are taken as the _hourly mean_ over Dune's `prices.usd` table in combination with the "intrinsic" token prices provided in settlements. SQL code for price table is [here](https://github.com/cowprotocol/solver-rewards/blob/main/queries/dune_v2/period_slippage.sql#L257-L323)