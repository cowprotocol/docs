---
sidebar_position: 5
draft: true
---

# Schemas

All the instances and solutions of the batch auction problem are formatted in [JSON](https://www.json.org/json-en.html). In this section, we describe these schemas.

:::
More details can be found [here](https://docs.cow.fi/cow-protocol/reference/apis/solver).
:::

:::caution

To avoid precision loss, some numerical literals are encoded as strings, referred below as _stringified_.

:::

## Instances (input)

The instance json that solver engines currently receive contains six keys:
- "id"
- "tokens"
- "orders"
- "liquidity"
- "effectiveGasPrice"
- "deadline"

We now explain what each of these entries contains.

### `id`

This key is an (internal) integer identifier for the auction, that is encoded and sent as a string. In the case where the instance corresponds to a quote request, this identifier is set to ```null```.

### `tokens`

This key lists all tokens that appear in some order or AMM in the batch auction instance. It is a dictionary, mapping the token key (which is the smart contract address of the token) to the following information:

- `"decimals"`: an integer equal to the number of decimals of the token.
- `"symbol"`: a string denoting the shorthand name of the token (e.g., "WETH", "DAI")
- `"referencePrice"`: a float that corresponds to the price of the smallest denomination of the token with respect to a _reference token_ (for mainnet, the reference token is WETH, and its referencePrice is 1000000000000000000). Only tokens that are traded by at least a user order will necessarily have non-null referencePrice, while the rest of the tokens are allowed to have a `null` referencePrice. These prices are used when evaluating the quality of a given solution, and can be thought of as a way of converting and expressing all relevant quantities in WETH (note that, initially, the surplus of different orders can be denominated in different tokens), and aggregating them all in a single value, denominated in WETH.
- `"availableBalance"`: a "stringified" integer that describes the amount (in the token's lowest denomination) of the token currently stored in the settlement contract ([internal buffers](/cow-protocol/reference/core/definitions#buffers)). This information is relevant when a solver attempts to [internalize an interaction](#using-internal-buffers).
- `"trusted"`: this is a boolean flag that specifies whether the contract is willing to store the token as part of an [internalized interaction](#using-internal-buffers).

We now share two example token entries corresponding to [WETH](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) and [USDC]():

```json
"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    "decimals": 18,
    "symbol": "WETH",
    "referencePrice": "1000000000000000000",
    "availableBalance": "590308372204674634",
    "trusted": true
}
```
```json
"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
    "decimals": 6,
    "symbol": "USDC",
    "referencePrice": "449666048539228625975640064",
    "availableBalance": "2625685411",
    "trusted": true
}
```
We clarify a few things regarding the entries above.

- The referencePrice of a token, viewed in isolation, is just a number and does not have inherent meaning. However, the referencePrice suggests an (approximate) exchange rate between two tokens, and this is the reason these prices are used to convert everything to WETH. Specifically, we usually have that `WETH` has a referencePrice of 1000000000000000000, which should be interpreted as 1 wei = 1/10<sup>18</sup> `WETH` (since `WETH` has 18 `decimals`) has a price of 1000000000000000000.
- The `referencePrice` of `USDC` is set to 449666048539228625975640064, which means that one atom of USDC, i.e., 1/10<sup>6</sup> of 1 `USDC` has a price of 449666048539228625975640064, given that 1 wei has price 1000000000000000000. This suggests that 1 USDC is equal to referencePrice(USDC) * 10<sup>6</sup> / (referencePrice(WETH) * 10<sup>18</sup>) = 0.0004496660485392286 WETH, or equivalently, that 1 WETH is equal to 2223.87259 USDC.

:::note

Both tokens above are accepted for internalization.

:::

### `orders`

This key maps to a list containing the set of orders in the batch. Each entry in the dictionary corresponds to an order, which is a dictionary containing the following:

- `"uid"`: this is the unique identifier of the order.
- `"sellToken"`: a string denoting the address of the sell token.
- `"buyToken"`: a string denoting the address of the buy token.
- `"sellAmount"`: a stringified integer denoting the limit amount that is being sold, measured in terms of the smallest denomination of the token.
- `"buyAmount"`: a stringified integer denoting the limit amount that is being bought. Similar to the `sellAmount`, it is measured in terms of the smallest denomination of the token.
- `"feeAmount"`: a stringified integer denoting the signed fee attached to the order, which is always denominated in the `sellToken`.
- `"kind"`: a string of the set {"sell", "buy"}, describing whether the order is a `sell` or `buy` order.
- `"partiallyFillable"`: a boolean indicating whether the order may be partially matched (_true_), or if it is Fill-or-Kill order (_false_).
- `"class"`: a string of the set {"market", "limit", "liquidity"}, indicating the order class.

  We clarify here that all `market` and `liquidity` orders have a potentially non-zero predetermined fee, while all `limit` orders have necessarily zero signed fee, and the actual fee charged to the order is computed and provided by the solvers when they propose an execution of such an order. More details are provided in the [solutions section](#solutions-output).

An example Fill-or-Kill user limit buy order that sells 1000 [COW](https://etherscan.io/token/0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab) for at least 284.138335 USDC [USDC](https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3d) is given below:

```json
{
    "uid": "0xaa4eb7b4da14b93ce42963ac4085fd8eee4a04170b36454f9f8b91b91f69705387a04752e516548b0d5d4df97384c0b22b64917965a801c1",
    "sellToken": "0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab",
    "buyToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "sellAmount": "1000000000000000000000",
    "buyAmount": "284138335",
    "feeAmount": "0",
    "kind": "sell",
    "partiallyFillable": false,
    "class": "limit"
}
```

The above entry should be interpreted as follows. It is a Fill-or-Kill order since the flag `partiallyFillable` is set to `false`. Moreover, it is a sell order since its `kind` is set to `sell`. Finally, this is a `limit` order, meaning that it has a zero-signed fee, which implies that the solver is free to choose an appropriate fee to cover its execution cost. This means that, if executed, the user will send a total of 1000000000000000000000 COW atoms to the settlement contract and, no matter how much fee the solver will charge, the user is guaranteed to receive at least 284138335 USDC atoms.


### `liquidity`

This key is a list of all the publicly available AMMs/limit orders that are made available for use by the default implementation of the Driver, available to the solver engines that request such liquidity. Internally, this is also known as _baseline_ liquidity. Each entry describes the current state of an AMM or an existing public limit order. Currently, there are 5 different types of liquidity provided by the Driver:

- constant product pools, i.e., Uniswap v2 type pools on 2 tokens.
- weighted Product pools, i.e., Balancer type weighted product pools on N tokens.
- stable pools, i.e., Curve type stable pools on N tokens.
- concentrated liquidity pools, i.e., Uniswap v3 type concentrated liquidity pools on 2 tokens.
- foreign limit orders, i.e., external 0x type limit orders on 2 tokens.

More information about the exact descriptions of these pools can be found [here](https://docs.cow.fi/cow-protocol/reference/apis/solver).

### `effectiveGasPrice`

This key is a single entry that is a stringified integer describing the current gas price in wei.

### `deadline`

This key is a single entry that is a string corresponding to a time stamp. This timestamp specifies the deadline by which a solution to the auction is required. Responses that go beyond this deadline are considered invalid.


## Solutions (output)

The response of a solver engine is a dictionary that contains all the information that is needed to execute the proposed solution. There is a single key, "solutions", that maps to a list of proposed solutions; this means that a solver can propose multiple solutions. The simplest possible solution is the _empty solution_, which corresponds to the case where no orders are executed, and corresponds to the empty list, and looks as follows:

```json
{
"solutions":
    []
}
```
Each entry of the `solutions` list describes a solution, which is a dictionary that consists of the following.

### `id`

This key maps to a non-negative integer that can be thought of as an index of the proposed solution and must be unique for each proposed solution. E.g., if a solver decides to propose two solutions, they can use index 0 and 1.

### `trades`

This key maps to a list of all orders that were selected for execution. Each trade is a dictionary that contains the following entries:

- "kind": this is string of the set {"fulfillment", "jit"}, which corresponds to an order existing in the orderbook, or a just-in-time liquidity order placed by the solver, respectively.
- "order": in case of a "fulillment" trade, the `uid` of the order is provided here as a string. In case it is a just-in-time liquidity order, the specifications of the order are explicitly given as a dictionary; more details can be found [here](https://docs.cow.fi/cow-protocol/reference/apis/solver).
- "fee": this entry exists only for "fullilment" trades, and maps to a stringified integer describing the fee of the order (either pre-signed or solver computed), denominated in the sell token.
- "executedAmount": this is a stringified integer corresponding ....


EDITS STOP HERE.

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
