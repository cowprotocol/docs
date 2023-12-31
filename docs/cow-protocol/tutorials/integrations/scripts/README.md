---
draft: true
---

# Scripts


# CoW SDK

Unlock an endless world of possibilities via **CoW Protocol SDK** ([@cowprotocol/cow-sdk](https://www.npmjs.com/package/@cowprotocol/cow-sdk) in NPM)

### First, lets introduce CoW Swap and CoW Protocol <a href="#get-started" id="get-started"></a>

CoW Swap is a Decentralized Application (DApp) and Protocol allowing users to **exchange digital assets directly (peer-to-peer) and via existing trading decentralized exchanges**.

Its novel design maximizes trade efficiency and provides a competitive way to ensure best prices.

One of the core ideas is executing **trades in batches**, where users will trade directly using what is known as **"Coincidence of Wants"** (hence the name CoW). In the context of blockchains, batch auctions are a superior mechanism compared to continuous time trading, as they already execute transactions in discrete "blocks" every few seconds.

In consequence CoW Swap **protects users from front-running and other value extraction (known as MEV)**. The mechanism also leverages the concept of "ring trades" to boost liquidity in highly fragmented and long-tail token markets.

Additionally, CoW Swap allows for an improved user experience by facilitating gasless trades, not paying for failed transactions and adaptive routing in case of volatility.

#### Get familiar with CoW Swap <a href="#get-familiar-with-cowswap" id="get-familiar-with-cowswap"></a>

CoW Swap uses CoW protocol. One easy way to get familiar with the protocol is by doing one trade in CoW Swap:

- [https://swap.cow.fi](https://swap.cow.fi/#/1/swap/WETH?utm_source=docs.cow.fi&utm_medium=web&utm_content=cow-sdk-page/)

You can use it in **Goerli** test net if you want. Otherwise, it is avaiable in **Mainnet** and **Gnosis Chain**.

Now you are more familiar with the protocol and CoW Swap, let's introduce the SDK in the next section.


# Getting Started with the SDK

Install the SDK:

```bash
yarn add @cowprotocol/cow-sdk
```

Instantiate the SDK:

```javascript
import {
  OrderBookApi,
  OrderSigningUtils,
  SubgraphApi,
} from "@cowprotocol/cow-sdk";

const chainId = 100; // Gnosis chain

const orderBookApi = new OrderBookApi({ chainId });
const subgraphApi = new SubgraphApi({ chainId });
const orderSigningUtils = new OrderSigningUtils();
```

The SDK will expose:

- `OrderBookApi` - provides the ability to retrieve orders and trades from the CowSap order-book, as well as add and cancel them
- `OrderSigningUtils` - serves to sign orders and cancel them using [EIP-712](https://eips.ethereum.org/EIPS/eip-712)
- `SubgraphApi` - provides statistics data about CoW protocol from [Subgraph](https://github.com/cowprotocol/subgraph), such as trading volume, trades count and others

> 💡 For a quick snippet with the full process on posting an order see the [Quick start example](https://github.com/cowprotocol/cow-sdk/blob/main/examples/cra/src/pages/quickStart/index.tsx)

Now you should have a ready to use SDK instance. Let's explore in the next section, how we can use it to query the CoW API.
