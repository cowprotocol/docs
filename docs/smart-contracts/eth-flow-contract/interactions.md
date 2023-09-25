# Interactions

A user interacts with the contracts:

1. When creating an order. This is an onchain transaction with a gas cost that is borne by the user. (On top of the protocol fee.)
2. When deleting an order. Again a full Ethereum transaction with a gas cost that is borne by the user.

Our settlement contract interacts with the contract when settling an order. From the point of view of the protocol, this is just a standard order (signed with EIP-1271).
