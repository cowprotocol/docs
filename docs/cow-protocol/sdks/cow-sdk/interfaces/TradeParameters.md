---
id: "TradeParameters"
title: "Interface: TradeParameters"
sidebar_label: "TradeParameters"
sidebar_position: 0
custom_edit_url: null
---

Trade type, assets, amounts, and optional parameters.

## Hierarchy

- [`TradeBaseParameters`](TradeBaseParameters.md)

- [`TradeOptionalParameters`](TradeOptionalParameters.md)

  ↳ **`TradeParameters`**

  ↳↳ [`SwapParameters`](SwapParameters.md)

## Properties

### amount

• **amount**: `string`

#### Inherited from

[TradeBaseParameters](TradeBaseParameters.md).[amount](TradeBaseParameters.md#amount)

#### Defined in

external/cow-sdk/src/trading/types.ts:59

___

### buyToken

• **buyToken**: `string`

#### Inherited from

[TradeBaseParameters](TradeBaseParameters.md).[buyToken](TradeBaseParameters.md#buytoken)

#### Defined in

external/cow-sdk/src/trading/types.ts:57

___

### buyTokenDecimals

• **buyTokenDecimals**: `number`

#### Inherited from

[TradeBaseParameters](TradeBaseParameters.md).[buyTokenDecimals](TradeBaseParameters.md#buytokendecimals)

#### Defined in

external/cow-sdk/src/trading/types.ts:58

___

### env

• `Optional` **env**: [`CowEnv`](../modules.md#cowenv)

#### Inherited from

[TradeOptionalParameters](TradeOptionalParameters.md).[env](TradeOptionalParameters.md#env)

#### Defined in

external/cow-sdk/src/trading/types.ts:66

___

### kind

• **kind**: [`OrderKind`](../enums/OrderKind.md)

#### Inherited from

[TradeBaseParameters](TradeBaseParameters.md).[kind](TradeBaseParameters.md#kind)

#### Defined in

external/cow-sdk/src/trading/types.ts:54

___

### partiallyFillable

• `Optional` **partiallyFillable**: `boolean`

#### Inherited from

[TradeOptionalParameters](TradeOptionalParameters.md).[partiallyFillable](TradeOptionalParameters.md#partiallyfillable)

#### Defined in

external/cow-sdk/src/trading/types.ts:67

___

### partnerFee

• `Optional` **partnerFee**: `PartnerFee`

#### Inherited from

[TradeOptionalParameters](TradeOptionalParameters.md).[partnerFee](TradeOptionalParameters.md#partnerfee)

#### Defined in

external/cow-sdk/src/trading/types.ts:71

___

### receiver

• `Optional` **receiver**: ``null`` \| `string`

#### Inherited from

[TradeOptionalParameters](TradeOptionalParameters.md).[receiver](TradeOptionalParameters.md#receiver)

#### Defined in

external/cow-sdk/src/trading/types.ts:69

___

### sellToken

• **sellToken**: `string`

#### Inherited from

[TradeBaseParameters](TradeBaseParameters.md).[sellToken](TradeBaseParameters.md#selltoken)

#### Defined in

external/cow-sdk/src/trading/types.ts:55

___

### sellTokenDecimals

• **sellTokenDecimals**: `number`

#### Inherited from

[TradeBaseParameters](TradeBaseParameters.md).[sellTokenDecimals](TradeBaseParameters.md#selltokendecimals)

#### Defined in

external/cow-sdk/src/trading/types.ts:56

___

### slippageBps

• `Optional` **slippageBps**: `number`

#### Inherited from

[TradeOptionalParameters](TradeOptionalParameters.md).[slippageBps](TradeOptionalParameters.md#slippagebps)

#### Defined in

external/cow-sdk/src/trading/types.ts:68

___

### validFor

• `Optional` **validFor**: `number`

#### Inherited from

[TradeOptionalParameters](TradeOptionalParameters.md).[validFor](TradeOptionalParameters.md#validfor)

#### Defined in

external/cow-sdk/src/trading/types.ts:70
