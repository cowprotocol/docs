---
sidebar_position: 1
---

# Intents

Rather than placing orders by ***signing a raw transaction*** that executes directly on-chain (i.e. as happens on Uniswap or SushiSwap), CoW Protocol users place orders by ***signing an “intent to trade” message*** that specifies parameters like the assets and amounts they would like to trade. The intent is a signed message which allows the protocol to execute a transaction on behalf of the user using their wallet assets. 

There are a number of financial and technical advantages to intent-based trading.

## Financial Benefits of Intents

When a user places a trade directly on-chain, the execution path is set in stone and the trader receives whatever price (+/- slippage) the AMM or aggregator they’re trading on gives them. 

Thanks to its intent-based architecture, CoW Protocol delegates the job of finding the optimal execution path to professional third parties known as [solvers](cow-protocol/concepts/introduction/solvers). Solvers not only scan all available on-chain liquidity (similar to a DEX aggregator) they also provide extra price improvements in several ways:

- **Coincidence of Wants**: Direct P2P (peer-to-peer) matching for two or more users who have expressed opposite buy and sell intents for the same token pair. This optimization allows users to bypass liquidity provider (LP) fees and it reduces the gas fees for trading as orders don't need to interact with other non-CoW Protocol smart contracts. Learn more about [how CoWs work here](cow-protocol/concepts/how-it-works/coincidence-of-wants)
- **Private Market Maker Inventory**: Many solvers have access to off-chain liquidity through CEX inventory, integration with private market makers, or private liquidity of their own. This allows them to fill certain trades at better prices than what may be available through on-chain AMMs at any given time
- ****************************MEV Protection****************************: On CoW Protocol, users are never exposed to MEV bots. Instead, solvers settle transactions on behalf of the user, taking on all MEV risk. In addition, solvers submit all orders in a batch at a uniform clearing price, meaning there is no advantage to re-ordering trades (the basis of all MEV exploitation)

## Technical Benefits of Intents

The intent-based architecture of CoW Protocol also provides a number of technical benefits: 

- Enabling solvers to execute all sorts of transactions (not just trades) based on specific instructions and on-chain conditions. This powers products like [CoW Hooks](cow-protocol/concepts/order-types/cow-hooks) and [Programmatic Orders](cow-protocol/concepts/order-types/programmatic-orders)
- Establishing additional rules for the way orders settle on-chain, such as guaranteeing that the trade is settled at EBBO (Ethereum best bid offer, **guaranteeing that the baseline price for the trade is what on-chain AMMs offer) and uniform clearing prices (where trades with the same token pair in the same batch are cleared at the same price)
- Allowing users to pay gas fees in their *sell token* without needing to hold the chain-native token (like ETH) in their wallet
- Eliminating fees for failed transactions
- Allowing users to place multiple orders at once
- Allowing the protocol to implement batch auctions and, therefore, all of the benefits that come from settling orders in batches
