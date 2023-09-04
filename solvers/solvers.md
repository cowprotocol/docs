# Introduction

## Intent-based trading

CoW protocol uses an intent-based trading model. Unlike on other DEXs, users on CoSwap don't execute their trades themselves. Instead of creating an Ethereum transaction for swapping token A for B (which costs gas, may fail, etc.) they sign an **intent** to trade the two tokens at a specified limit price.

This intent is then handed off to third parties - the so-called **solvers** - who compete for the user's order flow by trying to give them the best possible price. The solver that offers the best execution price is granted the right to settle the user's order. The actual settlement transaction is then created and signed by the solver.

## Solvers

Solvers can move tokens on behalf of the user (using the ERC20 approvals the user granted to the settlement contract) while the contract verifies the signature of the user's intent and that execution is done according to the limit price and quantity specified by the user.

In the following sections we describe in more detail how the competition works today, provide a concrete guide on how to become a solver yourself and give an outlook on how we plan to fully decentralize this competition
