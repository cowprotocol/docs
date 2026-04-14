---
sidebar_position: 2
---

# MEV protection

One of the main benefits of CoW Protocol is comprehensive MEV protection for every order. 

MEV, or maximal extractable value, is a form of price exploitation that affects token swaps and other types of transactions on Ethereum. MEV attacks happen when malicious traders (usually MEV bots) strategically place transactions before and after a user's order, manipulating the price of assets at the expense of the user — this is commonly known as a "[sandwich attack](https://blog.cow.fi/what-is-a-sandwich-attack-and-how-can-you-protect-yourself-b101c9a9b9b3)". To date, MEV is responsible for over a billion dollars in losses for everyday traders. 

MEV attacks happen on most major exchanges. However, CoW Protocol's unique trading model protects users from MEV in three main ways:

- **Uniform Clearing Prices**: If the same token pair (such as ETH-USDC) is traded multiple times in the same [batch](../introduction/fair-combinatorial-auction), the assets will clear for the same market prices for each trade in the same direction.
  This mechanism is called a "uniform directed clearing price" and it makes transaction order irrelevant, so MEV bots cannot re-order trades in order to extract a profit.
  Uniform directed clearing prices enable the Ethereum DeFi ecosystem to establish consistent prices for identical directed token pairs within the same block, addressing the inconsistency caused by the design of Constant Function Market Makers (CFMMs) like traditional Uniswap liquidity pools.
- **Delegated Trade Execution**: On CoW Protocol, bonded third parties known as [solvers](../introduction/solvers) execute trades on behalf of users.
  This means that users are never directly exposed to MEV on-chain (though the solvers may be).
  The winning solver is required to give users the price they signed or greater, meaning that solvers take on all price risk from potential MEV attacks.
  Solvers are professional parties, so they calculate the optimal slippage for each trade and match liquidity off-chain through CoWs or private market makers when possible in order to reduce MEV risk.
- **Coincidence of Wants**: MEV attacks rely on the dynamics of automated market makers (AMMs) for their price exploitation. When orders are matched peer-to-peer through a CoW, however, they don't tap into on-chain liquidity, and are therefore protected from MEV 

Read more about CoW Protocol's unparalleled MEV protection [on our blog](https://blog.cow.fi/how-cow-swap-solves-the-mev-problem-fd35b0127390). 
