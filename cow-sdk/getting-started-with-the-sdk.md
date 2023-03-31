# Getting Started with the SDK

Install the SDK:

```bash
yarn add @cowprotocol/cow-sdk
```

Instantiate the SDK:

```javascript
import { OrderBookApi, OrderSigningUtils, SubgraphApi } from '@cowprotocol/cow-sdk'

const chainId = 100 // Gnosis chain

const orderBookApi = new OrderBookApi({ chainId })
const subgraphApi = new SubgraphApi({ chainId })
const orderSigningUtils = new OrderSigningUtils()
```

The SDK will expose:

- `OrderBookApi` - provides the ability to retrieve orders and trades from the CowSap order-book, as well as add and cancel them
- `OrderSigningUtils` - serves to sign orders and cancel them using [EIP-712](https://eips.ethereum.org/EIPS/eip-712)
- `SubgraphApi` - provides statistics data about CoW protocol from [Subgraph](https://github.com/cowprotocol/subgraph), such as trading volume, trades count and others

> 💡 For a quick snippet with the full process on posting an order see the [Quick start example](https://github.com/cowprotocol/cow-sdk/blob/main/examples/cra/src/pages/quickStart/index.tsx)

Now you should have a ready to use SDK instance. Let's explore in the next section, how we can use it to query the CoW API.
