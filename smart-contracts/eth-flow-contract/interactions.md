# Interactions

A user interacts with the contracts:

1. When creating an order. This is an onchain transaction with a gas cost that is borne by the user. (On top of the protocol fee.)
2. When deleting an order. Again a full Ethereum transaction with a gas cost that is borne by the user.
3. When updating an order. This is a gasless transaction, the user won't have to send a transaction onchain. (Still, the protocol has to execute a transaction on behalf of the user and these costs will be forwarded to the user in terms of fees.)

Our settlement contract interacts with the contract:

1. When settling an order. From the point of view of the protocol, this is just a standard order (signed with EIP-1271).
2. When updating an order for the user. If the user signs an order update, it must be executed onchain before it can be traded. This must be done by the protocol during the pre-interaction phase.
