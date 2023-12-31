---
sidebar_position: 5
draft: true
---

# How batch auctions work

Given that Ethereum settles orders in discrete blocks every 12 seconds, the CEX-native method of orderbook trading may not be the optimal mechanism for settling DeFi trades. 
Due to the nature of AMMs, which settle trades pseudo-continuously, the order in which a transaction executes determines how good of a deal a trader is getting. 
Batch auctions are a DeFi-native solution that provides fair pricing for all transactions within an Ethereum block. 

Ethereum has been friendly to auction mechanisms for a while. 
With the introduction of [PBS](https://ethereum.org/nl/roadmap/pbs/), Ethereum broke from a single-auction model into a two-sided marketplace that is constantly extracting value from users. 
Builders facilitate an initial auction to determine what transaction orderings (aka bundles) will be included in a block merging mutually non-exclusive bundles to produce the highest paying block.
Proposers then facilitate a second auction to decide which block will ultimately be committed to the chain next. 
So users are already, in fact, participating in "block auction"-style transaction settlement. 
CoW Protocol simply pulls this mechanism forward to the order creation stage and reverses the incentive to maximize the value the user retains instead of extracting it.

In the context of trading, batch auctions work similarly to block building auctions. 
First, the protocol gathers intents submitted during a predetermined time window. 
Next, solvers begin looking for the best execution path and bidding on the batch. 
After this, solvers submit their bids to the protocol which ranks solutions based on expected user surplus. 
This step in particular bears resemblance to the block building process where builders decide which bundle to include based on maximizing the expected "priority fee".
This fee tends to be higher the more value can be extracted from the underlying user transaction.
In the case of solvers, the party that provides the greatest expected surplus collects the rewards for settling the batch. 
Finally, after the protocol finishes ranking solver solutions, it performs some additional checks including:

* Ethereum Best Bid Offer (EBBO): Ensuring that the settlement solution is at least as good as the on-chain price a user could get directly from an AMM
* Uniform clearing prices: Ensuring that multiple trades involving the same token pair clear at the same price
