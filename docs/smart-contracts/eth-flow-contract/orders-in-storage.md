# Orders in Storage

The eth-flow contract stores user orders as a mapping:

order digest -> | either userAddress || userValidTo

&#x20;                    \| or     0x00…00     || anything (unset)

&#x20;                    \| or     0xff…ff     || anything (invalidated)

The same user can have multiple open orders.

Every `order digest` represents a single order in the eth-flow contract. It is computed by computing the CoW Swap order digest from the contract order that is derived from the user order parameters.

There could be two different eth-flow orders that end up having the same digest. In this case, only one of the two orders can be created and the contract would revert if trying to create the second one.&#x20;

`userValidTo` is the validity of the user order (note that changing the validity does not change the order digest).

`userAddress` is the address of the user who owns the order.
