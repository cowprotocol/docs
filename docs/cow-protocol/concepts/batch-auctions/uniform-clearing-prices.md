---
sidebar_position: 2
---

# Uniform Clearing Prices

Even though Ethereum transactions execute atomically, the unique design of AMMs means identical tokens pairs will trade for different prices within the same block.

Constant Function Market Makers (CFMMs), of which AMMs are an example, do not allow for simultaneous trade execution. Instead, trades must execute sequentially so that the CFMM can keep track of the token ratios within the liquidity pools and adjust their prices accordingly. Even though a block may have multiple trades of the same token pair, each trade will execute for a different price depending on the order in which its trades are settled against the liquidity pool.

The mechanism of CFMMs means the order of transactions is very important in determining prices, which in turn leads to Maximal Extractable Value (MEV) as a phenomenon. 

Batch auctions solve for this problem by ensuring all trades within a batch execute for the same uniform clearing price, making transaction order irrelevant. In theory, this practice could extend to the entirety of an Ethereum block, making transaction order irrelevant for all orders in a block. With CoW Protocol leveraging Batch Auctions, traders in Ethereum can now get the same price for the same token pairs they trade at the exact same block.
