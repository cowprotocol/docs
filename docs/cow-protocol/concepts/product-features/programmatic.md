---
slug: programmatic
sidebar_position: 4
---

# Programmatic orders

In addition to supporting normal wallets, CoW Protocol also supports smart contract wallets that implement [`ERC-1271`](../../reference/core/signing-schemes#erc-1271).
This means that users can place orders through smart contracts, which can be programmed to execute orders based on certain conditions. 
This allows for a wide range of use cases, including:

* **Verified price oracles**: Users can place orders that execute when certain conditions are met.
For example, a user can place an order that executes when the price of a token reaches a certain threshold

* **TWAP orders**: Users can place TWAP orders that execute over a certain time period.
For example, a user can place a TWAP order that executes over 24 hours

* **Stop loss orders**: Users can place an order that executes when the price of a token falls below a certain threshold

* **Native ETH orders**: Users can place orders with `ETH`, which is not supported by the CoW Protocol settlement contract, but is able to be traded through CoW Protocol thanks to an [intermediary smart contract](../../reference/contracts/periphery/eth-flow) that auto-converts `ETH` into `WETH` to later place an `ERC-1271` order (intent) on the user’s behalf
