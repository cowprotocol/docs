---
id: "MetadataApi"
title: "Class: MetadataApi"
sidebar_label: "MetadataApi"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new MetadataApi**(): [`MetadataApi`](MetadataApi.md)

#### Returns

[`MetadataApi`](MetadataApi.md)

## Properties

### appDataHexToCid

• **appDataHexToCid**: (`appDataHex`: `string`) => `Promise`<`string`\> = `appDataHexToCid`

#### Type declaration

▸ (`appDataHex`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `appDataHex` | `string` |

##### Returns

`Promise`<`string`\>

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

#### Defined in

api/index.ts:22

___

### appDataHexToCidLegacy

• **appDataHexToCidLegacy**: (`appDataHex`: `string`) => `Promise`<`string`\> = `appDataHexToCidLegacy`

#### Type declaration

▸ (`appDataHex`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `appDataHex` | `string` |

##### Returns

`Promise`<`string`\>

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

#### Defined in

api/index.ts:32

___

### appDataToCid

• **appDataToCid**: (`appData`: [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)) => `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo)\>(`fullAppData`: `string`) => `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\> = `appDataToCid`

#### Type declaration

▸ (`appData`): `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo)\>

Calculates appDataHex without publishing file to IPFS

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion) | JSON document which will be stringified in a deterministic way to calculate the IPFS hash |

##### Returns

`Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo)\>

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

This method is intended to quickly generate the appDataHex independent
of IPFS upload/pinning

▸ (`fullAppData`): `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\>

Calculates appDataHex without publishing file to IPFS

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fullAppData` | `string` | JSON string with the full appData document |

##### Returns

`Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\>

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

This method is intended to quickly generate the appDataHex independent
of IPFS upload/pinning

#### Defined in

api/index.ts:21

___

### appDataToCidLegacy

• **appDataToCidLegacy**: (`appData`: [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)) => `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\>(`fullAppData`: `string`) => `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\> = `appDataToCidLegacy`

#### Type declaration

▸ (`appData`): `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\>

Calculates appDataHex without publishing file to IPFS

This method is intended to quickly generate the appDataHex independent
of IPFS upload/pinning

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion) | JSON document which will be stringified in a deterministic way to calculate the IPFS hash |

##### Returns

`Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\>

**`Deprecated`**

Old way of deriving th hash

▸ (`fullAppData`): `Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\>

Calculates appDataHex without publishing file to IPFS

This method is intended to quickly generate the appDataHex independent
of IPFS upload/pinning

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fullAppData` | `string` | JSON string with the full appData document |

##### Returns

`Promise`<[`IpfsHashInfo`](../modules.md#ipfshashinfo) \| `void`\>

**`Deprecated`**

Old way of deriving th hash

#### Defined in

api/index.ts:31

___

### cidToAppDataHex

• **cidToAppDataHex**: (`cid`: `string`) => `Promise`<`string`\> = `cidToAppDataHex`

#### Type declaration

▸ (`cid`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `cid` | `string` |

##### Returns

`Promise`<`string`\>

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

#### Defined in

api/index.ts:23

___

### fetchDocFromAppDataHex

• **fetchDocFromAppDataHex**: (`appDataHex`: `string`, `ipfsUri?`: `string`) => `Promise`<`void` \| [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\> = `fetchDocFromAppDataHex`

#### Type declaration

▸ (`appDataHex`, `ipfsUri?`): `Promise`<`void` \| [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appDataHex` | `string` | Derives the CID from the appData hex, and fetches and parses the document from IPFS |
| `ipfsUri?` | `string` | URL of the IPFS gateway to use for the fetch |

##### Returns

`Promise`<`void` \| [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

a parsed AppData document

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

#### Defined in

api/index.ts:27

___

### fetchDocFromAppDataHexLegacy

• **fetchDocFromAppDataHexLegacy**: (`appDataHex`: `string`, `ipfsUri?`: `string`) => `Promise`<`void` \| [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\> = `fetchDocFromAppDataHexLegacy`

#### Type declaration

▸ (`appDataHex`, `ipfsUri?`): `Promise`<`void` \| [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

Fetches the document from IPFS using the appData hex

##### Parameters

| Name | Type |
| :------ | :------ |
| `appDataHex` | `string` |
| `ipfsUri?` | `string` |

##### Returns

`Promise`<`void` \| [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

#### Defined in

api/index.ts:33

___

### fetchDocFromCid

• **fetchDocFromCid**: (`cid`: `string`, `ipfsUri`: `string`) => `Promise`<[`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\> = `fetchDocFromCid`

#### Type declaration

▸ (`cid`, `ipfsUri?`): `Promise`<[`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cid` | `string` | `undefined` |
| `ipfsUri` | `string` | `DEFAULT_IPFS_READ_URI` |

##### Returns

`Promise`<[`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

**`Deprecated`**

AppData is not longer stored on IPFS nor it's derived from IPFS content hashes

#### Defined in

api/index.ts:26

___

### generateAppDataDoc

• **generateAppDataDoc**: (`params?`: `Partial`<`Omit`<[`AppDataRootSchema`](../interfaces/v1_3_0.AppDataRootSchema.md), ``"version"``\>\>) => `Promise`<[`LatestAppDataDocVersion`](../modules.md#latestappdatadocversion)\> = `generateAppDataDoc`

#### Type declaration

▸ (`params?`): `Promise`<[`LatestAppDataDocVersion`](../modules.md#latestappdatadocversion)\>

Creates an appData document using the latest specification of the format

Without params creates a default minimum appData doc
Optionally creates metadata docs

Example of result:
{
  "appCode": "CoW Swap",
  "environment": "local",
  "metadata": {
    "quote": {
      "slippageBips": 50
    },
    "orderClass": {
      "orderClass": "market"
    }
  },
  "version": "1.2.0"
}

##### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `Partial`<`Omit`<[`AppDataRootSchema`](../interfaces/v1_3_0.AppDataRootSchema.md), ``"version"``\>\> |

##### Returns

`Promise`<[`LatestAppDataDocVersion`](../modules.md#latestappdatadocversion)\>

#### Defined in

api/index.ts:15

___

### getAppDataSchema

• **getAppDataSchema**: (`version`: `string`) => `Promise`<[`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\> = `getAppDataSchema`

#### Type declaration

▸ (`version`): `Promise`<[`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

Wrapper around @cowprotocol/app-data getAppDataSchema

Returns the appData schema for given version, if any
Throws CowError when version doesn't exist

##### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `string` |

##### Returns

`Promise`<[`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)\>

#### Defined in

api/index.ts:14

___

### uploadMetadataDocToIpfsLegacy

• **uploadMetadataDocToIpfsLegacy**: (`appDataDoc`: [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion), `ipfsConfig`: [`Ipfs`](../interfaces/Ipfs.md)) => `Promise`<`IpfsUploadResult` \| `void`\> = `uploadMetadataDocToIpfsLegacy`

#### Type declaration

▸ (`appDataDoc`, `ipfsConfig`): `Promise`<`IpfsUploadResult` \| `void`\>

Uploads a appDocument to IPFS

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appDataDoc` | [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion) | Document to upload |
| `ipfsConfig` | [`Ipfs`](../interfaces/Ipfs.md) | keys to access the IPFS API |

##### Returns

`Promise`<`IpfsUploadResult` \| `void`\>

the IPFS CID v0 of the content

**`Deprecated`**

Pinata IPFS automatically pins the uploaded document using some implicity encoding and hashing algorithm. This method is not used anymore to make it more explicit these parameters and therefore less depednent on the default impleemntation of Pinata

#### Defined in

api/index.ts:30

___

### validateAppDataDoc

• **validateAppDataDoc**: (`appDataDoc`: [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion)) => `Promise`<[`ValidationResult`](../modules.md#validationresult)\> = `validateAppDataDoc`

#### Type declaration

▸ (`appDataDoc`): `Promise`<[`ValidationResult`](../modules.md#validationresult)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `appDataDoc` | [`AnyAppDataDocVersion`](../modules.md#anyappdatadocversion) |

##### Returns

`Promise`<[`ValidationResult`](../modules.md#validationresult)\>

#### Defined in

api/index.ts:16
