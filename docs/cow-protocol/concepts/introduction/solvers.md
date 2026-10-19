
---
sidebar_position: 2
---

# Solvers

Solvers participate in the CoW Protocol auction mechanism by constructing and proposing settlement solutions for eligible orders.

A solution specifies which orders can be included in a settlement, the proposed traded amounts and the interactions required to complete it.

The solver competition evaluates eligible solutions according to the applicable auction rules. One or more solutions can be selected for settlement.

![Solvers](/img/concepts/solvers.png)

## Solver components

The term **solver** can refer to a participant in the solver competition or to the software used by that participant.

The reference implementation separates solver software into two main components:

- **Solver engine:** Computes candidate settlement solutions using auction data and available liquidity.
- **Driver:** Connects the solver engine to the auction infrastructure. It prepares auction data, processes and simulates candidate solutions, and handles settlement transaction submission.

These components can also be modified, replaced or combined in a custom implementation.

When the distinction is relevant, this documentation identifies the specific component.

## How solver competition works

A typical auction follows these steps:

1. The Autopilot constructs an auction instance from eligible orders.
2. The auction data is sent to registered solver endpoints.
3. In the reference implementation, the driver preprocesses the auction data and forwards it to the solver engine.
4. The solver engine computes candidate solutions. The driver postprocesses and evaluates those solutions before returning solution data to the auction infrastructure.
5. The competition mechanism evaluates eligible solutions under the applicable scoring and selection rules.
6. A driver associated with a selected solution can submit the corresponding settlement transaction.
7. The Settlement contract verifies the applicable on-chain conditions and processes the transaction if those conditions are satisfied.

Selection in the competition does not itself transfer tokens or guarantee that a settlement transaction will succeed.

See [Auction mechanism](/cow-protocol/reference/core/auctions) for the selection and scoring rules.

## User-authorised order conditions

Users authorise orders through supported signing or authorisation mechanisms.

An order specifies the conditions under which it may be settled.

Solvers can determine how to construct candidate solutions. For example, they can choose liquidity sources, transaction routes and permitted contract interactions.

These choices do not allow a solver to change the conditions contained in a user's authorised order.

Depending on the order type, the relevant conditions can include:

- the sell token and buy token;
- the sell amount or buy amount;
- the limit price;
- the validity period;
- the receiver;
- whether partial fills are permitted; and
- other order parameters.

The Settlement contract enforces the relevant on-chain conditions. Additional requirements may apply under the off-chain competition rules.

See [Intents](./intents) for information about order parameters and authorisation.

## Token transfers and settlement

Solvers do not receive ERC-20 token approvals directly from users as part of the standard settlement process.

For orders using direct ERC-20 allowances, users approve the [Vault Relayer](/cow-protocol/reference/contracts/core/vault-relayer). Other supported balance and approval mechanisms are described in the Vault Relayer documentation.

During settlement, the [Settlement contract](/cow-protocol/reference/contracts/core/settlement) verifies the applicable order conditions.

The Settlement contract uses the Vault Relayer to transfer permitted user tokens as part of the settlement process.

The separation between the Settlement contract and the Vault Relayer prevents arbitrary settlement interactions from directly using the user's token approvals.

See the relevant smart-contract documentation for the precise permissions and enforced conditions.

## Solution construction

Solvers can use different methods to construct candidate solutions.

Depending on the auction and available liquidity, a solution can use:

- matching between compatible orders (Coincidence of Wants);
- external on-chain liquidity sources;
- liquidity provided or accessed by a solver; and
- other interactions permitted by the settlement and competition rules.

A solution can combine multiple orders and liquidity interactions within the same settlement.

The competition does not guarantee that every eligible order will settle or that a particular amount of price improvement will occur.

A proposed solution must meet the applicable competition requirements. Any resulting settlement transaction must also satisfy the conditions enforced on-chain.

## Solver participation

Anyone can develop software that implements the relevant solver interfaces.

Participation in the production solver competition is subject to the applicable eligibility, registration, bonding and technical requirements.

These requirements can differ depending on the bonding arrangement and the infrastructure used by the solver participant.

Settlement submission also requires the relevant contract-level authorisation.

See [Solver competition rules](/cow-protocol/reference/core/auctions/competition-rules) and [Solver onboarding](/cow-protocol/tutorials/solvers/onboard) for further information.

## Rewards and accounting

Solver participants may receive rewards under the applicable solver reward rules.

Settlement-related costs, reimbursements and adjustments are accounted for according to the applicable accounting rules.

See [Solver rewards](/cow-protocol/reference/core/auctions/rewards) and [Solver competition accounting](/cow-protocol/reference/core/auctions/accounting).

## Technical reference

For implementation details, see:

- [Driver](/cow-protocol/tutorials/arbitrate/solver/driver)
- [Solver Engine](/cow-protocol/tutorials/arbitrate/solver/solver-engine)
- [Auction mechanism](/cow-protocol/reference/core/auctions)
- [Solver competition rules](/cow-protocol/reference/core/auctions/competition-rules)
- [Settlement contract](/cow-protocol/reference/contracts/core/settlement)
- [Vault Relayer](/cow-protocol/reference/contracts/core/vault-relayer)
