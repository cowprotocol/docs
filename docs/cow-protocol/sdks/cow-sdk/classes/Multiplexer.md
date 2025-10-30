---
id: "Multiplexer"
title: "Class: Multiplexer"
sidebar_label: "Multiplexer"
sidebar_position: 0
custom_edit_url: null
---

Multiplexer for conditional orders - using `ComposableCoW`!

This class provides functionality to:
- Generate a merkle tree of conditional orders
- Generate proofs for all orders in the merkle tree
- Save proofs, with the ability to omit / skip specific conditional orders
- Support for passing an optional upload function to upload the proofs to a decentralized storage network

## Constructors

### constructor

• **new Multiplexer**(`chain`, `orders?`, `root?`, `location?`): [`Multiplexer`](Multiplexer.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `chain` | [`SupportedChainId`](../enums/SupportedChainId.md) | `undefined` | The `chainId` for where we're using `ComposableCoW`. |
| `orders?` | [`Orders`](../modules.md#orders) | `undefined` | An optional array of conditional orders to initialize the merkle tree with. |
| `root?` | `string` | `undefined` | An optional root to verify against. |
| `location` | [`ProofLocation`](../enums/ProofLocation.md) | `ProofLocation.PRIVATE` | The location of the proofs for the conditional orders. |

#### Returns

[`Multiplexer`](Multiplexer.md)

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:42

## Properties

### chain

• **chain**: [`SupportedChainId`](../enums/SupportedChainId.md)

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:29

___

### ctx

• `Private` `Optional` **ctx**: `string`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:34

___

### location

• **location**: [`ProofLocation`](../enums/ProofLocation.md)

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:30

___

### orders

• `Private` **orders**: [`Orders`](../modules.md#orders) = `{}`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:32

___

### tree

• `Private` `Optional` **tree**: `StandardMerkleTree`<`string`[]\>

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:33

___

### orderTypeRegistry

▪ `Static` **orderTypeRegistry**: `Record`<`string`, (...`args`: `unknown`[]) => [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>\> = `{}`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:27

## Accessors

### orderIds

• `get` **orderIds**(): `string`[]

Get all the conditional order ids in the multiplexer.

#### Returns

`string`[]

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:226

___

### root

• `get` **root**(): `string`

#### Returns

`string`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:230

## Methods

### add

▸ **add**<`T`, `P`\>(`order`): `void`

Add a conditional order to the merkle tree.

#### Type parameters

| Name |
| :------ |
| `T` |
| `P` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`ConditionalOrder`](ConditionalOrder.md)<`T`, `P`\> | The order to add to the merkle tree. |

#### Returns

`void`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:168

___

### dumpProofs

▸ **dumpProofs**(`filter?`): `string`

The primary entry point for dumping the proofs and parameters for the conditional orders.

This is to be used by watchtowers / indexers to store the proofs and parameters for the
conditional orders off-chain. The encoding returned by this method may **NOT** contain all
proofs and parameters, depending on the `filter` provided, and therefore should not be used
to rehydrate the multiplexer from a user's perspective.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | (`v`: `string`[]) => `boolean` | [getProofs](Multiplexer.md#getproofs) |

#### Returns

`string`

A JSON-encoded string of the proofs and parameters for the conditional orders.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:362

___

### dumpProofsAndParams

▸ **dumpProofsAndParams**(`filter?`): [`ProofWithParams`](../modules.md#proofwithparams)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | (`v`: `string`[]) => `boolean` |

#### Returns

[`ProofWithParams`](../modules.md#proofwithparams)[]

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:366

___

### encodeToABI

▸ **encodeToABI**(`filter?`): `string`

ABI-encode the proofs and parameters for the conditional orders in the merkle tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | (`v`: `string`[]) => `boolean` | [getProofs](Multiplexer.md#getproofs) |

#### Returns

`string`

ABI-encoded `data` for the `ProofStruct`.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:408

___

### encodeToJSON

▸ **encodeToJSON**(`filter?`): `string`

JSON-encode the proofs and parameters for the conditional orders in the merkle tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | (`v`: `string`[]) => `boolean` | [getProofs](Multiplexer.md#getproofs) |

#### Returns

`string`

The JSON-encoded data for storage off-chain.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:417

___

### getById

▸ **getById**(`id`): [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>

Accessor for a given conditional order in the multiplexer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` of the `ConditionalOrder` to retrieve. |

#### Returns

[`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>

A `ConditionalOrder` with the given `id`.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:210

___

### getByIndex

▸ **getByIndex**(`i`): [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>

Accessor for a given conditional order in the multiplexer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `i` | `number` | The index of the `ConditionalOrder` to retrieve. |

#### Returns

[`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>

A `ConditionalOrder` at the given index.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:219

___

### getOrGenerateTree

▸ **getOrGenerateTree**(): `StandardMerkleTree`<`string`[]\>

Retrieve the merkle tree of orders, or generate it if it doesn't exist.

**CAUTION**: Developers of the SDK should prefer to use this method instead of generating the
             merkle tree themselves. This method makes use of caching to avoid generating the
             merkle tree needlessly.

#### Returns

`StandardMerkleTree`<`string`[]\>

The merkle tree for the current set of conditional orders.

**`Throws`**

If the merkle tree cannot be generated.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:243

___

### getProofs

▸ **getProofs**(`filter?`): [`ProofWithParams`](../modules.md#proofwithparams)[]

Get the proofs with parameters for the conditional orders in the merkle tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | (`v`: `string`[]) => `boolean` | A function that takes a conditional order and returns a boolean indicating whether the order should be included in the proof. |

#### Returns

[`ProofWithParams`](../modules.md#proofwithparams)[]

An array of proofs and their order's parameters for the conditional orders in the
         merkle tree.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:377

___

### prepareProofStruct

▸ **prepareProofStruct**(`location?`, `filter?`, `uploader?`): `Promise`<`ProofStruct`\>

The primary entry point for dapps integrating with `ComposableCoW` to generate the proofs and
parameters for the conditional orders.

After populating the multiplexer with conditional orders, this method can be used to generate
the proofs and parameters for the conditional orders. The returned `ProofStruct` can then be
used with `setRoot` or `setRootWithContext` on a `ComposableCoW`-enabled Safe.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | [`ProofLocation`](../enums/ProofLocation.md) | - |
| `filter?` | (`v`: `string`[]) => `boolean` | [getProofs](Multiplexer.md#getproofs) |
| `uploader?` | (`offChainEncoded`: `string`) => `Promise`<`string`\> | - |

#### Returns

`Promise`<`ProofStruct`\>

The ABI-encoded `ProofStruct` for `setRoot` and `setRootWithContext`.

**`Parma`**

locFn A function that takes the off-chain encoded input, and returns the `location`
       for the `ProofStruct`, and the `data` for the `ProofStruct`.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:280

___

### remove

▸ **remove**(`id`): `void`

Remove a conditional order from the merkle tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The id of the `ConditionalOrder` to remove from the merkle tree. |

#### Returns

`void`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:179

___

### reset

▸ **reset**(): `void`

A helper to reset the merkle tree.

#### Returns

`void`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:424

___

### toJSON

▸ **toJSON**(): `string`

Serialize the multiplexer to JSON.

This will include all state necessary to reconstruct the multiplexer, including the root.

#### Returns

`string`

The JSON representation of the multiplexer, including the root but excluding the merkle tree.

**`Remarks`**

This will **NOT** include the merkle tree.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:143

___

### update

▸ **update**(`id`, `updater`): `void`

Update a given conditional order in the merkle tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The id of the `ConditionalOrder` to update. |
| `updater` | (`order`: [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\>, `ctx?`: `string`) => [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\> | A function that takes the existing `ConditionalOrder` and context, returning an updated `ConditionalOrder`. |

#### Returns

`void`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:189

___

### decodeFromJSON

▸ **decodeFromJSON**(`s`): [`ProofWithParams`](../modules.md#proofwithparams)[]

The primary method for watch towers to use when deserializing the proofs and parameters for the conditional orders.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | The serialized proofs with parameters for consumption by watchtowers / indexers. |

#### Returns

[`ProofWithParams`](../modules.md#proofwithparams)[]

The `ProofWithParams` array.

**`Throws`**

If the `ProofWithParams` array cannot be deserialized.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:262

___

### fromJSON

▸ **fromJSON**(`s`): [`Multiplexer`](Multiplexer.md)

Given a serialized multiplexer, create the multiplexer and rehydrate all conditional orders.
Integrity of the multiplexer will be verified by generating the merkle tree and verifying
the root.

**NOTE**: Before using this method, you must register all conditional order types using `Multiplexer.registerOrderType`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | The serialized multiplexer. |

#### Returns

[`Multiplexer`](Multiplexer.md)

The multiplexer with all conditional orders rehydrated.

**`Throws`**

If the multiplexer cannot be deserialized.

**`Throws`**

If the merkle tree cannot be generated.

**`Throws`**

If the merkle tree cannot be verified against the root.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:98

___

### poll

▸ **poll**(`owner`, `p`, `chain`, `provider`, `offChainInputFn?`): `Promise`<[`DataStruct`, `string`]\>

Poll a conditional order to see if it is tradeable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The owner of the conditional order. |
| `p` | [`ProofWithParams`](../modules.md#proofwithparams) | The proof and parameters. |
| `chain` | [`SupportedChainId`](../enums/SupportedChainId.md) | Which chain to use for the ComposableCoW contract. |
| `provider` | `Provider` | An RPC provider for the chain. |
| `offChainInputFn?` | (`owner`: `string`, `params`: [`ConditionalOrderParams`](../modules.md#conditionalorderparams)) => `Promise`<`string`\> | A function, if provided, that will return the off-chain input for the conditional order. |

#### Returns

`Promise`<[`DataStruct`, `string`]\>

The tradeable `GPv2Order.Data` struct and the `signature` for the conditional order.

**`Throws`**

If the conditional order is not tradeable.

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:339

___

### registerOrderType

▸ **registerOrderType**(`orderType`, `conditionalOrderClass`): `void`

Register a conditional order type with the multiplexer.

**CAUTION**: This is required for using `Multiplexer.fromJSON` and `Multiplexer.toJSON`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderType` | `string` | The order type to register. |
| `conditionalOrderClass` | (...`args`: `any`[]) => [`ConditionalOrder`](ConditionalOrder.md)<`unknown`, `unknown`\> | The class to use for the given order type. |

#### Returns

`void`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:435

___

### resetOrderTypeRegistry

▸ **resetOrderTypeRegistry**(): `void`

Reset the order type registry.

#### Returns

`void`

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:445
