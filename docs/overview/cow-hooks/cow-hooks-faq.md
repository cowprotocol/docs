# CoW Hooks FAQ

### Are CoW Hooks already live?

Yes, this feature is already live in Ethereum mainnet and Gnosis Chain. Although, for the time being, there is no user interface to leverage CoW Hooks. If you are interested in building one, contact us or apply directly for a grant at [grants.cow.fi](https://t.co/XVSMcOP9gx)

### Are there any existing mainnet examples of a CoW Hook?

Yes! Here is a [transaction](https://etherscan.io/tx/0x5c7f61a9364efdc841d680be88c0bd33ab6609b518f9c62df04e26fa356c57ac) ([CoW Explorer Order](https://explorer.cow.fi/orders/0xa4a6be09da793762bbeb8e55d1641c52c83e5a441388f5578f7038ab6c4073b4d0a3a35ddce358bfc4f706e6040c17a50a2e3ba564a7e172?tab=overview)) where the user is approving, swapping and bridging to Gnosis chain without having any ETH in the account and all in one transaction. If you want to check it out how it was done, make sure to [watch the video demo](https://www.youtube.com/watch?v=FT36lWtC1Oc).

### Are there any limitations on the contract calls that can be made with CoW Hooks?

You can make any contract calls. The caveat is that we "trampoline" the call from a different contract (meaning the call stack looks like `Settlement -> Trampoline -> Call`). This is because calling stuff directly from the settlement contract would have allowed clever users potentially take the contract funds.

Currently the contract is the Safe's MultiSendCallOnly, but we are already testing with a dedicated trampoline contract: [https://github.com/cowprotocol/hooks-trampoline](https://github.com/cowprotocol/hooks-trampoline).

This should allow semi-permissioned hooks (in that they can require`(msg.sender == HOOKS_TRAMPOLINE_ADDRESS, "not a settlement");` ).
