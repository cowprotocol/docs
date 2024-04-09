---
sidebar_position: 3
---

# Builder Fee Management Smart Contract

The contract's source code is available on [GitHub](https://github.com/cowprotocol/mev-blocker-till/) and is deployed at [`0x08cd77feb3fb28cc1606a91e0ea2f5e3eaba1a9a`](https://etherscan.io/address/0x08cd77feb3fb28cc1606a91e0ea2f5e3eaba1a9a#code).
:::

The MEV Blocker Fee Management Smart Contract provides a framework for managing financial interactions between builders and the MEV Blocker service. This documentation guides builders through the process of engaging with MEV Blocker, from making initial deposits, to managing subscription fees, and eventually withdrawing their deposits if they choose to disconnect.

### Contract Overview

The smart contract is designed to handle:
- **Deposits** (bonds) from builders wishing to receive transaction order flow from MEV Blocker
- **Weekly billing** of subscription fees
- **Advertising** the price of the subscription
- **Payment** of dues by builders
- **Withdrawal** of deposits by builders who wish to disconnect

### Key Functionalities

#### Joining MEV Blocker
Builders interested in joining must call the `join` function with a deposit of 10 ETH (or the specified initial bond amount). This deposit acts as a bond to cover potential late fees and penalties.

**Function to Use:**
```solidity
function join() payable external
```

#### Billing and Subscription Fees
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

#### Managing Dues and Withdrawals
Builders wishing to disconnect from MEV Blocker must first signal their intention by calling the `nope` function. After a waiting period of 7 days, they may withdraw their bond by invoking the `exit` function, provided all dues have been settled.

**Functions for Exiting:**
```solidity
function nope() external
function exit() external
```

#### Handling Forced Payments and Penalties
The contract owner has the authority to withdraw from bonds or impose fines on builders for violations of the rules set forth by MEV Blocker.
The `fine` function includes a `to` address which facilitates direct reimbursement to affected parties.

**Functions for Contract Owner:**
```solidity
function draft(address id, uint256 amt) external onlyOwner
function fine(address id, uint256 amt, address to) external onlyOwner
```

### Usage Guide for Builders

1. **Making the Initial Deposit:** To participate, send a transaction with 10 ETH to the `join` function of the contract.
2. **Monitoring Subscription Fees:** Keep an eye on the advertised subscription fee and ensure sufficient funds are available to cover weekly dues.
3. **Paying Dues:** Use the `pay` function to settle your weekly dues. Ensure the correct amount is sent to avoid any disruptions in service.
4. **Withdrawing Deposits:** If you decide to disconnect, call `nope` to signal your intention. After 7 days, you can withdraw your deposit through the `exit` function, assuming all dues are cleared.

This documentation is intended to facilitate a smooth and informed engagement with the MEV Blocker service by builders. For further assistance or inquiries, builders are encouraged to contact the MEV Blocker team.

### Contract Code
The contract code is provided below and is also available in the following [GitHub repo](https://github.com/cowprotocol/mev-blocker-till/) (link to be updated).
The contract is scheduled to be reviewed by Friday, April 5th, and could undergo some changes following the review.
The contract is expected to be deployed to the Ethereum mainnet by Monday, April 8th. The contract will be verified, and the contract address will be added to this document.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

contract MevBlockerFeeTill {
    // --- key invariant ---
    // this.balance == earned + sum(bonds)

    // --- events ---
    event LogNote(
        bytes4   indexed  sig,
        bytes32  indexed  arg1,
        bytes32  indexed  arg2
    ) anonymous;

    modifier note {
        _;
        assembly {
            // log an 'anonymous' event with no data and three indexed topics:
            // the selector and the first two args
            log3(0,
                 0,
                 shl(224, shr(224, calldataload(0))), // msg.sig
                 calldataload(4),                     // arg1
                 calldataload(36)                     // arg2
                )
        }
    }

    // --- auth ---
    address payable public owner;
    mapping (address => bool) public billers;
    modifier onlyOwner {
        require(msg.sender == owner, "not owner");
        _;
    }
    modifier onlyBiller {
        require(billers[msg.sender] == true, "not biller");
        _;
    }
    constructor(address _owner) {
        owner = payable(_owner);
    }
    function pass(address whom) external note onlyOwner {
        owner = payable(whom);
    }
    function rely(address whom) external note onlyOwner {
        billers[whom] = true;
    }
    function deny(address whom) external note onlyOwner {
        billers[whom] = false;
    }

    // --- bonding ---
    uint256 public wait = 7 days;
    mapping (address => uint256) public bonds;
    mapping (address => uint256) public noped;

    function join() payable external note {
        bonds[msg.sender] += msg.value;
        noped[msg.sender] = 0;
    }

    // --- billing ---
    event PriceUpdate(uint256 newPrice);

    mapping (address => uint256) public dues;
    uint256 public price;
    uint256 public earned;

    function bill(address[] calldata ids, uint256[] calldata due, uint256 newPrice) external onlyBiller {
        for (uint256 i = 0; i < ids.length; i++) {
            dues[ids[i]] += due[i];
        }
        price = newPrice;
        emit PriceUpdate(newPrice);
    }
    function unbill(address[] calldata ids, uint256[] calldata undue) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            dues[ids[i]] -= undue[i];
        }
    }
    function pay(address id) payable external note {
        dues[id] -= msg.value;
        earned += msg.value;
    }

    // --- forced payments ---
    function draft(address id, uint256 amt) external onlyOwner note {
        bonds[id] -= amt;
        dues[id] -= amt;
        earned += amt;
    }
    function fine(address id, uint256 amt, address to) external onlyOwner note {
        bonds[id] -= amt;
        payable(to).transfer(amt);
    }

    // --- withdrawing ---
    function nope() external note {
        noped[msg.sender] = block.timestamp;
    }
    function exit() external note {
        require(noped[msg.sender] != 0, "didn't nope");
        require(block.timestamp > noped[msg.sender] + wait, "too early");
        require(dues[msg.sender] == 0, "didn't pay");
        uint256 bond = bonds[msg.sender];
        bonds[msg.sender] = 0;
        payable(msg.sender).transfer(bond);
    }
    function reap() external note onlyOwner {
        uint256 amt = earned;
        earned = 0;
        payable(msg.sender).transfer(amt);
    }
}
```