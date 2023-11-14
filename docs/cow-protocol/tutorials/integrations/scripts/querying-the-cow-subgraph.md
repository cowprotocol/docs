# Querying the Cow Subgraph

The [Subgraph](https://github.com/cowprotocol/subgraph) is constantly indexing the protocol, making all the information more accessible. It provides information about trades, users, tokens and settlements. Additionally, it has some data aggregations which provides insights on the hourly/daily/totals USD volumes, trades, users, etc.

The SDK provides just an easy way to access all this information.

You can query the Cow Subgraph either by running some common queries exposed by the `CowSubgraphApi` or by building your own ones:

```typescript
import { SubgraphApi, SupportedChainId } from "@cowprotocol/cow-sdk";

const subgraphApi = new SubgraphApi({ chainId: SupportedChainId.MAINNET });

// Get CoW Protocol totals
const {
  tokens,
  orders,
  traders,
  settlements,
  volumeUsd,
  volumeEth,
  feesUsd,
  feesEth,
} = await csubgraphApi.getTotals();
console.log({
  tokens,
  orders,
  traders,
  settlements,
  volumeUsd,
  volumeEth,
  feesUsd,
  feesEth,
});

// Get last 24 hours volume in usd
const { hourlyTotals } = await cowSubgraphApi.getLastHoursVolume(24);
console.log(hourlyTotals);

// Get last week volume in usd
const { dailyTotals } = await cowSubgraphApi.getLastDaysVolume(7);
console.log(dailyTotals);

// Get the last 5 batches
const query = `
  query LastBatches($n: Int!) {
    settlements(orderBy: firstTradeTimestamp, orderDirection: desc, first: $n) {
      txHash
      firstTradeTimestamp
    }
  }
`;
const variables = { n: 5 };
const response = await cowSubgraphApi.runQuery(query, variables);
console.log(response);
```
