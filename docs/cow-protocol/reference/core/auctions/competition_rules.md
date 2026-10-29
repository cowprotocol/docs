---
id: competition-rules
sidebar_position: 2
---

# Solver competition rules

All solvers participating in the solver competition must abide by certain rules. In this section, we outline all these rules. They naturally split into three classes:

1. Those enforced explicitly by the [smart contract](#smart-contract)
2. Those enforced by the [off-chain protocol](#off-chain-protocol) infrastructure
3. So-called social consensus rules enforced by [governance](#governance)

## Smart contract

- Limit price constraint: this rule enforces that an order cannot be executed if its limit price is violated.
- Solver submitting a transaction needs to be whitelisted (the process about how a solver can get whitelisted is described [here](/cow-protocol/reference/core/auctions/bonding-pools)).

## Off-chain protocol

- Scores: Every solution is associated with a _score_. The score is computed from executed amounts of all trades and is roughly equivalent to the amount of surplus a solution generates for users. For concrete formulas see [the section on solving](the-problem) or [CIP-38](https://snapshot.box/#/s:cow.eth/proposal/0xfb81daea9be89f4f1c251d53fd9d1481129b97c6f38caaddc42af7f3ce5a52ec) and [CIP-65](https://snapshot.box/#/s:cow.eth/proposal/0xd172281444c48254398881c57a57a2acbf0802a385e6c94384fd358b943aa4f4).

- Valid solutions: A solution is _valid_ if
  - it proposes the execution of at least one order eligible for contributing to score; and
  - respects Uniform Directional Clearing Prices (UDCP): all orders trading the same tokens in the same direction must receive the same price (with an exception for orders containing hooks to account for the cost of gas). Importantly, each solution must respect UDCP, but there is no obligation to respect UDCP across solutions, even if submitted by the same solver.

- Winner selection: The set of winning solutions (and corresponding winning solvers) is chosen using a _Fair Combinatorial Auction_ (see [CIP-67](https://snapshot.box/#/s:cow.eth/proposal/0xf9ecb08c4738f04c4525373d6b78085d16635f86adacd1b8ea77b2c176c99d32)) from all valid solutions. Each solution corresponds to a bid in the auction.
  - The protocol first considers bids containing only orders on the same _directed token pair_, i.e., on the same token pair and in the same direction, and computes the best bid on each directed token pair, where the best bid is the one generating the highest score. The collection of these best bids is the reference outcome for each directed token pair, representing the best possible execution against outside liquidity.
  - The protocol then uses the reference outcome to filter out _unfair_ bids from the remaining batched bids (batched because, by definition, they contain orders on multiple directed token pairs). A batched bid is filtered out whenever it generates lower score for a given directed token pair than the reference outcome.
  - In the final step, the protocol considers all the batched bids that survived the filtering and the best bids on individual directed token pairs. It computes the collection of winning bids, under the constraint that all orders on the same directed token pair must be part of the same winning bid.
  Winning solvers are rewarded according to a second-price auction mechanism; for more information see the [rewards section](rewards).

- Valid settlements: A settlement executed on-chain is _valid_ if:
  - The solution was selected as winner and is executed as specified in the bidding stage with respect to solver, score, and executed amounts.
  - Hooks of executed trades, as specified in app data of respective orders, are executed according to the following rules:
    1. Pre-hooks need to be executed before pulling in user funds
    2. Post-hooks need to be executed after pushing out user order proceeds
    3. Partially fillable orders:
       1. Should execute the pre-hooks on the first fill only
       2. Should execute the post-hooks on every fill
    4. Execution of a hook means:
       1. There exists an internal CALL in the settlement transaction with a
          matching triplet: target, gasLimit, calldata
       2. The hook needs to be attempted, meaning the hook reverting is not violating any rules
       3. Intermediate calls between the call to settle and hook execution must not revert
       4. The available gas forwarded to the hook CALL is greater or equal than specified gasLimit
  - The settlement is executed before or at the deadline of that auction.
    Not following these rules can result in immediate denylisting of a solver until a manual inspection is executed. These rules are currently implemented in the [circuit-breaker-validator](https://github.com/cowprotocol/circuit-breaker-validator).

- Buffer usage: solvers are allowed to use funds in the settlement contract for certain types of use cases.
  - Solvers are supposed to store _protocol and partner fees_ in the settlement contract.
  - Solvers are allowed to store funds to cover _network fees_ in the contract.
  - Solvers are allowed to use funds in the settlement contract to offset price variations on liquidity sources, also referred to as _slippage_.
  - Solvers are allowed to use funds in the settlement contract for executing trades, also referred to as _internalizations_, if the token which accumulates in the contract is among marked as `"trusted": true` in the auction json, see the [API specification](../../apis/driver.mdx).
    Solvers bear responsibility for all changes to balances of the settlement contract. The concrete implementation of buffer accounting is described in the [accounting section](accounting).

:::note

The deadline for solutions depends on the network and is set as a specific number of blocks after the current block at the time of sending the settle request to the solver:

- Mainnet: 3 blocks
- Gnosis chain: 3 blocks
- Arbitrum: 11 blocks
- Base: 4 blocks
- Avalanche: 8 blocks
- Polygon: 8 blocks
- BNB: 5 blocks
- Linea: 4 blocks
- Plasma: 5 blocks
- Ink: 5 blocks
<!-- Blocks defined here https://github.com/cowprotocol/infrastructure/blob/staging/services/autopilot/config/index.ts#L21 -->

:::

## Governance

Social consensus rules are not enforced by the smart contract or the autopilot. However, by voting on them in a CoW Improvement Proposal (CIP), CoW DAO has decided that these rules should be followed to ensure a healthy competition. For that, the core team has developed monitoring tools that check every on-chain settlement and flag suspicious ones.

:::caution

At CoW DAO's discretion, systematic violation of these rules may lead to penalizing or slashing of the offending solver.

:::

- Inflation of rewards ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870), CIP-XX). Influencing the orders or prices of an auction in order to increase [rewards](rewards) is forbidden.

- Illegal use of internal buffers ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870), CIP-XX). Internal buffers are made available to solvers to make settlements more efficient, e.g., to cover slippage on liquidity sources or to save gas on small trades (see [buffer usage](#off-chain-protocol)). They are not a liquidity source that the protocol offers at defined prices. Solvers bear full responsibility for all changes to buffer balances caused by their settlements. Using the buffers in a way that exposes the protocol to significant inventory risk, e.g., by systematically accumulating tokens that are not trusted, or creating any other attack vector on the buffers, is forbidden. For slippage accounting, the core team may convert buffer imbalances to the native token using any reasonable price vector.

- Other malicious behavior ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Malicious solver behavior is not limited to the above examples. Slashing can still happen for other reasons where there is intentional harm caused to the user and/or the protocol at the discretion of the CoW DAO. A concrete example of such is a solver intentionally not including the [pre/post hooks](/cow-protocol/reference/core/intents/hooks) associated with an order.
