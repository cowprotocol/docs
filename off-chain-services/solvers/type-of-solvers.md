# Solver Landscape



There are currently multiple solvers competing to come up with the best order settlement solution matching for a given batch auction problem. They can be grouped in a 2x2 matrix:

|                       | **Single order solver**               | **Batch order solver** |
| --------------------- | ------------------------------------- | ---------------------- |
| **Internal routing**  | Baseline                              | Naive, MIP, Quasimodo  |
| **External routing**  | 1inch, Paraswap, Matcha, Balancer SOR | CowDexAg               |

The first dimension being a property of the problem, while the second is a property of the method:

1. **Single/batch order solver:** Matches one/more than one order at once with a set of AMM's.
2. **Internal/external routing algorithm:** Uses an internal/external routing algorithm to determine which AMM pools are best to use.

The following briefly describes each of these individual solvers. Throughout, we will use the following graph representation of a batch auction. The nodes represent tokens, blue arrows are orders, and green arrows are AMM pools. A dashed edge indicates an unused AMM. The edge weights stand for the spot exchange rate (sell amount/buy amount) associated with the AMM pool.

### **Baseline solver**

The Baseline solver matches a single order to a set of AMM's, by computing the single sequence of AMM's (without splitting across multiple paths) that leads to a higher surplus for the owner of the order.

_Example:_ A trader would like to buy D for A, at a limit exchange rate A/D <= 1 (blue arrow in the picture below). There are four AMM pools, which operate at the fixed exchange rates as described in the picture (assume there is no slippage for now). If the order is matched against the AMM sequence A->B->D, then the exchange rate D/A would be B/A \* D/B = 0.9 \* 0.8 = 0.72. However, this exchange rate would violate the order limit price (1/0.72 > 1). Therefore, the Baseline solver would match the order against the A->C->D pool sequence instead. Notice that even if the order limit price was 1/0.72, then the solution would not change since the A->C->D sequence leads to a higher surplus for the trader.

![](<../../.gitbook/assets/Baseline Solver.png>)

**Addresses:**

* Prod: [https://etherscan.io/address/0x833f076d182123ca8dde2743045ea02957bd61ef](https://etherscan.io/address/0x833f076d182123ca8dde2743045ea02957bd61ef)
* Barn: [https://etherscan.io/address/0xbfaf2b5e351586551d8bf461ba5b2b5455b173da](https://etherscan.io/address/0xbfaf2b5e351586551d8bf461ba5b2b5455b173da)

### **DEX Aggregator Solvers: 1inch, Paraswap & Matcha**

These solvers have a more holistic view of the available on-chain liquidity (the Baseline solver is currently only supporting a limited list of on-chain protocols).

They match each order by using the 1inch, Paraswap & Matcha external API services. This means that both the set of AMM pools (and other liquidity) to consider and the method used to match them against, is outsourced. Note that these solvers' routing algorithm is more advanced than the Baseline solver since it can split an order across multiple AMM sequences, as explained in the following example.

![](<../../.gitbook/assets/Balancer SoR Solver.png>)

_Example:_ Consider again the previous example from above. Since pools have slippage (the exchange rate changes as a function of the traded amount), if the order being matched is big enough, it could eventually occur that spot exchange rates on the sequence A->C->D would be as shown in the picture above. At this point, it is equally advantageous to use the A->B->D sequence, and in fact, the optimal strategy would be to match the remaining amount to be traded to both sequences simultaneously.

**Addresses:**

* Matcha Prod: [https://etherscan.io/address/0xe92f359e6f05564849afa933ce8f62b8007a1d5d](https://etherscan.io/address/0xe92f359e6f05564849afa933ce8f62b8007a1d5d)
* Matcha Barn: [https://etherscan.io/address/0x97dd6a023b06ba4722af8af775ec3c2361e66684](https://etherscan.io/address/0x97dd6a023b06ba4722af8af775ec3c2361e66684)
* Paraswap Prod: [https://etherscan.io/address/0x15f4c337122ec23859ec73bec00ab38445e45304](https://etherscan.io/address/0x15f4c337122ec23859ec73bec00ab38445e45304)
* Paraswap Barn: [https://etherscan.io/address/0x6372bcbf66656e91b9213b61d861b5e815296207](https://etherscan.io/address/0x6372bcbf66656e91b9213b61d861b5e815296207)
* 1Inch Prod: [https://etherscan.io/address/0xde1c59bc25d806ad9ddcbe246c4b5e5505645718](https://etherscan.io/address/0xde1c59bc25d806ad9ddcbe246c4b5e5505645718)
* 1Inch Barn: [https://etherscan.io/address/0x8c9d33828dace1eb9fc533ffde88c4a9db115061](https://etherscan.io/address/0x8c9d33828dace1eb9fc533ffde88c4a9db115061)

### **Balancer SOR (Smart Order Routing) solver**

Matches a single order to the set of pools that are within the Balancer protocol. This means that the set of AMM pools to consider and the method used to match them against the order only relies on what is happening inside the Balancer protocol. Like the other DEX Aggregator solvers, it can match an order using multiple pool sequences.&#x20;

**Addresses:**

* TBD

### **Naive solver**

Matches a set of orders in a single token pair against a Uniswap v2 - like pool (Sushi, SwapR, etc.). This special case of the general multi-dimensional batch auction problem can be solved very efficiently. It is essentially a two-dimensional orderbook, where the remaining unmatched amounts, which can be positive since orders, fill-or-kill are traded through the AMM pool.

![](<../../.gitbook/assets/Niave Solver.png>)

**Addresses:**

* Prod: [https://etherscan.io/address/0x340185114f9d2617dc4c16088d0375d09fee9186](https://etherscan.io/address/0x340185114f9d2617dc4c16088d0375d09fee9186)
* Barn: [https://etherscan.io/address/0xb8650702412d0aa7f01f6bee70335a18d6a78e77](https://etherscan.io/address/0xb8650702412d0aa7f01f6bee70335a18d6a78e77)

### CowDexAg solver

A batched solver that is leveraging external DEX Aggregators. It uses Paraswap's and 0x's API to get execution paths for each order in the batch. It then checks, if there are any _coincidences of wants_ in the returned paths (e.g., matching the likely USDC<>WETH leg on a USDC->GNO and BAL->USDC trade). If so, it reduces the trading amount on those hops (leading to better prices for the people involved) and settles all other hops according to the best DEX Aggregator's execution.

**Address**&#x20;

* Prod: [https://etherscan.io/address/0x2d15894fac906386ff7f4bd07fceac43fcf80c73](https://etherscan.io/address/0x2d15894fac906386ff7f4bd07fceac43fcf80c73)
* Barn: [https://etherscan.io/address/0x583cd88b9d7926357fe6bddf0e8950557fcda0ca](https://etherscan.io/address/0x583cd88b9d7926357fe6bddf0e8950557fcda0ca)

### **MIP solver**

The MIP solver matches a set of orders against a set of AMM's. This is the general case, which is an NP-hard problem, and is tackled using a mixed-integer programming approach. A previous version of the model, that does not include the AMM integration, is thoroughly described [here](https://github.com/gnosis/dex-research/blob/master/BatchAuctionOptimization/batchauctions.pdf).

![](<../../.gitbook/assets/MIP Solver.png>)

At the moment, this solver only has access to Uni v2 style liquidity. More complex AMM's (e.g., Uni v3 style pools) cannot be easily modeled using linear constraints and are therefore not supported by this solver yet.

**Addresses:**

* Prod: [https://etherscan.io/address/0xf2d21ad3c88170d4ae52bbbeba80cb6078d276f4](https://etherscan.io/address/0xf2d21ad3c88170d4ae52bbbeba80cb6078d276f4)
* Staging: [https://etherscan.io/address/0x158261d17d2983b2cbaecc1ae71a34617ae4cb16](https://etherscan.io/address/0x158261d17d2983b2cbaecc1ae71a34617ae4cb16)

### Quasimodo solver

Unlike the MIP solver, Quasimodo represents liquidity using a quasi-linear program allowing it to also model more sophisticated AMMs (e.g.,. Balancer stable pools). While harder in theory, this problem statement has proven quite effective in practice.

Quasimodo relies on the protocol's baseline liquidity but can be extended to use any demand curve that is convex (buying more of a token will lead to a worse price).

**Addresses:**

* Prod: [https://etherscan.io/address/0x77ec2a722c2393d3fd64617bbaf1499c713e616b](https://etherscan.io/address/0x77ec2a722c2393d3fd64617bbaf1499c713e616b)
* Staging: [https://etherscan.io/address/0x70f3c870b6e7e1d566e40c41e2e3d6e895fcee23](https://etherscan.io/address/0x70f3c870b6e7e1d566e40c41e2e3d6e895fcee23)
