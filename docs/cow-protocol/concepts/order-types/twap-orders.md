---
sidebar_position: 3
---

# TWAP orders

Time-Weighted Average Price (TWAP) orders are an advanced order type available on CoW Protocol that breaks up a large order into several smaller pieces.
TWAP orders are ideal for executing big trades with minimal price impact.

## How TWAP Orders Work

TWAP orders split up a large order into a series of normal limit orders that trade at fixed intervals. When setting up a TWAP order, users specify how many parts they'd like to split their trade into, as well as the total duration of the order (can be hours, days, weeks, or even months).

TWAP orders on CoW Protocol require several inputs: 

- **Assets**: Just like you would with a regular swap, begin by specifying the assets you want to swap
- **Price Protection**: One of the unique parts of TWAP orders on CoW Protocol is the "price protection" option which allows you to specify the minimum market price you'd be willing to take for your order. If the price of the asset you're buying falls below what you specify for any, that part of the TWAP order will not execute until the price recovers above your threshold
- **Number of Parts**: Here you specify how many parts you'd like to split your large order into
- **Total Duration**: Specify the total length of time that you want all parts of your order to execute over

## Benefits
TWAP orders provide a number of benefits, especially when it comes to large orders: 
- **Lower slippage**: Breaking up a large order into smaller pieces allows users to set a smaller slippage tolerance for each piece than if they had executed the large order as one
- **Lower price impact**: As with slippage, breaking up a large order into small pieces allows users to spread their liquidity needs over time, reducing price impact
- **100% of order surplus**: On CoW Swap, all order surplus is forwarded to the user. If an order executes for a price better than the quoted price - thanks to [Coincidences of Wants](../how-it-works/coincidence-of-wants) or any other price improvement that solvers are able to find - the extra price improvement will be forwarded to the user
- **Eliminating market fluctuations**: By giving traders the time-weighted average price, TWAP orders smooth out market volatility
- **Custom order parameters**: Users can choose how many parts to split their TWAP order into, adjust the execution timeframe, and even enable a "price protection" feature which prevents execution at unfavorable prices due to market volatility

## TWAP Requirements

There are also several requirements for placing TWAP orders through CoW Protocol

- Trades on Ethereum Mainnet must be a minimum of \$5,000 (the minimum is only $5 for trades on Gnosis chain)
- Users must have a [Safe wallet](https://safe.global/wallet) with an [upgraded fallback handler](https://blog.cow.fi/all-you-need-to-know-about-cow-swaps-new-safe-fallback-handler-8ef0439925d1)

## Getting started

Wanting to place a TWAP order? Check out our [TWAP order tutorial](/cow-protocol/tutorials/cow-swap/twap). You can also [read about TWAP on our blog.](https://blog.cow.fi/cow-swap-launches-twap-orders-d5583135b472)
