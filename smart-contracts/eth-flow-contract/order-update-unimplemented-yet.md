# Order Update (Unimplemented Yet)

Anyone can calls a function on the eth-flow contract to update an order:

function updateOrder(oldUserOrder, newUserOrder, deadline, signature);

* oldUserOrder is the full struct of the current user order with all order data (sellToken, buyToken...).
* newUserOrder is the full struct of of the order that will replace the current one.
* deadline is the time after which it won’t be able to use the signature to update this order
* signature is a signature for the following EIP-712-encoded struct containing:
*
  * oldUserOrderDigest
  * newUserOrderDigest
  * deadline

For the signature, we can reuse the same four schemes we implemented in the settlement contract (ethsign, eip-712, eip-1271, presign).

The verification procedure is as follows:

1. Compute the parameters of the corresponding contract order from those of the old user order and the contract order digest; this is used to:
2.
   1. retrieve values validTo, owner in the [order mapping](https://docs.google.com/document/d/1D9P6A-X\_sjZyV7i\_f7XTZx5o7znFgRbNVJghHtBcy7U/edit#heading=h.7yie1ea3yx14)
   2. retrieve filledAmount for this order from the settlement contract (note: all parameters are available to compute the orderUid from the digest)
3. Retrieve owner from signature.
4. The order mapping values for the old order (1a) is checked against old user order validTo, owner
5. Set the order mapping value for the old order to  invalidated
6. Check that the new order is valid (see verification steps in [order creation](https://docs.google.com/document/d/1D9P6A-X\_sjZyV7i\_f7XTZx5o7znFgRbNVJghHtBcy7U/edit#heading=h.qo3z99eyyob); the amount in the order should be the same as that retrieved in 1b)
7. Check that current time is before deadline.
8. Compute the parameters of the corresponding contract order from those of the new user order and the contract order digest
9. Check that the order mapping value for the new contract order in the order mapping is unset&#x20;
10. Set the order mapping values for the new contract order in the order mapping to new user order validTo || owner

Requirement: the new order must have a different contract order uid. It is easily possible that two orders have the same contract order uid (for example if the user only decides to change the validTo). In this case, the order needs to be updated, and the easiest thing to change is the appId. To do this, we can add a nonce parameter to the [appData meta-information](https://docs.google.com/document/d/1byrhnRMWhrT\_j45vXSpPprD2IBC2FGhpymNVBv-plMo/edit#heading=h.gjdgxs) that is just the hash of all parameters of the user order + the owner address + the timestamp.

Note: In principle we can treat order creation in the same way we treat order updates and accept signatures to create orders. This would be a way to create orders only from signatures, however the actual executor would have to provide ETH, so the benefits are limited.

Note: this function can be used to invalidate a previous signature by executing an update that only changes the order in a trivial way (e.g., changing the appId as discussed above. Since the previous signature is linked to the previous order, then invalidating the previous order (which happens on updating) means that an old signature cannot be applied anymore. (Note that an order cannot be un-invalidated.

&#x20;

Frontend flow

Eth-flow component:

User selects order parameters to place (token pair, amount, confirms prices, fees)

Frontend receives a quote for the parameters from the backend via api

Frontend initiates the user transaction with the quote, order parameters by calling: function createOrder(user order) payable;

Frontend follows up on the success of the order placement (either via transaction hash return or blockNative mempool updates)

Frontend checks status of order settlement by asking the backend for the order status

WETH flow component:

* Frontend initiates the transactions Approval + ETH > WETH wrap (Deposit) and follows up on their success
* If in expert mode, hand off signing all tx should be done, otherwise a guided workflow for the order
* Frontend uses the normal WETH flow
