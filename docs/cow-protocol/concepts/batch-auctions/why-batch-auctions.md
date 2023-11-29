---
sidebar_position: 1
---

# Why Batch Auctions?

On CoW Protocol, users place orders off-chain which get collected and aggregated to be settled in batches. CoW Protocol replaces a central operator with an open solver competition for order matching. The term _solver_ refers to anyone who submits an order settlement solution for a batch. As soon as a batch is "closed for orders," meaning that it stops considering new orders, these solvers enter a competition to provide optimized solutions matching the orders in this closed batch.

## Benefits of Batch Auctions

Using batch auctions as a price finding mechanism has several benefits:

1. Allow the DeFi space to establish a **uniform clearing price** for any token pair within the same block
2. Having the solver submit a single transaction containing multiple orders means their execution **can not** be reordered in search for MEV opportunities
3. **Improve prices over traditional DEX offerings** via gas and liquidity flow optimizations enabled by settling multiple orders together
