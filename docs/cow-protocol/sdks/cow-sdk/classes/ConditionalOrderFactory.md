---
id: "ConditionalOrderFactory"
title: "Class: ConditionalOrderFactory"
sidebar_label: "ConditionalOrderFactory"
sidebar_position: 0
custom_edit_url: null
---

Factory for conditional orders.

It uses a registry to instantiate the correct conditional order based on the handler.

Knowing the handler, the factory will instantiate the correct conditional order using the staticInput data.

## Constructors

### constructor

• **new ConditionalOrderFactory**(`registry`): [`ConditionalOrderFactory`](ConditionalOrderFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | [`ConditionalOrderRegistry`](../modules.md#conditionalorderregistry) |

#### Returns

[`ConditionalOrderFactory`](ConditionalOrderFactory.md)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrderFactory.ts:17

## Properties

### knownOrderTypes

• **knownOrderTypes**: [`ConditionalOrderRegistry`](../modules.md#conditionalorderregistry)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrderFactory.ts:15

## Methods

### fromParams

▸ **fromParams**(`params`): `undefined` \| [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>

Get the conditional order factory from the conditional order parameters

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ConditionalOrderParams`](../modules.md#conditionalorderparams) |

#### Returns

`undefined` \| [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>

#### Defined in

external/cow-sdk/src/composable/ConditionalOrderFactory.ts:28
