# Solver Auction and Rewards

As specified in [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f), solver rewards are split into two components: per-auction rewards and consistency rewards.

The auction's goal is to reward solvers based on how much value they provide to the users. For every batch, solvers compete by proposing a solution to settle the batch, and the winning solver receives a reward that is part in ETH and part in COW (see below).&#x20;

CoW Protocol has committed to spending a certain amount of COW to reward solvers; this amount will be updated every six months. The part of the rewards budget in COW that is not spent on per-auction rewards is used for consistency rewards. Consistency rewards are distributed weekly to each solver in proportion to the number of valid solutions submitted during the previous week.

### Specification of per-auction rewards

The per-auction rewards are computed using a mechanism akin to a second-price auction. First, each solver commits to a numerical score and a solution (which includes a price vector and a list of trades to execute). The solver with the highest score wins the right to settle their submitted solution on chain. Note that, from the protocol perspective, the solution executed on chain must equal the solver's initial commitment. Finally, the payment to the winning solver is:

$$
\textrm\{payment\} = \textrm\{cap\}(\textrm\{observedQuality\} - \textrm\{referenceScore\}).
$$

Here, $$\textrm\{referenceScore\}$$ is the second-highest submitted $$\textrm\{score\}$$, and $$\textrm\{observedQuality\}$$ is the settlement's "quality", as observed on chain. More precisely, in case of a successful settlement, the $$\textrm\{observedQuality\}$$ is equal to the sum of the surplus generated for users and fees paid to the protocol, while in the case of a failed settlement (e.g., one that reverted), the $$\textrm\{observedQuality\}$$ is zero. Note that the payment can end up being negative, in which case the solver pays the protocol.

The payment is capped from above and below using the function $$\textrm\{cap\}(x) = \max(-c, \min(c + \textrm\{observedCost\}, x))$$ with $$c = 0.01 \;\textrm\{ETH\}$$, where $$\textrm\{observedCost\}$$ is the gas cost of executing the settlement (which the solver pays).

Submitted scores that are non-positive will be ignored; this is enforced by always considering the empty solution, that has zero score. This also implies that, for an auction with only one submitted solution (from a solver), the reward will be $$\textrm\{cap\}(\textrm\{observedQuality\})$$, since the $$\textrm\{referenceScore\}$$ is zero in this case.

Moreover, the score a solver reports is required to be smaller than the solution's $$\textrm\{successfulQuality\}$$, defined as the $$\textrm\{observedQuality\}$$ when the solution successfully executes. Since solvers are currently submitting the full solution along with their score, this is very easily checked; if the solution successfully settles on chain, its $$\textrm\{successfulQuality\}$$ is equal to the sum of the total surplus generated and the fees collected, and both are fully determined from the set of orders the solution intends to execute and the clearing price vector it reports.

Note that once we include the gas costs of executing a transaction, the winning solver's payoff is bounded above by $$c$$. However, it is not bounded below because, in case of a revert, the solver pays at most $$c$$ to the protocol and may also incur gas costs.

To limit currency mismatch, the solver receives $$\min(\textrm\{payment\}, \textrm\{observedCost\})$$ in ETH and $$\textrm\{payment\} - \min(\textrm\{payment\}, \textrm\{observedCost\})$$ in COW, using an up-to-date price. In other words, the solver payment is split into a gas reimbursement paid in ETH and a reward paid in COW.  To arrive at the budget for consistency rewards, these per-auction rewards paid in COW are deducted from the total rewards budget.

Finally, the winning solver may pay additional costs, such as, for example, negative slippage once a solution is implemented. These costs are not an explicit element of the mechanism, but they are relevant in determining the solver's optimal strategy. More precisely, per [CIP-17](https://snapshot.org/#/cow.eth/proposal/0xf9c98a2710dc72c906bbeab9b8fe169c1ed2e9af6a67776cc29b8b4eb44d0fb2), solvers are responsible for managing potential slippage incurred by the settlements they settle. This is a component that affects payouts, but can be treated completely separately, and we do so in [this](https://app.gitbook.com/o/-MhNTbohYqyGgzHCBv93/s/-MfcJLF8wcqI03lmTpn8/\~/changes/167/off-chain-services/in-depth-solver-specification/slippage-accounting) section.

### Solver bidding strategies

Apart from submitting their solutions, solvers must decide on a score to submit as a bid in the auction. In general, this score can be chosen freely by the solver (within the restriction $$0 < \textrm\{score\} < \textrm\{successfulQuality\}$$).

Let $$p$$ the probability that a solution successfully executes, let $$SC$$ be the costs that a solver pays if only if a solution successfully executes, and $$C$$ the costs that a solver pays independently of whether a solution executes. For example, variable costs could include potential negative slippage of an executed solution, while fixed costs could include gas costs that arise even for a reverted solution.

Ignoring capping, the winning solver's expected payoff is &#x20;

$$
p \cdot (\textrm\{successfulQuality\} - \textrm\{SC\})  - \textrm\{referenceScore\} - \textrm\{C\}.
$$

The optimal score is such that the solver wins if and only if it is profitable to do so, and is given by

$$
\textrm\{optimalScore\} = p \cdot (\textrm\{successfulQuality\} - \textrm\{SC\}) -\textrm\{C\}.
$$

Accounting for the cap, the winning solver's expected payoff is now

$$
p \cdot (\max(-c, \min(c + \textrm\{observedCost\}, \textrm\{successfulQuality\} - \textrm\{referenceScore\}) - \textrm\{SC\}) \\ - (1-p) \cdot \min(c, \textrm\{referenceScore\}) - \textrm\{C\}.
$$

If there is no value of $$\textrm\{referenceScore\}$$ such that the above expression is strictly positive, then a solver does not want to participate. If, instead, there are values of $$\textrm\{referenceScore\}$$ such that profits are strictly positive, then the logic discussed earlier continues to apply: each solver wants to win if and only if $$\textrm\{referenceScore\}$$ is such that profits are strictly positive. Since the above expression is monotonic decreasing in $$\textrm\{rereferenceScore\}$$, a solver should compute the $$\textrm\{referenceScore\}$$ such that the above expression is zero and submit that value as a score. Formally, the optimal score is now implicitly defined by

$$
p \cdot (\max(-c, min(c + \textrm\{observedCost\}, \textrm\{successfulQuality\} - \textrm\{optimalScore\}) - \textrm\{SC\}) \\ - (1-p) \cdot \min(c, \textrm\{optimalScore\}) - \textrm\{C\} = 0.
$$

The above equation always has a solution that is independent of $$\textrm\{referenceScore\}$$. This solution is, in general, unique (that is, unique except for very specific parameters, in which case the solution is a closed interval).
