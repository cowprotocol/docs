---
sidebar_position: 3
draft: true
---

import UnauditedCaution from "/docs/partials/_unaudited.mdx";

# Hooks

![CoW Hooks Promo](/img/hooks/promo.gif)

Following CoW Protocol roadmaps, we are excited to release a brand new and shiny feature: _CoW Hooks_.

If you’re excited by Uni v4’s announcement and can’t wait to experience the power of trade hooks, wait no longer. CoW Hooks are live **now**!

These hooks allow users to specify Ethereum calls (also known as an "inner transaction") alongside their orders that execute atomically before and after a CoW Protocol swap. These hooks come in two flavors - pre-hooks and post-hooks - and can be used to automate a wide variety of tasks.

## Pre-Hooks

These are hooks that execute at the start of the settlement, before the swap. Note that these are executed even before an order's signature is checked or sell tokens are transferred out of the user's account. This allows pre-hooks to be used to "set up" an order. For example:

- Using a Safe and executing a `SignMessageLib` transaction in order to pay for signing an on-chain order if, and only if, it gets executed
- Setting the required ERC-20 approvals to the CoW Protocol using EIP-2612 permit, so approvals are only set if the order executes
- Unstaking tokens just-in-time for trading
- Claiming an airdrop right before dumping

## Post-Hooks

**"Post-hooks"**: These are hooks that execute at the end of a settlement, after the swap completes. This means that the trade proceeds have already been transferred to the `receiver` address and can be used by the post-hooks. For example:

- Bridging trade proceeds to L2s
- Staking trading proceeds

It is also worth noting that additional fees for executing hooks are also charged in the sell token, just like regular order execution fees. So you don't need to hold any special token or additional ETH to make use of this feature!

# CoW Hooks FAQ

### Are CoW Hooks already live?

Yes, this feature is already live in Ethereum mainnet and Gnosis Chain. Although, for the time being, there is no user interface to leverage CoW Hooks. If you are interested in building one, contact us or apply directly for a grant at [grants.cow.fi](https://t.co/XVSMcOP9gx)

### Are there any existing mainnet examples of a CoW Hook?

Yes! Here is a [transaction](https://etherscan.io/tx/0x5c7f61a9364efdc841d680be88c0bd33ab6609b518f9c62df04e26fa356c57ac) ([CoW Explorer Order](https://explorer.cow.fi/orders/0xa4a6be09da793762bbeb8e55d1641c52c83e5a441388f5578f7038ab6c4073b4d0a3a35ddce358bfc4f706e6040c17a50a2e3ba564a7e172?tab=overview)) where the user is approving, swapping and bridging to Gnosis chain without having any ETH in the account and all in one transaction. If you want to check it out how it was done, make sure to [watch the video demo](https://www.youtube.com/watch?v=FT36lWtC1Oc).

### Are there any limitations on the contract calls that can be made with CoW Hooks?

You can make any contract calls. The caveat is that we "trampoline" the call from a different contract (meaning the call stack looks like `Settlement -> Trampoline -> Call`). This is because calling stuff directly from the settlement contract would have allowed clever users potentially take the contract funds.

This should allow semi-permissioned hooks (in that they can require`(msg.sender == HOOKS_TRAMPOLINE_ADDRESS, "not a settlement");` ).
