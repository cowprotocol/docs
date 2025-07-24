---
sidebar_position: 2
---

# Gas Rebates

## **Introduction to Ethereum Gas Fees**

All Ethereum transaction require a gas fee to get included onchain. This gas fee can be broken down into two categories: 

- **Base Fee**: A required network fee that automatically adjusts based on network demand for blockspace. The baseFee ensures that if transactions pay such fee, they are processed and included in a block.
- **Priority Fee**: An optional additional payment for builders to include your transaction faster than others. The priorityFee allows builders to tip make a more valuable block and hence, gives you a higher chance of fast inclusion in a block.

## **How MEV Blocker Recovers Priority Fees**

MEV blocker is the only RPC that has a permissionless Order Flow Auction for which both searchers and builders are bound to public rules. To this date, MEV Blocker processes around 10% of dailty Etherem transcations, and 

MEV Blocker currently protects and routes over 20% of all Ethereum mainnet transactions daily. It maintains strong relationships with top block builders — the entities responsible for selecting and packaging transactions into Ethereum blocks.

Through our wide-reaching network and direct integration with the transaction path, MEV Blocker is able to recover part of the Priority Fee that would otherwise be lost — all without introducing delays or compromising transaction speed.

As Ethereum evolves under the Proposer-Builder Separation (PBS) model, where validators (proposers) and block builders have distinct roles, gas pricing dynamics are shifting. While this opens the door for a more transparent and efficient fee market, users still often overspend to secure inclusion.

MEV Blocker steps in to bridge that gap — helping users recapture the excess between what they paid and what was actually needed, effectively unlocking refunds from the inefficiencies of the current gas fee system.
