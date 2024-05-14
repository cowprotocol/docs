---
sidebar_position: 2
---

# Builder Fee Management Smart Contract

The contract's source code is available on [GitHub](https://github.com/cowprotocol/mev-blocker-till/) and is deployed at [`0x08cd77feb3fb28cc1606a91e0ea2f5e3eaba1a9a`](https://etherscan.io/address/0x08cd77feb3fb28cc1606a91e0ea2f5e3eaba1a9a#code).

The MEV Blocker Fee Management Smart Contract provides a framework for managing financial interactions between builders and the MEV Blocker service. This documentation guides builders through the process of engaging with MEV Blocker, from making initial deposits, to managing subscription fees, and eventually withdrawing their deposits if they choose to disconnect.

## Contract Overview

The smart contract is designed to handle:
- **Deposits** (bonds) from builders wishing to receive transaction order flow from MEV Blocker
- **Weekly billing** of subscription fees
- **Advertising** the price of the subscription
- **Payment** of dues by builders
- **Withdrawal** of deposits by builders who wish to disconnect

## Key Functionalities

### Joining MEV Blocker
Builders interested in joining must call the `join` function with a deposit of 10 ETH (or the specified initial bond amount). This deposit acts as a bond to cover potential late fees and penalties.

**Function to Use:**
```solidity
function join() payable external
```

### Billing and Subscription Fees
MEV Blocker will use the `bill` function on a weekly basis to update the bills of subscribed builders for the previous period and update the subscription fee for the next period. The new price will be applied as of the next block. The current price can be queried at any time.

**Functions for MEV Blocker billers:**
```solidity
function bill(address[] calldata ids, uint256[] calldata due, uint256 newPrice) external onlyBiller
```

Builders are responsible for monitoring their dues and ensuring timely payment through the `pay` function.
Bills remaining unpaid for >24h will result in the corresponding builder being disconnected. 

**Function for Builders:**
```solidity
function pay(address id) payable external
```

### Managing Dues and Withdrawals
Builders wishing to disconnect from MEV Blocker must first signal their intention by calling the `nope` function. After a waiting period of 7 days, they may withdraw their bond by invoking the `exit` function, provided all dues have been settled.

**Functions for Exiting:**
```solidity
function nope() external
function exit() external
```

### Handling Forced Payments and Penalties
The contract owner has the authority to withdraw from bonds or impose fines on builders for violations of the rules set forth by MEV Blocker.
The `fine` function includes a `to` address which facilitates direct reimbursement to affected parties.

**Functions for Contract Owner:**
```solidity
function draft(address id, uint256 amt) external onlyOwner
function fine(address id, uint256 amt, address to) external onlyOwner
```

## Usage Guide for Builders

1. **Making the Initial Deposit:** To participate, send a transaction with 10 ETH to the `join` function of the contract.
2. **Monitoring Subscription Fees:** Keep an eye on the advertised subscription fee and ensure sufficient funds are available to cover weekly dues.
3. **Paying Dues:** Use the `pay` function to settle your weekly dues. Ensure the correct amount is sent to avoid any disruptions in service.
4. **Withdrawing Deposits:** If you decide to disconnect, call `nope` to signal your intention. After 7 days, you can withdraw your deposit through the `exit` function, assuming all dues are cleared.

This documentation is intended to facilitate a smooth and informed engagement with the MEV Blocker service by builders. For further assistance or inquiries, builders are encouraged to contact the MEV Blocker team.
