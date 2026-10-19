
---
sidebar_position: 3
---

# Fair combinatorial batch auction

CoW Protocol uses a fair combinatorial auction to compare candidate settlement solutions for eligible orders.

An auction instance contains orders and other information that solver participants can use to construct solutions.

The auction is **combinatorial** because multiple solutions can be selected, provided they satisfy the applicable compatibility and competition rules.

## Candidate solutions

A solver can propose one or more candidate solutions.

Each solution specifies:

- which eligible orders it includes;
- the proposed traded amounts and prices; and
- the interactions required for the proposed settlement.

A solution can contain orders trading the same **directed token pair** or combine orders across multiple directed token pairs.

A directed token pair identifies both the assets and the direction of the trade. For example, ETH to USDC and USDC to ETH are different directed token pairs.

Solutions containing orders across multiple directed token pairs are referred to as **batched solutions**.

## Scoring and selection

Each eligible solution receives a score calculated under the applicable competition rules.

The score reflects the economic outcomes of the included orders and the applicable scoring and fee rules.

The competition mechanism evaluates solutions in three stages.

### 1. Establish reference outcomes

For each directed token pair, the mechanism identifies the highest-scoring eligible solution containing only orders for that directed pair, where such a solution is available.

This solution establishes the reference score used to evaluate batched solutions containing that directed pair.

The reference is based on solutions submitted to the competition. It does not represent a guarantee of the best price available across all liquidity sources.

### 2. Apply the fairness test

The mechanism compares each batched solution against the reference scores for the directed token pairs it contains.

A batched solution is excluded if its score for any directed token pair is lower than the applicable reference score.

This test is designed to prevent batching from reducing the score attributable to a directed token pair below the available reference outcome.

The fairness test operates at the directed-token-pair level. It does not independently guarantee the best possible outcome for every individual order.

### 3. Select winning solutions

The mechanism considers eligible single-pair solutions and batched solutions that pass the fairness test.

It selects a combination of solutions according to the applicable scoring objective and compatibility constraints.

Under the selection rules, orders for the same directed token pair that are included in winning solutions must belong to the same winning solution.

More than one solution can be selected in an auction.

The selection process aims to maximise the combined score, subject to the applicable constraints. Computational methods may use approximations rather than always finding the theoretical global maximum.

See [Solver competition rules](/cow-protocol/reference/core/auctions/competition-rules) for the current scoring and selection methods.

## Uniform directional clearing prices

Eligible solutions must satisfy the Uniform Directional Clearing Prices (UDCP) requirement.

Within a solution, orders trading the same tokens in the same direction must receive the same clearing price, subject to the applicable exceptions.

For example, two orders selling ETH for USDC within the same solution must receive the same directional clearing price.

Exceptions can apply to orders containing hooks to account for their additional gas costs.

UDCP is assessed for each solution. Different candidate solutions are not required to use identical clearing prices.

See [Solver competition rules](/cow-protocol/reference/core/auctions/competition-rules) for the detailed requirements.

## Coincidence of Wants

A candidate solution can match compatible order flow within the same settlement.

This is known as a **Coincidence of Wants (CoW)**.

Matching compatible orders can reduce or remove the amount of external liquidity required for those orders.

A solution can also combine matched order flow with interactions involving external liquidity sources.

See [Coincidence of Wants](../how-it-works/coincidence-of-wants).

## Settlement

Selection in the auction does not itself transfer tokens or settle orders.

A driver associated with a selected solution can submit the corresponding settlement transaction.

The Settlement contract verifies the applicable on-chain conditions and processes the transaction if those conditions are satisfied.

Selection does not guarantee transaction inclusion or successful settlement.

See [Flow of an order](../how-it-works/flow-of-an-order) for the settlement process.

## Technical reference

For further details, see:

- [Auction mechanism](/cow-protocol/reference/core/auctions)
- [Solver competition rules](/cow-protocol/reference/core/auctions/competition-rules)
- [Solver rewards](/cow-protocol/reference/core/auctions/rewards)
- [CIP-67: Fair Combinatorial Auction](https://forum.cow.fi/t/cip-67-moving-from-batch-auction-to-the-fair-combinatorial-auction/2967)
