---
id: "TradingSdk"
title: "Class: TradingSdk"
sidebar_label: "TradingSdk"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new TradingSdk**(`traderParams`): [`TradingSdk`](TradingSdk.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `traderParams` | [`TraderParameters`](../interfaces/TraderParameters.md) |

#### Returns

[`TradingSdk`](TradingSdk.md)

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:17

## Properties

### traderParams

• `Readonly` **traderParams**: [`TraderParameters`](../interfaces/TraderParameters.md)

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:17

## Methods

### getPreSignTransaction

▸ **getPreSignTransaction**(`params`): `Promise`<[`TransactionParams`](../interfaces/TransactionParams.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.account` | `string` |
| `params.orderId` | `string` |

#### Returns

`Promise`<[`TransactionParams`](../interfaces/TransactionParams.md)\>

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:53

___

### getQuote

▸ **getQuote**(`params`, `advancedSettings?`): `Promise`<[`QuoteAndPost`](../interfaces/QuoteAndPost.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`TradeParameters`](../interfaces/TradeParameters.md) |
| `advancedSettings?` | [`SwapAdvancedSettings`](../interfaces/SwapAdvancedSettings.md) |

#### Returns

`Promise`<[`QuoteAndPost`](../interfaces/QuoteAndPost.md)\>

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:19

___

### mergeParams

▸ **mergeParams**<`T`\>(`params`): `T` & [`TraderParameters`](../interfaces/TraderParameters.md)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` |

#### Returns

`T` & [`TraderParameters`](../interfaces/TraderParameters.md)

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:59

___

### postLimitOrder

▸ **postLimitOrder**(`params`, `advancedSettings?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`LimitTradeParameters`](../interfaces/LimitTradeParameters.md) |
| `advancedSettings?` | [`LimitOrderAdvancedSettings`](../interfaces/LimitOrderAdvancedSettings.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:32

___

### postSellNativeCurrencyOrder

▸ **postSellNativeCurrencyOrder**(`params`, `advancedSettings?`): `Promise`<`Promise`<\{ `orderId`: `string` ; `txHash`: `string`  }\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`TradeParameters`](../interfaces/TradeParameters.md) |
| `advancedSettings?` | [`SwapAdvancedSettings`](../interfaces/SwapAdvancedSettings.md) |

#### Returns

`Promise`<`Promise`<\{ `orderId`: `string` ; `txHash`: `string`  }\>\>

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:36

___

### postSwapOrder

▸ **postSwapOrder**(`params`, `advancedSettings?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`TradeParameters`](../interfaces/TradeParameters.md) |
| `advancedSettings?` | [`SwapAdvancedSettings`](../interfaces/SwapAdvancedSettings.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/trading/tradingSdk.ts:28
