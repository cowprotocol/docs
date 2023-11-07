---
sidebar_position: 1
---


#### Why Batch Auctions?

On CoW Protocol, users place orders off-chain which get collected and aggregated to be settled in batches. CoW Protocol replaces a central operator with an open solver competition for order matching. The term “solver” refers to anyone who submits an order settlement solution for a batch. As soon as a batch is "closed for orders," meaning that it stops considering new orders, these solvers enter a competition to provide optimized solutions matching the orders in this closed batch.The number of batches the protocol executes depends on the trading frequency users choose. The shorter the expiry date of an order, the more batch auctions the protocol will conduct in order to settle the orders. If the expiry date is longer, the amount of batch auctions can be reduced as the protocol fits more trades in a single batch.

**What are the benefits of batch auctions?**

CoW Protocol uses batch auctions as a price finding mechanism in order to:

    1. Allow the DeFi space to establish a uniform clearing price for any token pair within the same block
    2. Improve prices over traditional DEX offerings through new economic mechanisms such as uniform clearing prices and Coincid
