---
sidebar_position: 3
---

# TWAP orders

Time-Weighted Average Price (TWAP) orders are an advanced order type available on CoW Protocol that breaks up a large order into several smaller pieces. TWAP orders are ideal for executing big trades with minimal price impact.

## How TWAP Orders Work

TWAP orders split up a large order into a series of normal market orders that trade at fixed intervals. When setting up a TWAP order, users specify how many parts they’d like to split their trade into, as well as the total duration of the order (can be hours, days, weeks, or even months).

![TWAP Order Screenshot](/img/concepts/twap-screenshot.png)

TWAP orders on CoW Protocol require several inputs: 

- **Assets**: Just like you would with a regular swap, begin by specifying the assets you want to swap
- **Price Protection**: One of the unique parts of TWAP orders on CoW Protocol is the “price protection” option which allows you to specify the minimum market price you’d be willing to take for your order. If the price of the asset you’re buying falls below what you specify for any, that part of the TWAP order will not execute until the price recovers above your threshold
- **Number of Parts**: Here you specify how many parts you’d like to split your large order into
- **Total Duration**: Specify the total length of time that you want all parts of your order to execute over.

### TWAP Requirements

There are also several requirements for placing TWAP orders through CoW Protocol

- Trades on Ethereum Mainnet must be a minimum of $5,000 (the minimum is only $5 for trades on Gnosis chain)
- Users must have a [Safe wallet](https://safe.global/wallet) with an [upgraded fallback handler](https://medium.com/@cow-protocol/all-you-need-to-know-about-cow-swaps-new-safe-fallback-handler-8ef0439925d1)

To learn more about TWAP orders, check out our [tutorials section](cow-protocol/tutorials/cow-swap/twap) or [read about TWAP on our blog.](https://medium.com/@cow-protocol/cow-swap-launches-twap-orders-d5583135b472)
