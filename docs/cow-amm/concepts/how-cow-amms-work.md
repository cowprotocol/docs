---
sidebar_position: 2
---

# How CoW AMMs Work

## FM-AMMs

The [“Function-Maximizing” AMM](https://arxiv.org/abs/2307.02074) is a novel AMM mechanism that tackles the shortcomings of the CF-AMM design and eliminates LVR. The FM-AMM batches trades together, executing all the orders in a batch at the same uniform clearing price. This price is such that the AMM “moves up the curve” with each trade. Since anyone can submit trades to the FM-AMM while its batch is open, competition between arbitrageurs guarantees that FM-AMM always trades at the correct, equilibrium price.

## CoW AMM

CoW AMM is a production-ready implementation of an FM-AMM that supplies liquidity for trades made on CoW Protocol. Solvers compete with each other for the right to trade against the AMM. The winning solver is the one that moves the AMM curve higher.

CoW AMM pools are optimal for every token pair that is not stable-to-stable. Since volatility dictates the amount of LVR that takes place in any given liquidity pool, CoW AMM pools are most effective for volatile token pairs where arbitrage outweighs LP fees.

## Getting Started with CoW AMM

To facilitate easy liquidity providing, CoW DAO has partnered with Balancer to implement CoW AMMs into the Balancer ecosystem. LPs can [use the Balancer app](https://balancer.fi/pools/cow) to LP direclty on one of over a dozen liquidity pools. 

In the next section, LPs can learn how to create their own CoW AMM pools for brand new assets either on Balancer or outside the platform. 
