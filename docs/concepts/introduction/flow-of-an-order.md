---
sidebar_position: 6
---

#### Flow of an order through CoW Protocol

****

Rather than creating executable on-chain transactions, CoW Protocol users submit their orders as signed “intent to trade” messages. This allows the solvers to find the optimal path for each trade before committing it to the chain. Let’s take a look at the flow of an order through CoW Protocol.

****

![](https://lh7-eu.googleusercontent.com/ubuzdTuV4gRQ5c9aAY7aD14uijgMszHtw7YQJ6UWtfiPfoIbpF252qwokcMtEMBg975XhS80Vz0JLdGItMoaH265hhGHzbII4ZjRs4OaR7yyy77rmp7DtryJCEdWxfKTfEpbgBRSKpkhkkPt8k8Mz6I)

****

There are 5 main steps to an order on CoW Protocol:

****

1. Users express an intent to trade, signing a message specifying the assets and amounts they want to trade, without committing to a specific execution path 
2. The protocol includes the user’s intent to trade in the CoW Protocol orderbook
3. The Auctioneer gathers multiple intent orders and groups them into a batch auction — meaning they will all settle on-chain together
4. Solvers receive the batch and begin finding the most optimal execution path for the various orders. The solvers compete with each other to offer the highest surplus for the orders and win the right to settle the batch on-chain
5. Once the time window to submit solutions is over, the auctioneer ranks all the solutions and selects the winning solver. The winning solver executes the orders on behalf of the users and settles the batch on-chain 

Once the winning solver executes the batch’s orders, users receive their tokens. This delegated trading module ensures users (including consumers, bots, smart contracts, and DAOs) always get the best prices for every trade. Letting solvers handle the heavy lifting means users don’t have to worry about gas prices, finding the best liquidity pool, or setting the optimal slippage. Solvers are also experts at avoiding MEV so users can rest assured they are protected from price exploitation. 
