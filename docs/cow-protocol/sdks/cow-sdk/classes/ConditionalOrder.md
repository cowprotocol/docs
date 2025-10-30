---
id: "ConditionalOrder"
title: "Class: ConditionalOrder<D, S>"
sidebar_label: "ConditionalOrder"
sidebar_position: 0
custom_edit_url: null
---

An abstract base class from which all conditional orders should inherit.

This class provides some basic functionality to help with handling conditional orders,
such as:
- Validating the conditional order
- Creating a human-readable string representation of the conditional order
- Serializing the conditional order for use with the `IConditionalOrder` struct
- Getting any dependencies for the conditional order
- Getting the off-chain input for the conditional order

**NOTE**: Instances of conditional orders have an `id` property that is a `keccak256` hash of
          the serialized conditional order.

## Type parameters

| Name |
| :------ |
| `D` |
| `S` |

## Hierarchy

- **`ConditionalOrder`**

  ↳ [`Twap`](Twap.md)

## Constructors

### constructor

• **new ConditionalOrder**<`D`, `S`\>(`params`): [`ConditionalOrder`](ConditionalOrder.md)<`D`, `S`\>

A constructor that provides some basic validation for the conditional order.

This constructor **MUST** be called by any class that inherits from `ConditionalOrder`.

**NOTE**: The salt is optional and will be randomly generated if not provided.

#### Type parameters

| Name |
| :------ |
| `D` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ConditionalOrderArguments`](../interfaces/ConditionalOrderArguments.md)<`D`\> |

#### Returns

[`ConditionalOrder`](ConditionalOrder.md)<`D`, `S`\>

**`Throws`**

If the handler is not a valid ethereum address.

**`Throws`**

If the salt is not a valid 32-byte string.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:54

## Properties

### data

• `Readonly` **data**: `D`

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:37

___

### handler

• `Readonly` **handler**: `string`

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:35

___

### hasOffChainInput

• `Readonly` **hasOffChainInput**: `boolean`

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:39

___

### salt

• `Readonly` **salt**: `string`

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:36

___

### staticInput

• `Readonly` **staticInput**: `S`

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:38

## Accessors

### context

• `get` **context**(): `undefined` \| [`ContextFactory`](../modules.md#contextfactory)

Get the context dependency for the conditional order.

This is used when calling `createWithContext` or `setRootWithContext` on a ComposableCoW-enabled Safe.

#### Returns

`undefined` \| [`ContextFactory`](../modules.md#contextfactory)

The context dependency.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:91

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:113

___

### ctx

• `get` **ctx**(): `string`

The context key of the order (bytes32(0) if a merkle tree is used, otherwise H(params)) with which to lookup the cabinet

The context, relates to the 'ctx' in the contract: https://github.com/cowprotocol/composable-cow/blob/c7fb85ab10c05e28a1632ba97a1749fb261fcdfb/src/interfaces/IConditionalOrder.sol#L38

#### Returns

`string`

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:157

___

### isSingleOrder

• `get` **isSingleOrder**(): `boolean`

#### Returns

`boolean`

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:76

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:201

___

### orderType

• `get` **orderType**(): `string`

Get a descriptive name for the type of the conditional order (i.e twap, dca, etc).

#### Returns

`string`

The concrete type of the conditional order.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:83

___

### removeCalldata

• `get` **removeCalldata**(): `string`

Get the calldata for removing a conditional order that was created as a single order.

#### Returns

`string`

The calldata for removing the conditional order.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:145

## Methods

### assertIsValid

▸ **assertIsValid**(): `void`

#### Returns

`void`

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:337

___

### encodeStaticInput

▸ **encodeStaticInput**(): `string`

Encode the `staticInput` for the conditional order.

#### Returns

`string`

The ABI-encoded `staticInput` for the conditional order.

**`See`**

ConditionalOrderParams

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:225

___

### encodeStaticInputHelper

▸ **encodeStaticInputHelper**(`orderDataTypes`, `staticInput`): `string`

A helper function for generically serializing a conditional order's static input.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderDataTypes` | `string`[] | ABI types for the order's data struct. |
| `staticInput` | `S` | - |

#### Returns

`string`

An ABI-encoded representation of the order's data struct.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:234

___

### handlePollFailedAlreadyPresent

▸ **handlePollFailedAlreadyPresent**(`orderUid`, `order`, `params`): `Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

This method lets the concrete conditional order decide what to do if the order yielded in the polling is already present in the Orderbook API.

The concrete conditional order will have a chance to schedule the next poll.
For example, a TWAP order that has the current part already in the orderbook, can signal that the next poll should be done at the start time of the next part.

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderUid` | `string` |
| `order` | `DataStruct` |
| `params` | [`PollParams`](../modules.md#pollparams) |

#### Returns

`Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:364

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:326

___

### isValid

▸ **isValid**(): [`IsValidResult`](../modules.md#isvalidresult)

#### Returns

[`IsValidResult`](../modules.md#isvalidresult)

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:102

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:249

___

### pollValidate

▸ **pollValidate**(`params`): `Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

Allow concrete conditional orders to perform additional validation for the poll method.

This will allow the concrete orders to decide when an order shouldn't be polled again. For example, if the orders is expired.
It also allows to signal when should the next check be done. For example, an order could signal that the validations will fail until a certain time or block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`PollParams`](../modules.md#pollparams) | The poll parameters |

#### Returns

`Promise`<`undefined` \| [`PollResultErrors`](../modules.md#pollresulterrors)\>

undefined if the concrete order can't make a decision. Otherwise, it returns a PollResultErrors object.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:354

___

### serialize

▸ **serialize**(): `string`

Serializes the conditional order into it's ABI-encoded form.

#### Returns

`string`

The equivalent of `IConditionalOrder.Params` for the conditional order.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:217

___

### toString

▸ **toString**(`tokenFormatter?`): `string`

Create a human-readable string representation of the conditional order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenFormatter?` | (`address`: `string`, `amount`: `BigNumber`) => `string` | An optional function that takes an address and an amount and returns a human-readable string. |

#### Returns

`string`

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:210

___

### transformDataToStruct

▸ **transformDataToStruct**(`params`): `S`

Converts a friendly data object modelling the smart order into the struct that the contract expect as an encoded `staticInput`.

**NOTE**: This should be overridden by any conditional order that requires transformations.
This implementation is a no-op if you use the same type for both.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `D` | {S} Parameters that are passed in to the constructor. |

#### Returns

`S`

The static input for the conditional order.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:390

___

### transformStructToData

▸ **transformStructToData**(`params`): `D`

Convert the struct that the contract expect as an encoded `staticInput` into a friendly data object modelling the smart order.

**NOTE**: This should be overridden by any conditional order that requires transformations.
This implementation is a no-op if you use the same type for both.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `S` | {S} Parameters that are passed in to the constructor. |

#### Returns

`D`

The static input for the conditional order.

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:379

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:400

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

#### Defined in

external/cow-sdk/src/composable/ConditionalOrder.ts:191
