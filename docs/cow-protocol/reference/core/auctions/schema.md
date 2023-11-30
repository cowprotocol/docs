---
sidebar_position: 5
---

# Schemas

All the instances and solutions of the batch auction problem are formatted in [JSON](https://www.json.org/json-en.html). In this section, we describe these schemas.

:::caution

To avoid precision loss, some numerical literals are encoded as strings, referred below as _stringified_.

:::

## Instances (input)

### `tokens`

This key lists all tokens that appear in some order or AMM in the batch. It is a dictionary, mapping the token id (the smart contract address of the token) to the following information:

- `"decimals"`: an integer equal to the number of decimals of the token, usually equal to 18 (more on this later).
- `"alias"`: a string denoting the shorthand name of the token (e.g., `WETH`, `DAI`)
- `"external_price"`: a float that corresponds to the price of the smallest denomination of the token with respect to a _reference token_. Only tokens that are traded by at least a user order will necessarily have an external price.
- `"normalize_priority"`: an integer that expresses the preference for the token to be used as the [numeraire](https://en.wikipedia.org/wiki/Num%C3%A9raire). The token with highest priority in the solution will have price set to 1. More on this later.
- `"accepted_for_internalization"`: this is a boolean flag that specifies whether the contract is willing to store the token as part of an [internalized interaction](#using-internal-buffers).
- `"internal_buffer"`: a "stringified" integer that describes the amount (in the token's lowest denomination) of the token currently stored in the settlement contract ([internal buffers](/cow-protocol/reference/core/definitions#buffers)). This information is relevant when a solver attempts to [internalize an interaction](#using-internal-buffers).

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

- `WETH` is preferred as to be the reference token, since its `normalize_priority` flag is larger than any other tokens. Its `external_price` is set to `1.0`, which should be interpreted as 1 wei = 1/10¹⁸ `WETH` (since `WETH` has 18 `decimals`) has a price of 1.0. Thus, this implies that all the `external_price` entries in all other tokens are with respect to wei.
- The `external_price` of `BAL` is set to 0.005223351891153233, which means that 1/10¹⁸ of `BAL` has a price of 0.005223351891153233 wei.
- Finally, the `external_price` of `USDC` is set to 214765397.01856124, which means that 1/10⁶ of `USDC` has a price of 214765397.01856124 wei. Note that this translates to 1 `USDC` having a price of 214765397.01856124 · 10⁶ / 10¹⁸ `WETH`, which gives that 1 `USDC` costs roughly 0.000214765397 `WETH`.

:::note

All three tokens above are accepted for internalization. Here's an example of a token **NOT** accepted for internalization:

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

:::

### `orders`

This key maps to a dictionary containing the set of user and liquidity orders in the batch. Each entry in the dictionary maps an order id (an arbitrary string) to the following:

- `"sell_token"`: a string denoting the token id of the token that is being sold in this order.
- `"buy_token"`: a string denoting the token id of the token that is being bought in this order.
- `"sell_amount"`: a stringified integer denoting the amount that is being sold, measured in terms of the smallest denomination of the token. For example, if the sell token is WETH, then a sell_amount of 10¹⁶ means that the orders is selling 10¹⁶ wei = 0.01 WETH.
- `"buy_amount"`: a stringified integer denoting the amount that is being bought. Similar to the sell_amount, it is measured in terms of the smallest denomination of the token.
- `"allow_partial_fill"`: a boolean indicating whether the order may be partially matched (_true_), or if it is Fill-or-Kill order (_false_).
- `"is_sell_order"`: a boolean indicating whether the order is a sell (_true_) or buy (_false_) order.
- `"fee"`: the fee that can be charged to the order, if the order is eventually executed. It consists of the following:

  - `"amount"`: a stringified integer denoting the maximum fee amount;
  - `"token"`: the token id of the token in which the fee amount is denominated in. It always coincides with the sell token.

  We stress here that all fill-or-kill orders have a non-zero predetermined fee, while all partially-fillable orders have a zero fee, and the actual fee charged to the user is provided by the solvers when they propose an execution of such an order. More details are provided in the [solutions section](#solutions-output).

- `"cost"`:
  - `"amount"`: a stringified integer denoting the cost/gas overhead associated with executing the order; we clarify that this is only an estimate of the cost of moving the funds from and back to the user, and not the cost of interacting with AMMs etc, and is only meant to help solvers do a preliminary cost estimation when computing their solutions.
  - `"token"`: the token id of the token in which the cost amount is denominated in. On Ethereum mainnet, it always coincides with WETH.
- `"is_liquidity_order"`: a boolean that describes whether the order is a liquidity order.

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

- `"buy_amount": "88967366419390071936"`: the user has signed that they want to buy 88967366419390071936 of BAL, where the amount is with respect to the smallest denomination of BAL. Since BAL has 18 decimals, this translates to 88967366419390071936 / 10¹⁸ ≅ 88.967 BAL tokens. So, if the order is executed, the user must receive this exact amount, since it is a Fill-or-Kill buy order.
- `"sell_amount": "2129248126"`: the user has signed that they are willing to sell at most 2129248126 of USDC, where again the amount is with respect to the smallest denomination of USDC. Since USDC has 6 decimals, this translates to 2129248126 / 10⁶ ≅ 2129.248 USDC tokens. So, if the order is executed, then the user should sell at most this amount of USDC.

On top of that, the user is willing to pay a fee of 163784016 / 10⁶ ≅ 163.784 USDC tokens, as specified by the `fee` entry. Finally, the estimated cost for this transaction is 8193880727499585 / 10¹⁸ ≅ 0.00819 [WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), as specified by the `cost` entry, where we used the fact that WETH has 18 decimals.

### `amms`

This key describes all the automated market makers that are made available for use by the Driver. This dictionary maps an AMM id to the current state (in the blockchain) of that AMM, which depends on the type of AMM. Currently, there are 4 different types of AMMs provided by the Driver:

#### Constant Product (Uniswap v2 pools)

A Constant Product pool describes [Uniswap v2 liquidity pools](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/how-uniswap-works), and consists of the following entries.

- `"kind"`: the type is set to “ConstantProduct”.
- `"reserves"`: a dictionary describing the reserves of the two tokens of the liquidity pool. More specifically, it maps each token id's of the AMM's tradeable tokens to the corresponding stringified integer amounts contained in each of the pools.
- `"fee"`: a stringified decimal number denoting the percent of the amount traded in the liquidity pool that must be paid for using it. For example, if we transfer an amount $$y$$ to the pool, then the amount blocked and used as a fee is equal to $$\mathrm\{fee\} \cdot y$$.
- `"cost"`: this entry is identical to the cost entry of an order (see above), and again is only meant to be used as an indicator of the cost. If the AMM is used, the total execution cost is computed via simulation.

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

- `"kind"`: the type is set to “WeightedProduct”.
- `"reserves"`: a dictionary, mapping the token id of each of the AMM's tradeable tokens to its balance (a stringified integer) and weight (a stringified decimal) of that reserve in the pool.

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

- `"kind"`: the type is set to “Stable”.
- `"amplification_parameter"`: See [amplification coefficient](https://curve.fi/files/stableswap-paper.pdf).
- `"scaling_rates"`: See [getScalingFactors](https://github.com/balancer-labs/balancer-v2-monorepo/blob/80b0e1b129d575c313f59800ec7e19237a43c087/pkg/pool-utils/contracts/BasePool.sol#L523-L525).

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

#### Concentrated Pools

These pools correspond to Uniswap v3 pools.

## Solutions (output)

The output of the solver is a dictionary that contains all the information that is needed to execute the solution. The simplest possible solution is the _empty solution_, which corresponds to the case where no orders are executed:

```json
{
  "orders": {},
  "foreign_liquidity_orders": [],
  "amms": {},
  "prices": {},
  "approvals": [],
  "interaction_data": [],
  "score": "0"
}
```

### `orders`

This key contains all orders that were selected for execution, and it is a required field. It maps to a dictionary, mapping each order id to a copy of the corresponding order input data, but containing two additional keys that specify the executed buy and sell amount. An example entry is given below.

```json
"3": {
    "allow_partial_fill": false,
    "buy_amount": "88967366419390071936",
    "buy_token": "0xba100000625a3754423978a60c9317c58a424e3d",
    "exec_buy_amount": "88967366419390071936",
    "exec_sell_amount": "2129248125",
    "exec_fee_amount": null,
    "is_liquidity_order": true,
    "is_sell_order": false,
    "sell_amount": "2129248126",
    "sell_token": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
}
```

:::note Partially-fillable orders

In the case of a partially-fillable order, solvers are also required to report a fee. This is due to the fact that the fraction of the order that will be executed is decided by the solver, so having a predetermined fee assigned to the order is not reasonable. For this reason, the "exec_fee_amount" entry cannot be null in the case of a partially fillable order, and instead it should be a stringified integer, describing the fee amount, always denominated in the sell token.

:::

### `foreign_liquidity_orders`

In order to allow solvers to build solutions that use additional liquidity orders, besides the ones contained in the input json, there is a "foreign_liquidity_orders" key that maps to a list of "orders", where each entry describes the liquidity order as well as the executed buy and sell amounts. This is a required field. An example entry is given below.

```json
"foreign_liquidity_orders": [
    {
        "order": {
            "from": "0x4242424242424242424242424242424242424242",
            "sellToken": "0x0101010101010101010101010101010101010101",
            "buyToken": "0x0202020202020202020202020202020202020202",
            "sellAmount": "101",
            "buyAmount": "102",
            "validTo": 3,
            "appData": "0x0303030303030303030303030303030303030303030303030303030303030303",
            "feeAmount": "13",
            "kind": "sell",
            "partiallyFillable": true,
            "signingScheme": "eip1271",
            "signature": "0x01020304"
        },
        "exec_sell_amount": "50",
        "exec_buy_amount": "51"
    }
]
```

We now clarify the meaning of some of the entries above:

- `"appData"`: this is a free 32-byte slot that does not, in any way, affect on-chain settlement. This might be utilized in the future to allow for additional functionality.
- `"signingScheme"` and `"signature"`: These two entries contain the relevant information for signing orders; the [signature scheme](../signing-schemes) used and the signature itself.

As a final comment, and similar to the liquidity orders provided by the Driver, foreign liquidity orders are always matched at limit price and do not contribute surplus to the objective function. Moreover, a solution containing only (foreign) liquidity orders is not considered valid.

### `amms`

This key maps to a dictionary containing all the AMMs that were used in the solution, their order of execution, as well as the traded amounts, and it is a required field. More specifically, all the information from the input is copied to the output entry, and there is an additional `execution` key that maps to a list of AMM _executions_ (note that an AMM involving 4 or more tokens may be executed more than once). Each AMM execution has the following parameters:

- `"buy_token"`: the token id of the token that the AMM is buying (receiving).
- `"exec_buy_amount"`: a stringified integer with the amount that the AMM buys.
- `"sell_token"`: the token id of the token that the AMM is selling (sending)
- `"exec_sell_amount"`: a stringified integer with the amount that the AMM sells.
- `"exec_plan"`: this entry helps to specify the order in which the different AMM interactions are to be executed. It consists of two entries (which can be thought of as coordinates), `"position"` and `"sequence"`, that are non-negative integers, and a third boolean entry labeled `"internal"`; the `internal` flag is discussed in the section below. The reason that two entries/coordinates are used is to more precisely describe potential dependencies among AMM orders. In particular, two AMM orders that have a different `sequence` entry are independent and their relative order of execution does not matter. However, for all AMM orders with the same `sequence` entry, the order specified by the `position` entry must be respected, i.e., all such orders must be executed sequentially, in increasing order of the `position` entry.

An example of a Constant Product AMM execution entry is given below.

```json
"7": {
    "cost": {
        "amount": "11700636799687864",
        "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    },
    "execution": [
        {
            "buy_token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "exec_buy_amount": "535272056568359078",
            "exec_plan": {
                "position": 0,
                "sequence": 0,
                "internal": false
            },
            "exec_sell_amount": "28000000000000001461",
            "sell_token": "0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab"
        }
    ],
    "fee": "0.003000",
    "kind": "ConstantProduct",
    "mandatory": false,
    "reserves": {
        "0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab": "2.296178e+23",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "4.375869e+21"
    }
}
```

#### Using internal buffers

We now discuss some additional functionality that solvers are allowed to use. Since the settlement contract holds balances of multiple tokens, solvers are in certain cases allowed to "internalize" an AMM interaction, in order to save on gas. More precisely, if there is an AMM interaction that buys token A and sells token B, a solver can decide to internalize the interaction if and only if the following two conditions are satisfied:

1. Token A is a safe token, i.e., the corresponding `"accepted_for_internalization"` flag is set to `true`. This means that the protocol is happy to store this token in the settlement contract.
2. There is enough balance of sell token B, i.e., at least as much amount as the sell amount of the AMM interaction. This is revealed by the `"internal_buffer"` entry in the token description.

If both conditions are satisfied, a solver can set the `"internal"` flag to `true` in order to internalize the interaction:

```json
"internal": true
```

In such a case, the driver will remove the interaction, and so the solution will end up using less gas, get better ranking, and also be risk-free (at least the part involving the internalized AMM interaction). We stress that the `exec_plan` coordinates must always be provided, even if the interaction will end up being internalized.

### `prices`

This key is a dictionary mapping each traded token id to its computed price in terms of the reference token, and it is a required field. Each price is an unsigned integer, and for scaling purposes, the numeraire is usually set to have a large enough value; usually, `WETH` is selected as the numeraire, which has 18 decimals, and so the price of 1 wei is set to 10¹⁸. We clarify here that this is arbitrary, and is just selected for convenience. We also stress that a solution need only contain prices for the tokens appearing in the executed user orders, and that solvers are free to choose the unit of measure they will use.

An example containing the computed prices of [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48), [BAL](https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3d) and [WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), where WETH is defined as the reference token, is given below.

```json
"prices": {
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "219193245742363509576247472",
    "0xba100000625a3754423978a60c9317c58a424e3d": "5245932598960804",
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "1000000000000000000"
}
```

The above entries should be interpreted as follows:

- 1 wei (3rd entry) has a price of 1000000000000000000 = 10¹⁸.
- The lowest denomination of `USDC` (1st entry), i.e., 1 / 10⁶ of `USDC`, has a price of 219193245742363509576247472 relative to the price of 10¹⁸ that wei has. This translates to 1 `USDC` having a price of $$\frac{219193245742363509576247472 \cdot 10^6}{10^{18} \cdot 10^{18}} \approx 0.000219193$$ `WETH`.
- The lowest denomination of `BAL` (2nd entry) is 1 / 10¹⁸ , and it has a price of 5245932598960804 relative to the price of 10¹⁸ that wei has. This translates to 1 `BAL` having a price of $$\frac{5245932598960804 \cdot 10^{18}}{10^{18} \cdot 10^{18}} \approx 0.005245933$$ WETH.

### `approvals`

In order to allow solvers to propose solutions that interact with contracts/pools that are not provided by the Driver, there are 2 additional sections in the solution file. The first is the "approvals" key and the second is the "interaction_data" key (covered below). We clarify that both are required fields.

The "approvals" key is a list where each entry consists of the following:

- `"spender"`: the address of the target contract that we authorize to trade some token on the settlement contract's behalf.
- `"token"`: the address of the token that we authorize.
- `"amount"`: a stringified integer that corresponds to the (minimum) amount we authorize the target contract to use. **We stress here** that currently the behavior is the following. If there is already sufficiently large (i.e., larger than the `"amount"` entry) allowance set by a previous settlement, then the approval is ignored altogether. On the other hand, if the current allowance is lower than `"amount"`, then the driver will set a maximum value for the approval (much larger than the actual `"amount"` specified by the entry); this allows for future gas savings.

  In case full control over approvals is required, a solver can skip this field and instead use a custom [interaction](#interaction_data) to set an exact approval.

An example is given below.

```json
"approvals": [
    {
        "token": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "spender": "0xe592427a0aece92de3edee1f18e0157c05861564",
        "amount": "3811321194"
    }
]
```

### `interaction_data`

In order to allow for more interactions (e.g., interacting with AMMs that are not provided by the Driver), the "interaction_data" key (which is a required field) maps to a list of encoded interactions, each consisting of the following:

- `target` : the address of contract that the solution interacts with (required field).
- `value`: a number corresponding to the ETH amount that the sender sends to the recipient; every ethereum transaction has such an entry, and thus, this is (almost always) set to zero "0x0" (required field).
- `call_data`: the encoded interaction data is given here as a string. (required field).
- `inputs`: a list of the tokens and amounts sent to the target contract (required field).
- `outputs`: a list of the tokens and amounts that are expected to be sent back to the settlement contract (required field).
- `exec_plan`: this entry is identical to the corresponding entry in the AMMs section, specifying the order in which the interactions must be executed, and is an optional field. We note that the "internal" flag can still be used here.
- `cost`: this entry is optional and can be used to describe the (estimated) cost of the interaction. This allows for solvers to express information regarding cost, and is mostly aimed to be used in cases where a solver is used as a price estimator as well. It consists of two keys, the "token" key that expresses the token in which the cost is express, and the "amount" key, which is the value describing the cost, in string format.

An example is given below.

```json
"interaction_data": [
    {
        "target": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
        "value": "0x0",
        "call_data": "0x..."
        "inputs": [
            {
                "amount": "9907695503532850274304",
                "token": "0x853d955acef822db058eb8505911ed77f175b99e"
            }
        ],
        "outputs": [
            {
                "amount": "6188703276265770703",
                "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
            }
        ],
        "exec_plan": {
            "sequence": 0,
            "position": 1
        },
        "cost": {
            "amount": "1000000000000000",
            "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        }
    }
]
```

### `score`

The score is the "bid" a solver makes for the batch in the [solver auction](rewards), as it will get ranked according to it. The protocol picks the solution with the highest score, given that it is strictly positive. The score is a required stringified integer denominated in wei. 
