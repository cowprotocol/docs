# STEP 1: Get Market Price

#### STEP 1: Get Market Price

To create an order, you need to get a price/fee quote first:

- The SDK will give you easy access to the API, which returns the `Market Price` and the `Fee` for any given trade you intent to do.
- The returned `Market Price` is not strictly needed, you can use your own pricing logic.
  - You can choose a price that is below this Market price (**Market Order**), or above Market Price (**Limit Order**).
- The `Fee` however is very important.
  - It is the required amount in sell token the trader agrees on paying for executing the order onchain.
  - Normally, its value is proportional to the current Gas Price of the network.
  - This fee is never charged if you don't trade.

To get the quote, you simply specify the trade you intent to do:

```typescript
import { OrderBookApi, SupportedChainId } from "@cowprotocol/cow-sdk";

const orderBookApi = new OrderBookApi({ chainId: SupportedChainId.MAINNET });

const quoteResponse = await orderBookApi.getQuote({
  kind: OrderKind.SELL, // Sell order (could also be BUY)
  sellToken: "0xc778417e063141139fce010982780140aa0cd5ab", // WETH
  buyToken: "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b", // USDC
  amount: "1000000000000000000", // 1 WETH
  userAddress: "0x1811be0994930fe9480eaede25165608b093ad7a", // Trader
  validTo: 2524608000,
});

const {
  sellToken,
  buyToken,
  validTo,
  buyAmount,
  sellAmount,
  receiver,
  feeAmount,
} = quoteResponse.quote;
```

Now that we know the `Market Price` and a `Fee`, let's review in next section how to define and sign the new order.
