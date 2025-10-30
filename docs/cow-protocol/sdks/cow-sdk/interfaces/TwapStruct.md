---
id: "TwapStruct"
title: "Interface: TwapStruct"
sidebar_label: "TwapStruct"
sidebar_position: 0
custom_edit_url: null
---

Parameters for a TWAP order, as expected by the contract's `staticInput`.

## Hierarchy

- [`TwapDataBase`](../modules.md#twapdatabase)

  ↳ **`TwapStruct`**

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

### buyToken

• `Readonly` **buyToken**: `string`

which token to buy

#### Inherited from

TwapDataBase.buyToken

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:50

___

### minPartLimit

• `Readonly` **minPartLimit**: `BigNumber`

minimum amount of buyToken that must be bought in each part

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:78

___

### n

• `Readonly` **n**: `BigNumber`

number of parts

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:88

___

### partSellAmount

• `Readonly` **partSellAmount**: `BigNumber`

amount of sellToken to sell in each part

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:73

___

### receiver

• `Readonly` **receiver**: `string`

who to send the tokens to

#### Inherited from

TwapDataBase.receiver

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:55

___

### sellToken

• `Readonly` **sellToken**: `string`

which token to sell

#### Inherited from

TwapDataBase.sellToken

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:45

___

### span

• `Readonly` **span**: `BigNumber`

whether the TWAP is valid for the entire interval or not

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:98

___

### t

• `Readonly` **t**: `BigNumber`

duration of the TWAP interval

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:93

___

### t0

• `Readonly` **t0**: `BigNumber`

start time of the TWAP

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:83
