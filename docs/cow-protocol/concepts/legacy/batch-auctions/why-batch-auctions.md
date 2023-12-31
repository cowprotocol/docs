---
sidebar_position: 1
draft: true
---

# Why Batch Auctions?

On CoW Protocol, users place orders off-chain which get collected and aggregated to be settled in batches. CoW Protocol replaces a central operator with an open solver competition for order matching. The term _solver_ refers to anyone who submits an order settlement solution for a batch. As soon as a batch is "closed for orders," meaning that it stops considering new orders, these solvers enter a competition to provide optimized solutions matching the orders in this closed batch.

## Benefits of Batch Auctions

Using batch auctions as a price finding mechanism has several benefits:

1. Establish a **uniform clearing price** for any token pair within the same block as a new primitive in DeFi.
2. **Improve prices over traditional DEX offerings** via Coincidence of Wants, as well as gas and liquidity flow optimizations.
3. Provide **MEV protection** because altering the order of the transactions in the batch does not affect its prices. Also, solvers bear the risk of MEV.
