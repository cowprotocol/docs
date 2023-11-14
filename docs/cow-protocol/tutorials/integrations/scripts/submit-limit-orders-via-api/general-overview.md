# General Overview

A limit order is a long standing user order to buy a token at a price that may currently not be achievable. Once the price becomes achievable on-chain, the order executes and captures surplus.&#x20;

CoW Protocol’s limit order key feature is that they are surplus-capturing. This means that the fee a trader pays for executing an order is taken from the price improvement that solvers find for the order, while the rest of the price improvement goes to the trader. In other words, unlike limit orders from other DEXs, your limit price will always be respected and the fee will be taken directly from the surplus if and only if, this operation results in respecting your limit price. If CoW Protocol finds an opportunity to capture additional value with your order (for example, with a full or partial CoW), that surplus is given to the trader instead of, what typically happens for limit orders, being taken by the counterparty.

CoW Swap users can place their limit orders via the CoW Swap [dApp](http://swap.cow.fi), or they can submit directly via the CoW Protocol API (follow the info in this section).&#x20;

_**Note:** to trade, traders need to approve their tokens if they have not done so previously. If they have, they can place limit orders directly without needing to make an extra approval._

\

\
