---
sidebar_position: 3
---

# Solver rewards

The protocol is currently subsidizing the solver competition on Ethereum Mainnet (but not on Gnosis Chain), by rewarding solvers on a weekly basis (currently, every Tuesday) with rewards paid in COW. Solvers are rewarded based on their performance as solvers (i.e. when participating in the standard solver competition) as specified by [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f), [CIP-36](https://snapshot.org/#/cow.eth/proposal/0x4e58f9c1208121c0e06282b5541b458bc8c8b76090263e25448848f3194df986), and [CIP-38](https://snapshot.org/#/cow.eth/proposal/0xfb81daea9be89f4f1c251d53fd9d1481129b97c6f38caaddc42af7f3ce5a52ec). Solver rewards for participating in the price estimation competition and providing quotes that are needed for the gas estimates and limit price computations of market orders are specified in [CIP-27](https://snapshot.org/#/cow.eth/proposal/0x64e061568e86e8d2eec344d4a892e4126172b992cabe59a0b24c51c4c7e6cc33) and [CIP-36](https://snapshot.org/#/cow.eth/proposal/0x4e58f9c1208121c0e06282b5541b458bc8c8b76090263e25448848f3194df986).

The annual rewards budget as of now is 16M COW, and the intended split between solver competition and price estimation rewards is currently 80% for the solver competition (12.8M COW) and 20% for the price estimation competition (3.2M COW).

:::note

For the interested reader, the main source of truth for the weekly payments to solvers is this [Dune dashboard](https://dune.com/cowprotocol/cow-solver-rewards?StartTime=2023-11-28+00%3A00%3A00&EndTime=2023-12-05+00%3A00%3A00&EndTime_d3bba3=2023-12-05+00%3A00%3A00&EndTime_dd004a=2023-12-05+00%3A00%3A00&StartTime_d3f009=2023-11-28+00%3A00%3A00). The dashboard is populated with data aggregated by scripts within the [solver-rewards](https://github.com/cowprotocol/solver-rewards) and [dune-sync](https://github.com/cowprotocol/dune-sync/) repositories.

:::

## Solver competition rewards (CIP-20 & CIP-36 & CIP-38)

Solver competition rewards are split into two components: per-auction rewards and consistency rewards. 

### Per-auction rewards

The per-auction rewards are computed using a mechanism akin to a second-price auction. First, each solver commits a solution, which includes a price vector and a list of trades to execute. The solver proposing the solution with the highest quality wins the right to settle their submitted solution on chain, where quality is the sum of surplus delivered to users and fees paid to the protocol.

:::note

From the protocol's perspective, the solution executed on chain must equal the solver's initial commitment.

:::

The payment to the winning solver is

$$
\textrm{payment} = \textrm{cap}(\textrm{observedQuality} - \textrm{referenceQuality}).
$$

Here, $$\textrm{referenceQuality}$$ refers to the quality of the second-best solution, and $$\textrm{observedQuality}$$ denotes the settlement's quality as observed on chain. More precisely, in case of a successful settlement, the $$\textrm{observedQuality}$$ is equal to the sum of the surplus generated for users and fees paid to the protocol, while in the case of a failed settlement (e.g. one that reverted), the $$\textrm{observedQuality}$$ is zero.

:::note

The payment calculation can result in a negative figure, in which case the solver is required to pay the amount to the protocol.

:::

The payment is capped from above and below using the function $$\textrm{cap}(x) = \max(-c_l, \min(c_u, x))$$ with $$c_l = 0.010 \;\textrm{ETH}$$ and $$c_u = 0.012 \;\textrm{ETH}$$.

Submitted scores that are non-positive will be ignored. If only one solution is submitted, $$\textrm{referenceQuality}$$ is set to zero. Formally, this corresponds to always considering the empty solution which does not settle any trades and has quality zero as part of the submitted solutions. 

:::note

There is no guarantee that the per-auction rewards are greater than the gas costs of executing a transaction. Hence, solvers cover these costs by adjusting their reported quality. Of course, a solver who adjusts quality downward too aggressively is then at a disadvantage in the auction. The mechanism, therefore, incentivizes the accurate estimation of gas costs.

:::


### Specification of consistency rewards

Besides the per-auction rewards, solvers are rewarded for their consistency by distributing some additional COW proportionally to the number of auctions for which they provided valid solutions, up to a cap in ETH. As already mentioned, CoW Protocol has committed to spending a specified quantity of COW tokens to reward solvers: an estimated 12.8M COW annual budget is currently allocated for the solver competition rewards in Ethereum, corresponding to an average weekly budget of ~250k COW. Hence, suppose that the total per-auction rewards have been determined and expressed in COW and amount to $$X$$ of COW, as described above. Then, if $$X < 250,000$$, the budget that will be distributed as consistency rewards is $$\min\{250,000 - X \textrm{ COW}, 6 \textrm{ ETH} \}$$, where again, to compare the two quantities, we use an up-to-date price.

### Additional solver costs (slippage)

In addition to paying for gas, the winning solver might incur additional costs, such as, for example, negative slippage once a solution is settled on chain. These costs are not an explicit element of the mechanism, but they are relevant in determining the solver's optimal strategy. More precisely, per [CIP-17](https://snapshot.org/#/cow.eth/proposal/0xf9c98a2710dc72c906bbeab9b8fe169c1ed2e9af6a67776cc29b8b4eb44d0fb2), solvers are responsible for managing potential slippage incurred by the settlements they settle. This is a component that affects payouts, but can be treated completely separately, and we do so in [slippage accounting](slippage).

### Solver bidding strategies

After finding optimal routes, solvers must decide what solution to report. Call $$\textrm{successQuality}$$ the quality of the reported solution, which the solver can freely choose as long as it is smaller than some theoretical maximum, which we call $$\textrm{maxQuality}$$, with $$\textrm{maxQuality} - \textrm{successQuality} $$ constituting revenues to the solver.

Suppose $$c_u$$ is large and can be ignored. In this case, the winning solver's expected payoff is

$$
p  (\textrm{maxQuality} - \textrm{referenceQuality} - \textrm{successCost}) - (1 - p)  (\min(c_l,\textrm{referenceQuality}) + \textrm{failCost}).
$$

The key observation is that $$\textrm{successQuality}$$ doesn't affect the expected payoff in case of a win, and it only affects whether the solver wins. In particular, note that the above expression is strictly decreasing in $$\textrm{referenceQuality}$$. Hence, by choosing $$\textrm{successQuality}$$ such that

$$
p \cdot (\textrm{maxQuality} - \textrm{successQuality}- \textrm{successCost}) - (1 - p) \cdot (\min(c_l,\textrm{successQuality}) + \textrm{failCost})=0
$$

a solver wins if and only if $$\textrm{referenceQuality}$$ is such that the solver's expected profit from winning is strictly positive. Note that the above equation either has no solution (in which case a solver shouldn't participate in the auction) or it has a unique solution. Such a solution is simple to compute and, in a second-price logic, does not depend on the behavior of other solvers.

The presence of the cap on rewards $$c_u$$, however, makes the problem more complex as it introduces a "first-price auction" logic: if the difference between the best and second-best solution is very large, then the winning solver wins more when it underreports its quality. However, determining the optimal amount of underreporting is very complex, and requires each solver to make strong assumptions regarding the performance of competing solvers.

To summarize, there is a simple strategy that guarantees positive expected profits to solvers. This strategy may not be optimal in uncompetitive auctions when the difference between the best and second best solution may be large. However, in these cases, deriving the optimal strategy is a very complex problem. We conclude by noting that most CoW Protocol batches are very competitive: the cap of on rewards is binding only in about 9% of auctions. 

## Price estimation competition rewards (CIP-27)

The price estimation competition is a separate competition where solvers compete to provide the best response to a quote request. Quote requests look almost identical to single-order batch auctions, where there is only one order with a trivial limit price, and solvers propose executions of this order with the goal to maximize "out amount minus gas costs", in the case of a sell request, or minimize "in amount + gas costs" in the case of a buy request.

As specified in [CIP-27](https://snapshot.org/#/cow.eth/proposal/0x64e061568e86e8d2eec344d4a892e4126172b992cabe59a0b24c51c4c7e6cc33) and [CIP-36](https://snapshot.org/#/cow.eth/proposal/0x4e58f9c1208121c0e06282b5541b458bc8c8b76090263e25448848f3194df986), solvers that participate in the price estimation competition are rewarded for each order that is within the market price, is associated with a quote that was computed as part of the price estimation competition, and was used in order to compute the limit price of the order. The protocol keeps track of the quote associated with each created order and the corresponding solver that provided the quote. If and when the order gets executed, the solver that provided the quote (which can be different than the solver that ended up executing the order) gets rewarded with $$min{0.0006 ETH, 6 COW}$$ where, again, the conversion from ETH to COW is done by using an up-to-date price.
