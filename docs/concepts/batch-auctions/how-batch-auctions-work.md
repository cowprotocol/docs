---
sidebar_position: 5
---

#### How batch auctions work

Given that Ethereum settles orders in discrete blocks every 12 seconds, the CEX-native method of orderbook trading may not be the optimal mechanism for settling DeFi trades. Due to the nature of AMMs, which settle trades continuously, the order in which a transaction executes determines how good of a deal a trader is getting. Batch auctions are a DeFi-native solution that provides fair pricing for all transactions within an Ethereum block. 

Ethereum has been friendly to batching mechanisms for a while. With the introduction of [PBS](https://ethereum.org/nl/roadmap/pbs/), Ethereum broke from a single-auction model into a two-sided marketplace. Builders take part in an initial auction to determine what transactions will be included in a block, and proposers take part in a second auction to decide which block will ultimately be committed to the chain next. So users are already, in fact, participating in “batch auction”-style transaction settlement. CoW Protocol simply pulls this mechanism forward to the order creation stage.

![](https://lh7-eu.googleusercontent.com/6r3spKS1vtzxMz7lvkvhBialabTa-EmkxvhuxbG9ToPkwcuWnTG7LRoz8T5H0RMFzLFwbLAVTHzNVuopWHtWWgGZSSI_FbL8v--RgLGiBvTmFAo10UaggeHS51PN0k2dgfEe3uslxMCg7XQZANmMAC4

In the context of trading, batch auctions work similarly to block building auctions. First, the protocol gathers intents submitted during a predetermined time window. Next, solvers begin looking for the best execution path and bidding on the batch. After this, solvers submit their bids to the protocol which ranks solutions based on expected user surplus. This step in particular bears resemblance to the block building process where builders decide what transactions to include based on maximizing the expected fee costs. In the case of solvers, the party that provides the greatest expected surplus collects the rewards for settling the batch. Finally, after the protocol finishes ranking solver solutions, it performs some additional checks including:

    - Ethereum Best Bid Offer (EBBO): Ensuring that the settlement solution is at least as good as the on-chain price a user could get directly from an AMM
    - Uniform clearing prices: Ensuring that multiple trades involving the same token pair clear at the same price