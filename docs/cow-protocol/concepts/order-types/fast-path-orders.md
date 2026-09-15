---
sidebar_position: 9
description: Fast-path orders settle out of competition for faster execution. What they are, when to use them, and how to opt in.
---

# Fast-path orders

On CoW Protocol, orders aren't settled one at a time. They're collected and
solved together in a batch auction: each cycle, the protocol gathers the orders
that are ready, solvers compete to settle the whole batch, and the winning
solution is submitted on-chain. Solving orders as a batch is what earns users
the best prices, since solvers can match trades directly against one another (a
[coincidence of wants](../how-it-works/coincidence-of-wants)) and compete on the
surplus they find. The tradeoff is time: putting a batch together
every cycle means an order waits for the next auction before it settles.

But sometimes speed matters more than surplus. A user might want their order
filled as quickly as possible, still at a fair price with their limit respected,
without waiting for the whole auction cycle and the next batch to settle. That is
what a fast-path order is for. The limit price is still respected for settling the
order; they simply trade the extra surplus a batch can find for a faster settlement.

A fast-path order reuses the quote the user already holds. Quotes go through
their own solver competition, and the winning quote is the one presented to the
user to sign. Once signed, that solver gets the exclusive right to settle the
order on-chain, using the solution it already produced, within a short window.


## The flow

Fast path is decided at the quote stage, and the order settles in a few steps:

1. The user requests a quote with fast path enabled.
2. Solvers compete for it, and the winning quote is returned to the user.
3. The user signs that quote and places the order.
4. The winning solver settles it directly, outside the batch, within a short
   exclusivity window set by the protocol.
5. If the window passes without a settlement, the order joins the next batch
   auction like any other order.

The exclusivity window on a fast-path order is set by the protocol, not by you.
`validFrom` and fast path are mutually exclusive: set `validFrom` (in the order's
`appData`) for a "wait for CoW" order that only becomes solvable at a time you pick,
or opt into fast path for out-of-competition settlement, but not both. A fast-path
order ignores `validFrom`.

## Enabling fast path

Fast path is opt-in and changes nothing else about your order. Two things have to
line up:

1. **You opt in.** Set `enableFastPath` in the order's
   [`appData`](/cow-protocol/reference/core/intents/app-data). It is signed with
   the order, so without it an order is never fast-pathed.
2. **A supporting solver wins the quote.** Set `fastPath` on your `/quote`
   request. The order is fast-pathed only if the winning quote comes from a
   solver that supports it, which the protocol works out during the quote.

If both hold, the order is fast-pathed. Otherwise it settles through the normal
batch auction. The `fastPath` request field is in the
[Order Book API reference](/cow-protocol/reference/apis/orderbook).

## Which orders can use fast path

Fast path only fits orders that are ready to settle the moment they are placed.

- **Market (fill-or-kill) orders.** Partially fillable orders are not fast-pathed.
- **No pre-signed or smart-contract (ERC-1271) orders.** Pre-signed and ERC-1271
  orders aren't ready to settle right after placement, so the fast path can't
  complete before the window closes.
- **Place it against the fast-path quote you received, unchanged.** An order that
  doesn't match a fast-path quote, for example one with a different limit price,
  won't be fast-pathed and settles through the normal batch auction instead.

If an order can't use fast path for any of these reasons, nothing breaks: it just
settles the normal way, through the batch auction.
