---
sidebar_position: 2
draft: true
---

# Uniform Clearing Prices

Even though Ethereum transactions execute atomically, the unique design of AMMs means identical tokens pairs will trade for different prices within the same block.

Constant Function Market Makers (CFMMs), of which AMMs are an example, do not allow for simultaneous trade execution. Instead, trades must execute sequentially so that the CFMM can keep track of the token ratios within the liquidity pools and adjust their prices accordingly. Even though a block may have multiple trades of the same token pair, each trade will execute for a different price depending on the order in which its trades are settled against the liquidity pool.

The mechanism of CFMMs means the order of transactions is very important in determining prices, which in turn leads to Maximal Extractable Value (MEV) as a phenomenon. 

Batch auctions solve for this problem by ensuring all trades within a batch execute for the same uniform clearing price, making transaction order irrelevant. 
In theory, this practice could extend to the entirety of an Ethereum block: a block builder could order transactions in a way that minimize the difference in exchange rates of tokens that are traded more than once.
However, block builder incentives are currently set in a way to achieve the exact opposite: the larger the difference between highest and lowest price of an asset within a block, the more profit someone that buys the asset at its lowest and sells it at its highest price can extract.

With CoW Protocol leveraging Batch Auctions, traders in Ethereum can now get the same price for the same token pairs they trade at the exact same block and thus fundamentally reduce the amount of extractable value.
