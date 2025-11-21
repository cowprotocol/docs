---
id: the-problem
sidebar_position: 1
---

# What is solving? A matehmatical, high-level description

At a high level, a solver is an algorithm that takes as inputs the orders that are valid for an auction, the state of the liquidity sources that the solver can access, the rules set by the protocol (including those specifying the protocol fees), and returns one or multiple _solutions_, where a solution selects a subset of the orders valid in an auction and specifies feasible an in and out amounts for each of those orders. The solutions proposed by each solver during a given auction are the outcome of a two-step optimization problem: optimal routing and then optimal bidding. 

In this section, we describe mathematically the different components of the "solving" problem. We do not discuss optimal routing but we do discuss optimal bidding [here](rewards#solvers-strategy).

## User orders

Suppose that there are $$\{1,2,...k\}$$ tokens. From a high-level perspective, we can define a user order as an _acceptance set_ $$S \subset \mathbb R^k$$ specifying the trades a user is willing to accept (where negative entries of a vector represent tokens sold, while positive entries represent tokens bought). So, for example, if $$k=2$$ and $$\begin{bmatrix} x \\-y \end{bmatrix}\in S$$ then a user is happy to receive _x_ units of token 1 in exchange for _y_ units of token 2.

:::note

This is from the user's perspective, and is therefore net of fees.

:::

We also assume that $$0 \in S$$ that is, when submitting an order a user accepts that the order may not be filled. Also, to each order $$S$$ we define _surplus_function_ $$U_S:S\rightarrow \mathbb R$$, measuring "how good" a trade is from the point of view of the user who submitted order _S_. By definition $$U_S(0)=0$$.

Practically speaking, CoW Protocol allows only some types of orders, which we can think of as constraints on the set _S_ that a user can submit. One such constraint is that only pairwise swaps are allowed, that is, all vectors in $$S$$  have zeros in $$k-2$$ dimensions. Furthermore, each order must fit within one of the categories we now discuss. To simplify notation, when discussing these categories, we assume that $$k=2$$.

### Sell Orders

A  _sell order_ specifies a maximum sell amount of a given token _Y_ > 0, a buy token _b_, and a limit price $$\pi$$, that corresponds to the worst-case exchange rate that the user is willing to settle for. The limit price can be speficied explicitly (as in the case of limit orders) or derived from an underlying quote and a slippage tollerance parameter (as in the case of market orders). 

Sell orders can be fill-or-kill whenever the executed sell amount must be Y (or nothing). They can be partially fillable if the executed sell amount can be smaller or equal to Y.  Formally, if _x_ denotes the (proposed) buy amount and _y_ denotes the (proposed) sell amount of the order, a fill-or-kill limit sell order has the form

$$S=\left\{\begin{bmatrix} x \\-y \end{bmatrix}~~s.t. ~~\frac{y}{\pi}\leq x \hbox{ and } y\in\{0,Y\} \right\},$$

and a partially-fillable sell order has the form

$$S= \left \{ \begin{bmatrix} x \\-y \end{bmatrix} ~~s.t. ~~\frac{y}{\pi} \leq x \hbox{ and } y \in [0,Y] \right \}.$$

In both cases, the surplus function is defined as

$$U(x,-y)= x-y / \pi$$,

i.e., it is the additional amount of buy tokens received by the user relative to the case in which they trade at the limit price, and is naturally expressed in units of the buy token.

A final observation is that orders can be valid over multiple auctions. For a fill-or-kill, this means that an order that is not filled remains valid for a certain period (specified by the user). For a partially-fillable order, this also means that only a fraction of it may be executed in any given auction.

### Buy Orders

A _buy order_ is specified by a maximum buy amount _X_ > 0 and a limit price $$\pi$$ corresponding to the worst-case exchange rate the user is willing to settle for. With _x_ denoting the buy amount and _y_ denoting the sell amount of the order, fill-or-kill limit buy orders have the form

$$S = \left\{\begin{bmatrix} x \\-y \end{bmatrix}~~s.t.~~ y \leq x \cdot \pi \hbox{ and } x \in\{0, X\} \right\}$$

while partially-fillable limit buy orders have the form

$$S = \left\{\begin{bmatrix} x \\-y \end{bmatrix}~~s.t.~~ y \leq x \cdot \pi \hbox{ and } x \in[0, X] \right\}.$$

Again, the surplus function is defined as

$$U(\{x,-y\})= x \cdot \pi - y$$.

Also here, orders can be executed over multiple auctions.

### CoW AMM orders

To trade with a CoW AMM pool, a solver needs to specify both a buy (or "in") amount  _X_ > 0 and a sell (or "out") amount  _Y_ > 0 for the pool. Similarly to a sell order, the acceptance set of a CoW AMM pool and its surplus functions are

$$S=\left\{\begin{bmatrix} x \\-y \end{bmatrix}~~s.t. ~~\frac{y}{\pi}\leq x \hbox{ and } y\in\{0,Y\} \right\},$$

$$U(x,-y)= x-y / \pi$$.

The main difference is that the limit price $$\pi$$ corresponds to the price at which a zero-fee traditional AMM would trade. For example, in the case of a simple, constant product CoW AMM pool with reserves _X_ and _Y_ , we have

$$ \pi = X / (Y-y)$$

Finally, unlike sell and buy orders that are not valid anymore once executed, CoW AMM orders are always present. That is, as soon as a CoW AMM pool is created, a CoW AMM order for that pool is valid in all subsequent auctions. 


## Protocol Fees

Each user order may have an associated fee paid to the protocol. At a high level, these fees can be represented by a function that, for a given order $$S$$ maps all possible trades to a non-negative vector of tokens, that is $$f_S:S \rightarrow \mathbb R^k_+$$   with $$f_S(0)=0$$.

:::note

Solvers are also expected to also charge a fee to cover the costs of executing an order (for example, gas). We discuss such fees later in the context of solvers' optimal bidding, but we do not account for them here as they are not part of the protocol.

:::

## Solution

Solvers propose solutions to the protocol, where a solution is a set of trades to execute. Formally, suppose there are $$I$$ users and CoW AMM orders and _J_ are external liquidity sources. A solution is a list of trades $$\{o_1, o_2, ...o_I, l_1, l_2, ..., l_J\}$$ for each user, CoW AMM pool and external liquidity source such that:

* **Incentive compatibility and feasibility**: the solution respects the orders' acceptance set.  
* **Uniform directional clearing prices**: all users trading the same token pair in the same direction must face the same prices. Importantly, this constraint is defined at the moment when the swap occurs. So, for example, suppose user _i_ receives _x_ units of token 1 in exchange for _y_ units of token 2 and that the protocol takes a fee in the sell token $$f_2$$. Define $$p_{1,2}=\frac{y-f_2}{x}$$ as the price at which the swap occurs. Uniform directional clearing prices means that $$p_{1,2}$$ is the same for all users buying token 1 and selling token 2. Deviations from uniform directional prices are allowed to account for the extra gas cost of orders triggering hooks.
* [**All other competition rules**](competition-rules): These are a set of principles that solvers should follow, which were voted by CIPs.

:::caution

At CoW DAO's discretion, systematic violation of these rules may lead to penalizing or slashing of the offending solver.

:::


From the protocol viewpoint, each solution that satisfies the above constraints has a _score_ that is given by the total surplus generated and the fees paid to the protocol, all aggregated and denominated in some numéraire. More specifically, the score of a solution is equal to the sum of scores of the orders the solution proposes to execute, where the score of an order $$o$$ is defined as:

* $$o$$ is a sell order or a CoW AMM order: $$\mathrm{score}(o) = (U(o)+ f(o)) \cdot p(b)$$, where $$p(b)$$ is an externally provided price of the buy token relative to a numéraire.
* $$o$$ is a buy order:  $$\mathrm{score}(o) = (U(o)+ f(o)) \cdot p(b) \cdot \pi$$, where $$p(b)$$ is an externally provided price of the buy token relative to a numéraire and $$\pi$$ is the limit price of the order.

Note that the above definition assumes that fees are specified in the surplus token of the order (i.e., in the buy token for sell orders and in the sell token for buy orders), which is currently the case. 

Finally, solvers compete for the right to settle their solutions by participating in an auction, aiming to implement the combination of solutions that generates the largest possible total score while also being "fair" (see [here](competition-rules#off-chain-protocol)). The [solver that wins the auction is rewarded](rewards) by the protocol.
