---
sidebar_position: 3
---

# CoW Hooks

CoW hooks allow users to specify Ethereum calls (also known as an "inner transaction") alongside their orders that execute atomically before and after a CoW Protocol swap. These hooks come in two flavors:

**"Pre-hooks"**: These are interactions that execute at the start of the settlement, before the swap. 
Note that these are executed even before an order's signature is checked or sell tokens are transferred out of the user's account. 
This allows pre-hooks to be used to "set up" an order. 
For example:

* Setting the required `ERC-20` approvals to the CoW Protocol using an `EIP-2612` permit, so approvals are only set if the order executes
* Unstaking tokens just-in-time for trading
* Claiming an airdrop right before dumping
* Using a [Safe](https://safe.global/) and executing a `SignMessageLib` transaction in order to pay for signing an on-chain order if, and only if, it gets executed

**"Post-hooks"**: These are interactions that execute at the end of a settlement, after the swap completes. This means that the trade proceeds have already been transferred to the `receiver` address and can be used by the post-hooks. For example:

* Bridging trade proceeds to L2s
* Staking trading proceeds

It is also worth noting that any network fees for covering the execution cost of your hooks are also charged in the sell token, just like regular order execution fees.
So you don't need to hold any particular token or extra `ETH` to use this feature!

:::caution

Hook execution is not guaranteed, meaning that your order may still get matched even if the hook reverted. 
To ensure the execution of pre-hooks, make sure the trade is only possible if the hook is executed successfully (e.g. by setting the required allowance as part of it)

:::

:::note

When placing _partially fillable_ orders with hooks, **pre-hooks will only be executed on the first fill**.
Therefore, your hook should ensure that the liquidity is sufficient for the entire order to be filled.
On the other hand, **post-hooks are executed on every fill**.

:::
