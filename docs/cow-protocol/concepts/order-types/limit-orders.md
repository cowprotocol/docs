---
sidebar_position: 2
---

# Limit orders

Limit orders are orders to buy or sell tokens at a specified price before a certain expiration date.

If the market  price of the asset matches the target price at any point before the expiration date, the order executes. Otherwise, it expires. Limit orders are ideal for trades that are price-sensitive but not time-sensitive. 

### How CoW Protocol Does Limit Orders

Thanks to CoW Protocol's [intent-based trading model](../introduction/intents), limit orders come with a few big advantages over their counterparts on other DEX's:

- **Gasless Order Management**: Traders can create, modify, and cancel limit orders without paying any gas fees.
- **Simultaneous Orders**: Traders can use the same crypto balance to place multiple outstanding orders at once and CoW Protocol automatically fills them as long as the user wallet has funds in it.
- **Order Surplus**: Across all CoW Protocol orders, traders receive the price determined at execution time. When it comes to limit orders, if the market price falls below the limit price, the user receives all the upside (unlike other exchanges, which would execute the limit order at the limit price, regardless of the asset's true market price). Additionally, any price improvements the solvers generate through finding better execution paths (i.e. finding a [Coincidence of Wants](../how-it-works/coincidence-of-wants)) belong to the trader.

CoW Protocol's limit orders provide more flexibility and better prices than other DEX's thanks to the protocol's [intents-based execution](../introduction/intents) and [batch auctions architecture](../introduction/batch-auctions).

## Getting started

Wanting to place a limit order? Check out our [limit order tutorial](/cow-protocol/tutorials/cow-swap/limit). You can also [read about limit orders on our blog.](https://blog.cow.fi/the-cow-has-no-limits-342e7eae8794)
