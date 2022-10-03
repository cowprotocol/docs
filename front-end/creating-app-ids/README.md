# Creating App Ids

AppData is field is a bytes32 data include in all the orders: <mark style="color:blue;">****</mark> [<mark style="color:blue;">**https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/libraries/GPv2Order.sol#L18**</mark>](https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/libraries/GPv2Order.sol#L18)<mark style="color:blue;"></mark>

The AppData can be empty, if you don't want to include any metadata, or can contain an IPFS hash otherwise.

The clients/UIs would be responsible for uploading the metadata to IPFS, and include the 32 bytes of the [<mark style="color:blue;">IPFS hash</mark>](https://docs.ipfs.io/concepts/hashing/) in the order.
