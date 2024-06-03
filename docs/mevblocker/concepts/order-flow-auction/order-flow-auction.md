---
sidebar_position: 3
---

# MEV Blocker OFA

MEV Blocker's Transaction Flow can be broken down into 6 major steps. In the picture below you can find a general overview of the flow of a transaction.

![The Best Protection Under the Sun](/img/mevblocker/mevblocker_ofa.png)

## User submits the transactions

This is the first step, where the user creates the transaction:

1. If you are a normal user in which you have 100% control of all settings, you must first have installed the custom MEV Blocker RPC in your wallet. Learn more about how to do it here
2. If you are a wallet that sends the transaction on behalf of the user, then your code must have integrated the custom MEV Blocker RPC. Learn more about how to do it here
3. If you are a dApp that sends the transaction on behalf of the user - for example, because you use intents like CoW Swap - then your code must have integrated the custom MEV Blocker RPC. Learn more about how to do it here

* Otherwise, you can prompt your users to protect themselves by adding MEV Blocker using this simple JavaScript

## MEV Blocker system hides some information from searchers and mixes users' real transactions with AI-generated fake transactions

The third step is unique to MEV Blocker; no other RPC providers do this. In this step, the MEV Blocker system generates fake transactions that are then forwarded to searchers. The purpose of this step is to increase the cost of malicious activities: if a searcher tries to sandwich a transaction by sending the front-running part of the attack directly to builders, with some probability, it will be left with unwanted tokens because the transaction tried to sandwich is fake. On the other hand, an honest searcher who back runs a fake transaction faces no costs, as the MEV blocker does not forward these transactions (and their corresponding back running transaction) to builders. This mechanism allows the searchers' onboarding to be fully trustless and decentralized. Additionally, depending on the type of transaction, some transaction details may be hidden:

1. In the case of swap transactions, MEV Blocker removes some sensitive information (such as slippage tolerance) from the transaction so that it's not possible to effectively sandwich.
2. If the transaction is unlikely to receive a backrun but is vulnerable to sandwiching,  MEV Blocker doesn't share it with the searchers at all.


## Creating bundles

The MEV Blocker shares the transactions (fake and real) with  the searchers connected to the websocket, who proceed to crunch their numbers and create bundles containing the original transaction and their backrunning transaction. Searchers also bid an arbitrary amount denominated in ETH or the right to backrun a specific transaction.

## Forwarding the searcher's bundle for Builders to include them in the next block

In this step, the MEV Blocker system proceeds to gather all the bundles created by the searchers, discarding those containing the fake transactions the system created, and attach the remaining part of the user transaction - the signature - to the bundle so that block builders can create the block with them. Builders then decide what bundles to include in the block. To be connected to the MEV blocker, for each transaction, builders must always include the highest paying bundle plus any other bundle that simulates (see the builders' rules [here](https://docs.cow.fi/mevblocker/builders/rules)). After the builder has selected a searcher bundle bid, they are obligated to refund 90% of the value of that bid to the user, and use the remaining 10% of the value to pay the validator/proposer.


## Transaction inclusion on-chain

Once the block builders have received the transactions and decided which bundles to include in their block, the entire block is relayed to the proposers (validators), who then select the highest-paying block for on-chain execution.
