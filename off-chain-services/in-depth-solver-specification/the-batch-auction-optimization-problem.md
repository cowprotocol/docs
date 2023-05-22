# The Batch Auction Optimization Problem

In this section, we describe all the different components of the optimization problem that needs to be solved within each batch.

## <mark style="color:blue;">User Orders</mark>

Suppose that there are $$\{1,2,...k\}$$ tokens. From a high-level perspective, we can define a user order as an _acceptance set_ $$S \subset \mathbb R^k$$ specifying the trades a user is willing to accept (where negative entries of a vector represent tokens sold, while positive entries represent tokens bought). So, for example, if $$k=2$$ and $$\begin{bmatrix} x \\-y \end{bmatrix}\in S$$ then a user is happy to receive _x_ units of token 1 in exchange of _y_ units of token 2 (note: this is all from the user's perspective and is therefore net of fees).

Clearly,  $$\mathbb R^k_+ \subset S$$, that is, a user is always willing to accept an order in which they receive a positive amount of tokens without paying anything. Similarly, $$\mathbb R^k_{-} \cap S = 0$$ because no user would accept to pay tokens without receiving anything. The interesting elements of the acceptance set are, therefore, those with at least one positive entry and at least one negative entry. We also assume that $$0 \in S$$, that is, when submitting an order a user accepts that the order may not be filled.&#x20;

To each order $$S$$ we may assign a _utility function_ $$U_S:S\rightarrow \mathbb R$$ specifying a numerical value to each trade in the acceptance set, to be interpreted as "how good" a trade is from the point of view of the user who submitted order _S_. By definition $$U_S(0)=0$$.

Practically speaking, CoW Protocol allows only some types of orders, which we can think of as constraints on the set _S_ that a user can submit_._ One such constraint is that only pairwise swaps are allowed, that is, all vectors in $$S$$  have zeros in $$k-2$$ dimensions. Furthermore, each order must fit within one of the categories we now discuss. To simplify notation, when discussing these categories we assume that $$k=2$$.

#### Limit Sell Orders

A _limit sell order_ specifies a maximum sell amount of a given token _Y_ > 0, a buy token, and a limit price $$\pi$$, that corresponds to the worst-case exchange rate that the user is willing to settle for. They can be fill-or-kill whenever the executed sell amount must be Y (or nothing). They can be partially fillable if the executed sell amount can be smaller or equal to Y.  Formally, if _x_ denotes the (proposed) buy amount and _y_ denotes the (proposed) sell amount of the order, a fill-or-kill limit sell order has the form

$$S=\left\{\begin{bmatrix} x \\-y \end{bmatrix}~~s.t. ~~\frac{y}{\pi}\leq x \mbox{ and } y\in\{0,Y\} \right\},$$

and a partially-fillable sell order has the form

$$S= \left \{ \begin{bmatrix} x \\-y \end{bmatrix} ~~s.t. ~~\frac{y}{\pi} \leq x \mbox{ and } y \in [0,Y] \right \}.$$

In both cases, the utility function is defined as

$$U(x,-y)=(x-y / \pi)p(b)$$

where $$(x-y / \pi)$$ is the additional amount of buy tokens received by the user relative to the case in which they trade at the limit price, and $$p(b)$$ is the price of the buy token relative to a numeraire (in our case ETH) and is externally provided (i.e., by an oracle). The function $$U(x,-y)$$ is therefore expressed in units of the numeraire and is always non-negative.

A final observation is that orders can be valid over multiple batches. For a fill-or-kill, this means that an order that is not filled remains valid for a certain period (specified by the user). For a partially-fillable order, this also means that only a fraction of it may be executed in any given batch.&#x20;

**Limit Buy Orders**

A _limit buy order_ is specified by a maximum buy amount _X_ > 0 and a limit price $$\pi$$ corresponding to the worst-case exchange rate the user is willing to settle for. With _x_ denoting the buy amount and _y_ denoting the sell amount of the order, fill-or-kill limit buy orders have the form

$$S = \left\{\begin{bmatrix} x \\-y \end{bmatrix}~~s.t.~~ y \leq x \cdot \pi \mbox{ and }\;\; x \in\{0, X\} \right\}$$

while partially-fillable limit buy orders have the form

$$S = \left\{\begin{bmatrix} x \\-y \end{bmatrix}~~s.t.~~ y \leq x \cdot \pi \mbox{ and }\;\; x \in[0, X] \right\}.$$

Again, the utility function is defined as

&#x20;$$U(\{x,-y\})=(x \cdot \pi-y)p(s)$$

where $$p(s)$$ is the price of the sell token relative to a numeraire and is externally provided. Also here, orders can be executed over multiple batches.

## <mark style="color:blue;">Liquidity Orders</mark>

Liquidity orders are orders not submitted by users. They represent sources of liquidity that are available to a solver, for example, automated market makers or private liquidity pools. They look identical to user orders, in the sense that each liquidity order can be represented by an acceptance set $$L \subset \mathbb R^k$$. The main difference with users orders is that the utility function of a liquidity order is always zero.&#x20;

## <mark style="color:blue;">Fees</mark>&#x20;

Each user order has an associated fee paid to the protocol. At a high level, these fees can be represented by a function that, for a given order $$S$$ maps all possible trades to a positive vector of tokens, that is $$f_S:S \rightarrow \mathbb R^k_+$$   with $$f_S(0)=0$$.

From the practical viewpoint, for market fill-or-kill orders, the fee is always in the sell token and is pre-specified: it is an estimate of the cost of executing an order and is explicitly shown to the user before the order is submitted. Instead, (long-standing) limit orders are "feeless" from the user's perspective: users are guaranteed a limit price without specifying how fees will be calculated. For fill-or-kill limit orders, the protocol computes a fee each time such an order enters a batch auction, while for partially-fillable limit orders, solvers are the ones that need to propose a fee. In this latter case, the expectation is that this fee should equal the cost of execution of this trade in isolation. The fee of limit orders is again in the sell token.

## <mark style="color:blue;">Solution</mark>

Solvers propose solutions to the protocol, where a solution is a set of trades to execute. Formally, suppose that there are $$I$$ users and _J_ liquidity sources. A solution is a list of trades $$\{o_1, o_2, ...o_I, l_1, l_2, ..., l_J\}$$ one per user and one per liquidity source such that

* **Maximum size of solution:** The total number of executed orders and AMMs does not exceed a certain number within each batch due to limitations regarding the size of a block on the blockchain.
* **Incentive compatibility and feasibility:** the trades respect the user and liquidity orders, that is, $$o_i\in S_i~~\forall i\leq I$$  and $$l_j \in L_j~~\forall j\leq J$$.
* **Uniform clearing prices:** all users must face the same prices. Importantly, this constraint is defined at the moment when the swap occurs. So, for example, suppose user _i_ receives _x_ units of token 1 in exchange of _y_ units of token 2 and that the protocol takes a fee in the sell token $$f_2$$. Define $$p_{1,2}=\frac{y-f_2}{x}$$ as the price at which the swap occurs. Uniform clearing prices means that $$p_{1,2}$$ is the same for all users swapping token 1 and token 2. Furthermore, prices must be consistent, in the sense that for any three tokens 1, 2, and 3, if $$p_{1,2},~ p_{2,3}, ~p_{1,3}$$ are well defined, then it must be that $$p_{1,2}\cdot p_{2,3}=p_{1,3}$$. Note that this implies that prices can be expressed with respect to a common numeraire, giving rise to a uniform price clearlng vector $$p$$.
* **Token conservation per token:** No token amounts can be created or destroyed. In other words, for every token, the total amount sold must be equal to the total amount bought of this token.
* **Token conservation per order**: This is a very technical constraint that was part of CIP-11. More information about it can be found [here](appendix-token-conservation-per-order-aka-local-token-conservation.md).
* **Social consensus rules:** These are a set of principles that solvers should follow, as voted in[ CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870). For example:
  * _No provision of unfair solutions._ Uniform clearing prices computed by solvers should be in line (or even better) than what the users would get elsewhere. This becomes particularly relevant for solutions where CoWs happen, i.e., when some volume is settled as part of a CoW and not by routing through an AMM.
  * _No malicious behavior_ such as intentionally harming users and/or the protocol.

Note that systematic violation of these rules might lead to penalizing or even slashing (if the DAO decides so).

From the protocol viewpoint, each solution that satisfies the above constraints has a _quality_ given by the sum of the utility generated and the fees paid to the protocol:

$$\sum_o U(o)+p \cdot \sum_o f(o)$$

where _p_ is a vector of externally-determined prices used to express all fees in terms of the common numeraire.&#x20;

Finally, solvers compete for the right to settle a batch by participating in an auction, aiming to implement the solution with the highest quality at the lowest possible cost to the protocol. For more details, see the page [Solver Auction and Rewards](solver-auction-and-rewards.md).
