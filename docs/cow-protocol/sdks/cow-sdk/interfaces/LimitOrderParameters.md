---
id: "LimitOrderParameters"
title: "Interface: LimitOrderParameters"
sidebar_label: "LimitOrderParameters"
sidebar_position: 0
custom_edit_url: null
---

Information about the trader.

## Hierarchy

- [`TraderParameters`](TraderParameters.md)

- [`LimitTradeParameters`](LimitTradeParameters.md)

  ↳ **`LimitOrderParameters`**

## Properties

### appCode

• **appCode**: `string`

#### Inherited from

[TraderParameters](TraderParameters.md).[appCode](TraderParameters.md#appcode)

#### Defined in

external/cow-sdk/src/trading/types.ts:79

___

### buyAmount

• **buyAmount**: `string`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[buyAmount](LimitTradeParameters.md#buyamount)

#### Defined in

external/cow-sdk/src/trading/types.ts:94

___

### buyToken

• **buyToken**: `string`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[buyToken](LimitTradeParameters.md#buytoken)

#### Defined in

external/cow-sdk/src/trading/types.ts:57

___

### buyTokenDecimals

• **buyTokenDecimals**: `number`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[buyTokenDecimals](LimitTradeParameters.md#buytokendecimals)

#### Defined in

external/cow-sdk/src/trading/types.ts:58

___

### chainId

• **chainId**: [`SupportedChainId`](../enums/SupportedChainId.md)

#### Inherited from

[TraderParameters](TraderParameters.md).[chainId](TraderParameters.md#chainid)

#### Defined in

external/cow-sdk/src/trading/types.ts:78

___

### env

• `Optional` **env**: [`CowEnv`](../modules.md#cowenv)

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[env](LimitTradeParameters.md#env)

#### Defined in

external/cow-sdk/src/trading/types.ts:66

___

### kind

• **kind**: [`OrderKind`](../enums/OrderKind.md)

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[kind](LimitTradeParameters.md#kind)

#### Defined in

external/cow-sdk/src/trading/types.ts:54

___

### partiallyFillable

• `Optional` **partiallyFillable**: `boolean`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[partiallyFillable](LimitTradeParameters.md#partiallyfillable)

#### Defined in

external/cow-sdk/src/trading/types.ts:67

___

### partnerFee

• `Optional` **partnerFee**: `PartnerFee`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[partnerFee](LimitTradeParameters.md#partnerfee)

#### Defined in

external/cow-sdk/src/trading/types.ts:71

___

### quoteId

• `Optional` **quoteId**: `number`

Id of the quote to be used for the limit order.

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[quoteId](LimitTradeParameters.md#quoteid)

#### Defined in

external/cow-sdk/src/trading/types.ts:98

___

### receiver

• `Optional` **receiver**: ``null`` \| `string`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[receiver](LimitTradeParameters.md#receiver)

#### Defined in

external/cow-sdk/src/trading/types.ts:69

___

### sellAmount

• **sellAmount**: `string`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[sellAmount](LimitTradeParameters.md#sellamount)

#### Defined in

external/cow-sdk/src/trading/types.ts:93

___

### sellToken

• **sellToken**: `string`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[sellToken](LimitTradeParameters.md#selltoken)

#### Defined in

external/cow-sdk/src/trading/types.ts:55

___

### sellTokenDecimals

• **sellTokenDecimals**: `number`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[sellTokenDecimals](LimitTradeParameters.md#selltokendecimals)

#### Defined in

external/cow-sdk/src/trading/types.ts:56

___

### signer

• **signer**: `string` \| `Signer` \| `ExternalProvider`

#### Inherited from

[TraderParameters](TraderParameters.md).[signer](TraderParameters.md#signer)

#### Defined in

external/cow-sdk/src/trading/types.ts:80

___

### slippageBps

• `Optional` **slippageBps**: `number`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[slippageBps](LimitTradeParameters.md#slippagebps)

#### Defined in

external/cow-sdk/src/trading/types.ts:68

___

### validFor

• `Optional` **validFor**: `number`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[validFor](LimitTradeParameters.md#validfor)

#### Defined in

external/cow-sdk/src/trading/types.ts:70

___

### validTo

• `Optional` **validTo**: `number`

#### Inherited from

[LimitTradeParameters](LimitTradeParameters.md).[validTo](LimitTradeParameters.md#validto)

#### Defined in

external/cow-sdk/src/trading/types.ts:99
