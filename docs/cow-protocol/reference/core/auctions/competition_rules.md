---
id: competition-rules
sidebar_position: 2
---

# Rules of the solver competition

All solvers participating in the solver competition must abide by certain rules. In this section, we outline all these rules, which are naturally split into three classes: (1) the ones enforced explicitly by the smart contract, (2) the ones enforced by the offchain protocol infrastructure, and (3) the so-called social consensus rules.

## Rules enforced by the smart contract

- Limit price constraint: this rule enforces that an order cannot be executed if its limit price is violated.

## Rules enforced by the offchain protocol infrastructure

- Uniform clearing prices (UCP): this rule is an integral component of the protocol, and specifies that there is one clearing price per token per batch.

- A solution is valid only if it contains at least one user order.

- Every solution is associated with a score, and the solutions are ranked in decreasing order of their scores. The empty solution with the zero score is always considered as a candidate solution. The solver whose solution has the highest (positive) score is declared the winner of the batch auction, and gets the right to execute its solution onchain. The solver that provided the winning solution is then rewarded according to the rules specified in [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f).

- With the exception of fees paid by users and internalized interactions (both will be clarified shortly), any token imbalance within the settlement contract that is the result of a settlement is accounted for under the term "slippage accounting", and is fully owned by the corresponding solver, as specified in [CIP-17](https://snapshot.org/#/cow.eth/proposal/0xf9c98a2710dc72c906bbeab9b8fe169c1ed2e9af6a67776cc29b8b4eb44d0fb2). The only two types of imbalances that are not accounted for are:

  1. gas fees, paid by user orders, that are always collected in the sell token of the order, and
  2. internalized interactions; these are publicly available AMM interactions whose buy token (i.e., the token that the AMM buys) is classified as a "safe" token by the protocol. In such a case, if there is enough balance of the sell token of such an interaction in the settlement contract, then a solver can signal an internalization of such an interaction, which effectively means that the protocol is willing to market make with the same rate specified in this interaction. 

## Social consensus rules

Social consensus rules are not enforced by the smart contract or the autopilot. However, by voting on them in a CoW improvement proposal (CIP), CoW DAO has decided that these rules should be followed to ensure a healthy competition. For that, the core team has developed monitoring tools that check every single onchain settlement and flag suspicious ones.

:::caution

At CoW DAO's discretion, systematic violation of these rules may lead to penalizing or slashing of the offending solver.

:::

- No provision of unfair solutions ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Uniform clearing prices computed by solvers should be in line (or even better) than what the users would get elsewhere. This becomes particularly relevant for solutions where CoWs happen, i.e., when some volume is settled as part of a CoW and not by routing through an AMM. This rule is often referenced as "EBBO" (Ethereum Best Bid and Offer)

- Inflation of the objective function ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Using tokens for the sole purpose of inflating the objective value or maximizing the reward is forbidden (e.g., by creating fake tokens, or wash-trading with real tokens).

- Illegal use of internal buffers ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). The internal buffers may only be used to replace legitimate AMM interactions available to the general public for the purpose of saving transaction costs, and also to allow for the successful execution of settlements that occur some slippage. However, systematic and intentional buffer trading with tokens that are not safe, although will be accounted for as slippage, is discouraged as it poses a significant inventory risk to the protocol, and solvers that do so can be flagged and potentially slashed. In general, any attack vector to the internal buffers that is created by a solver can be considered a malicious and illegal behavior.

- Local Token Conservation, aka illegal surplus shifts ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Due to the nature of batching, a solver can intentionally transfer surplus among orders that share a common token. This is not allowed, and non-trivial surplus shifts can be penalized and can lead to solver slashing.

- Pennying/overbidding ([CIP-13](https://snapshot.org/#/cow.eth/proposal/0x812273c78abe1cea303d8381e1fb901a4cb701715fd24f4b769d0a0b3779b3e2)). Pennying or the evolution of it in the context of CIP-20 known as overbidding, is the intentional inflation of the surplus, or the reported score, by a solver, with the hope that their solution will win and that solver rewards, and/or the possibility of positive slippage, will cover the loss that they seem to be committing to. Such behavior does not benefit anyone and thus, systematically doing so can lead to solver slashing.

- Other malicious behavior ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)).

  Malicious solver behavior is not limited to the above examples. Slashing can still happen for other reasons where there is intentional harm caused to the user and/or the protocol at the discretion of the CoW DAO. A concrete example of such is a solver intentionally not including the [pre/post hooks](/cow-protocol/reference/core/intents/hooks) associated with an order.

