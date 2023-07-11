# Smart Contract Wallet Orders

The spirit of ERC-1271 support in CoW Protocol was to enable Smart Contract wallets like to be able to trade on CoW Protocol and CoW Swap. Each individual Smart Contract wallet would then be able to implement their own signature validation scheme, for example:

* Wallet owner indicates that some hash is trusted by executing an on-chain transaction
* Wallet accepts all signatures from a specific domain
* Owner off-chain signatures that are verified by the Smart Contract wallet

Specifically, the Safe v1.3 uses the latter for verifying signatures. Because the Safe uses off-chain owner ECDSA signatures for signature verification, this means that it is possible to trade "gas-less-ly" on CoW Protocol with the Safe.

### Safe

Safe signature verification is done on a special EIP-712 `SafeMessage`. This just wraps the same order digest that we used before for both ECDSA and ERC-1271 signature verification. This makes the process very similar to what we had before for EOAs:

1. Like before, prepare your order, i.e. the structured order data
2. Like before, hash this structured data into a 32-byte digest
3. Unlike before, we "wrap" this digest in a `SafeMessage`
4. Like before, we generate an ECDSA signature with our EOA's private key

<figure><img src="../../.gitbook/assets/image (4) (1).png" alt=""><figcaption></figcaption></figure>

For multi-owner Safes, you would just collect a bunch of these signatures and concatenate them together.

<figure><img src="../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

For verification, the CoW Protocol settlement contract would call the ERC-1271 `isValidSignature` function implemented in the Safe Smart Contract and:

1. Pass in the concatenated owner ECDSA signatures as the `signature` bytes
2. The Safe would, for each signature decoded from the `signature` bytes:
3. ECDSA recover the signer address
4. Verify that the signer is an owner
5. And finally, to verify the signature, it would make sure that the total number of signatures it got is greater than the owner threshold.

We see that this already works today in CoW Protocol, for example order [`71cff264`](https://barn.explorer.cow.fi/goerli/orders/0x71cff2646c6ca7b26844fdada874db8f20ff10cc831ffc8ba381b77dc185279fd64d6de7a7630d7a63f133b882ac44427d88555562e77d0e).
