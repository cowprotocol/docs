---
id: "latest"
title: "Namespace: latest"
sidebar_label: "latest"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [AppDataRootSchema](../interfaces/latest.AppDataRootSchema.md)
- [CoWHook](../interfaces/latest.CoWHook.md)
- [Metadata](../interfaces/latest.Metadata.md)
- [OrderClass](../interfaces/latest.OrderClass.md)
- [OrderInteractionHooks](../interfaces/latest.OrderInteractionHooks.md)
- [PartnerFee](../interfaces/latest.PartnerFee.md)
- [Quote](../interfaces/latest.Quote.md)
- [Referrer](../interfaces/latest.Referrer.md)
- [ReplacedOrder](../interfaces/latest.ReplacedOrder.md)
- [UTMCodes](../interfaces/latest.UTMCodes.md)
- [Widget](../interfaces/latest.Widget.md)

## Type Aliases

### AppCode

Ƭ **AppCode**: `string`

The code identifying the CLI, UI, service generating the order.

#### Defined in

generatedTypes/v1.3.0.ts:15

___

### AppCode1

Ƭ **AppCode1**: `string`

The code identifying the UI powering the widget

#### Defined in

generatedTypes/v1.3.0.ts:88

___

### BasisPointBPS

Ƭ **BasisPointBPS**: `number`

The fee in basis points (BPS) to be paid to the partner. One basis point is equivalent to 0.01% (1/100th of a percent)

#### Defined in

generatedTypes/v1.3.0.ts:96

___

### Environment

Ƭ **Environment**: `string`

Environment from which the order came from.

#### Defined in

generatedTypes/v1.3.0.ts:19

___

### Environment1

Ƭ **Environment1**: `string`

Environment from which the order came from.

#### Defined in

generatedTypes/v1.3.0.ts:92

___

### HookCallData

Ƭ **HookCallData**: `string`

The calldata to use when calling the hook

#### Defined in

generatedTypes/v1.3.0.ts:68

___

### HookGasLimit

Ƭ **HookGasLimit**: `string`

The gas limit (in gas units) for the hook

#### Defined in

generatedTypes/v1.3.0.ts:72

___

### HookTarget

Ƭ **HookTarget**: `string`

The contract to call for the hook

#### Defined in

generatedTypes/v1.3.0.ts:64

___

### IdOfTheDAppWhichHasBuiltTheHook

Ƭ **IdOfTheDAppWhichHasBuiltTheHook**: `string`

CoW Swap has an interface that allows dApps to build hooks for orders. This field is used to identify the dApp that has built the hook.

#### Defined in

generatedTypes/v1.3.0.ts:76

___

### OrderClass1

Ƭ **OrderClass1**: ``"market"`` \| ``"limit"`` \| ``"liquidity"`` \| ``"twap"``

Indicator of the order class.

#### Defined in

generatedTypes/v1.3.0.ts:56

___

### PartnerAccount

Ƭ **PartnerAccount**: `string`

The Ethereum address of the partner to receive the fee.

#### Defined in

generatedTypes/v1.3.0.ts:100

___

### PostHooks

Ƭ **PostHooks**: [`CoWHook`](../interfaces/latest.CoWHook.md)[]

CoW Hooks to call after an order executes

#### Defined in

generatedTypes/v1.3.0.ts:84

___

### PreHooks

Ƭ **PreHooks**: [`CoWHook`](../interfaces/latest.CoWHook.md)[]

CoW Hooks to call before an order executes

#### Defined in

generatedTypes/v1.3.0.ts:80

___

### ReferrerAddress

Ƭ **ReferrerAddress**: `string`

#### Defined in

generatedTypes/v1.3.0.ts:24

___

### ReplacedOrderUID

Ƭ **ReplacedOrderUID**: `string`

The replaced order UID.

#### Defined in

generatedTypes/v1.3.0.ts:104

___

### Signer

Ƭ **Signer**: `string`

The address of the trader who signs the CoW Swap order. This field should normally be omitted; it is recommended to use it if the signer is a smart-contract wallet using EIP-1271 signatures.

#### Defined in

generatedTypes/v1.3.0.ts:23

___

### SlippageBips

Ƭ **SlippageBips**: `number`

Slippage tolerance that was applied to the order to get the limit price. Expressed in Basis Points (BPS). One basis point is equivalent to 0.01% (1/100th of a percent)

#### Defined in

generatedTypes/v1.3.0.ts:48

___

### SmartSlippage

Ƭ **SmartSlippage**: `boolean`

Whether the given slippageBips used is originated from a Smart slippage suggestion

#### Defined in

generatedTypes/v1.3.0.ts:52

___

### UTMCampaign

Ƭ **UTMCampaign**: `string`

Track the performance of a specific campaign

#### Defined in

generatedTypes/v1.3.0.ts:36

___

### UTMContent

Ƭ **UTMContent**: `string`

Track which link was clicked

#### Defined in

generatedTypes/v1.3.0.ts:40

___

### UTMKeywordTerm

Ƭ **UTMKeywordTerm**: `string`

Track which keyword term a website visitor came from

#### Defined in

generatedTypes/v1.3.0.ts:44

___

### UTMMedium

Ƭ **UTMMedium**: `string`

Tracks in which medium the traffic originated from (mail, CPC, social, etc.)

#### Defined in

generatedTypes/v1.3.0.ts:32

___

### UTMSource

Ƭ **UTMSource**: `string`

Tracks in which medium the traffic originated from (twitter, facebook, etc.)

#### Defined in

generatedTypes/v1.3.0.ts:28

___

### Version

Ƭ **Version**: `string`

Semantic versioning of document.

#### Defined in

generatedTypes/v1.3.0.ts:11

___

### Version1

Ƭ **Version1**: `string`

Semantic versioning of document.

#### Defined in

generatedTypes/v1.3.0.ts:60
