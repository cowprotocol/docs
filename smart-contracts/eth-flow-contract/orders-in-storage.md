# Orders in Storage

The eth-flow contract stores user orders as a mapping:

user order digest -> | either userAddress || userValidTo

&#x20;                    \| or     0x00…00     || anything (unset)

&#x20;                    \| or     0xff…ff     || anything (invalidated)

The same user can have multiple open orders.

If the user order digest happens to be the same as that of another order&#x20;

* user order digest: a hash of all user order parameters.\
  For simplicity it can be the same that we use currently in our exchange but for efficiency we might want to change this.
* userValidTo: the validity of the user order
* userAddress: the address of the user who owns the order
