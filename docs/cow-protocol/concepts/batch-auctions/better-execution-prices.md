---
sidebar_position: 3
---

# Better Execution Prices

Batch auctions are also designed to offer a better price over traditional CFMMs. Liquidity fragmentation poses a big problem for the DeFi space, forcing users to constantly check liquidity pools against each other to find the best prices. Batch auctions help solve liquidity fragmentation by matching orders peer-to-peer through Coincidence of Wants (CoWs), perhaps via complex ring trades, thus allowing these orders to share liquidity. If orders are not fully filled by CoWs, the protocol finds on-chain liquidity to complete the order. Also in this case, batching improves the execution by exploiting complementarities between the trades in the batch. For example, the most efficient way to exchange a given token for another may be to exchange the first token for USDC, then USDC for ETH, then ETH for the final token. Coincidence of wants may emerge in the intermediate step of this sequence of trades. Or two trades with the same buy and sell tokens can be executed together therefore saving on gas costs.

In essence, batch auctions turn the entire protocol into a giant barter economy where users can either trade directly against each other or most efficiently access the best onchain liquidity source.
