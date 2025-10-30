---
id: "TwapData"
title: "Interface: TwapData"
sidebar_label: "TwapData"
sidebar_position: 0
custom_edit_url: null
---

Parameters for a TWAP order, made a little more user-friendly for SDK users.

**`See`**

[TwapStruct](TwapStruct.md) for the native struct.

## Hierarchy

- [`TwapDataBase`](../modules.md#twapdatabase)

  ↳ **`TwapData`**

## Properties

### appData

• `Readonly` **appData**: `string`

Meta-data associated with the order. Normally would be the keccak256 hash of the document generated in http://github.com/cowprotocol/app-data

This hash should have been uploaded to the API https://api.cow.fi/docs/#/default/put_api_v1_app_data__app_data_hash_ and potentially to other data availability protocols like IPFS.

#### Inherited from

TwapDataBase.appData

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:63

___

### buyAmount

• `Readonly` **buyAmount**: `BigNumber`

minimum amount of buyToken that must be bought across the entire TWAP

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:115

___

### buyToken

• `Readonly` **buyToken**: `string`

which token to buy

#### Inherited from

TwapDataBase.buyToken

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:50

___

### durationOfPart

• `Optional` `Readonly` **durationOfPart**: [`DurationOfPart`](../modules.md#durationofpart)

whether the TWAP is valid for the entire interval or not

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:135

___

### numberOfParts

• `Readonly` **numberOfParts**: `BigNumber`

number of parts

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:125

___

### receiver

• `Readonly` **receiver**: `string`

who to send the tokens to

#### Inherited from

TwapDataBase.receiver

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:55

___

### sellAmount

• `Readonly` **sellAmount**: `BigNumber`

total amount of sellToken to sell across the entire TWAP

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:110

___

### sellToken

• `Readonly` **sellToken**: `string`

which token to sell

#### Inherited from

TwapDataBase.sellToken

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:45

___

### startTime

• `Optional` `Readonly` **startTime**: [`StartTime`](../modules.md#starttime)

start time of the TWAP

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:120

___

### timeBetweenParts

• `Readonly` **timeBetweenParts**: `BigNumber`

duration of the TWAP interval

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:130
