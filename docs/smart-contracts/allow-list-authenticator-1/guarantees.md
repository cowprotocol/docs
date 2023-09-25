# Guarantees



1. **No user funds can be touched except for settling an order that was authorized by the user**

Users allow the vault relayer to trade their tokens. However, the settlement contract can only access user funds in the process of settling an order. An order is considered valid only if the user has explicitly authorized that order.&#x20;

1. **A user cannot get a settlement price that is worse than the limit price specified in the order**

When an order is traded, users always receive at least the amount of output tokens that they would receive if they had traded at the order limit price.

1. **Once an order is fulfilled, it cannot be traded again**

The smart contract keeps track of the filled amount of each order. If an order was traded, the filled amount is recorded. If a solver tried to settle the same order again, it would only be able to trade the amount that wasn't filled before.
