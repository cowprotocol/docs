---
id: competition-rules
sidebar_position: 2
---

# Rules of the solver competition

All solvers participating in the solver competition must abide by certain rules. In this section, we outline all these rules, which are naturally split into two classes: (1) the ones enforced explicitly by the smart contract and the offchain protocol infrastructure, and (2) the so-called social consensus rules.

## Rules enforced by the smart contract and/or the autopilot

- Uniform clearing prices (UCP): this rule is an integral component of the protocol, and specifies that there is one clearing price per token per batch.
- Limit price constraint: this rule enforces that an order cannot be executed if its limit price is violated.
- A solution is valid only if it contains at least one user order.
- Every solution is associated with a score, and the solutions are ranked in decreasing order of their scores. The empty solution with the zero score is always considered as a candidate solution. The solution with the highest (positive) score is declared the winner of the batch auction, and gets the right to execute onchain. The solver that provided the winning solution is then rewarded according to the rules specified in [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f).
- 

## Social consensus rules

Social consensus rules are not enforced by the smart contract or the autopilot. However, by voting on them in a CoW improvement proposal (CIP), CoW DAO has decided that these rules should be followed to ensure a healthy competition. For that, the core team has developed monitoring tools that check every single onchain settlement and flag suspicious ones.

:::caution

At CoW DAO's discretion, systematic violation of these rules may lead to penalizing or slashing of the offending solver.

:::

- **No provision of unfair solutions** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

  Uniform clearing prices computed by solvers should be in line (or even better) than what the users would get elsewhere. This becomes particularly relevant for solutions where CoWs happen, i.e., when some volume is settled as part of a CoW and not by routing through an AMM.

- **Inflation of the objective function** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

  Using tokens for the sole purpose of inflating the objective value or maximizing the reward is forbidden (e.g., by creating fake tokens, or wash-trading with real tokens).

- **Illegal use of internal buffers** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

  The [internal buffers](/cow-protocol/reference/core/definitions#buffers) may only be used to replace legitimate AMM interactions available to the general public for the purpose of saving transaction costs.

- **Failure to report correct transacted values for encoded transactions** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

  Solvers may choose to include encoded transactions in their solution, by providing relevant calldata, but when doing so they must also truthfully specify the amounts transferred by each encoded transaction. This is required in order to be able to verify the proposed token conservation constraints, and can be checked retrospectively.

- **Other malicious behavior** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

  Malicious solver behavior is not limited to the above examples. Slashing can still happen for other reasons where there is intentional harm caused to the user and/or the protocol at the discretion of the CoW DAO. A concrete example of such is a solver intentionally not including the [pre/post hooks](/cow-protocol/reference/core/intents/hooks) associated with an order.

