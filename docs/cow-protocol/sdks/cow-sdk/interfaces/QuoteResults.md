---
id: "QuoteResults"
title: "Interface: QuoteResults"
sidebar_label: "QuoteResults"
sidebar_position: 0
custom_edit_url: null
---

Exhaustive set of data which includes information about trade, quote, order, "app-data", and more.
This data is used to create a trade, sign an order, and post it to the order book.

## Properties

### amountsAndCosts

• **amountsAndCosts**: [`QuoteAmountsAndCosts`](QuoteAmountsAndCosts.md)<`bigint`, \{ `buyAmount`: `bigint` ; `sellAmount`: `bigint`  }\>

#### Defined in

external/cow-sdk/src/trading/types.ts:123

___

### appDataInfo

• **appDataInfo**: [`AppDataInfo`](AppDataInfo.md)

#### Defined in

external/cow-sdk/src/trading/types.ts:126

___

### orderToSign

• **orderToSign**: [`UnsignedOrder`](../modules.md#unsignedorder)

#### Defined in

external/cow-sdk/src/trading/types.ts:124

___

### orderTypedData

• **orderTypedData**: [`OrderTypedData`](OrderTypedData.md)

#### Defined in

external/cow-sdk/src/trading/types.ts:127

___

### quoteResponse

• **quoteResponse**: [`OrderQuoteResponse`](../modules.md#orderquoteresponse)

#### Defined in

external/cow-sdk/src/trading/types.ts:125

___

### tradeParameters

• **tradeParameters**: [`TradeParameters`](TradeParameters.md)

#### Defined in

external/cow-sdk/src/trading/types.ts:122
