---
sidebar_position: 2
---

# MEV Blocker's Order Flow Auction

MEV Blocker's transaction flow can be broken down into 6 main steps. The image below shows a general overview of the flow of a transaction.

![The Best Protection Under the Sun](/img/mevblocker/mevblocker_ofa.png)

### 1. A user submits a transaction 

- Regular users who control 100% of their wallet settings must first have the custom MEV Blocker RPC installed in their wallets.
- Wallets that send transactions on behalf of users must have integrated the custom MEV Blocker RPC in their code.
- dApps that send transactions on behalf of users — such as intents protocols like CoW Swap — must also have the custom MEV Blocker RPC integrated in their code. 

*If the highest paying bundle no longer simulates correctly on the top of the block (e.g. because the submitted transaction route is no longer available), a lower paying bid can still be included to ensure the user gets the highest possible reward without delaying execution. It's also possible that a user gets multiple refunds in a single block*

### 2. MEV Blocker receives the transaction

### 3. MEV Blocker mixes real transactions with fake, AI-generated transactions

This step is unique to MEV Blocker. After receiving a transaction, the MEV Blocker system generates fake transactions to prevent probabilistic exploitation. 

In order for searchers to send rebates to users, they must first create the transaction bundle that captures the value. This requires searchers to have access to transaction details, however this privileged information means that searchers could, in theory, probabilistically extract value without following the MEV Blocker OFA rules. To avoid this, MEV Blocker generates fake transactions alongside the real ones, ensuring probabilistic exploitation is too costly. This mechanism serves as an additional protection mechanism for the user, and helps keep searcher onboarding fully trustless and decentralized. 

Depending on the type of transaction, additional details may be hidden:  

1. In the case of swaps, MEV Blocker removes some sensitive information (such as slippage tolerance) from the transaction, preventing sandwich attacks

2. If the transaction is unlikely to receive a backrun, MEV Blocker doesn't share it with searchers at all 

### 4. Transactions get forwarded to MEV Blocker searchers
 
The MEV Blocker system shares the transactions with all the searchers connected to the websocket. After receiving the orders, searchers proceed to crunch their numbers and give their bundles back to MEV Blocker. 

The searcher that provides the bundle with the highest rebate value for users gets selected as the winner (NOT the searcher that pays the highest fee to the validator). 

All searchers that return in time for builders to include their bundle in the next block have a chance to have their bid selected. 

### 5. Searcher bundles get forwarded to builders to be included in the next block

In this step, the MEV Blocker system gathers all the searcher bundles, discards those containing fake transactions, and attaches the user signatures back to the transactions. 

In order to have their bundles forwarded to builders, searchers bid an arbitrary amount denominated in ETH. In theory, searchers have an internal valuation of the bundle's backrun value that is larger than their bid — otherwise they wouldn't bid at all. 

Once the builder has selected a searcher bundle bid, they are obligated to refund 90% of that bid's value to the user and use the remaining 10% to pay the validator/proposer. 
  

### 6. Block builders propagate their block to the proposer

MEV Blocker forwards the bundles to all major builders who then select from the bundles based on their value — the higher a given block's value for the validator, the more likely it is to get selected. 
- If the highest paying bundle no longer simulates correctly on the top of the block (e.g. because the submitted transaction route is no longer available), a lower paying bid can still be included. This ensures that users get the highest possible reward without delayed execution (it's also possible for a user to get multiple refunds in a single block).  

### Final: Transaction inclusion on-chain

Once the block builders have received the transactions and decided which bundles to include in their block, the entire block is passed on via relays to the proposers (validators) who then select the highest paying block.

After selecting the "winning" block, the proposer proposes the block and all the transactions in that block get executed on-chain.

# The MEV Blocker Order Flow Auction in Action

MEV Blocker exists to prevent frontrunning and sandwich attacks, but also to provide rebates to users by capturing backrunning opportunities. MEV Blocker users receive 90% of the backrunning value they create. The rebate is sent to the transaction origin address (`tx.origin`) immediately in the same block.

Below is an example transaction where MEV Blocker captures a backrunning opportunity and sends a rebate to the user.  

## MEV Blocker rebates: A case study 

This backrun takes place in the sequence of transactions [three, four, and five at block height 16993297](https://eigenphi.io/mev/eigentx/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d,0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a,0xe0274c1e473b9eb14f4a3d8f2575afcec99c1c94726f175f3dcdf6aae6890a56?tab=block), immediately following a sandwich attack in transactions zero, one, and two. 

As shown in the image below, EigenPhi identifies the middle transaction (transaction four) as the backrun ("arbitrage") transaction. The `From` address of transaction three and the `To` address of transaction five are the same, and the gas fees  for transactions three and four are relatively high. 

![EigenPhi](/img/mevblocker/eigen_1.webp)

To get a visualization of the entire process, we've copied and pasted the hashes of these three transactions to the `Tx Hash` textbox of EigenTx and [used their "View Multi-Txs In One Chart" visualization feature](https://eigenphi.io/mev/eigentx/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d,0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a,0xe0274c1e473b9eb14f4a3d8f2575afcec99c1c94726f175f3dcdf6aae6890a56?rankdir=TB).

![EigenPhi](/img/mevblocker/eigen_2.webp)

This is what the [whole picture](https://eigenphi.io/mev/eigentx/multi/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d,0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a,0xe0274c1e473b9eb14f4a3d8f2575afcec99c1c94726f175f3dcdf6aae6890a56?rankdir=TB) looks like.

![EigenPhi](/img/mevblocker/eigen_3.webp)

The **first transaction, A0 to A7,** involves a user swapping ICE for STG.  The **second transaction, B0 - B3,** is the searcher backrunning the Uniswap V3 pool involved in the first transaction. To achieve this backrun, the searcher pays the builder 0.0198 ETH as a transaction fee, as shown in the 'Transaction Fee' section on [Etherscan's transaction overview](https://etherscan.io/tx/0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a) page and the 'State Difference' section of [Etherscan's transaction state page](https://etherscan.io/tx/0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a#statechange). Of this amount, 0.0037 ETH is the burnt fee, and the remaining 0.016 ETH is the builder's net reward, consistent with the 'State Difference.'

![EigenPhi](/img/mevblocker/eigen_4.webp)

Finally, **the third transaction, C0,** is the block builder, Builder0x69, returning a rebate to the user who initiated the first transaction. Taking the gas fee paid for the third transaction into account, the MEV rebate represented 90% of the backrunning value.

The steps involved in this trade are:

- **Interactions A0 - A7:**  A user swaps ICE for STG.

- **Interactions B0 - B3:** A searcher executes a backrunning transaction to capture the price change in the Uniswap V3 pool where the first transaction took place. The searcher captures 0.0216 WETH in arbitrage and pays 0.01981137 ETH as the transaction fee, of which 0.016 ETH is the builder's net reward.

* **Interaction C0:** Finally, in the third transaction, Builder0x69 sends a rebate of 0.014466 ETH to the original trader, as shown in the 'State Difference' on the [Etherscan's transaction state page](https://etherscan.io/tx/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d#statechange). The ratio of the MEV rebate is 0.014466 ETH / 0.016 ETH = 90%.

![EigenPhi](/img/mevblocker/eigen_5.webp)

It is worth noting that the user receives 0.013987 ETH, which is 0.00047859 ETH less than what the builder sent. The difference comes from the gas fee for the transaction.

![EigenPhi](/img/mevblocker/eigen_6.webp)

Special thanks to EigenPhi for creating this analysis.
