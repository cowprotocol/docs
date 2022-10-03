# Solvers

Unlike traditional DEXs, CowSwap users don't execute their trades themselves. Instead of creating an Ethereum transaction swapping token A for B (which costs gas, may fail, etc.) they sign an _intent to trade_ two tokens at a specified limit price.

This _intent_ is then handed off to a third party - so called **solvers** - which compete for the user's order flow by trying to give them the best possible price. The protocol grants the solver that can offer the best execution price the right to settle the user's order. The actual settlement transaction is then created and signed by the solver. In other protocols a similar component may be referred to as relayers. Solvers can move tokens on behalf of the user (using the ERC20 approvals the user granted to the settlement contract) while the contract verifies the signature of  the user's _intent_ and that execution is done according to the limit price/quantity.&#x20;

In the following sections we give an overview of the current solver landscape, describe in more detail how the competition works today, provide a concrete guide on how to become a solver yourself and give an outlook on how we plan to fully decentralise this competition
