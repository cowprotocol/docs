---
id: "modules"
title: "@cowprotocol/app-data"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [v0\_10\_0](namespaces/v0_10_0.md)
- [v0\_11\_0](namespaces/v0_11_0.md)
- [v0\_1\_0](namespaces/v0_1_0.md)
- [v0\_2\_0](namespaces/v0_2_0.md)
- [v0\_3\_0](namespaces/v0_3_0.md)
- [v0\_4\_0](namespaces/v0_4_0.md)
- [v0\_5\_0](namespaces/v0_5_0.md)
- [v0\_6\_0](namespaces/v0_6_0.md)
- [v0\_7\_0](namespaces/v0_7_0.md)
- [v0\_8\_0](namespaces/v0_8_0.md)
- [v0\_9\_0](namespaces/v0_9_0.md)
- [v1\_0\_0](namespaces/v1_0_0.md)
- [v1\_1\_0](namespaces/v1_1_0.md)
- [v1\_2\_0](namespaces/v1_2_0.md)
- [v1\_3\_0](namespaces/v1_3_0.md)

## Classes

- [MetadataApi](classes/MetadataApi.md)

## Interfaces

- [Ipfs](interfaces/Ipfs.md)

## References

### latest

Renames and re-exports [v1_3_0](namespaces/v1_3_0.md)

## Type Aliases

### AnyAppDataDocVersion

Ƭ **AnyAppDataDocVersion**: [`AppDataRootSchema`](interfaces/v1_3_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v1_2_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v1_1_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v1_0_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_11_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_10_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_9_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_8_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_7_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_6_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_5_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_4_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_3_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_2_0.AppDataRootSchema.md) \| [`AppDataRootSchema`](interfaces/v0_1_0.AppDataRootSchema.md)

#### Defined in

generatedTypes/index.ts:33

___

### AppDataParams

Ƭ **AppDataParams**: `Partial`<`Omit`<[`AppDataRootSchema`](interfaces/v1_3_0.AppDataRootSchema.md), ``"version"``\>\>

#### Defined in

types.ts:3

___

### IpfsHashInfo

Ƭ **IpfsHashInfo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appDataContent` | `string` | Full appData content. It will be a the exact string that if hashed using keccak-256 you would get the returned appDataHex |
| `appDataHex` | `string` | appData hex for CoW Orders. Its value is the multihash part of the IPFS CID, therefore it points to a IPFS document. Because its just the multihash, it doesn't have any infomation regarding the encoding and hashing algorithm. These parts are implicit. Currently, the implicit encoding is base16 and the implicit hashing algorithm is keccak256. See https://github.com/cowprotocol/app-data/blob/app-data-v1/src/api/appDataToCid.ts#L102 Previous versions used a different encoding and hashing algorithm (base58btc, dag-pb, sha2-256) |
| `cid` | `string` | IPFS's content identifier See https://docs.ipfs.io/concepts/content-addressing/#identifier-formats |

#### Defined in

types.ts:5

___

### LatestAppDataDocVersion

Ƭ **LatestAppDataDocVersion**: [`AppDataRootSchema`](interfaces/v1_3_0.AppDataRootSchema.md)

#### Defined in

generatedTypes/index.ts:32

___

### ValidationResult

Ƭ **ValidationResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `errors?` | `string` |
| `success` | `boolean` |

#### Defined in

types.ts:38

## Variables

### LATEST\_APP\_DATA\_VERSION

• `Const` **LATEST\_APP\_DATA\_VERSION**: ``"1.3.0"``

#### Defined in

generatedTypes/index.ts:21

___

### LATEST\_HOOKS\_METADATA\_VERSION

• `Const` **LATEST\_HOOKS\_METADATA\_VERSION**: ``"0.2.0"``

#### Defined in

generatedTypes/index.ts:26

___

### LATEST\_ORDER\_CLASS\_METADATA\_VERSION

• `Const` **LATEST\_ORDER\_CLASS\_METADATA\_VERSION**: ``"0.3.0"``

#### Defined in

generatedTypes/index.ts:24

___

### LATEST\_PARTNER\_FEE\_METADATA\_VERSION

• `Const` **LATEST\_PARTNER\_FEE\_METADATA\_VERSION**: ``"0.1.0"``

#### Defined in

generatedTypes/index.ts:29

___

### LATEST\_QUOTE\_METADATA\_VERSION

• `Const` **LATEST\_QUOTE\_METADATA\_VERSION**: ``"1.1.0"``

#### Defined in

generatedTypes/index.ts:22

___

### LATEST\_REFERRER\_METADATA\_VERSION

• `Const` **LATEST\_REFERRER\_METADATA\_VERSION**: ``"0.2.0"``

#### Defined in

generatedTypes/index.ts:23

___

### LATEST\_REPLACED\_ORDER\_METADATA\_VERSION

• `Const` **LATEST\_REPLACED\_ORDER\_METADATA\_VERSION**: ``"0.1.0"``

#### Defined in

generatedTypes/index.ts:30

___

### LATEST\_SIGNER\_METADATA\_VERSION

• `Const` **LATEST\_SIGNER\_METADATA\_VERSION**: ``"0.1.0"``

#### Defined in

generatedTypes/index.ts:27

___

### LATEST\_UTM\_METADATA\_VERSION

• `Const` **LATEST\_UTM\_METADATA\_VERSION**: ``"0.2.0"``

#### Defined in

generatedTypes/index.ts:25

___

### LATEST\_WIDGET\_METADATA\_VERSION

• `Const` **LATEST\_WIDGET\_METADATA\_VERSION**: ``"0.1.0"``

#### Defined in

generatedTypes/index.ts:28

## Functions

### stringifyDeterministic

▸ **stringifyDeterministic**(`obj`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`Promise`<`string`\>

#### Defined in

utils/stringify.ts:1
