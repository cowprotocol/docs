---
id: "CowError"
title: "Class: CowError"
sidebar_label: "CowError"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Error`

  ↳ **`CowError`**

## Constructors

### constructor

• **new CowError**(`message`, `error_code?`): [`CowError`](CowError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `error_code?` | `string` |

#### Returns

[`CowError`](CowError.md)

#### Overrides

Error.constructor

#### Defined in

external/cow-sdk/src/common/cow-error.ts:4

## Properties

### error\_code

• `Optional` **error\_code**: `string`

#### Defined in

external/cow-sdk/src/common/cow-error.ts:2

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
