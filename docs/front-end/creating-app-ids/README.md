# Creating App Ids

AppData is field is a bytes32 data include in all the orders: [**https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/libraries/GPv2Order.sol#L18**](https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/libraries/GPv2Order.sol#L18)

The AppData can be empty, if you don't want to include any metadata, or can contain an IPFS hash otherwise.

The clients/UIs would be responsible for uploading the metadata to IPFS, and include the 32 bytes of the [IPFS hash](https://docs.ipfs.io/concepts/hashing/) in the order.
