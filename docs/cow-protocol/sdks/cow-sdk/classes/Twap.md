---
id: "Twap"
title: "Class: Twap"
sidebar_label: "Twap"
sidebar_position: 0
custom_edit_url: null
---

`ComposableCoW` implementation of a TWAP order.

**`Author`**

mfw78 <mfw78@rndlabs.xyz>

## Hierarchy

- [`ConditionalOrder`](ConditionalOrder.md)<[`TwapData`](../interfaces/TwapData.md), [`TwapStruct`](../interfaces/TwapStruct.md)\>

  ↳ **`Twap`**

## Constructors

### constructor

• **new Twap**(`params`): [`Twap`](Twap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ConditionalOrderArguments`](../interfaces/ConditionalOrderArguments.md)<[`TwapData`](../interfaces/TwapData.md)\> |

#### Returns

[`Twap`](Twap.md)

**`See`**

[ConditionalOrder.constructor](ConditionalOrder.md#constructor)

**`Throws`**

If the TWAP order is invalid.

**`Throws`**

If the TWAP order is not ABI-encodable.

**`Throws`**

If the handler is not the TWAP address.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[constructor](ConditionalOrder.md#constructor)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:172

## Properties

### data

• `Readonly` **data**: [`TwapData`](../interfaces/TwapData.md)

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[data](ConditionalOrder.md#data)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:37

___

### handler

• `Readonly` **handler**: `string`

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[handler](ConditionalOrder.md#handler)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:35

___

### hasOffChainInput

• `Readonly` **hasOffChainInput**: `boolean`

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[hasOffChainInput](ConditionalOrder.md#hasoffchaininput)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:39

___

### isSingleOrder

• **isSingleOrder**: `boolean` = `true`

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[isSingleOrder](ConditionalOrder.md#issingleorder)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:164

___

### salt

• `Readonly` **salt**: `string`

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[salt](ConditionalOrder.md#salt)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:36

___

### staticInput

• `Readonly` **staticInput**: [`TwapStruct`](../interfaces/TwapStruct.md)

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[staticInput](ConditionalOrder.md#staticinput)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:38

## Accessors

### context

• `get` **context**(): `undefined` \| [`ContextFactory`](../modules.md#contextfactory)

Enforces that TWAPs will commence at the beginning of a block by use of the
`CurrentBlockTimestampFactory` contract to provide the current block timestamp
as the start time of the TWAP.

#### Returns

`undefined` \| [`ContextFactory`](../modules.md#contextfactory)

#### Overrides

ConditionalOrder.context

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:205

___

### createCalldata

• `get` **createCalldata**(): `string`

Get the calldata for creating the conditional order.

This will automatically determine whether or not to use `create` or `createWithContext` based on the
order type's context dependency.

**NOTE**: By default, this will cause the create to emit the `ConditionalOrderCreated` event.

#### Returns

`string`

The calldata for creating the conditional order.

#### Inherited from

ConditionalOrder.createCalldata

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:113

___

### ctx

• `get` **ctx**(): `string`

The context key of the order (bytes32(0) if a merkle tree is used, otherwise H(params)) with which to lookup the cabinet

The context, relates to the 'ctx' in the contract: https://github.com/cowprotocol/composable-cow/blob/c7fb85ab10c05e28a1632ba97a1749fb261fcdfb/src/interfaces/IConditionalOrder.sol#L38

#### Returns

`string`

#### Inherited from

ConditionalOrder.ctx

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:166

___

### id

• `get` **id**(): `string`

Calculate the id of the conditional order (which also happens to be the key used for `ctx` in the ComposableCoW contract).

This is a `keccak256` hash of the serialized conditional order.

#### Returns

`string`

The id of the conditional order.

#### Inherited from

ConditionalOrder.id

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:157

___

### leaf

• `get` **leaf**(): [`ConditionalOrderParams`](../modules.md#conditionalorderparams)

Get the `leaf` of the conditional order. This is the data that is used to create the merkle tree.

For the purposes of this library, the `leaf` is the `ConditionalOrderParams` struct.

#### Returns

[`ConditionalOrderParams`](../modules.md#conditionalorderparams)

The `leaf` of the conditional order.

**`See`**

ConditionalOrderParams

#### Inherited from

ConditionalOrder.leaf

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:177

___

### offChainInput

• `get` **offChainInput**(): `string`

If the conditional order has off-chain input, return it!

**NOTE**: This should be overridden by any conditional order that has off-chain input.

#### Returns

`string`

The off-chain input.

#### Inherited from

ConditionalOrder.offChainInput

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:201

___

### orderType

• `get` **orderType**(): `string`

Get a descriptive name for the type of the conditional order (i.e twap, dca, etc).

#### Returns

`string`

The concrete type of the conditional order.

#### Overrides

ConditionalOrder.orderType

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:219

___

### removeCalldata

• `get` **removeCalldata**(): `string`

Get the calldata for removing a conditional order that was created as a single order.

#### Returns

`string`

The calldata for removing the conditional order.

#### Inherited from

ConditionalOrder.removeCalldata

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:145

## Methods

### assertIsValid

▸ **assertIsValid**(): `void`

#### Returns

`void`

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[assertIsValid](ConditionalOrder.md#assertisvalid)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:95

___

### cabinet

▸ **cabinet**(`params`): `Promise`<`string`\>

Checks the value in the cabinet for a given owner and chain

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`OwnerContext`](../modules.md#ownercontext) | owner context, to be able to check the cabinet |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[cabinet](ConditionalOrder.md#cabinet)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:337

___

### encodeStaticInput

▸ **encodeStaticInput**(): `string`

Get the encoded static input for the TWAP order.

#### Returns

`string`

The ABI-encoded TWAP order.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[encodeStaticInput](ConditionalOrder.md#encodestaticinput)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:449

___

### encodeStaticInputHelper

▸ **encodeStaticInputHelper**(`orderDataTypes`, `staticInput`): `string`

A helper function for generically serializing a conditional order's static input.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderDataTypes` | `string`[] | ABI types for the order's data struct. |
| `staticInput` | [`TwapStruct`](../interfaces/TwapStruct.md) | - |

#### Returns

`string`

An ABI-encoded representation of the order's data struct.

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[encodeStaticInputHelper](ConditionalOrder.md#encodestaticinputhelper)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:234

___

### endTimestamp

▸ **endTimestamp**(`startTimestamp`): `number`

Given the start timestamp of the TWAP, calculate the end timestamp.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startTimestamp` | `number` | The start timestamp of the TWAP. |

#### Returns

`number`

The timestamp at which the TWAP will end.

**`Dev`**

As usually the `endTimestamp` is used when determining a TWAP's validity, we don't
     do any lookup to the blockchain to determine the start timestamp, as this has likely
     already been done during the verification flow.

**`Dev`**

Beware to handle the case of `span != 0` ie. `durationOfPart.durationType !== DurationType.AUTO`.

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:302

___

### handlePollFailedAlreadyPresent

▸ **handlePollFailedAlreadyPresent**(`_orderUid`, `_order`, `params`): `Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

Handles the error when the order is already present in the orderbook.

Given the current part is in the book, it will signal to Watch Tower what to do:
  - Wait until the next part starts
  - Don't try again if current part is the last one

NOTE: The error messages will refer to the parts 1-indexed, so first part is 1, second part is 2, etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_orderUid` | `string` |
| `_order` | `DataStruct` |
| `params` | [`PollParams`](../modules.md#pollparams) |

#### Returns

`Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[handlePollFailedAlreadyPresent](ConditionalOrder.md#handlepollfailedalreadypresent)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:378

___

### isAuthorized

▸ **isAuthorized**(`params`): `Promise`<`boolean`\>

Checks if the owner authorized the conditional order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`OwnerContext`](../modules.md#ownercontext) | owner context, to be able to check if the order is authorized |

#### Returns

`Promise`<`boolean`\>

true if the owner authorized the order, false otherwise.

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[isAuthorized](ConditionalOrder.md#isauthorized)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:326

___

### isValid

▸ **isValid**(): [`IsValidResult`](../modules.md#isvalidresult)

Validate the TWAP order.

#### Returns

[`IsValidResult`](../modules.md#isvalidresult)

Whether the TWAP order is valid.

**`Throws`**

If the TWAP order is invalid.

**`See`**

[TwapStruct](../interfaces/TwapStruct.md) for the native struct.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[isValid](ConditionalOrder.md#isvalid)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:230

___

### poll

▸ **poll**(`params`): `Promise`<[`PollResult`](../modules.md#pollresult)\>

Poll a conditional order to see if it is tradeable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`PollParams`](../modules.md#pollparams) |

#### Returns

`Promise`<[`PollResult`](../modules.md#pollresult)\>

The tradeable `GPv2Order.Data` struct and the `signature` for the conditional order.

**`Throws`**

If the conditional order is not tradeable.

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[poll](ConditionalOrder.md#poll)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:249

___

### pollValidate

▸ **pollValidate**(`params`): `Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

Checks if the owner authorized the conditional order.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`PollParams`](../modules.md#pollparams) |

#### Returns

`Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

true if the owner authorized the order, false otherwise.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[pollValidate](ConditionalOrder.md#pollvalidate)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:320

___

### serialize

▸ **serialize**(): `string`

Serialize the TWAP order into it's ABI-encoded form.

#### Returns

`string`

The ABI-encoded TWAP order.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[serialize](ConditionalOrder.md#serialize)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:441

___

### startTimestamp

▸ **startTimestamp**(`params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`OwnerContext`](../modules.md#ownercontext) |

#### Returns

`Promise`<`number`\>

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:268

___

### toString

▸ **toString**(): `string`

Create a human-readable string representation of the TWAP order.

#### Returns

`string`

A human-readable string representation of the TWAP order.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[toString](ConditionalOrder.md#tostring)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:476

___

### transformDataToStruct

▸ **transformDataToStruct**(`data`): [`TwapStruct`](../interfaces/TwapStruct.md)

Transform parameters into a native struct.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`TwapData`](../interfaces/TwapData.md) | As passed by the consumer of the API. |

#### Returns

[`TwapStruct`](../interfaces/TwapStruct.md)

A formatted struct as expected by the smart contract.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[transformDataToStruct](ConditionalOrder.md#transformdatatostruct)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:517

___

### transformStructToData

▸ **transformStructToData**(`struct`): [`TwapData`](../interfaces/TwapData.md)

Transform parameters into a TWAP order struct.

#### Parameters

| Name | Type |
| :------ | :------ |
| `struct` | [`TwapStruct`](../interfaces/TwapStruct.md) |

#### Returns

[`TwapData`](../interfaces/TwapData.md)

A formatted struct as expected by the smart contract.

#### Overrides

[ConditionalOrder](ConditionalOrder.md).[transformStructToData](ConditionalOrder.md#transformstructtodata)

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:527

___

### deserialize

▸ **deserialize**(`twapSerialized`): [`Twap`](Twap.md)

Deserialize a TWAP order from it's ABI-encoded form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `twapSerialized` | `string` | ABI-encoded TWAP order to deserialize. |

#### Returns

[`Twap`](Twap.md)

A deserialized TWAP order.

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:458

___

### deserializeHelper

▸ **deserializeHelper**<`T`\>(`s`, `handler`, `orderDataTypes`, `callback`): `T`

A helper function for generically deserializing a conditional order.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | The ABI-encoded `IConditionalOrder.Params` struct to deserialize. |
| `handler` | `string` | Address of the handler for the conditional order. |
| `orderDataTypes` | `string`[] | ABI types for the order's data struct. |
| `callback` | (`d`: `any`, `salt`: `string`) => `T` | A callback function that takes the deserialized data struct and the salt and returns an instance of the class. |

#### Returns

`T`

An instance of the conditional order class.

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[deserializeHelper](ConditionalOrder.md#deserializehelper)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:400

___

### fromData

▸ **fromData**(`data`, `salt?`): [`Twap`](Twap.md)

Create a TWAP order with sound defaults.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`TwapData`](../interfaces/TwapData.md) | The TWAP order parameters in a more user-friendly format. |
| `salt?` | `string` | - |

#### Returns

[`Twap`](Twap.md)

An instance of the TWAP order.

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:187

___

### fromParams

▸ **fromParams**(`params`): [`Twap`](Twap.md)

Create a TWAP order with sound defaults.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ConditionalOrderParams`](../modules.md#conditionalorderparams) |

#### Returns

[`Twap`](Twap.md)

An instance of the TWAP order.

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:196

___

### leafToId

▸ **leafToId**(`leaf`): `string`

Calculate the id of the conditional order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `leaf` | [`ConditionalOrderParams`](../modules.md#conditionalorderparams) | The `leaf` representing the conditional order. |

#### Returns

`string`

The id of the conditional order.

**`See`**

ConditionalOrderParams

#### Inherited from

[ConditionalOrder](ConditionalOrder.md).[leafToId](ConditionalOrder.md#leaftoid)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:191
