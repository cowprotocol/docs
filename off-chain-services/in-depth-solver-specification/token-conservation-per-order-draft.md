# token conservation per order (draft)

The "token conservation per token" constraint ensures that no token is created or destroyed. However, this, in a way, is a global notion of conservation that is oblivious about what happens in certain subgraphs, and turns out not to be sufficient.&#x20;

To see this, consider the following example in which there are two user orders: user _a_ sells _1_ unit of token _x_ for at least _1_ unit of token _y_; user _b_ seels _1_ unit of token _z_ for at least _1_ unit of token _y_. A solver uses an external liquidity source to buy 2 units of token _y_ against _1_ unit of token _x,_ and a different liquidity source to buy _1_ unit of token _y_ against 1 unit of token _z._&#x20;

A solution that returns 1 unit of token _y_ to user _a_ and 2 units of token _y_ to user _b_ satisfies both token conservation per token and has uniform prices. Nonetheless, at an intuitive level, it is unfair to user _a:_ his/her unit of token _x_ was used to generate 2 units of token _y,_ but the solution allocats him/her only 1 units of token _y._ The goal is to specify a constraint that rules out these situations.&#x20;

To start, suppose that we have a solution that consists of a single trading cycle _C_ of _k_ trades   $$o_1, o_2, \ldots, o_k$$. More precisely, trade $$o_1$$ buys token $$t_1$$ and sells token $$t_2$$, trade $$o_2$$ buys token $$t_2$$and sells token $$t_3$$, and so on, and finally, trade $$o_k$$ buys token $$t_k$$ and sells token $$t_1$$, thus closing the cycle. If we now define the exchange rate of a trade $$o_i$$ in the standard way $$p(o_i)$$as the ratio between quantity bought and quantity sold. Then by the "token conservation per token" constraint, it is easy to deduce that

$$p(C) \coloneqq \prod_{o_i \in C} p(o_i) = p(o_1) \cdot p(o_2) \cdot \ldots \cdot p(o_k)= 1.$$

Inspired by the above equation that holds for a single cycle, we now generalize this in the case where a user trade is part of many trading cycles in the proposed solution. More specifically, we denote by $$\mathcal{C}(o)$$  the set of all trading cycles containing the order _o_ in a candidate solution. We require that:

$$\sum_{C \in \mathcal{C}(o)} \lambda_C \cdot p(C) = 1,$$

where $$\lambda_C \geq 0$$ is a non-negative number that is well-defined for each cycle _C_, such that $$\sum_{C \in \mathcal{C}(o)} \lambda_C= 1$$. The above condition can be viewed as an average-case version of the simpler equation that holds for a single cycle and is described above.

The only thing remaining to do is define the weights $$\lambda_C$$ which intuitively should capture the extent to which a given trade is utilized in different trading cycles. To do so, we first define the execution graph _G_(_o_) of a user trade _o_ as the union of all cycles containing the trade _o_, where we use the following convention: we have a node for each of the traded tokens, and for each order $$o$$ that buys token _u_ and sells token _v,_ we add a directed edge (_u, v_) from _u_ to _v_. Thus, we end up with a directed graph _G_(_o_). To simplify things, we remove the edge corresponding to trade _o_ from the graph and call this updated graph the execution graph _G_(_o_) of trade _o._ It is easy to see that this graph is directed and acyclic ([DAG](https://en.wikipedia.org/wiki/Directed\_acyclic\_graph)).

Given this directed and acyclic graph _G_(_o_), we now associate each edge $$\alpha = (t, t')$$of the graph with the weight

$$\lambda_\alpha \coloneqq \frac{a_b(\alpha)}{\sum_{\beta \in G(o):\; t_b(\beta) = t} a_b(\beta)}$$.

Intuitively, this weight represents how token _t_ is "distributed" in the orders that are buying token _t_, within the graph _G_(_o_).

We also define $$\lambda_o = 1$$ . Thus, we can now naturally define the $$\lambda$$ terms in the equation above as follows:

$$\lambda_C \coloneqq \prod_{\alpha \in C} \lambda_\alpha,$$

for every cycle containing order _o._ It is now straightforward to prove that these terms now indeed sum up to 1.

To summarize, for a proposed solution, we require that for each executed user order _o_, we must have

$$\sum_{C \in \mathcal{C}(o)} \lambda_C \cdot r(C) = 1,$$

where the terms are defined as above.\
\
More details about the "token conservation per order" constraint and a straightforward pseudocode implementation of a test that checks the constraint can be found [here](https://docs.google.com/document/d/1scicpMu3TQZUatY\_\_qzVfWPBFIrmJtb9P1GTvGDkgh8/edit?usp=sharing).

We stress here that the constraint is not enforced when ranking solutions but can be checked retrospectively by inspecting the settlement onchain. Systematic and non-trivial violations of the constraint can result in the slashing of a solver.
