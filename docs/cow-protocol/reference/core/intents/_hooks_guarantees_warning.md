:::caution

Hook execution is not guaranteed, meaning that your order may still get matched even if the hook reverted. 
To ensure the execution of pre-hooks, make sure the trade is only possible if the hook is executed successfully (e.g. by setting the required allowance as part of it)

:::

:::caution

Hook execution is not enforced by the CoW Protocol smart contracts.
Solvers must include them as part of the [social consensus rules](../auctions/social-consensus).

:::