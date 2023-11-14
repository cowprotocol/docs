---
sidebar_position: 2
draft: true
---

# ComposableCoW

## Use cases

Currently a _smart contract_ interacting with CoW is required to either:

1. Call `GPv2Settlement.setPreSignature(orderUid)` (API signing type "pre-sign"); or
2. Implement `isValidSignature(bytes32,bytes)` (API signing type "eip1271"), where the `bytes32` parameter passed is the EIP-712 digest of the `GPv2Order.Data`.

Presently orders have been spawning new contracts on chain, necessitating the handling of basic `retrieve` / `cancel` functionality to recover assets. `Safe` already provides a best-in-class for this purpose, so let's not reinvent the wheel! 🛞

Use cases that this revised architecture seeks to enable include:

* Automatically swap token ABC for XYZ above a defined threshold balance of ABC.
* Good after time (`GAT`) orders (discrete orders, conditional on a starting time).
* TWAP by breaking orders into `n x GAT` orders.
* Private conditional orders (trailing stop loss)
* Wait4CoW orders (only matching an order with other CoW traders)
* Doing all the above simultaneously (`n x conditional orders`)