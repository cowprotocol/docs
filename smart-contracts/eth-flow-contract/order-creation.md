# Order Creation

The user calls a function on the eth-flow contract to create an order:

* function createOrder(user order) payable;
* user order is the parameters in the user order struct.

The user order parameters are used to compute the order digest. The call reverts if an order already exists or is invalidated at that order digest in the [order mapping](https://docs.google.com/document/d/1D9P6A-X\_sjZyV7i\_f7XTZx5o7znFgRbNVJghHtBcy7U/edit#heading=h.7yie1ea3yx14); otherwise a new order is added to storage:

user order digest -> user validTo || msg.sender

We could send only the user order digest instead of the full user order when creating orders. However, in order to recover the funds on cancellation the order must be validated (since we need to check if it was matched onchain). Requiring the full order now is a way to avoid loss of funds in case the order digest on order creation is not valid.

At this step, we want to validate that the amount of ETH sold in the order is consistent with msg.value. (This is done to avoid keeping track of the amount deposited by the user and make cancellation based on the sold amount.)

We also want to validate that the receiver is not zero. (All other parameters that need to be validated are constant so in practice we don’t want to make them part of the function input, but this is an optimization detail.)

Verifying that the order is not expired can be handled during signature verification to save gas.

\
