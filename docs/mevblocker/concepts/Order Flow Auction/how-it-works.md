---
sidebar_position: 4
---

# How can MEV Blocker OFA give you 90% refund?

When trading on DEXes, it may not come to your mind that your transaction creates opportunities for searchers to profit by back-running your trade. The bigger your transaction's volume is, the more profit the searcher puts into their pocket. $3.2 million, the biggest atomic arbitrage MEV in 2022, is made as a pure profit by a back-running.

However, more and more projects are emerging to create a fairer MEV market. Take this MEV Blocker, for example; it claims not only to protect you from frontrunning and sandwich attacks but also that:

users of MEV Blocker receive 90% of the profit their backrunning opportunity creates (compared with 0% when not using MEV Blocker).The rebate is paid to the user that sent the transaction (tx.origin), immediately in the same block.

To prove this, using the EigenTx transaction visualizer, we analyze a series of transactions and show you how it happens.

## Under the Hood of MEV Blocker

This MEV rebating process is positioned at [3,4,5 at block height 16993297](https://eigenphi.io/mev/eigentx/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d,0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a,0xe0274c1e473b9eb14f4a3d8f2575afcec99c1c94726f175f3dcdf6aae6890a56?tab=block), immediately following a sandwich trade. From the information shown in the image below, we know that EigenPhi identifies the middle transaction as the back-run arbitrage; The From address of the first transaction and the To address of the third transaction are the same one; and the gas fees paid for the first two transactions are relatively high.

![EigenPhi](/img/mevblocker/eigen_1.webp)

You copy and paste the hashes of these three transactions to the Tx Hash textbox of EigenTx like this. Then you [can combine these three transactions’ token flow using EigenTx's “View Multi-Txs In One Chart” feature](https://eigenphi.io/mev/eigentx/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d,0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a,0xe0274c1e473b9eb14f4a3d8f2575afcec99c1c94726f175f3dcdf6aae6890a56?rankdir=TB).

![EigenPhi](/img/mevblocker/eigen_2.webp)

Voila, now you got the [whole picture](https://eigenphi.io/mev/eigentx/multi/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d,0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a,0xe0274c1e473b9eb14f4a3d8f2575afcec99c1c94726f175f3dcdf6aae6890a56?rankdir=TB) of these MEV Blocker transactions.

![EigenPhi](/img/mevblocker/eigen_3.webp)

The first transaction, A-0 to A-7, involved a user's trade, swapping ICE for STG. The second transaction, B-0 to B-3, was a back-run transaction executed by the searcher at a Uniswap V3 Pool involved in the first transaction. In this transaction, the searcher paid the builder 0.0198 ETH as a transaction fee, as shown in the ´Transaction Fee’ on [Etherscan's transaction overview](https://etherscan.io/tx/0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a) page and the ‘State Difference’ of [Etherscan's transaction state page](https://etherscan.io/tx/0xd2d1ef1cdaf4010ad2d00564145faa796ebceec33859fac210c39e01fe482b6a#statechange). Of this amount, 0.0037 ETH was the burnt fee, and the remaining 0.016 ETH was the builder’s net reward, consistent with the ‘State Difference.’

![EigenPhi](/img/mevblocker/eigen_4.webp)

Finally, the third transaction involved Builder0x69, who built this block and returned a rebate in Step C-0 to the user who initiated the first transaction. Taking the gas fee paid for the third transaction into account, the ratio of the MEV rebate is 90%.

The steps involved in this trade include: 

* Steps A-0 to A-7: A user initiated the first transaction to swap ICE for STG. 

* Steps B-0 to B-3: A searcher executed the second arbitrage transaction to back-run the price change in the Uniswap V3 Pool where the first transaction happened. The searcher got a revenue of 0.0216 WETH and paid 0.01981137 ETH as the transaction fee, of which 0.016 ETH was the builder's net reward.

* Step C-0: Finally, in the third transaction, Builder0x69, who built this block, transferred a rebate, 0.014466 ETH, as shown in the ‘State Difference’ on the [Etherscan's transaction state page](https://etherscan.io/tx/0x9b6c38fa2d335373e86823de1b8c2e4735d47ef304a63fcff796f2f565a9482d#statechange), to the user who initiated the first transaction. The ratio of the MEV rebate is 0.014466 / 0.016 = 90%.

![EigenPhi](/img/mevblocker/eigen_5.webp)

It is worth noting that the user only received 0.013987 ETH, which is 0.00047859 ETH less than what the builder transferred. The different amount was the transaction fee and was burnt.

![EigenPhi](/img/mevblocker/eigen_6.webp)

Special thanks to EigenPhi for creating this analysis.