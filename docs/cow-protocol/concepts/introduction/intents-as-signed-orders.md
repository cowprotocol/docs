---
id: intents
sidebar_position: 3
---

# Intents as signed orders

 CoW Protocol relies on signed _intent to trade_ messages to process user orders. While this setup is a bit more complicated than simply submitting an order on-chain, there are a number of financial and technical advantages to intents-based trading. 
 
 ![](https://lh7-eu.googleusercontent.com/dN0NIFnyoQhUZJ4wK8DxQIJ65E6SXBJOeWzCgi1uNrrFONHCetSO2UKtadw0QPuWwVBhN3zoclF2pLnCZx_Tmt1apxoBG6R-evWrZcNOvnEyPcFQYynrcPbVnsrPFVlv6jArQ1JySIHaOhMnoiPIXMs)
 
 From a financial standpoint, intents are composable, whereas transactions are not. If the user has already created the transaction, a solver can only settle it using the exact AMM and pool the user specified, leaving no options to perform trade optimizations. By using intents, solvers can optimize trades to offer even better prices. Optimizations that solvers can perform to an intent include:

* **CoW (Coincidence of Wants):** Direct P2P (peer-to-peer) matching for two users who have expressed a sell and a buy intent of the same (or similar) amounts and token pairs 
    * This optimization allows users to bypass liquidity provider (LP) fees and reduces the gas fees for trading as the orders don't need to interact with other non-CoW Protocol smart contracts 
* **Ring Trades:** A multidimensional CoW of three or more users, where liquidity is aggregated across the users instead of relying on external sources, is known as a _ring trade_. This is an example of a pure barter economy trade where each user has what the another user wants and everything is exchanged perfectly in a circle
    * This optimization also bypasses LP fees and reduces the gas necessary for trading, since users don't need to interact with non-CoW Protocol smart contracts, but also allows the trade itself to happen by re-aggregating on-chain liquidity that otherwise was scattered all around
* **Directional CoWs, (AKA batching trades within the batch auction):** Often, a batch auction contains multiple intents from different users who all want to perform the same trade. Instead of sending their trades individually one by one, solvers can batch all of the intents together and execute them as a single trade on-chain
    * Although a directional CoW goes on-chain, this optimization reduces gas fees, as users trades only interact with AMM smart contracts once

From a technical standpoint, CoW Protocol relies on intents as a core part of the delegated trading execution model. In this model, solvers, rather than users, are the ones in charge of actually settling the trades on-chain. The delegated trading model has several benefits including:

* Protecting users from MEV since they’re not committing to a specific trade route
* Making the intent to trade composable and optimizable in such a way that a raw transaction can be done
* Implementing a network of solvers that compete to maximize the user’s trade value on their behalf
* Allowing the protocol to implement batch auctions to settle multiple orders at once instead of settling on a per-order basis
* Establishing additional rules for the way in which the intents are settled on-chain, such as guaranteeing that the trade is settled at _EBBO_ (_Ethereum best bid offer_ – in other words, ensuring that the baseline price for the trade is what on-chain AMMs offer) and uniform clearing prices (where trades with the same token pair in the same batch are cleared at the same price)
* Allowing the user to pay gas fees in their _sell token_ without needing to hold `ETH` in their wallet
* Allowing the user the option to place as many orders as they want, as they won’t pay for failed transactions
* Allow the user to specify _hooks_ that execute before and after the trade is settled on-chain

Additionally, CoW Protocol smart contracts enforce that: 

* Funds can only be transferred if a trader has approved CoW Protocol and signed an order to sell one particular token for another
* The Limit prices and amounts of the signed order will always be satisfied
* Signed orders have an expiry date, can be canceled on-chain, and can’t be replayed
* Only solvers subject to slashing can execute the batch auction settlement
* Multi-signature wallets have smooth transaction management. Once the first signature is completed, the minimum price shown is locked-in. As long as the protocol can execute the order at this price, it will do so, even if the rest of the signatures sign later. If the protocol cannot find this price, the order will simply expire at no cost to the traders.
