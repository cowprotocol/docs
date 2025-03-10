---
sidebar_position: 1
---

# What is a flash loan?

A flash loan is a unique type of loan that is borrowed and repaid atomically within a single transaction on the blockchain.

Flash loans allow anyone with access to the blockchain to borrow assets without the need for collateral, provided that the loan is repaid before the transaction ends. If the loan is not repaid, the entire transaction is reverted, effectively canceling the loan.

Flash loans were standardized in [EIP-3156](https://eips.ethereum.org/EIPS/eip-3156), but not all providers follow this EIP. Many smart contracts that hold significant amounts of funds allow users to draw on them in flash loans:

| Protocol                | Fee Percentage | ERC-3156 Compliant | Documentation Link                                                                                                   |
|-------------------------|----------------|--------------------|----------------------------------------------------------------------------------------------------------------------|
| **Aave V3**             | 0.5%*          | No                 | [Aave Flash Loans](https://aave.com/docs/developers/flash-loans)                                                     |
| **Uniswap (FlashSwap)** | swap fee       | No                 | [Uniswap V3 Overview](https://docs.uniswap.org/contracts/v3/guides/flash-integrations/inheritance-constructors)      |
| **Balancer V3**         | 0%             | No                 | [Balancer Flash Loans](https://docs.balancer.fi/concepts/vault/flash-loans.html)                                     |
| **MakerDAO**            | 0%             | Yes                | [MakerDAO DSS Flash](https://docs.makerdao.com/smart-contract-modules/flash-mint-module)                             |
| **Euler**               | 0%             | Yes (via adapter)  | [Euler Flash Loans](https://docs-v1.euler.finance/developers/getting-started/integration-guide#eip-3156-flash-loans) |

* this fee could be potentially disabled

# Key features

- **Uncollateralized:** Unlike traditional loans, flash loans do not require any collateral, as they are designed to be repaid within the same transaction.
- **Transaction Reverts if Not Repaid:** If the loan is not repaid in full, the entire transaction (including borrowing and usage of funds) is reverted to the initial state, ensuring no loss for the lender.
- **Instantaneous:** Flash loans are executed and settled instantly. They are typically used for arbitrage, collateral swapping, or liquidity provision.
- **Using the Funds:** The user can perform various actions with the borrowed funds during the same transaction block, such as arbitrage, debt refinancing, or liquidating positions.

## Getting started

Wanting to place a flash loan order? Check out our [flash loan tutorial](/cow-protocol/tutorials/cow-swap/flash-loans). 
