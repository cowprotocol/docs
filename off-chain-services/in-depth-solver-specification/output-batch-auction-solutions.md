# Output: Batch auction solutions

The output is also formatted in JSON. We start with an example of how the simplest possible (i.e., empty) response looks like, and then describe the fields it contains.&#x20;

#### <mark style="color:blue;">How a valid empty solution looks like</mark>

Here, we give an example of the simplest possible valid output, which corresponds to the empty solution, in order to showcase the required fields.\


```json
{
  "orders": {},
  "foreign_liquidity_orders": [],
  "amms": {},
  "prices": {},
  "approvals": [],
  "interaction_data": [],
}
```

## <mark style="color:blue;">Executed orders</mark>

The "orders" key contains all orders that were selected for execution, and it is a required field. It maps to a dictionary, mapping each order id to a copy of the corresponding order input data, but containing two additional keys that specify the executed buy and sell amount. An example entry is given below.

{% code overflow="wrap" %}
```json
"3": {
    "allow_partial_fill": false,
    "buy_amount": "88967366419390071936",
    "buy_token": "0xba100000625a3754423978a60c9317c58a424e3d",
    "cost": {
            "amount": "8193880727499585",
            "token": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    },
    "exec_buy_amount": "88967366419390071936",
    "exec_sell_amount": "2129248125",
    "fee": {
            "amount": "163784016",
            "token": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    },
    "is_liquidity_order": true,
    "is_sell_order": false,
    "sell_amount": "2129248126",
    "sell_token": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
}
```
{% endcode %}

## <mark style="color:blue;">Foreign Liquidity orders</mark>

In order to allow solvers to build solutions that use additional liquidity orders, besides the ones contained in the input json, there is a "foreign\_liquidity\_orders" key that maps to a list of "orders", where each entry describes the liquidity order as well as the executed buy and sell amounts. This is a required field. An example entry is given below.

{% code overflow="wrap" %}
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
{% endcode %}

We now clarify the meaning of some of the entries above:

* `"appData"`: this is a free 32-byte slot that does not, in any way, affect on-chain settlement. This might be utilized in the future to allow for additional functionality.
* `"signingScheme"` and `"signature"`: These two entries contain the relevant information for signing orders; the scheme used and the signature itself. Some more information about signing orders can be found [here](https://docs.cow.fi/tutorials/how-to-submit-orders-via-the-api/4.-signing-the-order).

As a final comment, and similar to the liquidity orders provided by the Driver, foreign liquidity orders are always matched at limit price and do not contribute surplus to the objective function. Moreover, a solution containing only (foreign) liquidity orders is not considered valid.

## <mark style="color:blue;">Executed AMMs</mark>

The "amms" key maps to a dictionary containing all the AMMs that were used in the solution, their order of execution, as well as the traded amounts, and it is a required field. More specifically, all the information from the input is copied to the output entry, and there is an additional `execution` key that maps to a list of AMM _executions_ (note that an AMM involving 4 or more tokens may be executed more than once). Each AMM execution has the following parameters:

* `"buy_token"`: the token id of the token that the AMM is buying (receiving).
* `"exec_buy_amount"`: a stringified integer with the amount that the AMM buys.
* `"sell_token"`: the token id of the token that the AMM is selling (sending)
* `"exec_sell_amount"`: a stringified integer with the amount that the AMM sells.
* `"exec_plan"`: this entry helps to specify the order in which the different AMM interactions are to be executed. It consists of two entries (which can be thought of as coordinates), `"position"` and `"sequence"`, that are non-negative integers, and a third boolean entry labeled `"internal"`; the `internal` flag is discussed in the section below. The reason that two entries/coordinates are used is to more precisely describe potential dependencies among AMM orders. In particular, two AMM orders that have a different `sequence` entry are independent and their relative order of execution does not matter. However, for all AMM orders with the same `sequence` entry, the order specified by the `position` entry must be respected, i.e., all such orders must be executed sequentially, in increasing order of the `position` entry.

An example of a Constant Product AMM execution entry is given below<mark style="color:blue;">.</mark>

{% code overflow="wrap" %}
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
{% endcode %}

### **Using internal buffers**

We now discuss some additional functionality that solvers are allowed to use. Since the settlement contract holds balances of multiple tokens, solvers are in certain cases allowed to "internalize" an AMM interaction, in order to save on gas. More precisely, if there is an AMM interaction that buys token A and sells token B, a solver can decide to internalize the interaction if and only if the following two conditions are satisfied:\
\
1\. Token A is a safe token, i.e., a token from [this list](https://token-list.cow.eth.link/). This means that the protocol is happy to store this token in the settlement contract.

2\. There is enough balance of sell token B, i.e., at least as much amount as the sell amount of the AMM interaction.

If both conditions are satisfied, a solver can set the `"internal"` flag to `true` in order to internalize the interaction:\
\
`"internal": true`&#x20;

In such a case, the driver will remove the interaction, and so the solution will end up using less gas, get better ranking, and also be risk-free (at least the part involving the internalized AMM interaction). We stress that the `exec_plan` coordinates must always be provided, even if the interaction will end up being internalized.

## <mark style="color:blue;">Prices of the traded tokens</mark>

The "prices" key is a dictionary mapping each token id to its computed price in terms of the reference token, and it is a required field. Each price is an unsigned integer, and for scaling purposes, the numeraire is usually set to have a large enough value; usually, WETH is selected as the numeraire, which has 18 decimals, and so the price of 1 wei is set to 10¹⁸. We clarify here that this is arbitrary, and is just selected for convenience. We also stress that a solution need only contain prices for the tokens appearing in the executed user orders, and that solvers are free to choose the unit of measure they will use.

An example containing the computed prices of [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48), [BAL](https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3d) and [WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), where WETH is defined as the reference token, is given below.

```json
"prices": {
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "219193245742363509576247472",
    "0xba100000625a3754423978a60c9317c58a424e3d": "5245932598960804", 
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "1000000000000000000"
}
```

The above entries should be interpreted as follows:

* 1 wei (3rd entry) has a price of 1000000000000000000 = 10¹⁸.
* The lowest denomination of USDC (1st entry), i.e., 1 / 10⁶ of USDC, has a price of 219193245742363509576247472 relative to the price of 10¹⁸ that wei has. This translates to 1 USDC having a price of $$\frac{219193245742363509576247472 \cdot 10^6}{10^{18} \cdot 10^{18}} \approx 0.000219193$$ WETH.
* The lowest denomination of BAL (2nd entry) is 1 / 10¹⁸ , and it has a price of 5245932598960804 relative to the price of 10¹⁸ that wei has. This translates to 1 BAL having a price of $$\frac{5245932598960804 \cdot 10^{18}}{10^{18} \cdot 10^{18}} \approx 0.005245933$$ WETH.

## <mark style="color:blue;">Approvals</mark>

In order to allow solvers to propose solutions that interact with contracts/pools that are not provided by the Driver, there are 2 additional sections in the solution file. The first is the "approvals" key and the second is the "interaction\_data" key (covered below). We clarify that both are required fields.

The "approvals" key is a list where each entry consists of the following:

* `"spender"`: the address of the target contract that we authorize to trade some token on the settlement contract's behalf.
* `"token"`: the address of the token that we authorize.
* `"amount"`: a stringified integer that corresponds to the (minimum) amount we authorize the target contract to use. **We stress here** that currently the behavior is the following. If there is already sufficiently large (i.e., larger than the `"amount"` entry) allowance set by a previous settlement, then the approval is ignored altogether. On the other hand, if the current allowance is lower than `"amount"`, then the driver will set a maximum value for the approval (much larger than the actual `"amount"` specified by the entry); this allows for future gas savings.\
  \
  In case full control over approvals is required, a solver can skip this field and instead use a custom [interaction](output-batch-auction-solutions.md#interaction-data) to set an exact approval.

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

## <mark style="color:blue;">Interaction Data</mark>

In order to allow for more interactions (e.g., interacting with AMMs that are not provided by the Driver), the "interaction\_data" key (which is a required field) maps to a list of encoded interactions, each consisting of the following:

* `"target"` : the address of contract that the solution interacts with (required field).
* `"value"`: a number corresponding to the ETH amount that the sender sends to the recipient; every ethereum transaction has such an entry, and thus, this is (almost always) set to zero "0x0" (required field).
* `"call_data"`: the encoded interaction data is given here as a string. (required field).
* `"inputs"`: a list of the tokens and amounts sent to the target contract (required field).
* `"outputs"`: a list of the tokens and amounts that are expected to be sent back to the settlement contract (required field).
* `"exec_plan"`: this entry is identical to the corresponding entry in the AMMs section, specifying the order in which the interactions must be executed, and is an optional field. We note that the "internal" flag can still be used here.
* `"cost"`: this entry is optional and can be used to describe the (estimated) cost of the interaction. This allows for solvers to express information regarding cost, and is mostly aimed to be used in cases where a solver is used as a price estimator as well. It consists of two keys, the "token" key that expresses the token in which the cost is express, and the "amount" key, which is the value describing the cost, in string format.

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
