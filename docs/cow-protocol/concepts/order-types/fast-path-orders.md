---
sidebar_position: 9
description: Fast-path orders settle out of competition for faster execution. What they are, when to use them, and how to opt in.
---

# Fast-path orders

On CoW Protocol, orders aren't settled one at a time. They are collected and
solved together in a fair combinatorial auction: in each auction, the protocol
gathers the orders that are ready, solvers compete for the best execution on each
directed token pair, and the winning solutions are submitted on-chain. Solving
orders within an auction is what earns users the best prices, since solvers can
match trades directly against one another (a
[coincidence of wants](../how-it-works/coincidence-of-wants)) and compete on the
surplus they find. The tradeoff is time: putting a (batched) solution together
in every auction means an order waits for the next auction before it settles.

But sometimes speed matters more than the potential benefits of batching. A user
might want their order filled as quickly as possible, still at a fair price with
their limit respected, without waiting for the whole auction cycle and the next
auction to settle. That is what a fast-path order is for. The limit price is still
respected for settling the order; they simply trade the extra surplus a fully
fledged auction can potentially provide for a faster settlement.

A fast-path order reuses the quote the user already holds. Quotes go through
their own solver competition, and the winning quote is the one presented to the
user to sign. Once signed, the solver that provided the winning quote gets the
exclusive right to settle the order on-chain, using the solution it already
produced, within a short window.

## The flow

Fast path is decided at the quote stage, and the order settles in a few steps:

1. The user requests a quote with fast path enabled.
2. Solvers compete for it, and the winning quote is returned to the user.
3. The user signs that quote and places the order.
4. The winning solver settles it directly, outside of a standard auction, within a short
   exclusivity window set by the protocol.
5. If the window passes without a settlement, the order joins the next
   auction like any other order.

The exclusivity window on a fast-path order is set by the protocol.
`validFrom` and fast path are mutually exclusive. `validFrom` sets when a regular
order becomes eligible to enter the auction cycle, whereas fast path settles
right after placement, so a fast-path order ignores `validFrom`.

## Enabling fast path

Fast path is opt-in and changes nothing else about your order. Two things have to
line up:

1. **You opt in.** Set `enableFastPath` in the order's
   [`appData`](/cow-protocol/reference/core/intents/app-data). It is signed with
   the order, so without it an order is never fast-pathed.
2. **A fast-path-capable solver wins the quote.** Solvers choose whether to
   support fast path, and a solver that can't settle quickly enough simply
   doesn't offer fast-path quotes. A solver that does offer one is committing to
   it: if that quote wins and you sign it, the solver must settle on-chain within
   the window, and the protocol holds it accountable for doing so. If it doesn't,
   the order falls back to the normal auction and nothing is lost.

If both hold, the order is fast-pathed. Otherwise it settles through the normal
auction.

## Which orders can use fast path

Fast path only fits orders that are ready to settle the moment they are placed.

- **Market (fill-or-kill) orders.** Partially fillable orders are not fast-pathed.
- **No pre-signed or smart-contract (ERC-1271) orders.** Pre-signed and ERC-1271
  orders aren't ready to settle right after placement, so the fast path can't
  complete before the window closes.
- **Place it against the fast-path quote you received, unchanged.** An order that
  doesn't match a fast-path quote, for example one with a different limit price,
  won't be fast-pathed and settles through the normal auction instead.

If an order can't use fast path for any of these reasons, nothing breaks: it just
settles the normal way, through the auction.
