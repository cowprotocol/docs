# High Level Description

A smart contract handles ETH sell orders for the user.

The user interacts with it to deposit ETH and at the same time to set the parameters of the order.

Our exchange settles the user order through the eth-flow contract.

The proceeds will go to the user and not to the exchange because we specify the user as the receiver in the eth-flow contract orders.

\
