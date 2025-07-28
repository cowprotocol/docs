---
sidebar_position: 3
---

# Optimal Bidding

## Bidding Strategy for MEV Blocker-Connected Builders

To effectively compete in the block builder market, a builder connected to MEV Blocker must understand how to account for the MEV Blocker fee when setting bids. This guide outlines how to incorporate that cost into your bidding strategy under various flow scenarios.

### Setup & Assumptions

We simplify the environment to make the strategy intuitive — the conclusions still hold in expectation beyond these assumptions.

- Public Mempool Flow: 1 ETH per block (always available to all builders)
- Private Flow:  
  - With 50% probability, a block contains a MEV Blocker tx worth 1 ETH  
  - With 50% probability, a block contains a Private RPC tx worth 1 ETH
- Builders:
  - Builders A & B are connected to MEV Blocker and other Private RPC
  - Builder C is only connected to the public mempool
- MEV Blocker Cost: 0.1 ETH per block won — fixed fee regardless of block content
- Private RPC Cost: 90% of transaction value, paid only if a Private RPC tx is included

No other MEV is assumed, and builders are not subsidizing their bids.

### The Key Principle

If you are connected to MEV Blocker, you must adjust your bid for each block you win by subtracting 0.1 ETH, regardless of which transactions are in that block. This is because the MEV Blocker fee is charged per block won, not per transaction included. To remain competitive and avoid losses, you must lower your bid to reflect this fixed cost.

###  Optimal Bidding by Scenario
Let’s walk through what your bid should look like depending on the transactions present in the block.

#### Scenario 1: Public mempool + MEV Blocker + Private RPC transactions

- Total Value: 1 + 1 + 1 = 3 ETH
- MEV Blocker Fee: 0.1 ETH
- Private RPC Fee: 0.9 ETH (90% of 1 ETH)
- Adjusted Bid: 3 - 0.1 - 0.9 = 2 ETH

You win over builders without private flow (who can only bid 1 ETH).

#### Scenario 2: Public mempool + MEV Blocker Transactions

- Total Value: 1 + 1 = 2 ETH
- MEV Blocker Fee: 0.1 ETH
- Adjusted Bid: 2 - 0.1 = 1.9 ETH

Still beats the public-only builder who bids up to 1 ETH.

#### Scenario 3: Public mempool + Private RPC Transactions

- Total Value: 1 + 1 = 2 ETH
- MEV Blocker Fee: 0.1 ETH (paid even if no MEV Blocker tx)
- Private RPC Fee: 0.9 ETH
- Adjusted Bid: 2 - 0.1 - 0.9 = 1 ETH

Your access to Private RPC gives you edge despite the MEV Blocker fee.

#### Scenario 4: Public mempool Only transactions

- Total Value: 1 ETH
- MEV Blocker Fee: 0.1 ETH
- Adjusted Bid: 1 - 0.1 = 0.9 ETH

Public-only builders can bid up to 1 ETH — you’ll lose these blocks in rare cases, but MEV Blocker’s fee is carefully calibrated to ensure this happens infrequently.

#### Summary

| Scenario                        | Value in Block | Builder Cost        | Optimal Bid | Outcome                     |
|---------------------------------|----------------|----------------------|-------------|-----------------------------|
| MEV Blocker + Private RPC + Pub | 3 ETH          | 0.1 + 0.9 ETH        | 2.0 ETH     | You win                     |
| MEV Blocker + Public            | 2 ETH          | 0.1 ETH              | 1.9 ETH     | You win                     |
| Private RPC + Public            | 2 ETH          | 0.1 + 0.9 ETH        | 1.0 ETH     | You win                     |
| Public only                     | 1 ETH          | 0.1 ETH              | 0.9 ETH     | You lose (non-connected wins) |

## Conclusion

Always factor the 0.1 ETH MEV Blocker fee into your bid — even if the block has no MEV Blocker txs.

You’re never at a net loss in expectation when following this strategy correctly. You're simply shifting value from validators to MEV Blocker as the builder.