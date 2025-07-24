---
sidebar_position: 1
---

# How it works

MEV Blocker's transaction flow can be broken down into 6 main steps. The image below shows a general overview of the flow of a transaction.

![The Best Protection Under the Sun](/img/mevblocker/mevblocker_ofa.png)

### 1. Builders pay subscription fee and connect to MEV Blocker

Connected builders pay a weekly fee for MEV Blocker access, calculated per block won as a percentage of the previous period's average per-block value of MEVBlocker flow. The fee is computed monthly and posted onchain weekly, and is based on verifiable public data (e.g., Dune query).

### 2. Order Flow Originators connect to MEV Blocker RPC Endpoint/s

Order flow originators can submit transactions via public endpoints without an API key or third-party permission.

### 3 MEV Blocker Private Mempool Action - Hiding txs from searchers

MEV Blocker RPC shares the transaction (without signature) with a permissioned or permission-less set of searchers (depending on the endpoint). It enhances security by mixing real and AI-generated fake transactions together.

Depending on the type of transaction, additional details may be hidden:  

- In the case of swaps, MEV Blocker removes some sensitive information (such as slippage tolerance) from the transaction, preventing sandwich attacks

- If the transaction is unlikely to receive a backrun, MEV Blocker doesn't share it with searchers at all 

In a permissionless environment, searchers can’t be prevented from misusing shared data, so fake transactions add uncertainty to the data. Since searchers can’t distinguish real from fake, they risk acting on transactions that may never reach the chain, discouraging frontrunning attempts.

#### 3.1 Transactions get forwarded to MEV Blocker connected Searchers & Builders

Transactions are shared with searchers for backrunning and sent directly to builders for the fastest inclusion.
 
### 4. Searchers provide Backrunning Bids for the flow

After receiving the orders, searchers proceed to crunch their numbers and give their bundles back to MEV Blocker. Searchers are competing for the most profitable option and if they spot a backrun opportunity (real or fake), they submit a bundle to MEV Blocker RPC.

The searcher that provides the bundle with the highest rebate value for users gets selected as the winner (NOT the searcher that pays the highest fee to the validator).

### 5. Searcher bundles get forwarded to builders to be included in the next block

In this step, the MEV Blocker system gathers all the searcher bundles, discards those containing fake transactions, and attaches the user signatures back to the transactions. 

In order to have their bundles forwarded to builders, searchers bid an arbitrary amount denominated in ETH. In theory, searchers have an internal valuation of the bundle's backrun value that is larger than their bid — otherwise they wouldn't bid at all. 

Once the builder has selected a searcher bundle bid, they are obligated to refund 90% of that bid's value to the user and use the remaining 10% to pay the validator/proposer. 
  

### 6. MEV Blocker Txs Assembly

MEV Blocker discards bundles with fake transactions, forwarding only real ones. It also re-adds the transaction signature, preventing searchers from bypassing the system and ensuring MEV rebates reach users. The builder selects the bundle with the highest kickback to the user for on-chain inclusion.

### 7. Builders Receive Txs and Bundles

Builders receive individual transactions and bundles from MEV Blocker. Per OFA rules, they must replace any bundle with a higher-paying one during block-building. They also execute a transaction that pays 90% of the backrun value to the user. Unlike per-transaction fee models, MEV Blocker’s per-block fee lets builders prioritize inclusion speed and backrun generation without transaction-level cost concerns.

* If the highest paying bundle no longer simulates correctly on the top of the block (e.g. because the submitted transaction route is no longer available), a lower paying bid can still be included. This ensures that users get the highest possible reward without delayed execution (it's also possible for a user to get multiple refunds in a single block).

### 8. Transaction Inclusion Onchain

Builders execute the user transaction, backruns, and MEV refund, which is automatically sent to tx.origin or the designated address. This ensures users and order flow providers receive 100% of the refund, with MEV Blocker taking no cut.

### 9. Final: MEV Blocker Gas Rebates for Orderflow Originators

MEV Blocker provides gas rebates to order flow providers by redistributing 90% of builder subscription fees that are attributable to the orderflow originator.

