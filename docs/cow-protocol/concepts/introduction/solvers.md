---
sidebar_position: 5
---

# Solvers

Instead of creating an Ethereum transaction for swapping token A for B (which costs gas, may fail, etc.) users sign an intent to trade the two tokens at a specified limit price. Unlike with other DEXs, users on CoW Protocol do not execute their trades themselves. Rather, trusted third parties known as “solvers” execute trades on their behalf through a delegated trade execution mechanism. 

Once a user submits an intent, the protocol hands it off to solvers who compete for the user’s order flow by trying to give them the best possible price. The solver that offers the best execution price is granted the right to settle the user's order. The actual settlement transaction is then created and signed by the solver.

Solvers can move tokens on behalf of the user (using the ERC20 approvals the user granted to the settlement contract) while the contract verifies the signature of the user's intent and ensures that execution happens according to the limit price and quantity specified by the user.

Anyone with some DeFi knowledge and ability to code an optimizations algorithm can create a solver. If you are interested in running a solver, check out the step by step process available here.