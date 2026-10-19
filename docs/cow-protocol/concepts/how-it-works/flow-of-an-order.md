
---
sidebar_position: 1
---

# Flow of an order

A CoW Protocol order specifies the conditions under which a token swap may be settled.

In the standard auction-based flow, an authorised order is made available to the off-chain auction infrastructure. Solver participants propose settlement solutions, and selected solutions can be submitted for on-chain settlement.

The following steps describe the main components and their functions.

## 1. The user authorises an order

The user creates an order specifying the assets, amounts and other conditions under which it may be settled.

In the standard flow, the user signs an intent rather than submitting an on-chain swap transaction.

CoW Protocol also supports other authorisation methods, including smart-contract signature validation and on-chain pre-signing.

Authorising an order does not itself transfer tokens or complete a swap.

See [Intents](../introduction/intents) and [Signing schemes](/cow-protocol/reference/core/signing-schemes).

## 2. The order becomes eligible for an auction

The Orderbook receives and stores order information used by the off-chain infrastructure.

The Autopilot obtains order data and relevant blockchain information to construct auction instances.

Before including an order, the Autopilot checks its eligibility using available information, including applicable validity, balance, allowance and authorisation conditions.

These checks do not guarantee that the order can be settled.

An order that remains active and has not been fully filled can be considered in later auctions, subject to its continued eligibility.

See [Orderbook](/cow-protocol/tutorials/arbitrate/orderbook) and [Autopilot](/cow-protocol/tutorials/arbitrate/autopilot).

## 3. Solver participants propose solutions

The auction data is sent to participating solver infrastructure.

In the reference implementation, a driver prepares the auction data and forwards it to a solver engine.

The solver engine computes candidate settlement solutions.

A candidate solution can:

- include one or more eligible orders;
- match compatible orders through a Coincidence of Wants;
- use external or solver-provided liquidity; and
- include other permitted settlement interactions.

The driver processes the resulting solutions and can simulate proposed transactions before returning solution information to the auction infrastructure.

The solver determines how to construct its candidate solution. A successful settlement must still satisfy the order conditions enforced by the relevant smart contracts.

See [Solvers](../introduction/solvers).

## 4. The competition selects eligible solutions

Candidate solutions are evaluated under the applicable competition rules.

The Fair Combinatorial Auction applies scoring, fairness and compatibility requirements to select eligible solutions.

One or more solutions can be selected in an auction.

Selection does not itself settle any order. It also does not guarantee that every eligible order will be included in a selected solution.

See [Fair combinatorial batch auction](../introduction/fair-combinatorial-auction) and [Solver competition rules](/cow-protocol/reference/core/auctions/competition-rules).

## 5. A driver submits a selected settlement transaction

For a selected solution, the corresponding driver can prepare and submit a settlement transaction.

Depending on its implementation and configuration, the driver can simulate the transaction and use an appropriate transaction-submission strategy.

Where multiple solutions are selected, the corresponding settlements can be submitted in separate transactions.

Submission does not guarantee transaction inclusion or successful settlement.

## 6. The smart contracts process the settlement

The Settlement contract restricts access to its settlement function to authorised callers.

When a settlement transaction is processed on-chain, the contract verifies the applicable order authorisation, validity, fill and economic conditions.

The settlement process uses the Vault Relayer to transfer permitted user sell tokens through the supported balance mechanisms.

The Settlement contract also processes the interactions required by the submitted settlement, including any applicable liquidity interactions.

For a successful settlement, the order proceeds are delivered to the applicable receiver or credited through the supported balance mechanism.

If the settlement transaction reverts, its state changes are reverted and the settlement does not complete.

See [Settlement contract](/cow-protocol/reference/contracts/core/settlement) and [Vault Relayer](/cow-protocol/reference/contracts/core/vault-relayer).

## Settlement conditions and limitations

The settlement contracts enforce specific conditions contained in or derived from authorised orders.

Other requirements, including certain competition and settlement-submission rules, are applied through off-chain infrastructure and monitoring mechanisms.

The auction and settlement architecture does not guarantee:

- that an eligible order will be settled;
- that a particular liquidity source will be available;
- that an order will receive a particular amount of price improvement; or
- that a submitted settlement transaction will be included on-chain.

An order can remain unfilled, be partially filled where permitted, expire or be cancelled.

For the precise on-chain conditions and competition requirements, see:

- [GPv2Settlement](/cow-protocol/reference/contracts/core/settlement)
- [Solver competition rules](/cow-protocol/reference/core/auctions/competition-rules)
