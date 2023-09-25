# Introduction

CoW Protocol is a collection of smart contracts that settle user orders on-chain while leveraging other sources of liquidity. The goal of the protocol is bundling multiple user orders together to minimize fees deriving from using external liquidity sources and stave off miner-extractable value.

User orders are collected off-chain and settled at a later step by a solver. A solver is any of the addresses authorized to settle user orders together in GPv2. They are in charge of monitoring on-chain sources of liquidity and providing users the best on-chain prices in the case where the order cannot be matched perfectly with each other.

A settlement is a list of orders traded together, their prices, and the on-chain interactions necessary to retrieve external liquidity.

The protocol uses three smart contracts:

* **Settlement contract:** The entry point of GPv2. Collects and verifies user orders, interacts with on-chain liquidity, stores information on the state of the orders.
* **Allow-list authentication contract:** Determines which addresses are solvers.
* **Vault relayer contract:** The target of user allowances. It is called by the settlement contract to receive the funds of the orders. It is also closely integrated with the Balancer protocol and can use funds from Balancer.

The following tables contain the contract address for each network:

**Settlement Contract**

| Network      | Address                                    |   |
| ------------ | ------------------------------------------ | - |
| Mainnet      | 0x9008D19f58AAbD9eD0D60971565AA8510560ab41 |   |
| Gnosis Chain | 0x9008D19f58AAbD9eD0D60971565AA8510560ab41 |   |
| Rinkeby      | 0x9008D19f58AAbD9eD0D60971565AA8510560ab41 |   |

**Allow-list authentication contract**

| Network      | Address                                    |   |
| ------------ | ------------------------------------------ | - |
| Mainnet      | 0x2c4c28DDBdAc9C5E7055b4C863b72eA0149D8aFE |   |
| Gnosis Chain | 0x2c4c28DDBdAc9C5E7055b4C863b72eA0149D8aFE |   |
| Rinkeby      | 0x2c4c28DDBdAc9C5E7055b4C863b72eA0149D8aFE |   |

**Vault relayer contract**

| Network      | Address                                    |   |
| ------------ | ------------------------------------------ | - |
| Mainnet      | 0xC92E8bdf79f0507f65a392b0ab4667716BFE0110 |   |
| Gnosis Chain | 0xC92E8bdf79f0507f65a392b0ab4667716BFE0110 |   |
| Rinkeby      | 0xC92E8bdf79f0507f65a392b0ab4667716BFE0110 |   |



Each contract is described in more detail in its own section.
