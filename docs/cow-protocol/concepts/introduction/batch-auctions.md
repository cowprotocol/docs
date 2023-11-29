---
sidebar_position: 4
---

# Batch Auctions

CoW Protocol relies on batch auctions as a unique price-finding mechanism. Unlike traditional DEXs, where users submit orders directly on-chain, CoW Protocol collects and aggregates orders (intents) off-chain and settles them together in groups, known as _batches_. Instead of relying on a central operator, the protocol fosters open competition among solvers. Solvers are entities that compete to propose the best order settlement solutions for a batch. 

The two main benefits of adopting batch auctions as a price-finding mechanism are the possibility of enforcing Uniform Clearing Prices and additional efficiencies from Coincidence of Wants. Uniform clearing prices enable the Ethereum DeFi ecosystem to establish consistent prices for identical token pairs within the same block, addressing the inconsistency caused by the design of Constant Function Market Makers (CFMMs). Unlike other transactions executed atomically, CFMMs require sequential processing to determine token pool ratios and execute trades accordingly, resulting in varying prices within the same block. Batch auctions ensure uniform clearing prices, eliminating opportunities for MEV bots to reorder trades and exploit traders.

Additionally, CoW Protocol's batch auction mechanism aims to tackle liquidity fragmentation in DeFi. It allows traders to benefit from Coincidences of Wants (CoWs) by sharing liquidity across multiple orders. If there's insufficient liquidity, excess trades can tap into on-chain liquidity to fill the order. Essentially, CoW Protocol transforms trading into a vast barter economy where users can engage in peer-to-peer swaps or access specialized markets to complete their transactions. Notably, batch auctions facilitate the integration of off-chain interactions (CoWs) and on-chain interactions within the same transaction, offering a comprehensive solution for decentralized exchange trading.
