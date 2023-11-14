---
id: vault-relayer
sidebar_position: 2
---

import HistoricalFact from './_gpv2.md'

# GPv2VaultRelayer

<HistoricalFact />

## Architecture

The `GPv2VaultRelayer` contract is an important component used to protect user funds from malicious solvers. As previously mentioned, the `GPv2Settlement` contract allows using arbitrary on-chain liquidity through interactions (such as performing a swap on [Balancer V2](https://balancer.fi), or performing a Paraswap trade). If `Vault` and `ERC20` allowances were made directly to a `GPv2Settlement` contract, a malicious solver could drain user funds through the interaction mechanism. However, since these allowances are made to the `GPv2VaultRelayer` contract and interactions to the contract are strictly forbidden, malicious solvers have no direct access to user funds. The `GPv2Settlement` contract uses the `GPv2VaultRelayer` to withdraw user tokens only as part of the trade, which contains strong guarantees that the user's signed order parameters are respected.

The `GPv2VaultRelayer` has access to user balances through 3 mechanisms:

1. [Fallback ERC20 Allowances](#fallback-erc20-allowances)
2. [Balancer External Balances](#balancer-external-balances)
3. [Balancer Internal Balances](#balancer-internal-balances)

### Guarantees and Invariants

* The `GPv2VaultRelayer` is only able to transfer `ERC20` tokens to the `GPv2Settlement` contract

### Fallback ERC20 Allowances

The third and final method of approving tokens for CoW protocol is to use direct `ERC20` allowances to the `GPv2VaultRelayer`. This works like most other trading protocols, where for each token you want to sell, an allowance must first be approved for the `GPv2VaultRelayer` contract.

Orders with the `sellTokenBalance` flag set to `erc20` will withdraw using this process. The `buyTokenBalance` flag can also be set to `erc20` in order to receive trade proceeds directly in `ERC20` amounts.

### Balancer External Balances

The first mechanism that the `GPv2VaultRelayer` contract can use to withdraw user `ERC20` tokens is through `Vault` external balances. This works by having an `ERC20` allowance for the Balancer Vault, and a relayer approval for the `GPv2VaultRelayer` contract.

This allowance and approval combination allows the `GPv2VaultRelayer` contract to transfer `ERC20` tokens through the `Vault`. Roughly speaking, the process works in the following way:

1. `GPv2VaultRelayer` request to the Balancer Vault an `ERC20` transfer from the user account to the `GPv2Settlement` contract
2. The Balancer Vault verifies that the `GPv2VaultRelayer` contract is: <br />
   a. Authorized by Balancer governance to act as a relayer <br />
   b. The user has set an approval for that specific relayer
3. The Balancer Vault issues an `ERC20` transfer from the user account to the `GPv2Settlement` contract using the Vault's existing `ERC20` allowance

This system for withdrawing user funds has several advantages such as:

- It can reuse existing `Vault` `ERC20` allowances and doesn't require new ones specific to the CoW Protocol.
- Upgrades to the CoW Protocol contract would only require a single relayer approval for all tokens instead of individual `ERC20` approvals for each token being traded.
- The `GPv2VaultRelayer` approval can be revoked by a single transaction to the `Vault` instead of multiple transactions to each `ERC20` token for which the user wants to remove the approval.

Orders with the `sellTokenBalance` flag set to `external` will withdraw using this process.

### Balancer Internal Balances

The second mechanism is to use balances internal to the `Vault`. The Balancer V2 vault can accrue `ERC20` token balances and keep track of them internally in order to allow extremely gas-efficient transfers and swaps. The CoW Protocol contracts can make use of this in order to decrease the gas cost of settling a user order on-chain. In order for this to work, the user must approve the `GPv2VaultRelayer` contract and have internal `Vault` balances available.

Internal balances can be withdrawn from the `Vault` at any time for their `ERC20` equivalent amounts.

Orders with the `sellTokenBalance` flag set to `internal` will withdraw using this process. The `buyTokenBalance` flag can also be set to `internal` in order to receive trade proceeds in internal balances instead of `ER20` token balances.

## Data Types and Storage

Nil

## Functions

### For the Protocol

#### `transferFromAccounts`

This function is used for transferring `ERC20` tokens from users to the `GPv2Settlement` contract in the course of settling a batch auction.

```solidity
function transferFromAccounts(
   GPv2Transfer.Data[] calldata transfers
) external onlyCreator {
   vault.transferFromAccounts(transfers, msg.sender);
}
```

#### `batchSwapWithFee`

This function is used in the course of settling a single trade on-chain. It is called by the `GPv2Settlement` contract and is used to perform a batch swap on the Balancer V2 vault. The function is defined as:

```solidity
function batchSwapWithFee(
   IVault.SwapKind kind,
   IVault.BatchSwapStep[] calldata swaps,
   IERC20[] memory tokens,
   IVault.FundManagement memory funds,
   int256[] memory limits,
   uint256 deadline,
   GPv2Transfer.Data calldata feeTransfer
) external onlyCreator returns (int256[] memory tokenDeltas)
```

## Indexing

Nil

## Off-chain

Nil
