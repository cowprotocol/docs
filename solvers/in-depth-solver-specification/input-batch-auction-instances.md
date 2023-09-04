---
description: This section describes the format of Batch Auction Instances.
---

# Input: Batch auction instances

The input batch is formatted in [JSON](https://www.json.org/json-en.html), described in the following sections.

Note: To avoid precision loss, some numerical literals are encoded as strings, referred below as _stringified_.

## <mark style="color:blue;">Tokens</mark>

The "tokens" key lists all tokens that appear in some order or AMM in the batch. It is a dictionary, mapping the token id (the Smart Contract address of the token) to the following information:

* `"decimals"`: an integer equal to the number of decimals of the token, usually equal to 18 (more on this later).
* `"alias"`: a string denoting the shorthand name of the token (e.g., WETH, DAI)
* `"external_price"`: a float that corresponds to the price of the smallest denomination of the token with respect to a reference token. Only tokens that are traded by at least a user order will necessarily have an external price.
* `"normalize_priority"`: an integer that expresses the preference for the token to be used as the [numeraire](https://en.wikipedia.org/wiki/Num%C3%A9raire). The token with highest priority in the solution will have price set to 1. More on this later.
* `"accepted_for_internalization"`: this is a boolean flag that specifies whether the contract is willing to store the token as part of an internalized interaction. More information about internalizations (what they are and when they are allowed) can be found in the next section (see [here](https://docs.cow.fi/off-chain-services/in-depth-solver-specification/output-batch-auction-solutions#using-internal-buffers)).
* `"internal_buffer"`: a "stringified" integer that describes the amount (in the token's lowest denomination) of the token currently stored in the settlement contract. This information is relevant when a solver attempts to internalize an interaction (see [here](https://docs.cow.fi/off-chain-services/in-depth-solver-specification/output-batch-auction-solutions#using-internal-buffers)).

Following are three example token entries, corresponding to [WETH](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), [BAL](https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3d) and [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48).

```json
"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    "decimals": 18,
    "alias": "WETH",
    "external_price": 1.0,
    "normalize_priority": 1,
    "accepted_for_internalization": true,
    "internal_buffer": "590308372204674634"
}
"0xba100000625a3754423978a60c9317c58a424e3d": {
   "decimals": 18,
    "alias": "BAL",
    "external_price": 0.005223351891153233,
    "normalize_priority": 0,
    "accepted_for_internalization": true,
    "internal_buffer": "20624044361224836455"
} 
"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
    "decimals": 6,
    "alias": "USDC",
    "external_price": 214765397.01856124,
    "normalize_priority": 0,
    "accepted_for_internalization": true,
    "internal_buffer": "626459181"
}
```

We clarify a few things regarding the entries above.

* WETH is preferred as to be the reference token, since its `normalize_priority` flag is larger than any other tokens. Its `external_price` is set to 1.0, which should be interpreted as 1 wei = 1/10¹⁸ WETH (since WETH has 18 decimals) has a price of 1.0. Thus, this implies that all the `external_price` entries in all other tokens are with respect to wei.
* The external\_price of BAL is set to 0.005223351891153233, which means that 1/10¹⁸ of BAL has a price of 0.005223351891153233 wei.
* Finally, the external\_price of USDC is set to 214765397.01856124, which means that 1/10⁶ of USDC has a price of 214765397.01856124 wei. Note that this translates to 1 USDC having a price of 214765397.01856124 · 10⁶ / 10¹⁸ WETH, which gives that 1 USDC costs roughly 0.000214765397 WETH.

Note that all three tokens above are accepted for internalization. An example of a token not accepted for internalization is the following:\


```json
"0xbb0e17ef65f82ab018d8edd776e8dd940327b28b": {
    "decimals": 18,
    "alias": "AXS",
    "external_price": null,
    "normalize_priority": 0,
    "accepted_for_internalization": false,
    "internal_buffer": "34286468895881497336"
}
```



## <mark style="color:blue;">Orders</mark>

The "orders" key maps to a dictionary containing the set of user and liquidity orders in the batch. Each entry in the dictionary maps an order id (an arbitrary string) to the following:

* `"sell_token"`: a string denoting the token id of the token that is being sold in this order.
* `"buy_token"`: a string denoting the token id of the token that is being bought in this order.
* `"sell_amount"`: a stringified integer denoting the amount that is being sold, measured in terms of the smallest denomination of the token. For example, if the sell token is WETH, then a sell\_amount of 10¹⁶ means that the orders is selling 10¹⁶ wei = 0.01 WETH.
* `"buy_amount"`: a stringified integer denoting the amount that is being bought. Similar to the sell\_amount, it is measured in terms of the smallest denomination of the token.
* `"allow_partial_fill"`: a boolean indicating whether the order may be partially matched (_true_), or if it is Fill-or-Kill order (_false_).
* `"is_sell_order"`: a boolean indicating whether the order is a sell (_true_) or buy (_false_) order.
*   `"fee"`: the fee that can be charged to the order, if the order is eventually executed. It consists of the following:

    * `"amount"`: a stringified integer denoting the maximum fee amount;
    * `"token"`: the token id of the token in which the fee amount is denominated in. It always coincides with the sell token.

    We stress here that all fill-or-kill orders have a non-zero predetermined fee, while all partially-fillable orders have a zero fee, and the actual fee charged to the user is provided by the solvers when they propose an execution of such an order. More details are provided in the [next](output-batch-auction-solutions.md) section.
* `"cost"`:
  * `"amount"`: a stringified integer denoting the cost/gas overhead associated with executing the order; we clarify that this is only an estimate of the cost of moving the funds from and back to the user, and not the cost of interacting with AMMs etc, and is only meant to help solvers do a preliminary cost estimation when computing their solutions.
  * `"token"`: the token id of the token in which the cost amount is denominated in. On Ethereum mainnet, it always coincides with WETH.
* `"is_liquidity_order"`: a boolean that describes whether the order is a liquidity order.

An example Fill-or-Kill user limit buy order that buys [BAL](https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3d) by selling [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) is given below:

```json
"3": {
    "sell_token": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "buy_token": "0xba100000625a3754423978a60c9317c58a424e3d",
    "sell_amount": "2129248126",
    "buy_amount": "88967366419390071936",
    "allow_partial_fill": false,
    "is_sell_order": false,
    "fee": {
        "amount": "163784016",
        "token": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    },
    "cost": {
        "amount": "8193880727499585",
        "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    },
    "is_liquidity_order": false
}
```

The above entry should be interpreted as follows. It is an order with a unique index ("3"), and is a Fill-or-Kill order since the flag `allow_partial_fill` is set to `false`. Moreover, it is a buy order since the flag `is_sell_order` is set to `false`. Finally, this is a user order and not a liquidity order, since the flag `is_liquidity_order` is set to `false.`

Regarding the tokens traded, the sell token is [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) and the buy token is [BAL](https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3d). The entry above also specifies the amounts that are to be traded. We now explain the corresponding entries:

* `"buy_amount": "88967366419390071936"`: the user has signed that they want to buy 88967366419390071936 of BAL, where the amount is with respect to the smallest denomination of BAL. Since BAL has 18 decimals, this translates to 88967366419390071936 / 10¹⁸ ≅ 88.967 BAL tokens. So, if the order is executed, the user must receive this exact amount, since it is a Fill-or-Kill buy order.
* `"sell_amount": "2129248126"`: the user has signed that they are willing to sell at most 2129248126 of USDC, where again the amount is with respect to the smallest denomination of USDC. Since USDC has 6 decimals, this translates to 2129248126 / 10⁶ ≅ 2129.248 USDC tokens. So, if the order is executed, then the user should sell at most this amount of USDC.

On top of that, the user is willing to pay a fee of 163784016 / 10⁶ ≅ 163.784 USDC tokens, as specified by the `fee` entry. Finally, the estimated cost for this transaction is 8193880727499585 / 10¹⁸ ≅ 0.00819 [WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), as specified by the `cost` entry, where we used the fact that WETH has 18 decimals.

## <mark style="color:blue;">AMMs</mark>

The "amms" key describes all the automated market makers that are made available for use by the Driver. This dictionary maps an AMM id to the current state (in the blockchain) of that AMM, which depends on the type of AMM. Currently, there are 4 different types of AMMs provided by the Driver:

#### Constant Product (Uniswap v2 pools)

A Constant Product pool describes [Uniswap v2 liquidity pools](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/how-uniswap-works), and consists of the following entries.

* `"kind"`: the type is set to “ConstantProduct”.
* `"reserves"`: a dictionary describing the reserves of the two tokens of the liquidity pool. More specifically, it maps each token id's of the AMM's tradeable tokens to the corresponding stringified integer amounts contained in each of the pools.
* `"fee"`: a stringified decimal number denoting the percent of the amount traded in the liquidity pool that must be paid for using it. For example, if we transfer an amount $$y$$ to the pool, then the amount blocked and used as a fee is equal to $$\mathrm{fee} \cdot y$$.
* `"cost"`: this entry is identical to the cost entry of an order (see above), and again is only meant to be used as an indicator of the cost. If the AMM is used, the total execution cost is computed via simulation (as described [here](https://docs.cow.fi/off-chain-services/in-depth-solver-specification/the-batch-auction-optimization-problem#ranking-of-solutions)).

We now give an example entry of such an AMM, corresponding to a pool of [BAL](https://etherscan.io/address/0xba100000625a3754423978a60c9317c58a424e3d) and [WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2). We again clarify that the amounts in the entry are with respect to the smallest denomination of each token.

```json
"2": {
    "kind": "ConstantProduct",
    "reserves": {
        "0xba100000625a3754423978a60c9317c58a424e3d": "15029485329226570078565",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "77271777745622945843",
    }
    "fee": "0.003",
    "cost": {
        "amount": "11700636799687864",
        "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    }
}
```

#### Weighted Product (Balancer weighted pools)

A Weighted Product pool describes [Balancer weighted pools](https://docs.balancer.fi/products/balancer-pools/weighted-pools) and has the following differences to the Constant Product pool described above,

* `"kind"`: the type is set to “WeightedProduct”.
* `"reserves"`: a dictionary, mapping the token id of each of the AMM's tradeable tokens to its balance (a stringified integer) and weight (a stringified decimal) of that reserve in the pool.

Follows an example entry of such an AMM, corresponding to a pool of [WTBC](https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599) (of weight 0.4), [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) (of weight 0.2) [BAL](https://etherscan.io/address/0xba100000625a3754423978a60c9317c58a424e3d) and [WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) (of weight 0.4).

```json
"52": {
    "kind": "WeightedProduct",
    "reserves": {
        "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
            "balance": "100000",
            "weight": "0.4"
        },
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
            "balance": "31791255",
            "weight": "0.2"
        },
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
            "balance": "17015250000000000",
            "weight": "0.4"
        }
    },
    "fee": "0.0055",
    "cost": {
        "amount": "14827198783080000",
        "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    }
}
```

#### Stable Pools

A Stable pool corresponds to [Curve/Balancer stable pools](https://dev.balancer.fi/resources/pool-interfacing/stable-pool), and has the following differences to the Constant Product pool described above,

* `"kind"`: the type is set to “Stable”.
* `"amplification_parameter"`: See [amplification coefficient](https://curve.fi/files/stableswap-paper.pdf).
* `"scaling_rates"`: See [getScalingFactors](https://github.com/balancer-labs/balancer-v2-monorepo/blob/80b0e1b129d575c313f59800ec7e19237a43c087/pkg/pool-utils/contracts/BasePool.sol#L523-L525).

An example of such an AMM between [DAI](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f), [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) and [USDT](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7) is given below.

```json
"82": {
    "kind": "Stable",
    "reserves": {
        "0x6b175474e89094c44da98b954eedeac495271d0f": "57547781481600490364402514",
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "53647594494263",
        "0xdac17f958d2ee523a2206206994597c13d831ec7": "46379090432227"
    },
    "scaling_rates": {
        "0x6b175474e89094c44da98b954eedeac495271d0f": "1000000000000000000",
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "1000000",
        "0xdac17f958d2ee523a2206206994597c13d831ec7": "1000000"
    },
    "amplification_parameter": "620",
    "fee": "0.0001",
    "cost": {
        "amount": "14827198783080000",
        "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    }
}
```

**Concentrated Pools**\
\
These pools correspond to Uniswap v3 pools.
