# Submit orders via the API

In case you would like to **submit orders programmatically instead of via a UI**, this tutorial will show you how to do that. There are a couple of use cases why you might want to do that

1. Submitting "take profit" limit orders, where the current market price would not allow execution (not yet supported by the CoW Swap interface)
2. Actively listen for user orders and programmatically submitting matching orders them via a trading bot (active market making without order cost)
3. Other more automated trading strategies

The **general API documentation can be found here**: [https://api.cow.fi/docs](https://api.cow.fi/docs).
We have also written a small [trading bot script](https://github.com/gnosis/gp-v2-trading-bot) which can serve as inspiration.
