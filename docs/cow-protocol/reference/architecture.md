---
sidebar_position: 2
description: The architecture of the COW Protocol
draft: true
---

# Architecture


#### The Orderbook

The orderbook is a service that uses a database to stores trades. When you go to [CoW Swap](https://swap.cow.fi) and create a trade, the web site uses the OrderBook API to add the trade to the database. If the trade is ready to go (it might be created but missing a signature), it will be listed in the `solvable_orders` endpoint.

#### The Driver

The driver is a polling service that queries the orderbook API for orders and tries to settle them using the different solvers. The driver calls different solvers by using an http API. The driver prunes the orderbook `solvable_orders` and sends orders, in json, to the different solvers. If a solver finds a solution to the batch, the driver executes the trade on chain.

#### Solver

The solver is a standalone service which receives a json with orders and tries to settle them.
The settlement can be a list of actions which are executed by the settlement contract on chain.