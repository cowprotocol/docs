---
id: "LimitTradeParameters"
title: "Interface: LimitTradeParameters"
sidebar_label: "LimitTradeParameters"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Omit`<[`TradeParameters`](TradeParameters.md), ``"amount"``\>

  ↳ **`LimitTradeParameters`**

  ↳↳ [`LimitTradeParametersFromQuote`](LimitTradeParametersFromQuote.md)

  ↳↳ [`LimitOrderParameters`](LimitOrderParameters.md)

## Properties

### buyAmount

• **buyAmount**: `string`

#### Defined in

external/cow-sdk/src/trading/types.ts:94

___

### buyToken

• **buyToken**: `string`

#### Inherited from

Omit.buyToken

#### Defined in

external/cow-sdk/src/trading/types.ts:57

___

### buyTokenDecimals

• **buyTokenDecimals**: `number`

#### Inherited from

Omit.buyTokenDecimals

#### Defined in

external/cow-sdk/src/trading/types.ts:58

___

### env

• `Optional` **env**: [`CowEnv`](../modules.md#cowenv)

#### Inherited from

Omit.env

#### Defined in

external/cow-sdk/src/trading/types.ts:66

___

### kind

• **kind**: [`OrderKind`](../enums/OrderKind.md)

#### Inherited from

Omit.kind

#### Defined in

external/cow-sdk/src/trading/types.ts:54

___

### partiallyFillable

• `Optional` **partiallyFillable**: `boolean`

#### Inherited from

Omit.partiallyFillable

#### Defined in

external/cow-sdk/src/trading/types.ts:67

___

### partnerFee

• `Optional` **partnerFee**: `PartnerFee`

#### Inherited from

Omit.partnerFee

#### Defined in

external/cow-sdk/src/trading/types.ts:71

___

### quoteId

• `Optional` **quoteId**: `number`

Id of the quote to be used for the limit order.

#### Defined in

external/cow-sdk/src/trading/types.ts:98

___

### receiver

• `Optional` **receiver**: ``null`` \| `string`

#### Inherited from

Omit.receiver

#### Defined in

external/cow-sdk/src/trading/types.ts:69

___

### sellAmount

• **sellAmount**: `string`

#### Defined in

external/cow-sdk/src/trading/types.ts:93

___

### sellToken

• **sellToken**: `string`

#### Inherited from

Omit.sellToken

#### Defined in

external/cow-sdk/src/trading/types.ts:55

___

### sellTokenDecimals

• **sellTokenDecimals**: `number`

#### Inherited from

Omit.sellTokenDecimals

#### Defined in

external/cow-sdk/src/trading/types.ts:56

___

### slippageBps

• `Optional` **slippageBps**: `number`

#### Inherited from

Omit.slippageBps

#### Defined in

external/cow-sdk/src/trading/types.ts:68

___

### validFor

• `Optional` **validFor**: `number`

#### Inherited from

Omit.validFor

#### Defined in

external/cow-sdk/src/trading/types.ts:70

___

### validTo

• `Optional` **validTo**: `number`

#### Defined in

external/cow-sdk/src/trading/types.ts:99
