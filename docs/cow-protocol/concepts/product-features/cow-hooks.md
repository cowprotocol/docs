---
sidebar_position: 3
---

# CoW Hooks

CoW hooks allow users to specify Ethereum calls (also known as an "inner transaction") alongside their orders that execute atomically before and after a CoW Protocol swap. These hooks come in two flavors:

**"Pre-hooks"**: These are hooks that execute at the start of the settlement, before the swap. Note that these are executed even before an order's signature is checked or sell tokens are transferred out of the user's account. This allows pre-hooks to be used to "set up" an order. For example:

* Using a Safe and executing a `SignMessageLib` transaction in order to pay for signing an on-chain order if, and only if, it gets executed
* Setting the required `ERC-20` approvals to the CoW Protocol using an `EIP-2612` permit, so approvals are only set if the order executes
* Unstaking tokens just-in-time for trading
* Claiming an airdrop right before dumping

**"Post-hooks"**: These are hooks that execute at the end of a settlement, after the swap completes. This means that the trade proceeds have already been transferred to the `receiver` address and can be used by the post-hooks. For example:

* Bridging trade proceeds to L2s
* Staking trading proceeds

It is also worth noting that any additional fees for executing hooks are also charged in the sell token, just like regular order execution fees. So you don't need to hold any particular token or extra `ETH` to use this feature!
