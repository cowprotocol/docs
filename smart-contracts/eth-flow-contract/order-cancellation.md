# Order Cancellation

The user who owns the order calls a function on the eth-flow contract to delete an order:

function deleteOrder(userOrder);

* userOrder is the full user order struct with all order data (sellToken, buyToken...).

Then order cancellation works as follows:

1. The parameters of the corresponding contract order are computed from those of the user order and the contract order digest; this is used for two things:
   1. retrieve values validTo, owner in the [order mapping](https://docs.google.com/document/d/1D9P6A-X\_sjZyV7i\_f7XTZx5o7znFgRbNVJghHtBcy7U/edit#heading=h.7yie1ea3yx14)
   2. retrieve filledAmount for this order from the settlement contract (note: all parameters are available to compute the orderUid from the digest)
2. The unsettled amount is computed from the order parameters and step 1b as amount - filledAmount, amount which is sent back to the user
3. The order is marked as invalid by setting the order mapping for the contract order digest to  invalidated&#x20;

New: this function should be extended so that anyone can cancel an order if the order is expired. This allows the protocol to refund the order amount without asking the user to send a transaction.

\
