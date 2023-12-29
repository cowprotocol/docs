---
sidebar_position: 2
---

# MEV protection

One of the main benefits of CoW Protocol is comprehensive MEV protection for every order. 

There are three main features that protect users from MEV:

- **Uniform Clearing Prices**: If the same token pair (such as ETH-USDC) is traded multiple times in the same [batch](cow-protocol/concepts/introduction/batch-auctions), the assets will clear for the same market prices for each trade. This mechanism is called a “uniform clearing price” and it makes transaction order irrelevant, so MEV bots cannot re-order trades in order to extract a profit. Uniform clearing prices enable the Ethereum DeFi ecosystem to establish consistent prices for identical token pairs within the same block, addressing the inconsistency caused by the design of Constant Function Market Makers (CFMMs) like traditional Uniswap liquidity pools
- **Delegated Trade Execution**: On CoW Protocol, bonded third parties known as [solvers](cow-protocol/concepts/introduction/solvers) execute trades on behalf of users. This means that users are never directly exposed to MEV on-chain (though the solvers may be). The winning solver is required to give users the price they signed or greater, meaning that solvers take on all price risk from potential MEV attacks. Solvers are professional parties, so they calculate the optimal slippage for each trade and match liquidity off-chain through CoWs or private market makers when possible in order to reduce MEV risk
- **MEV Blocker Integration:** As a final defense against MEV, CoW Protocol utilizes [MEV Blocker](https://mevblocker.io/) for all order settlements on Ethereum. MEV Blocker is an RPC endpoint that bypasses the public mempool, protecting orders from MEV exploitation

Read more about CoW Protocol’s unparalleled MEV protection [on our blog](https://blog.cow.fi/how-cow-swap-solves-the-mev-problem-fd35b0127390).
