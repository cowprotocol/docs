---
id: "SwapParameters"
title: "Interface: SwapParameters"
sidebar_label: "SwapParameters"
sidebar_position: 0
custom_edit_url: null
---

Trade type, assets, amounts, and optional parameters.

## Hierarchy

- [`TradeParameters`](TradeParameters.md)

- [`TraderParameters`](TraderParameters.md)

  ↳ **`SwapParameters`**

## Properties

### amount

• **amount**: `string`

#### Inherited from

[TradeParameters](TradeParameters.md).[amount](TradeParameters.md#amount)

#### Defined in

external/cow-sdk/src/trading/types.ts:59

___

### appCode

• **appCode**: `string`

#### Inherited from

[TraderParameters](TraderParameters.md).[appCode](TraderParameters.md#appcode)

#### Defined in

external/cow-sdk/src/trading/types.ts:79

___

### buyToken

• **buyToken**: `string`

#### Inherited from

[TradeParameters](TradeParameters.md).[buyToken](TradeParameters.md#buytoken)

#### Defined in

external/cow-sdk/src/trading/types.ts:57

___

### buyTokenDecimals

• **buyTokenDecimals**: `number`

#### Inherited from

[TradeParameters](TradeParameters.md).[buyTokenDecimals](TradeParameters.md#buytokendecimals)

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

[TradeParameters](TradeParameters.md).[env](TradeParameters.md#env)

#### Defined in

external/cow-sdk/src/trading/types.ts:66

___

### kind

• **kind**: [`OrderKind`](../enums/OrderKind.md)

#### Inherited from

[TradeParameters](TradeParameters.md).[kind](TradeParameters.md#kind)

#### Defined in

external/cow-sdk/src/trading/types.ts:54

___

### partiallyFillable

• `Optional` **partiallyFillable**: `boolean`

#### Inherited from

[TradeParameters](TradeParameters.md).[partiallyFillable](TradeParameters.md#partiallyfillable)

#### Defined in

external/cow-sdk/src/trading/types.ts:67

___

### partnerFee

• `Optional` **partnerFee**: `PartnerFee`

#### Inherited from

[TradeParameters](TradeParameters.md).[partnerFee](TradeParameters.md#partnerfee)

#### Defined in

external/cow-sdk/src/trading/types.ts:71

___

### receiver

• `Optional` **receiver**: ``null`` \| `string`

#### Inherited from

[TradeParameters](TradeParameters.md).[receiver](TradeParameters.md#receiver)

#### Defined in

external/cow-sdk/src/trading/types.ts:69

___

### sellToken

• **sellToken**: `string`

#### Inherited from

[TradeParameters](TradeParameters.md).[sellToken](TradeParameters.md#selltoken)

#### Defined in

external/cow-sdk/src/trading/types.ts:55

___

### sellTokenDecimals

• **sellTokenDecimals**: `number`

#### Inherited from

[TradeParameters](TradeParameters.md).[sellTokenDecimals](TradeParameters.md#selltokendecimals)

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

[TradeParameters](TradeParameters.md).[slippageBps](TradeParameters.md#slippagebps)

#### Defined in

external/cow-sdk/src/trading/types.ts:68

___

### validFor

• `Optional` **validFor**: `number`

#### Inherited from

[TradeParameters](TradeParameters.md).[validFor](TradeParameters.md#validfor)

#### Defined in

external/cow-sdk/src/trading/types.ts:70
