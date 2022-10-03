# The Batch Auction Optimization Problem

In this section, we describe all the different components of the optimization problem that needs to be solved within each batch.

## <mark style="color:blue;">Tokens</mark>

The problem considers a set of tokens that users want to buy or sell in their orders. The key quantity describing each token _t_ is its price _p(t)_, which is one of the main variables to be determined in the optimization problem.

## <mark style="color:blue;">User Orders</mark>

We now turn to the type of orders that a user can submit to the Cow Protocol. The set of user orders is denoted as _O_, and a user order _o_ is described by a tuple $$o = \langle b_o, s_o, f_o, c_o, T_o, U_o  \rangle$$, where:

* __$$b_o \in \mathbb{N}_{> 0}$$ denotes the token (e.g., ETH) the user wants to buy (extract out of the market).
* $$s_o \in \mathbb{N}_{> 0}$$ denotes the token (e.g., COW) the user wants to sell (insert into the market).
* $$f_o \in \mathbb{N}_{\geq 0}$$ specifies the fee that is paid for the service and the transaction costs, denominated in the sell token. In principle, the fee can depend on the user order, the traded amount etc., but for simplicity, we will treat it as a predetermined fee that might be different for each order.
* $$c_o \in \mathbb{N}_{\geq 0}$$ is a fixed cost for settling the user's trade, denominated in some predefined reference token (ETH is usually selected as the reference token).
* $$T_o: \mathbb{R}_{\geq 0}^2 \to \{\mathtt{true}, \mathtt{false}\}$$ is the trading predicate, that determines the set of buy (_x_) and sell (_y_) amounts for which the user is willing to participate in the market; __ if __ $$T_o(x,y) = \mathtt{true}$$, then this means that the user is willing to sell _y_ amount of the sell token and buy _x_ amount of the buy token.&#x20;
* $$U_o: \mathbb{R}_{\geq 0}^2 \to \mathbb{R}$$ is the user's _utility function_. Utility measures how "happy" a user is with a particular buy (_x_) and sell (_y_) amount, given that $$T_o(x,y) = \mathtt{true}$$; the larger the utility, the happier the user is with the trade. We note that if the utility is equal to zero, then the user is indifferent to the trade, so such a trade might or might not be executed.

We will now describe the different types of trading predicates that are allowed. We clarify that we always set $$T(x,y) \coloneqq \mathtt{false}$$ if _x_ = 0, and so from now on we only discuss the case where _x_ > 0.

#### Limit Sell Orders

A _limit sell order_ is specified by a maximum sell amount _Y_ > 0, which indicates the maximum amount that the user is willing to sell. Moreover, there is a limit price $$\pi$$, that corresponds to the worst-case exchange rate that the user is willing to settle for. More formally, if _x_ denotes the (proposed) buy amount and _y_ denotes the (proposed) sell amount of the order, the trading predicate is defined as

&#x20;       $$T(x,y) \coloneqq \left(\frac{y}{x} = \pi\;\;\textrm{and}\;\; y < Y\right) \;\;\textrm{or}\;\; \left(\frac{y}{x} \leq \pi\;\;\textrm{and}\;\; y = Y\right).$$

In words, a limit sell order is _eligible for execution_ in two cases_:_ it either is fully executed and the limit price is respected, or it is partially executed and is traded at its limit price.

A limit sell order is allowed to be Fill-or-Kill; in such a case the order is not allowed to be partially filled. For this case, the trading predicate becomes

&#x20;       $$T(x,y) \coloneqq \left(\frac{y}{x} \leq\pi \;\;\textrm{and}\;\; y = Y\right).$$

Given that the order is eligible for execution, the utility of the order is defined as the value of the difference between the amount of tokens the trader receives and the minimum amount that they were expecting to receive. Formally,

&#x20;       $$U(x,y) \coloneqq \left(x - \frac{y}{\pi} \right) \cdot p(b),$$

where _p(b)_ denotes the price of the buy token.

Notice that currently all the sell orders submitted via the[ CoW Swap UI](https://swap.cow.fi/#/swap) are Fill-or-Kill orders that are specified by the maximum sell amount _Y_ and the minimum buy amount _X_. More precisely, when a user asks to sell _Y_ amount of the sell token, then they get a promise that the buy amount will be at least some quantity _X_. Thus, the limit price $$\pi$$ is only implicitly specified as $$\pi$$ _= Y/X_. Nevertheless, it is more convenient to refer to this limit price $$\pi$$ instead of the minimum buy amount _X_, as this naturally corresponds to the worst-case exchange rate that a user is willing to accept, and also allows us to generalize the concepts to partially fillable orders (i.e., orders that are not Fill-or-Kill).

#### Limit Buy Orders

A _limit buy order_ is specified by a maximum buy amount _X_ > 0, which indicates the maximum amount that the user is willing to buy. Much like a limit sell order, there is a limit price $$\pi$$, that corresponds to the worst-case exchange rate that the user is willing to settle for. With _x_ denoting the buy amount and _y_ denoting the sell amount of the order, the trading predicate is defined as follows:

&#x20;       $$T(x,y) \coloneqq \left(\frac{y}{x} =\pi \;\;\textrm{and}\;\; x < X\right) \;\; \textrm{or}\;\; \left(\frac{y}{x} \leq\pi \;\;\textrm{and}\;\; x = X\right).$$

Again, limit buy orders are allowed to be Fill-or-Kill, meaning the trading predicate is restricted to

&#x20;       $$T(x,y) \coloneqq \left(\frac{y}{x} \leq \pi \;\;\textrm{and}\;\; x = X\right).$$

If the conditions are met, the order can be executed. In both cases, the utility is then defined as the value of the difference between the amount of tokens that the trader would have been ready to spend and the amount they actually spend, or:

&#x20;       __        $$U(x,y) = (x \pi - y) \cdot p(s),$$__

where _p(s)_ denotes the price of the sell token.

## <mark style="color:blue;">Liquidity Orders</mark>

A liquidity order looks identical to a user order, except that its utility is always equal to zero. This is because a liquidity order only cares about the execution of the trade and is oblivious to any (potential) surplus they might get. The set of liquidity order is denoted with _L_.

## <mark style="color:blue;">Automated Marker Makers (AMMs)</mark>

The set of AMMs that participate in a batch is denoted as _M._ An AMM is again described by a tuple, similar to user orders, and is determined by the trading predicate _T_ in which the sell (_y_) and buy (_x_) amounts are related by an arbitrary concave function $$G: \mathbb{R}_{\geq 0} \to \mathbb{R}_{\geq 0}$$, i.e, we have

$$T(x,y) \coloneqq \left(y = G(x)\right).$$

One example of such a function _G_ is the constant-product ("Uniswap") invariant

&#x20;       $$G(x) = \frac{xr_{y}}{x+r_{x}},$$&#x20;

where $$r_{x},r_{y}\in\mathbb{R}^{+}$$ are the internal reserves of the token being bought and sold, respectively, by the AMM. Similar to a liquidity order, the utility function of an AMM is always equal to zero.

## <mark style="color:blue;">Objective Function</mark>

The key goal of a solver is to find solutions that maximize the utility of the users. However, in the objective, we also add a fee component for the service provided, and subtract costs that the transaction execution on the blockchain is expected to incur. Hence, our objective reads

&#x20;       _maximize   (total utility) + (total fees paid) - (total execution cost)._&#x20;

For a more formal description, we introduce an indicator variable _z_ per (user/liquidity) order and AMM, that indicates whether the order is executed \[_z(o)_ = 1], or not \[_z(o)_ = 0]. Thus, the objective function is the following:

&#x20;       _maximize_   $$\sum_{o \in O} U_o(x(o), y(o)) \cdot z(o)  + \sum_{o \in O \cup L} f_o \cdot z(o) - \sum_{\alpha \in O \cup L \cup M} c_\alpha \cdot z(\alpha),$$

where the underlying variables to be determined are the indicator z-variables, the buy (_x_) and sell (_y_) amounts of each order, as well as the prices of the tokens.

**Note:** We stress here that in the computation of the utility of each executed order in the objective, we do not use the computed price of the traded token but an external price provided as part of the input. In other words, for an executed limit sell order, the utility is equal to\
\
$$U(x,y) \coloneqq \left(x - \frac{y}{\pi} \right) \cdot ext\_price(b),$$\
\
where _ext\_price(b)_ is provided as part of the input as an estimate of the price of token _b_. Similarly, for an executed limit buy order, the utility is equal to \
\
$$U(x,y) = (x \pi - y) \cdot ext\_price(s),$$\
\
where, again, _ext\_price(s)_ is provided as part of the input as an estimate of the price of token _s_.\
\
There are two reasons for using these external prices and not the computed prices in the solution. The first is that it simplifies the objective function (i.e., an order's utility is linear in the traded amounts and not quadratic in the amount and price), and, second, it ignores solutions that scale up prices of certain tokens in order to create "fake amounts of surplus".\
\
Similarly, the terms of the objective that correspond to the total fees paid and execution costs are also computed with respect to these external prices.\
\
As a final comment, these external prices can be treated as given weights that create a weighted sum of different terms in the objective function, and allow for a simple and well-defined maximization objective function.

## <mark style="color:blue;">Constraints</mark>

Here, we briefly discuss all the constraints that must be satisfied so that a solution can be considered valid. Systematic violation of these rules might lead to penalizing, or even slashing (if the DAO decides so).

* **Trading predicate:** An order or an AMM can only be executed/used if the proposed trading amounts satisfy its _trading predicate_.
* **Uniform clearing prices:** The proposed trading amounts of all **user** orders must follow the same prices. I.e., if a user order is executed with a buy amount _x_ and a sell amount _y_, the equation $$x \cdot p(b) = y \cdot p(s)$$ must hold, where _p(b)_ denotes the price of the buy token and _p(s)_ denotes the price of the sell token. The above equation can also be rewritten as $$\frac{y}{x} = \frac{p(b)}{p(s)}$$, which explicitly states that the exchange rate that a user order perceives is determined by the token prices (and thus, all users trading on the same token pair perceive the same exchange rate). \
  \
  We stress here that the clearing price vector is a key component of a reported solution, as the way the smart contract computes the traded amounts is via this vector. For example, for a Fill-or-Kill sell order that sells a _y_ amount of token A for some amount of token B, and assuming that its trading predicate is satisfied, then the executed buy amount of the order is computed as follows:\
  \
  buy amount = $$y \cdot p(A) / p(B)$$.\
  \
  A similar computation is done in the case of buy orders.\

* **Token conservation per token:** No token amounts can be created or destroyed. In other words, for every token, the total amount sold must be equal to the total amount bought of this token.\
  \
  We stress here that settlements that end up violating token conservation are usually penalized in a soft way. More precisely, due to blockchain volatility, it can happen that AMM interactions do not return the exact amount that was expected. In most of these cases, this is indeed unintended (from a solver's perspective), and usually the deviations are not that large, so the protocol has chosen a soft penalty for such deviations, in the following form. A proper accounting per settled batch is done, and slippage (in both directions) is taken into account, added up (with the appropriate sign), and if the result ends up being negative (i.e., the solver "owing" money to the protocol), that amount is charged as penalty to the solver.\
  \
  We also note that, although the protocol's approach is to not slash solvers that unintentionally might violate this constraint, systematic and intentional violations of it might result in flagging of a solver. In other words, the protocol and the DAO expects that solvers will report traded amounts as truthfully as they can.\
  \
  A particular instance of intentionally violating the token conservation per token constraint with the goal to win more batches is the so-called _pennying_ strategy, which has been thoroughly discussed [here](https://forum.cow.fi/t/pennying-as-a-strategy-to-win-more-auctions-and-how-to-deal-with-it/1093), and which has been banned (see [CIP-13](https://snapshot.org/#/cow.eth/proposal/0x812273c78abe1cea303d8381e1fb901a4cb701715fd24f4b769d0a0b3779b3e2)).\

* **Maximum size of solution:** The total number of executed orders and AMMs cannot exceed a certain number within each batch due to limitations regarding the size of a block on the blockchain.
* **Token conservation per order:** One additional set of constraints that we impose follows as a generalization of the token conservation per token constraint, and is discussed in the next subsection.
*   **Social consensus rules:** These are "non-written" behavioral rules that solvers should follow, as voted in[ CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870). We now provide some examples of them:



    * _Provision of unfair solutions._ Uniform clearing prices computed by solvers should be in line (or even better) than what the users would get elsewhere. This becomes particularly relevant for solutions where CoW's happen, i.e., when some volume is settled as part of a CoW and not by routing through an AMM.
    * _Inflation of the objective function._ Using tokens for the sole purpose of inflating the objective value or maximizing the reward is forbidden (e.g., by creating fake tokens, or wash-trading with real tokens).
    * _Illegal use of internal buffers._ The internal buffers may only be used to replace legitimate AMM interactions available to the general public for the purpose of saving transaction costs. We discuss internal buffers in more detail in a subsequent section ([here](https://docs.cow.fi/off-chain-services/in-depth-solver-specification/output-batch-auction-solutions#using-internal-buffers)).
    * _Failure to report correct transacted values for encoded transactions._ Solvers may choose to include encoded transactions in their solution, by providing relevant calldata, but when doing so they must also truthfully specify the amounts transferred by each encoded transaction. This is required in order to verify token conservation constraints, and can be checked retrospectively. Again, this is discussed in more detail [here](https://docs.cow.fi/off-chain-services/in-depth-solver-specification/output-batch-auction-solutions#interaction-data).
    * _Other malicious behavior._ Malicious solver behavior is not limited to the above examples. Slashing can still happen for other reasons where there is intentional harm caused to the user and/or the protocol at the discretion of the CoW DAO.

### Token conservation per order

The _uniform clearing prices_ constraint ensures that all users will see the same price for each traded token, which is a very desirable property so as to avoid cases where a user is envious of another user because of the better exchange rate they got. However, only enforcing it to user orders might lead to some undesirable solutions. More precisely, it has been observed that, although allowing liquidity/AMM orders to have different exchange rates (compared to the ones imposed by the price vector) can be beneficial, as more surplus can be extracted for the users in many cases, there is also the danger that surplus shifts from one trading cycle to another one. This can be considered unfair, since an order that was necessary for generating such surplus might not end up "receiving" it.

The "token conservation per token" constraint ensures that no token is created or destroyed. However, this, in a way, is a global notion of conservation that is oblivious about what happens in certain subgraphs, and turns out not to be sufficient. As noted in the previous paragraph, at a high level, a desired notion of conservation would ensure that for any user order _o_, no external tokens "enter" or "exit" the trading cycles that contain the order _o_. For this reason, we introduce an additional constraint, which we call "token conservation per order" constraint, that prohibits solutions that violate this notion of conservation.

We start with a simple example, in order to motivate this new constraint, which is arguably the most technical among all of our constraints. For that, suppose that we have a solution that consists of a single trading cycle _C_ that contains _k_ orders $$\alpha_1, \alpha_2, \ldots, \alpha_k$$. More precisely, order $$\alpha_1$$ buys token $$t_1$$ and sells token $$t_2$$, order $$\alpha_2$$ buys token $$t_2$$and sells token $$t_3$$, and so on, and finally, order $$t_k$$ buys token $$t_k$$ and sells token $$t_1$$, thus closing the cycle. If we now define the exchange rate of an order$$\alpha$$ in the standard way, i.e., $$r(\alpha)= \frac{a_s(\alpha)}{a_b(\alpha)}$$, then by the "token conservation per token" constraint, it is easy to deduce that

$$r(C) \coloneqq \prod_{\alpha \in C} r(\alpha) = r(\alpha_1) \cdot r(\alpha_2) \cdot \ldots \cdot r(\alpha_k)= 1.$$

Inspired by the above equation that holds for a single cycle, we now generalize this in the case where a user order is part of many trading cycles in the proposed solution. More specifically, for a user order _o_, if $$\mathcal{C}(o)$$ denotes the set of all trading cycles containing the order _o_ in a candidate solution, then, in order for that solution to be considered feasible, we require that the following condition holds:

$$\sum_{C \in \mathcal{C}(o)} \lambda_C \cdot r(C) = 1,$$

where $$\lambda_C \geq 0$$ is a non-negative number that is well-defined for each cycle _C_, such that $$\sum_{C \in \mathcal{C}(o)} \lambda_C= 1$$. In words, we require that a certain convex combination of the products of exchange rates over all cycles that contain a user order _o_ is equal to 1_._ This can also be viewed as an average-case version of the simpler equation that holds for a single cycle and is described above.

The only thing remaining to do is define these $$\lambda$$ terms that appear in the equation above. For that, we first define the execution graph _G_(_o_) of a user order _o_ as the union of all cycles containing the order _o_, where we use the following convention: we have a node for each of the traded tokens, and  for each order $$\alpha$$ that buys token _u_ and sells token _v,_ we add a directed edge (_u, v_) from _u_ to _v_. Thus, we end up with a directed graph _G_(_o_). To simplify things, we also remove the edge corresponding to order _o_ from the graph, and call this updated graph the execution graph _G_(_o_) of order _o._ It is easy to see that this graph is directed and acyclic ([DAG](https://en.wikipedia.org/wiki/Directed\_acyclic\_graph)).

Given this directed and acyclic graph _G_(_o_), we now associate each edge $$\alpha = (t, t')$$of the graph with the weight

$$\lambda_\alpha \coloneqq \frac{a_b(\alpha)}{\sum_{\beta \in G(o):\; t_b(\beta) = t} a_b(\beta)}$$.

Intuitively, this weight represents how token _t_ is "distributed" in the orders that are buying token _t_, within the graph _G_(_o_).&#x20;

We also define  $$\lambda_o = 1$$ . Thus, we can now naturally define the $$\lambda$$ terms in the equation above as follows:

$$\lambda_C \coloneqq \prod_{\alpha \in C} \lambda_\alpha,$$

for every cycle containing order _o._ It is now straightforward to prove that these terms now indeed sum up to 1.

To summarize, for a proposed solution, we require that for each executed user order _o_, we must have

$$\sum_{C \in \mathcal{C}(o)} \lambda_C \cdot r(C) = 1,$$

where the terms are defined as above.\
\
More details about the "token conservation per order" constraint, as well as a straightforward pseudocode implementation of a test that checks the constraint, can be found [here](https://docs.google.com/document/d/1scicpMu3TQZUatY\_\_qzVfWPBFIrmJtb9P1GTvGDkgh8/edit?usp=sharing).

We stress here that the constraint is not enforced when ranking solutions, but can be checked retrospectively, by inspecting the settlement onchain. Systematic and non-trivial violations of the constraint can result to slashing of a solver.

