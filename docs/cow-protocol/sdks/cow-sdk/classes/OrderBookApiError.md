---
id: "OrderBookApiError"
title: "Class: OrderBookApiError<T>"
sidebar_label: "OrderBookApiError"
sidebar_position: 0
custom_edit_url: null
---

Error thrown when the CoW Protocol OrderBook API returns an error.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Hierarchy

- `Error`

  ↳ **`OrderBookApiError`**

## Constructors

### constructor

• **new OrderBookApiError**<`T`\>(`response`, `body`): [`OrderBookApiError`](OrderBookApiError.md)<`T`\>

Error thrown when the CoW Protocol OrderBook API returns an error.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | `Response` | The response from the CoW Protocol OrderBook API. |
| `body` | `T` | The body of the response. |

#### Returns

[`OrderBookApiError`](OrderBookApiError.md)<`T`\>

#### Overrides

Error.constructor

#### Defined in

external/cow-sdk/src/order-book/request.ts:14

## Properties

### body

• `Readonly` **body**: `T`

The body of the response.

#### Defined in

external/cow-sdk/src/order-book/request.ts:14

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### response

• `Readonly` **response**: `Response`

The response from the CoW Protocol OrderBook API.

#### Defined in

external/cow-sdk/src/order-book/request.ts:14

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

external/cow-sdk/node_modules/@types/node/globals.d.ts:143

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

external/cow-sdk/node_modules/@types/node/globals.d.ts:145

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

external/cow-sdk/node_modules/@types/node/globals.d.ts:136
