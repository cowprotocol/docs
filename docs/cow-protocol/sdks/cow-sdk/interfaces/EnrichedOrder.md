---
id: "EnrichedOrder"
title: "Interface: EnrichedOrder"
sidebar_label: "EnrichedOrder"
sidebar_position: 0
custom_edit_url: null
---

An order with the total fee added.

## Hierarchy

- [`Order`](../modules.md#order)

  ↳ **`EnrichedOrder`**

## Properties

### appData

• **appData**: `string`

This field comes in two forms for backward compatibility. The hash form will eventually stop being accepted.

#### Inherited from

Order.appData

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:79

___

### appDataHash

• `Optional` **appDataHash**: ``null`` \| `string`

May be set for debugging purposes. If set, this field is compared to what the backend internally calculates as the app data hash based on the contents of `appData`. If the hash does not match, an error is returned. If this field is set, then `appData` **MUST** be a string encoding of a JSON object.

#### Inherited from

Order.appDataHash

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:84

___

### availableBalance

• `Optional` **availableBalance**: ``null`` \| `string`

Unused field that is currently always set to `null` and will be removed in the future.

**`Deprecated`**

#### Inherited from

Order.availableBalance

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:31

___

### buyAmount

• **buyAmount**: `string`

see `OrderParameters::buyAmount`

#### Inherited from

Order.buyAmount

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:38

___

### buyToken

• **buyToken**: `string`

see `OrderParameters::buyToken`

#### Inherited from

Order.buyToken

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:26

___

### buyTokenBalance

• `Optional` **buyTokenBalance**: [`BuyTokenDestination`](../enums/BuyTokenDestination.md)

see `OrderParameters::buyTokenBalance`

#### Inherited from

Order.buyTokenBalance

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:62

___

### class

• **class**: [`OrderClass`](../enums/OrderClass.md)

#### Inherited from

Order.class

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:23

___

### creationDate

• **creationDate**: `string`

Creation time of the order. Encoded as ISO 8601 UTC.

#### Inherited from

Order.creationDate

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:22

___

### ethflowData

• `Optional` **ethflowData**: [`EthflowData`](../modules.md#ethflowdata)

#### Inherited from

Order.ethflowData

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:75

___

### executedBuyAmount

• **executedBuyAmount**: `string`

The total amount of `buyToken` that has been executed for this order.

#### Inherited from

Order.executedBuyAmount

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:46

___

### executedFee

• `Optional` **executedFee**: `string`

Total fee charged for execution of the order. Contains network fee and protocol fees.

#### Inherited from

Order.executedFee

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:95

___

### executedFeeAmount

• **executedFeeAmount**: `string`

The total amount of fees that have been executed for this order.

#### Inherited from

Order.executedFeeAmount

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:50

___

### executedFeeToken

• `Optional` **executedFeeToken**: `string`

Token the executed fee was captured in.

#### Inherited from

Order.executedFeeToken

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:99

___

### executedSellAmount

• **executedSellAmount**: `string`

The total amount of `sellToken` that has been executed for this order including fees.

#### Inherited from

Order.executedSellAmount

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:36

___

### executedSellAmountBeforeFees

• **executedSellAmountBeforeFees**: `string`

The total amount of `sellToken` that has been executed for this order without fees.

#### Inherited from

Order.executedSellAmountBeforeFees

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:41

___

### executedSurplusFee

• `Optional` **executedSurplusFee**: `string`

Surplus fee that the limit order was executed with.

#### Inherited from

Order.executedSurplusFee

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:91

___

### feeAmount

• **feeAmount**: `string`

see `OrderParameters::feeAmount`

#### Inherited from

Order.feeAmount

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:46

___

### from

• `Optional` **from**: ``null`` \| `string`

If set, the backend enforces that this address matches what is decoded as the *signer* of the signature. This helps catch errors with invalid signature encodings as the backend might otherwise silently work with an unexpected address that for example does not have any balance.

#### Inherited from

Order.from

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:69

___

### fullAppData

• `Optional` **fullAppData**: ``null`` \| `string`

Full `appData`, which the contract-level `appData` is a hash of. See `OrderCreation` for more information.

#### Inherited from

Order.fullAppData

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:104

___

### fullFeeAmount

• `Optional` **fullFeeAmount**: `string`

Amount that the signed fee would be without subsidies.

#### Inherited from

Order.fullFeeAmount

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:62

___

### invalidated

• **invalidated**: `boolean`

Has this order been invalidated?

#### Inherited from

Order.invalidated

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:54

___

### isLiquidityOrder

• `Optional` **isLiquidityOrder**: `boolean`

Liquidity orders are functionally the same as normal smart contract
orders but are not placed with the intent of actively getting
traded. Instead they facilitate the trade of normal orders by
allowing them to be matched against liquidity orders which uses less
gas and can have better prices than external liquidity.

As such liquidity orders will only be used in order to improve
settlement of normal orders. They should not be expected to be
traded otherwise and should not expect to get surplus.

#### Inherited from

Order.isLiquidityOrder

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:74

___

### kind

• **kind**: [`OrderKind`](../enums/OrderKind.md)

see `OrderParameters::kind`

#### Inherited from

Order.kind

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:50

___

### onchainOrderData

• `Optional` **onchainOrderData**: [`OnchainOrderData`](../modules.md#onchainorderdata)

There is some data only available for orders that are placed on-chain. This data can be found in this object.

#### Inherited from

Order.onchainOrderData

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:87

___

### onchainUser

• `Optional` **onchainUser**: `string`

This represents the actual trader of an on-chain order.
### ethflow orders
In this case, the `owner` would be the `EthFlow` contract and *not* the actual trader.

#### Inherited from

Order.onchainUser

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:82

___

### owner

• **owner**: `string`

#### Inherited from

Order.owner

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:24

___

### partiallyFillable

• **partiallyFillable**: `boolean`

see `OrderParameters::partiallyFillable`

#### Inherited from

Order.partiallyFillable

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:54

___

### quoteId

• `Optional` **quoteId**: ``null`` \| `number`

Orders can optionally include a quote ID. This way the order can be linked to a quote and enable providing more metadata when analysing order slippage.

#### Inherited from

Order.quoteId

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:74

___

### receiver

• `Optional` **receiver**: ``null`` \| `string`

see `OrderParameters::receiver`

#### Inherited from

Order.receiver

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:30

___

### sellAmount

• **sellAmount**: `string`

see `OrderParameters::sellAmount`

#### Inherited from

Order.sellAmount

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:34

___

### sellToken

• **sellToken**: `string`

see `OrderParameters::sellToken`

#### Inherited from

Order.sellToken

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:22

___

### sellTokenBalance

• `Optional` **sellTokenBalance**: [`SellTokenSource`](../enums/SellTokenSource.md)

see `OrderParameters::sellTokenBalance`

#### Inherited from

Order.sellTokenBalance

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:58

___

### signature

• **signature**: `string`

#### Inherited from

Order.signature

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:64

___

### signingScheme

• **signingScheme**: [`SigningScheme`](../enums/SigningScheme.md)

#### Inherited from

Order.signingScheme

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:63

___

### status

• **status**: [`OrderStatus`](../enums/OrderStatus.md)

Order status.

#### Inherited from

Order.status

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:58

___

### totalFee

• **totalFee**: `string`

#### Defined in

external/cow-sdk/src/order-book/types.ts:7

___

### uid

• **uid**: `string`

#### Inherited from

Order.uid

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:25

___

### validTo

• **validTo**: `number`

see `OrderParameters::validTo`

#### Inherited from

Order.validTo

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:42
