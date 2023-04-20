# Order Execution

After a user order is created, then the corresponding eth-flow contract order will be traded in CoW Swap.

The contract order uses EIP-1271 signatures.

The signature can be empty, since all information needed to verify the order can be found onchain.

Signature verification in a settlement works as follows:

1. The order digest is computed as part of the settlement process and is the message that is assumed to be EIP-1271-signed by the eth-flow contract. The digest is used to retrieve the owner and the validity from the [order mapping](orders-in-storage.md).&#x20;
2. The order validity is checked against the current timestamp.
3. The owner must be valid (should be set and not invalidated).

If all verification steps succeed, the order can be traded.

\
