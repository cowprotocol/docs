---
id: rewards
sidebar_position: 3
---

# Solver rewards

The protocol is currently subsidizing the solver competition on all chains it operates on, by rewarding solvers on a weekly basis (currently, every Tuesday) with rewards paid in COW. Solvers are rewarded based on their performance as solvers (i.e., when participating in the standard solver competition) as specified by [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f), [CIP-36](https://snapshot.org/#/cow.eth/proposal/0x4e58f9c1208121c0e06282b5541b458bc8c8b76090263e25448848f3194df986), [CIP-38](https://snapshot.org/#/cow.eth/proposal/0xfb81daea9be89f4f1c251d53fd9d1481129b97c6f38caaddc42af7f3ce5a52ec), [CIP-48](https://snapshot.org/#/cow.eth/proposal/0x563ab9a66265ad72c47a8e55f620f927685dd07d4d49f6d1812905c683f05805) [CIP-57](https://snapshot.box/#/s:cow.eth/proposal/0x46d4fea1492207cf400fcb7a01141a7d4c730791d658cc77236941fc9eb7dccb), [CIP-67](https://snapshot.box/#/s:cow.eth/proposal/0xf9ecb08c4738f04c4525373d6b78085d16635f86adacd1b8ea77b2c176c99d32) and [CIP-74](https://snapshot.org/#/s:cow.eth/proposal/0x0c70c8cd92accee872b52614b4fa10e3e3214f45c5b6857f7e88e910607a3c1d). Solver rewards for participating in the price estimation competition and providing quotes that are needed for the gas estimates and limit price computations of market orders are specified in [CIP-27](https://snapshot.org/#/cow.eth/proposal/0x64e061568e86e8d2eec344d4a892e4126172b992cabe59a0b24c51c4c7e6cc33), [CIP-36](https://snapshot.org/#/cow.eth/proposal/0x4e58f9c1208121c0e06282b5541b458bc8c8b76090263e25448848f3194df986), [CIP-57](https://snapshot.box/#/s:cow.eth/proposal/0x46d4fea1492207cf400fcb7a01141a7d4c730791d658cc77236941fc9eb7dccb), and [CIP-72](https://snapshot.box/#/s:cow.eth/proposal/0xc1b1252f0c99126b4e09730022faa31a7bb58073a3dc064c19b74d44164c39a7).

:::note

For the interested reader, the main source of truth for the weekly payments to solvers is this [Dune dashboard](https://dune.com/cowprotocol/cow-solver-rewards). The dashboard is populated with data aggregated by scripts within the [solver-rewards](https://github.com/cowprotocol/solver-rewards) repository.

:::

## Solver competition rewards (CIPs 20, 36, 38, 48, 57, 67, 74)

Solver rewards are computed using a mechanism akin to a Vickrey–Clarke–Groves mechanism (a generalization of a second-price auction to combinatorial auctions). First, each solver proposes multiple solutions. Each solution contains a price vector and a list of trades to execute, which can be used to compute the solution's score. The protocol then selects the winning solutions (and winning solvers) using a fair combinatorial auction, which first filters out the solutions deemed unfair and then selects the combination of fair solutions that maximizes the total score of the auction (see [here](competition-rules#off-chain-protocol) for more details).

:::note

From the protocol's perspective, a solution as executed on chain must equal the solution as submitted at the bidding stage.

:::

The payment to the winning solver $$i$$ is

$$
\textrm{payment}_i = \textrm{cap}(\textrm{totalScore} - \textrm{referenceScore}_i-\textrm{missingScore}_i).
$$

Here $$\textrm{totalScore}$$ is the sum of the scores of all winning solutions in the auction and $$\textrm{missingScore}_i$$ is the sum of the scores of solver $$i$$'s winning solutions that reverted. Finally, $$\textrm{referenceScore}_i$$ is the total score of a counterfactual auction in which all bids from solver $$i$$ are removed from the set of bids that survive the fairness filtering.

:::note

The payment calculation can result in a negative figure, in which case the solver is required to pay the protocol.

:::

The payment is capped from above and below using the function $$\textrm{cap}(x) = \max(-c_l, \min(c_u, x))$$, where $$c_u$$ is the protocol fee (excluding partner fees) that the protocol earned from the trades in all solutions supplied by the solver in that auction and $$c_l$$ is chain-specific, determined by the following values:

- Ethereum mainnet, Arbitrum, Base and Ink chain: $$0.010 \;\textrm{ETH}$$
- Gnosis Chain: $$10 \;\textrm{xDAI}$$
- Avalanche: $$0.3 \;\textrm{AVAX}$$
- Polygon: $$30 \;\textrm{POL}$$
- Lens: $$10 \;\textrm{GHO}$$
- BNB: $$0.04 \;\textrm{BNB}$$
- Linea: $$0.0015 \;\textrm{ETH}$$
- Plasma: $$30 \;\textrm{XPL}$$

If only one solver submits solutions, $$\textrm{referenceScore}_i$$ is, by definition, zero.

:::note

There is no guarantee that the per-auction rewards are greater than the costs of executing a transaction (due to, for example, gas costs). Hence, solvers cover these costs by adjusting their reported score. Of course, a solver who adjusts their score downward too aggressively is then at a disadvantage in the auction. The mechanism, therefore, incentivizes the accurate estimation of costs such as gas.

:::

### Buffer accounting

It is possible that the state of the external liquidity sources used as part of a solution changes between the bidding stage and the execution stage. We say that there is negative slippage when the solver's execution generates less than the expected amount, and positive slippage otherwise. In case of negative slippage the solver can utilize the buffers available in the settlement contract, while a solver can accumulate positive slippage in the settlement contract. Every week, the protocol computes a "net" slippage and either pays a solver (when it is positive) or requests a payment from a solver (when it is negative). For more information, see the [accounting section](/cow-protocol/reference/core/auctions/accounting).

Hence, although buffers and the possibility of using them are not an explicit element of the mechanism, they are nonetheless relevant in determining the solver's optimal strategy, because they allow a solver to average out positive and negative slippage over a period of time (vs. making sure to always produce at least as much as promised at the bidding stage).

### Solver's strategy

To determine the optimal routing, the recommended strategy for a solver is to start by dividing the available orders into groups of orders on the same directed token pairs - i.e., in each group, all orders have the same sell and buy tokens. The next step is to compute the best possible routing for each group and submit it as a solution. Note that, by construction, each of these solutions will use outside liquidity. Finally, a solver should check whether it is possible to improve these solutions by creating batched solutions containing orders on different directed token pairs. These additional efficiencies may come from, for example, exploiting liquidity already available on the protocol - using one order as liquidity for the other (in a CoW) or using CoW AMM liquidity - or from gas savings. Solvers should submit an additional solution for every combination of groups of orders for which additional efficiencies are possible. When submitting such a solution, they should pay attention to sharing the additional efficiencies among all orders in the batch; otherwise, the batched solution may be filtered out as unfair.

As already discussed, solvers are responsible for paying the gas cost of a solution. Also, if a solution reverts, a solver may incur a penalty. Hence, when reporting their solution, solvers should adjust their reported score to account for the expected costs of settling a solution on the chain and the revert risk.

With respect to optimal bidding, note that the protocol rewards allow a solver to participate in an auction without misreporting the score they can generate (net of expected costs). This is easy to see if the cap is not binding, and misreporting does not affect $$\textrm{referenceScore}_i$$. Then, by reducing the reported score of a solution, solver $$i$$ does not affect its payoff if this solution is among the winners (which only shifts from protocol rewards to positive slippage), while reducing the probability that this solution is a winner. It is therefore a dominant strategy to bid truthfully.

The presence of the cap on rewards $$c_u$$, however, makes the problem more complex as it introduces a "first-price auction" logic: if the difference between the best and second-best solution is very large, then the winning solver wins more when it underreports its score. The filtering step of the fair combinatorial auction also makes this problem more complex, because there are some edge cases in which by reducing the score of a solution, solver $i$ can benefit by making the filtering steps less stringent for its opponents (see [here](https://forum.cow.fi/t/combinatorial-auctions-from-theory-to-practice-via-some-more-theory-about-rewards/2877) for a discussion). However, determining the optimal amount of underreporting is very complex and requires each solver to make strong assumptions regarding the performance of competing solvers.

To summarize, truthfully revealing the (cost-adjusted) score that a solver can generate for each submitted solution is optimal if the cap is not binding, and misreporting does not affect $$\textrm{referenceScore}_i$$. It is not necessarily optimal in uncompetitive auctions when the difference between the best and second-best solution may be large, and in some edge cases in which a solver may benefit from making the filtering step less stringent. However, in these cases, deriving the optimal strategy is a very complex problem. We conclude by noting that most CoW Protocol batches are very competitive - at the time of writing (November 2025) the cap on rewards is binding only in about 9% of auctions - and that a solver benefits by making the filtering steps less stringent for its opponents only in sporadic cases.

## Price estimation competition rewards (CIPs 27, 36, 57, 72)

The price estimation competition is a separate competition where solvers provide the best response to a quote request. Quote requests look almost identical to single-order batch auctions, where there is only one order with a trivial limit price, and solvers propose executions of this order with the goal to maximize "out amount minus gas costs" in the case of a sell request, or minimize "in amount + gas costs" in the case of a buy request.

As specified in [CIP-27](https://snapshot.org/#/cow.eth/proposal/0x64e061568e86e8d2eec344d4a892e4126172b992cabe59a0b24c51c4c7e6cc33), [CIP-36](https://snapshot.org/#/cow.eth/proposal/0x4e58f9c1208121c0e06282b5541b458bc8c8b76090263e25448848f3194df986) [CIP-57](https://snapshot.box/#/s:cow.eth/proposal/0x46d4fea1492207cf400fcb7a01141a7d4c730791d658cc77236941fc9eb7dccb), and [CIP-72](https://snapshot.box/#/s:cow.eth/proposal/0xc1b1252f0c99126b4e09730022faa31a7bb58073a3dc064c19b74d44164c39a7), a solver that provides the best quote to an order that is then submitted is rewarded if and only if all of the following conditions are satisfied:

1. The order is a fill-or-kill market order;
2. The quote is verified (i.e., its calldata successfully simulated in the autopilot);
3. The order was executed (not necessarily by the quoting solver);
4. The solver that provided the winning quote during order creation proposed an execution of the order (in at least one auction) that is at least as good as the quote, and that execution was not filtered out by the fairness filtering of the fair combinatorial auction mechanism.

The current rewards for eligible quotes are as follows:

- Ethereum mainnet: $$\min\{0.0007 ~\textrm{ETH}, 6 ~\textrm{COW}\}$$,
- Gnosis Chain: $$\min\{0.15 ~\textrm{xDAI}, 6 ~\textrm{COW}\}$$,
- Arbitrum: $$\min\{0.00024 ~\textrm{ETH}, 6 ~\textrm{COW}\}$$,
- Base Chain: $$\min\{0.00024 ~\textrm{ETH}, 6 ~\textrm{COW}\}$$,
- Avalanche-C Chain: $$\min\{0.006 ~\textrm{AVAX}, 6 ~\textrm{COW}\}$$,
- Polygon Chain: $$\min\{0.6 ~\textrm{POL}, 6 ~\textrm{COW}\}$$
- Lens Chain: $$\min\{0.15 ~\textrm{GHO}, 6 ~\textrm{COW}\}$$
- BNB Chain: $$\min\{0.001 ~\textrm{BNB}, 6 ~\textrm{COW}\}$$
- Linea: $$\min\{0.00003 ~\textrm{ETH}, 6 ~\textrm{COW}\}$$.
- Plasma: $$\min\{0.6 ~\textrm{XPL}, 6 ~\textrm{COW}\}$$.
- Ink: $$\min\{X.X ~\textrm{XPL}, 6 ~\textrm{COW}\}$$.

where, again, the conversion from native token to COW is done by using an up-to-date price (specifically, the average native token/COW Dune prices of the past 24h before the payout are used to determine these exchange rates).
