---
sidebar_position: 2
---

# Coincidence of Wants

**CoW (Coincidence of Wants)**: Thanks to CoW Protocol's batching mechanism, users can make  peer-to-peer swaps in cases where they're trading the same assets.

For example, if one trader in a batch wants to sell \$2,000 of DAI for 0.5 ETH and another trader in the same batch wants to sell 0.5 ETH for $2,000 DAI, CoW Protocol's solvers will match both traders together so they can swap assets without tapping into on-chain liquidity - saving them from incurring liquidity provider fees.

CoWs allow users to bypass liquidity provider (LP) fees and also reduce gas fees since orders only interact with CoW Protocol's smart contracts.

CoWs can be full or partial. In a partial CoW, only one of the trades in a batch is completely filled with opposing liquidity, and solvers must source liquidity to fill the rest of the other trade. 

## Types of CoWs


### Simple

![Simple CoW](/img/concepts/simple-cow.png)

A simple CoW is where two traders are each selling what the other is buying.
They swap assets with each other instead of interacting with AMM liquidity pools.
Simple CoWs can be either *complete*, where each trader is trading exactly the same amount that the other needs, or they can be *partial* where two traders are trading opposite assets but only one can have their full liquidity met through a CoW.
In the latter case, the rest of the trade goes on-chain to finish filling. 

### Batching

![Batching CoW](/img/concepts/batching-cow.png)

Often, a batch auction contains multiple intents from different users who all want to perform the same trade.
Instead of sending their trades individually one by one, solvers can batch all of the intents together and execute them as a single trade on-chain.
Although a batching CoW goes on-chain, this optimization reduces gas fees, as users trades interact with AMM smart contracts fewer times.

### Intermediate

![Intermediate CoW](/img/concepts/intermediate-cow.png)

An intermediate CoW occurs when there are "intermediate" trades that can be settled peer-to-peer. 
For example, if one party is trading CRV for USDT and another party is trading USDT for COW, the trades may require an intermediate "ETH" trade.
The first trader may need to go from CRV to ETH and then ETH to USDT.
The second trader may need to go USDT to ETH and then ETH to COW.
In this example, the ETH to USDT trade of the first trader and USDT to ETH trade of the second trader can be filled peer-to-peer as a CoW.   

### Multidimensional (Ring)

![Multidimensional CoW](/img/concepts/ring-cow.png)

A multidimensional CoW consists of three or more users and shares liquidity between each of their trades.
It often includes multiple assets and relies on the solvers to find the optimal path from each user to the next in order to maximize off-chain liquidity utilization. 

While some orders are filled entirely through a CoW, many are only partially filled peer-to-peer.
In these latter cases, solvers automatically go on-chain to source the rest of the liquidity necessary to finish filling the order.
