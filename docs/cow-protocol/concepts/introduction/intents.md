
---
sidebar_position: 1
---

# Intents

An intent specifies the conditions under which an order may be settled.

In the standard order flow, a user authorises an order by signing a message rather than submitting an on-chain swap transaction.

An intent does not itself transfer tokens or complete a swap.

Solver participants can construct candidate settlement solutions that satisfy the conditions of authorised orders. The Settlement contract verifies the relevant on-chain conditions before processing a settlement.

## Order conditions

An order specifies the assets and economic conditions applicable to its settlement.

Depending on the order type, these can include:

- the sell token and buy token;
- the sell amount and buy amount;
- whether the order is a sell or buy order;
- the applicable limit;
- the validity period;
- the receiver;
- whether partial fills are permitted; and
- additional order parameters.

For a sell order, the signed amounts define the amount to sell and the minimum amount to receive, subject to the applicable fee rules.

For a buy order, they define the amount to receive and the maximum amount to sell, subject to the applicable fee rules.

The authorised order can also contain additional data, such as `appData`.

Not every field or rule is independently enforced by the Settlement contract. Some requirements are applied through the off-chain infrastructure or other contract mechanisms.

See [Settlement contract](/cow-protocol/reference/contracts/core/settlement) for the conditions enforced on-chain.

## Authorising an intent

CoW Protocol supports different methods of authorising orders.

These include:

- `EIP-712` and `eth_sign` signatures for externally owned accounts;
- `ERC-1271` signature validation for smart-contract accounts; and
- `PreSign`, which records order authorisation on-chain.

The applicable authorisation method depends on the wallet and order type.

Authorising an order does not by itself grant the Settlement contract access to the user's tokens. The relevant token allowance or other supported balance mechanism must also be available when settlement occurs.

See [Signing schemes](/cow-protocol/reference/core/signing-schemes) for technical details.

## How intents are used

A typical auction-based order follows these steps:

1. The user creates and authorises an order.
2. The order becomes available to the off-chain order infrastructure.
3. An eligible order can be included in an auction instance.
4. Solver engines compute candidate settlement solutions.
5. The competition mechanism evaluates eligible solutions under the applicable rules.
6. A driver associated with a selected solution can submit the corresponding settlement transaction.
7. The Settlement contract verifies the applicable authorisation and order conditions and processes the transaction if those conditions are satisfied.

Some supported order types use a different submission or settlement process.

For example, fast-path orders can follow a settlement path outside the regular solver competition.

See [Flow of an order](../how-it-works/flow-of-an-order).

## Transaction construction

Solver participants can make technical and economic choices when constructing candidate solutions.

A solution can:

- match compatible orders;
- use one or more external liquidity sources;
- use liquidity available to the solver;
- combine compatible orders in one settlement; and
- include other permitted interactions.

These choices determine how a candidate settlement is constructed.

They do not change the conditions contained in the authorised order. A successful settlement must satisfy the conditions enforced by the relevant contracts.

See [Solvers](./solvers) for more information about solver participation and solution construction.

## Settlement

Authorising an intent does not guarantee settlement.

An order can remain unfilled if no eligible solution includes it or if a proposed settlement cannot be completed.

An order can also expire or be cancelled before settlement.

For a successful on-chain settlement, the Settlement contract verifies the applicable order conditions and processes the relevant token transfers and interactions.

The contract enforces the supported order constraints. Additional requirements can apply under the off-chain competition rules.

## Related documentation

- [Solvers](./solvers)
- [Fair combinatorial batch auction](./fair-combinatorial-auction)
- [Flow of an order](../how-it-works/flow-of-an-order)
- [How intents are formed](../how-it-works/how-intents-are-formed)
- [Signing schemes](/cow-protocol/reference/core/signing-schemes)
- [Order types](/cow-protocol/concepts/order-types)
