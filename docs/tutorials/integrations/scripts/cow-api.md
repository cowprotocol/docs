# CoW API

The SDK provides access to the CoW API. The CoW SDK allows you:

- Post orders
- Get fee quotes
- Get order details
- Get history of orders: i.e. filtering by account, transaction hash, etc.

For example, you can easily get the last 5 order of a trader:

```typescript
import { OrderBookApi, SupportedChainId } from "@cowprotocol/cow-sdk";

const orderBookApi = new OrderBookApi({ chainId: SupportedChainId.MAINNET });

// i.e. Get last 5 orders for a given trader
const trades = orderBookApi.getOrders({
  owner: "0x00000000005ef87f8ca7014309ece7260bbcdaeb", // Trader
  limit: 5,
  offset: 0,
});
console.log(trades);
```

> 💡 For more information about the API methods, you can check [api.cow.fi/docs](https://api.cow.fi/docs).

Now you should be able to access the main API methods. Let's continue in next section on how to sign and post new orders.
