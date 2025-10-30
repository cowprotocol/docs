---
id: "CowShedHooks"
title: "Class: CowShedHooks"
sidebar_label: "CowShedHooks"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CowShedHooks**(`chainId`, `customOptions?`): [`CowShedHooks`](CowShedHooks.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`SupportedChainId`](../enums/SupportedChainId.md) |
| `customOptions?` | [`ICoWShedOptions`](../interfaces/ICoWShedOptions.md) |

#### Returns

[`CowShedHooks`](CowShedHooks.md)

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:24

## Properties

### chainId

• `Private` **chainId**: [`SupportedChainId`](../enums/SupportedChainId.md)

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:24

___

### customOptions

• `Private` `Optional` **customOptions**: [`ICoWShedOptions`](../interfaces/ICoWShedOptions.md)

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:24

## Methods

### encodeExecuteHooksForFactory

▸ **encodeExecuteHooksForFactory**(`calls`, `nonce`, `deadline`, `user`, `signature`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | [`ICoWShedCall`](../interfaces/ICoWShedCall.md)[] |
| `nonce` | `string` |
| `deadline` | `bigint` |
| `user` | `string` |
| `signature` | `string` |

#### Returns

`string`

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:38

___

### getDomain

▸ **getDomain**(`proxy`): `TypedDataDomain`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxy` | `string` |

#### Returns

`TypedDataDomain`

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:72

___

### getFactoryAddress

▸ **getFactoryAddress**(): `string`

#### Returns

`string`

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:85

___

### getImplementationAddress

▸ **getImplementationAddress**(): `string`

#### Returns

`string`

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:89

___

### infoToSign

▸ **infoToSign**(`calls`, `nonce`, `deadline`, `proxy`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | [`ICoWShedCall`](../interfaces/ICoWShedCall.md)[] |
| `nonce` | `string` |
| `deadline` | `bigint` |
| `proxy` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `domain` | `TypedDataDomain` |
| `message` | \{ `calls`: [`ICoWShedCall`](../interfaces/ICoWShedCall.md)[] ; `deadline`: `bigint` ; `nonce`: `string`  } |
| `message.calls` | [`ICoWShedCall`](../interfaces/ICoWShedCall.md)[] |
| `message.deadline` | `bigint` |
| `message.nonce` | `string` |
| `types` | \{ `Call`: \{ `name`: `string` = 'target'; `type`: `string` = 'address' }[] ; `ExecuteHooks`: \{ `name`: `string` = 'calls'; `type`: `string` = 'Call[]' }[]  } |
| `types.Call` | \{ `name`: `string` = 'target'; `type`: `string` = 'address' }[] |
| `types.ExecuteHooks` | \{ `name`: `string` = 'calls'; `type`: `string` = 'Call[]' }[] |

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:63

___

### proxyCreationCode

▸ **proxyCreationCode**(): `string`

#### Returns

`string`

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:81

___

### proxyOf

▸ **proxyOf**(`user`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |

#### Returns

`string`

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:26

___

### signCalls

▸ **signCalls**(`calls`, `nonce`, `deadline`, `signer`, `signingScheme`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | [`ICoWShedCall`](../interfaces/ICoWShedCall.md)[] |
| `nonce` | `string` |
| `deadline` | `bigint` |
| `signer` | `Signer` |
| `signingScheme` | `EcdsaSigningScheme` |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/cow-shed/CoWShedHooks.ts:48
