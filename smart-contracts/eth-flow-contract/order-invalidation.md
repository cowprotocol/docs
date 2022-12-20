# Order Invalidation

The function to invalidate an order and return the ETH to the order creator is:

```
function invalidateOrder(EthFlowOrder.Data order)
```

`order` is the same order struct used for [order creation](order-creation.md).

Invalidating an order also refunds all unused ETH to the original creator of the order.

Order can be invalidated in two ways:

1. The user who created the order calls this function. Every valid order can be invalidated at any time by its creator.
2. After the order is expired, any address can trigger its invalidation. This is done to allow CoW Swap to provide a service to automatically refund unmatched orders to the users.

Order validity and owner are recovered from the [order mapping](orders-in-storage.md).

Each order can be invalidated at most once and returns all funds that have not yet been used for trading.

After invalidation, the order is marked as invalid by setting the order mapping for the contract order digest to `invalidated`.
