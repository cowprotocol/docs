# Order Creation

The user calls a function on the eth-flow contract to create an order:

```
function createOrder(EthFlowOrder.Data order) payable
```

The parameters of the order creation struct can be seen [in the source code](https://github.com/cowprotocol/ethflowcontract/blob/v1.0.0/src/libraries/EthFlowOrder.sol#L19-L45) (together with their description) and are:

```
IERC20 buyToken
address receiver
uint256 sellAmount
uint256 buyAmount
bytes32 appData
uint256 feeAmount
uint32 validTo
bool partiallyFillable
int64 quoteId
```

All parameters have the same role as their namesake in the CoW Swap order struct with the exception of `quoteId`. The latter parameter is the quote id obtained when requesting a quote for this trade from the CoW Swap API.

As of now, eth-flow orders are not matched by the CoW Swap infrastructure unless the quote id refers to a valid and fresh quote in the API.

Some checks are performed on order creation. Failing any of these checks means that the transaction reverts.

1. The amount of ETH sent along with the transaction must be exactly what is needed to cover the sell amount plus the fees.
2. The order must be valid at the time the transaction is mined.

The order parameters are used to compute the order digest according to the [order mapping](user-and-eth-flow-contract-orders.md). As mentioned before, the call reverts if an order with the same digest already exists or is invalidated; otherwise a new order is added to storage:

```
user order digest -> validTo || msg.sender
```

\
