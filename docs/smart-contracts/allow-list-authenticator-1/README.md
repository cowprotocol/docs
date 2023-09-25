# Allow-list authenticator

The allow-list authenticator contract determines which addresses are solvers. Before executing any operation which is access-restricted to a solver, the settlement contract queries this contract to determine if the caller is a solver.

The allow-list authenticator is the only contract that is deployed as a proxy.

Eventually, we plan to deploy a new proxy implementation with the goal of making the choice of who is a solver more decentralized.

For example, we might introduce the option of becoming a solver for addresses that are willing to stake some funds as collateral.

The smart contract allows a manager to add or remove solvers with an on-chain transaction. The manager can be replaced in a transaction by the proxy owner or itself. Any of these actions emit the corresponding event.
