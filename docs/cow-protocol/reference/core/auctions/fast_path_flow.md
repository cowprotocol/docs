---
id: fast-path
sidebar_position: 5
---

# Fast-path flow

Besides the regular auctions, there is a [fast-path flow](/cow-protocol/concepts/order-types/fast-path-orders) in which the competition among solvers takes place at the quoting stage. A quote request can set the `enableFastPath` flag. If a user then signs an order that matches the winning quote and meets the [fast-path conditions](/cow-protocol/concepts/order-types/fast-path-orders#which-orders-can-use-fast-path), Autopilot selects the solver that provided the winning quote as the winner of the competition. In that case:
1. Right after the order is created, Autopilot calls the `/settle_fast_path` endpoint of that solver's driver, with the sell and buy amounts at which the order must be filled and the last block in which the settlement transaction can be included.
2. If no transaction filling the order is included on-chain by that block, the order becomes eligible for subsequent regular auctions, like any other order.

The fast-path flow can be viewed as a single-order auction held at the quoting stage, so the rules and accounting described in the previous sections apply to it. Each quote response is a bid in this auction, and the settlement transaction for the selected bid must fill the order at the amounts of that bid. All other bids are used to compute the reference score. Rewards (if the order is filled in a successful settlement transaction included by the deadline) and penalties (otherwise) are computed as described in the previous sections.

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
