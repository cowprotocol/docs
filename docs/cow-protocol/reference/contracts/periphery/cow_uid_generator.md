---
id: cow-uid-generator
sidebar_position: 4
---

# CoWUidGenerator

A helper contract for calculating the same EIP-712 signature hash for a given user order that the GPv2SettlementContract expects.

## Architecture
This contract is a simple helper contract that:

- References the CoW Protocol settlement contract’s `domainSeparator`.
- Constructs a Gnosis Protocol v2 (CoW) order data struct on-chain.
- Determines whether the order is a sell or buy order based on `isSell`.
- Computes the EIP-712 hash that matches what the CoW Protocol uses to verify user signatures off-chain.

## Data Types and Storage

### `GPv2SettlementContract`
An interface for the [CoW Protocol settlement contract](../core/settlement.md).

```solidity
interface GPv2SettlementContract {
    function domainSeparator() external view returns (bytes32);
}
```

## Functions

### `getUid`
Constructs an order, determines if it is a sell or buy order, then computes the same EIP-712 hash used by CoW Protocol for verifying signatures. Returns both the EIP-712 digest and the ABI-encoded order.

```solidity
getUid(
    address sellToken,
    address buyToken,
    address receiver,
    uint256 sellAmount,
    uint256 buyAmount,
    uint32 validTo,
    bytes32 appData,
    uint256 feeAmount,
    bool isSell,
    bool partiallyFillable)
public view returns (bytes32 hash,  bytes memory encoded)
```

| **Parameter** | **Description** |
| --- | --- |
| `sellToken` | The token address being sold if the order is a sell order, or the token that the user owes if the order is a buy order |
| `buyToken` | The token the user will receive if the order is a sell order, or the token the user wants to buy if if the order is a buy order |
| `receiver` | The address to receive the bought tokens |
| `sellAmount` | The amount of `sellToken` being transferred |
| `buyAmount` | The amount of `buyToken` being transferred |
| `validTo` | Timestamp after which the order expires |
| `appData` |  Optional field used by users/dapps/wallets to attach meta-information to orders |
| `feeAmount` | Amount of fee to be charged. For sell orders the  |
| `isSell` | Indicates whether the order is a buy or sell |
| `partiallyFillable` | Indicates whether the order is partially fillable or fill-or-kill |

## Indexing
Nil

## Off-chain
Nil
