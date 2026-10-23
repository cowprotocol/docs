---
id: fast-path
sidebar_position: 5
---

# Fast-path flow

Besides the usual auctions that take place at CoW Protocol, there is a special type of flow, called fast-path flow, where the competition among solvers is moved to the quoting stage. Specifically, there is a special flag in each quote request, named `enableFastPath`, that when enabled, implies the following. If this quote results in an order/intent being created, then the quoter that provided this winning quote is automatically declared winner of the solver competition. In such a case, the following flow is enabled:
1. Winning quoter receives a `/settle` call from the protocol, together with the exact amounts it needs to deliver on chain to the user.
2. If the winning quoter fails to execute the order onchain within the given deadline, the order enters the orderbook and becomes available in all future auctions that will be created (i.e., falls back to the usual flow)

One can view the above as a single-order auction that takes place at the quoting stage. This implies that all rules and accounting around auctions that were described in previous sections apply to such auctions as well. Spefically, each quote response in the quoting stage is treated as a bid in this single-order auction, and the winning quoter needs to execute their bid as is. Moreover, all other bids are used to compute the reference score, and reference score as well as rewards (in case the winning quoter executes the order onchain within the deadline) or penalties (in case the winning quote fails to execute the order onchain within the deadline) can be computed as in previous sections.

We note that currently the penalty cap for these fast-path orders is set to zero, and the settle deadline for fast-path auctions is:

- Mainnet: 1 block
- Gnosis chain: 1 block
- Arbitrum: 8 blocks
- Base: 1 block
- Avalanche: 2 blocks
- Polygon: 2 blocks
- BNB: 5 blocks
- Linea: 1 block
- Plasma: 2 blocks
- Ink: 2 blocks
