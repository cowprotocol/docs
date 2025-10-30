---
id: "OrderBookApi"
title: "Class: OrderBookApi"
sidebar_label: "OrderBookApi"
sidebar_position: 0
custom_edit_url: null
---

The CoW Protocol OrderBook API client.

This is the main entry point for interacting with the CoW Protocol OrderBook API. The main advantage of using
this client is the batteries-included approach to interacting with the API. It handles:

- Environment configuration (mainnet, staging, etc.)
- Rate limiting
- Retries
- Backoff
- Error handling
- Request signing
- Request validation

**`Example`**

```typescript
import { OrderBookApi, OrderSigningUtils, SupportedChainId } from '@cowprotocol/cow-sdk'
import { Web3Provider } from '@ethersproject/providers'

const account = 'YOUR_WALLET_ADDRESS'
const chainId = 100 // Gnosis chain
const provider = new Web3Provider(window.ethereum)
const signer = provider.getSigner()

const quoteRequest = {
  sellToken: '0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1', // WETH gnosis chain
  buyToken: '0x9c58bacc331c9aa871afd802db6379a98e80cedb', // GNO gnosis chain
  from: account,
  receiver: account,
  sellAmountBeforeFee: (0.4 * 10 ** 18).toString(), // 0.4 WETH
  kind: OrderQuoteSide.kind.SELL,
}

const orderBookApi = new OrderBookApi({ chainId: SupportedChainId.GNOSIS_CHAIN })

async function main() {
    const { quote } = await orderBookApi.getQuote(quoteRequest)

    const orderSigningResult = await OrderSigningUtils.signOrder(quote, chainId, signer)

    const orderId = await orderBookApi.sendOrder({ ...quote, ...orderSigningResult })

    const order = await orderBookApi.getOrder(orderId)

    const trades = await orderBookApi.getTrades({ orderId })

    const orderCancellationSigningResult = await OrderSigningUtils.signOrderCancellations([orderId], chainId, signer)

    const cancellationResult = await orderBookApi.sendSignedOrderCancellations({...orderCancellationSigningResult, orderUids: [orderId] })

    console.log('Results: ', { orderId, order, trades, orderCancellationSigningResult, cancellationResult })
}
```

**`See`**

 - Swagger documentation https://api.cow.fi/docs/#/
 - OrderBook API https://github.com/cowprotocol/services

## Constructors

### constructor

• **new OrderBookApi**(`context?`): [`OrderBookApi`](OrderBookApi.md)

Creates a new instance of the CoW Protocol OrderBook API client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | The API context to use. If not provided, the default context will be used. |

#### Returns

[`OrderBookApi`](OrderBookApi.md)

#### Defined in

external/cow-sdk/src/order-book/api.ts:141

## Properties

### context

• **context**: [`ApiContext`](../interfaces/ApiContext.md)

#### Defined in

external/cow-sdk/src/order-book/api.ts:133

___

### rateLimiter

• `Private` **rateLimiter**: `RateLimiter`

#### Defined in

external/cow-sdk/src/order-book/api.ts:135

## Methods

### fetch

▸ **fetch**<`T`\>(`params`, `contextOverride?`): `Promise`<`T`\>

Make a request to the API.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`FetchParams`](../interfaces/FetchParams.md) | The parameters for the request. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<`T`\>

The response from the API.

#### Defined in

external/cow-sdk/src/order-book/api.ts:421

___

### getApiBaseUrls

▸ **getApiBaseUrls**(`env`): [`ApiBaseUrls`](../modules.md#apibaseurls)

Get the base URLs for the API endpoints given the environment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `env` | [`CowEnv`](../modules.md#cowenv) | The environment to get the base URLs for. |

#### Returns

[`ApiBaseUrls`](../modules.md#apibaseurls)

The base URLs for the API endpoints.

#### Defined in

external/cow-sdk/src/order-book/api.ts:409

___

### getAppData

▸ **getAppData**(`appDataHash`, `contextOverride?`): `Promise`<[`AppDataObject`](../modules.md#appdataobject)\>

Retrieve the full app data for a given app data hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appDataHash` | `string` | `bytes32` hash of the app data |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`AppDataObject`](../modules.md#appdataobject)\>

Full app data that was uploaded

#### Defined in

external/cow-sdk/src/order-book/api.ts:339

___

### getContextWithOverride

▸ **getContextWithOverride**(`contextOverride?`): [`ApiContext`](../interfaces/ApiContext.md)

Apply an override to the context for a request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

[`ApiContext`](../interfaces/ApiContext.md)

New context with the override applied.

#### Defined in

external/cow-sdk/src/order-book/api.ts:400

___

### getNativePrice

▸ **getNativePrice**(`tokenAddress`, `contextOverride?`): `Promise`<[`NativePriceResponse`](../modules.md#nativepriceresponse)\>

Get the native price of a token.

**NOTE**: The native price is the price of the token in the native currency of the chain. For example, on Ethereum
this would be the price of the token in ETH.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenAddress` | `string` | The address of the ERC-20 token. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`NativePriceResponse`](../modules.md#nativepriceresponse)\>

The native price of the token.

#### Defined in

external/cow-sdk/src/order-book/api.ts:319

___

### getOrder

▸ **getOrder**(`orderUid`, `contextOverride?`): `Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)\>

Get an order by its unique identifier, `orderUid`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderUid` | `string` | The unique identifier of the order. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)\>

The order matching the request.

#### Defined in

external/cow-sdk/src/order-book/api.ts:227

___

### getOrderCompetitionStatus

▸ **getOrderCompetitionStatus**(`orderUid`, `contextOverride?`): `Promise`<[`CompetitionOrderStatus`](../modules.md#competitionorderstatus)\>

Get the order status while open

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderUid` | `string` |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> |

#### Returns

`Promise`<[`CompetitionOrderStatus`](../modules.md#competitionorderstatus)\>

#### Defined in

external/cow-sdk/src/order-book/api.ts:236

___

### getOrderLink

▸ **getOrderLink**(`orderUid`, `contextOverride?`): `string`

Generate an API endpoint for an order by its unique identifier, `orderUid`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderUid` | `string` | The unique identifier of the order. |
| `contextOverride?` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`string`

The API endpoint to get the order.

#### Defined in

external/cow-sdk/src/order-book/api.ts:390

___

### getOrderMultiEnv

▸ **getOrderMultiEnv**(`orderUid`, `contextOverride?`): `Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)\>

Attempt to get an order by its unique identifier, `orderUid`, from multiple environments.

**NOTE**: The environment refers to either `prod` or `staging`. This allows a conveience method to
attempt to get an order from both environments, in the event that the order is not found in the
environment specified in the context.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderUid` | `string` | The unique identifier of the order. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)\>

The order matching the request.

**`Throws`**

If the order is not found in any of the environments.

#### Defined in

external/cow-sdk/src/order-book/api.ts:251

___

### getOrders

▸ **getOrders**(`request`, `contextOverride?`): `Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)[]\>

Get a list of orders for a given `owner`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`GetOrdersRequest`](../modules.md#getordersrequest) | The request parameters with `request.offset = 0` and `request.limit = 1000` by default. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)[]\>

A list of orders matching the request.

**`See`**

 - [GetOrdersRequest](../modules.md#getordersrequest)
 - [EnrichedOrder](../interfaces/EnrichedOrder.md)

#### Defined in

external/cow-sdk/src/order-book/api.ts:189

___

### getQuote

▸ **getQuote**(`requestBody`, `contextOverride?`): `Promise`<[`OrderQuoteResponse`](../modules.md#orderquoteresponse)\>

Get a quote for an order.
This allows for the calculation of the total cost of an order, including fees, before signing and submitting.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestBody` | [`OrderQuoteRequest`](../modules.md#orderquoterequest) | The parameters for the order quote request. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`OrderQuoteResponse`](../modules.md#orderquoteresponse)\>

A hydrated order matching the request ready to be signed.

#### Defined in

external/cow-sdk/src/order-book/api.ts:279

___

### getSolverCompetition

▸ **getSolverCompetition**(`auctionId`, `contextOverride?`): `Promise`<[`SolverCompetitionResponse`](../modules.md#solvercompetitionresponse)\>

Given an auction id or tx hash, get the details of the solver competition for that auction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `auctionId` | `number` | - |
| `contextOverride?` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`SolverCompetitionResponse`](../modules.md#solvercompetitionresponse)\>

An object containing the solver competition details

#### Defined in

external/cow-sdk/src/order-book/api.ts:361

▸ **getSolverCompetition**(`txHash`, `contextOverride?`): `Promise`<[`SolverCompetitionResponse`](../modules.md#solvercompetitionresponse)\>

Given an auction id or tx hash, get the details of the solver competition for that auction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txHash` | `string` | - |
| `contextOverride?` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`SolverCompetitionResponse`](../modules.md#solvercompetitionresponse)\>

An object containing the solver competition details

#### Defined in

external/cow-sdk/src/order-book/api.ts:363

___

### getTotalSurplus

▸ **getTotalSurplus**(`address`, `contextOverride?`): `Promise`<[`TotalSurplus`](../modules.md#totalsurplus)\>

Given a user's address, get the total surplus that they have earned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The user's address |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`TotalSurplus`](../modules.md#totalsurplus)\>

Calculated user's surplus

#### Defined in

external/cow-sdk/src/order-book/api.ts:329

___

### getTrades

▸ **getTrades**(`request`, `contextOverride?`): `Promise`<[`Trade`](../modules.md#trade)[]\>

Get all the trades for either an `owner` **OR** `orderUid`.

Given that an order *may* be partially fillable, it is possible that a discrete order (`orderUid`)
may have *multiple* trades. Therefore, this method returns a list of trades, either for *all* the orders
of a given `owner`, or for a discrete order (`orderUid`).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Object` | Either an `owner` or an `orderUid` **MUST** be specified. |
| `request.orderUid?` | `string` | - |
| `request.owner?` | `string` | - |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`Trade`](../modules.md#trade)[]\>

A list of trades matching the request.

#### Defined in

external/cow-sdk/src/order-book/api.ts:166

___

### getTxOrders

▸ **getTxOrders**(`txHash`, `contextOverride?`): `Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)[]\>

Get a list of orders from a given settlement transaction hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txHash` | `string` | The transaction hash. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`EnrichedOrder`](../interfaces/EnrichedOrder.md)[]\>

A list of orders matching the request.

**`See`**

[EnrichedOrder](../interfaces/EnrichedOrder.md)

#### Defined in

external/cow-sdk/src/order-book/api.ts:212

___

### getVersion

▸ **getVersion**(`contextOverride?`): `Promise`<`string`\>

Get the version of the API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<`string`\>

The version of the API.

**`See`**

[https://api.cow.fi/docs/#/default/get_api_v1_version](https://api.cow.fi/docs/#/default/get_api_v1_version)

#### Defined in

external/cow-sdk/src/order-book/api.ts:152

___

### sendOrder

▸ **sendOrder**(`requestBody`, `contextOverride?`): `Promise`<`string`\>

Submit an order to the order book.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestBody` | [`OrderCreation`](../modules.md#ordercreation) | The signed order to be submitted. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<`string`\>

The unique identifier of the order.

#### Defined in

external/cow-sdk/src/order-book/api.ts:306

___

### sendSignedOrderCancellations

▸ **sendSignedOrderCancellations**(`requestBody`, `contextOverride?`): `Promise`<`void`\>

Cancel one or more orders.

**NOTE**: Cancellation is on a best-effort basis. Orders that are already in the process of being settled
(ie. transaction has been submitted to chain by the solver) cannot not be cancelled.
**CAUTION**: This method can only be used to cancel orders that were signed using `EIP-712` or `eth_sign (EIP-191)`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestBody` | [`OrderCancellations`](../modules.md#ordercancellations) | Orders to be cancelled and signed instructions to cancel them. |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<`void`\>

A list of order unique identifiers that were successfully cancelled.

#### Defined in

external/cow-sdk/src/order-book/api.ts:293

___

### uploadAppData

▸ **uploadAppData**(`appDataHash`, `fullAppData`, `contextOverride?`): `Promise`<[`AppDataObject`](../modules.md#appdataobject)\>

Upload the full app data that corresponds to a given app data hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appDataHash` | `string` | `bytes32` hash of the app data |
| `fullAppData` | `string` | Full app data to be uploaded |
| `contextOverride` | `Partial`<[`ApiContext`](../interfaces/ApiContext.md)\> | Optional context override for this request. |

#### Returns

`Promise`<[`AppDataObject`](../modules.md#appdataobject)\>

The string encoding of the full app data that was uploaded.

#### Defined in

external/cow-sdk/src/order-book/api.ts:350
