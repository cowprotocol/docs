# Order Execution

After a user order is created, then the corresponding eth-flow contract order can be traded on our protocol.

This is done with EIP-1271 signatures.

The signature can be empty. All information needed to verify the order can be found onchain.

Then signature verification works as follows:

1. The parameters of the corresponding contract order are computed from those of the user order; they are used to:
   1. The order digest is computed by the settlement contract which is assumed to be trusted.
   2. Retrieve values validTo, owner in the [order mapping](https://docs.google.com/document/d/1D9P6A-X\_sjZyV7i\_f7XTZx5o7znFgRbNVJghHtBcy7U/edit#heading=h.7yie1ea3yx14)
2. The only validation required is that the owner retrieved from the order mapping is valid (not invalidated nor unset).
3. validTo is checked with the current timestamp.

If all verification steps succeed, the order can be traded.

Note: there is no need to validate any amount for partially fillable order as the initial sell amount is consistent with the amount of ETH associated with the user order. If the order is partially fillable, the remaining amount is kept up to date by settlement contract itself and the fact that the contract order doesn’t change (and [order updates](https://docs.google.com/document/d/1D9P6A-X\_sjZyV7i\_f7XTZx5o7znFgRbNVJghHtBcy7U/edit#heading=h.lwdiuiwcz69x) account for any amount that is still untraded).

Note: the value check in step 2 guarantees that the order is not invalidated nor unset.

\
