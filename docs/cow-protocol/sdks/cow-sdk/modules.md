---
id: "modules"
title: "@cowprotocol/cow-sdk"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [CompetitionOrderStatus](namespaces/CompetitionOrderStatus.md)
- [OnchainOrderData](namespaces/OnchainOrderData.md)
- [OrderCancellationError](namespaces/OrderCancellationError.md)
- [OrderPostError](namespaces/OrderPostError.md)
- [PriceEstimationError](namespaces/PriceEstimationError.md)

## Enumerations

- [BuyTokenDestination](enums/BuyTokenDestination.md)
- [DurationType](enums/DurationType.md)
- [EcdsaSigningScheme](enums/EcdsaSigningScheme.md)
- [OrderClass](enums/OrderClass.md)
- [OrderKind](enums/OrderKind.md)
- [OrderQuoteSideKindBuy](enums/OrderQuoteSideKindBuy.md)
- [OrderQuoteSideKindSell](enums/OrderQuoteSideKindSell.md)
- [OrderStatus](enums/OrderStatus.md)
- [PollResultCode](enums/PollResultCode.md)
- [PriceQuality](enums/PriceQuality.md)
- [ProofLocation](enums/ProofLocation.md)
- [SellTokenSource](enums/SellTokenSource.md)
- [SigningScheme](enums/SigningScheme.md)
- [StartTimeValue](enums/StartTimeValue.md)
- [SupportedChainId](enums/SupportedChainId.md)

## Classes

- [ConditionalOrder](classes/ConditionalOrder.md)
- [ConditionalOrderFactory](classes/ConditionalOrderFactory.md)
- [CowError](classes/CowError.md)
- [CowShedHooks](classes/CowShedHooks.md)
- [Multiplexer](classes/Multiplexer.md)
- [OrderBookApi](classes/OrderBookApi.md)
- [OrderBookApiError](classes/OrderBookApiError.md)
- [OrderSigningUtils](classes/OrderSigningUtils.md)
- [SubgraphApi](classes/SubgraphApi.md)
- [TradingSdk](classes/TradingSdk.md)
- [Twap](classes/Twap.md)

## Interfaces

- [ApiContext](interfaces/ApiContext.md)
- [AppDataInfo](interfaces/AppDataInfo.md)
- [BuildAppDataParams](interfaces/BuildAppDataParams.md)
- [ConditionalOrderArguments](interfaces/ConditionalOrderArguments.md)
- [EnrichedOrder](interfaces/EnrichedOrder.md)
- [EthFlowOrderExistsCallback](interfaces/EthFlowOrderExistsCallback.md)
- [FetchParams](interfaces/FetchParams.md)
- [ICoWShedCall](interfaces/ICoWShedCall.md)
- [ICoWShedOptions](interfaces/ICoWShedOptions.md)
- [IpfsConfig](interfaces/IpfsConfig.md)
- [IsNotValid](interfaces/IsNotValid.md)
- [IsValid](interfaces/IsValid.md)
- [LimitOrderAdvancedSettings](interfaces/LimitOrderAdvancedSettings.md)
- [LimitOrderParameters](interfaces/LimitOrderParameters.md)
- [LimitTradeParameters](interfaces/LimitTradeParameters.md)
- [LimitTradeParametersFromQuote](interfaces/LimitTradeParametersFromQuote.md)
- [OrderTypedData](interfaces/OrderTypedData.md)
- [PollResultDontTryAgain](interfaces/PollResultDontTryAgain.md)
- [PollResultSuccess](interfaces/PollResultSuccess.md)
- [PollResultTryAtEpoch](interfaces/PollResultTryAtEpoch.md)
- [PollResultTryNextBlock](interfaces/PollResultTryNextBlock.md)
- [PollResultTryOnBlock](interfaces/PollResultTryOnBlock.md)
- [PollResultUnexpectedError](interfaces/PollResultUnexpectedError.md)
- [QuoteAmountsAndCosts](interfaces/QuoteAmountsAndCosts.md)
- [QuoteAndPost](interfaces/QuoteAndPost.md)
- [QuoteResults](interfaces/QuoteResults.md)
- [QuoteResultsSerialized](interfaces/QuoteResultsSerialized.md)
- [RequestOptions](interfaces/RequestOptions.md)
- [SignOrderCancellationParams](interfaces/SignOrderCancellationParams.md)
- [SignOrderCancellationsParams](interfaces/SignOrderCancellationsParams.md)
- [SignOrderParams](interfaces/SignOrderParams.md)
- [SwapAdvancedSettings](interfaces/SwapAdvancedSettings.md)
- [SwapParameters](interfaces/SwapParameters.md)
- [TradeBaseParameters](interfaces/TradeBaseParameters.md)
- [TradeOptionalParameters](interfaces/TradeOptionalParameters.md)
- [TradeParameters](interfaces/TradeParameters.md)
- [TraderParameters](interfaces/TraderParameters.md)
- [TransactionParams](interfaces/TransactionParams.md)
- [TwapData](interfaces/TwapData.md)
- [TwapStruct](interfaces/TwapStruct.md)

## Type Aliases

### AccountAddress

Ƭ **AccountAddress**: \`0x$\{string}\`

#### Defined in

external/cow-sdk/src/trading/types.ts:18

___

### Address

Ƭ **Address**: `string`

20 byte Ethereum address encoded as a hex with `0x` prefix.

#### Defined in

external/cow-sdk/src/order-book/generated/models/Address.ts:8

___

### ApiBaseUrls

Ƭ **ApiBaseUrls**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

#### Defined in

external/cow-sdk/src/common/configs.ts:49

___

### AppData

Ƭ **AppData**: `string`

The string encoding of a JSON object representing some `appData`. The
format of the JSON expected in the `appData` field is defined
[here](https://github.com/cowprotocol/app-data).

#### Defined in

external/cow-sdk/src/order-book/generated/models/AppData.ts:11

___

### AppDataHash

Ƭ **AppDataHash**: `string`

32 bytes encoded as hex with `0x` prefix.
It's expected to be the hash of the stringified JSON object representing the `appData`.

#### Defined in

external/cow-sdk/src/order-book/generated/models/AppDataHash.ts:10

___

### AppDataObject

Ƭ **AppDataObject**: `Object`

An `appData` document that is registered with the API.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fullAppData?` | [`AppData`](modules.md#appdata) |

#### Defined in

external/cow-sdk/src/order-book/generated/models/AppDataObject.ts:10

___

### AppDataRootSchema

Ƭ **AppDataRootSchema**: `latest.AppDataRootSchema`

#### Defined in

external/cow-sdk/src/trading/types.ts:140

___

### Auction

Ƭ **Auction**: `Object`

A batch auction for solving.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `block?` | `number` | The block number for the auction. Orders and prices are guaranteed to be valid on this block. Proposed settlements should be valid for this block as well. |
| `id?` | `number` | The unique identifier of the auction. Increment whenever the backend creates a new auction. |
| `orders?` | [`AuctionOrder`](modules.md#auctionorder)[] | The solvable orders included in the auction. |
| `prices?` | [`AuctionPrices`](modules.md#auctionprices) | - |
| `surplusCapturingJitOrderOwners?` | [`Address`](modules.md#address)[] | List of addresses on whose surplus will count towards the objective value of their solution (unlike other orders that were created by the solver). |

#### Defined in

external/cow-sdk/src/order-book/generated/models/Auction.ts:13

___

### AuctionOrder

Ƭ **AuctionOrder**: `Object`

A solvable order included in the current batch auction. Contains the data forwarded to solvers for solving.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`AppDataHash`](modules.md#appdatahash) | - |
| `buyAmount` | [`TokenAmount`](modules.md#tokenamount) | see `OrderParameters::buyAmount` |
| `buyToken` | [`Address`](modules.md#address) | see `OrderParameters::buyToken` |
| `buyTokenBalance` | [`BuyTokenDestination`](enums/BuyTokenDestination.md) | see `OrderParameters::buyTokenBalance` |
| `class` | [`OrderClass`](enums/OrderClass.md) | - |
| `created` | `string` | Creation time of the order. Denominated in epoch seconds. |
| `executed` | [`TokenAmount`](modules.md#tokenamount) | Currently executed amount of sell/buy token, depending on the order kind. |
| `kind` | [`OrderKind`](enums/OrderKind.md) | see `OrderParameters::kind` |
| `owner` | [`Address`](modules.md#address) | - |
| `partiallyFillable` | `boolean` | see `OrderParameters::partiallyFillable` |
| `postInteractions` | [`InteractionData`](modules.md#interactiondata)[] | The post-interactions that need to be executed after the execution of the order. |
| `preInteractions` | [`InteractionData`](modules.md#interactiondata)[] | The pre-interactions that need to be executed before the first execution of the order. |
| `protocolFees` | [`FeePolicy`](modules.md#feepolicy)[] | The fee policies that are used to compute the protocol fees for this order. |
| `quote?` | [`Quote`](modules.md#quote) | A winning quote. |
| `receiver` | [`Address`](modules.md#address) \| ``null`` | see `OrderParameters::receiver` |
| `sellAmount` | [`TokenAmount`](modules.md#tokenamount) | see `OrderParameters::sellAmount` |
| `sellToken` | [`Address`](modules.md#address) | see `OrderParameters::sellToken` |
| `sellTokenBalance` | [`SellTokenSource`](enums/SellTokenSource.md) | see `OrderParameters::sellTokenBalance` |
| `signature` | [`Signature`](modules.md#signature) | - |
| `uid` | [`UID`](modules.md#uid) | - |
| `validTo` | `number` | see `OrderParameters::validTo` |

#### Defined in

external/cow-sdk/src/order-book/generated/models/AuctionOrder.ts:22

___

### AuctionPrices

Ƭ **AuctionPrices**: `Record`<`string`, [`BigUint`](modules.md#biguint)\>

The reference prices for all traded tokens in the auction as a mapping from token addresses to a price denominated in native token (i.e. 1e18 represents a token that trades one to one with the native token). These prices are used for solution competition for computing surplus and converting fees to native token.

#### Defined in

external/cow-sdk/src/order-book/generated/models/AuctionPrices.ts:11

___

### BigUint

Ƭ **BigUint**: `string`

A big unsigned integer encoded in decimal.

#### Defined in

external/cow-sdk/src/order-book/generated/models/BigUint.ts:8

___

### BlockInfo

Ƭ **BlockInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |
| `blockTimestamp` | `number` |

#### Defined in

external/cow-sdk/src/composable/types.ts:102

___

### CallData

Ƭ **CallData**: `string`

Some `calldata` sent to a contract in a transaction encoded as a hex with `0x` prefix.

#### Defined in

external/cow-sdk/src/order-book/generated/models/CallData.ts:8

___

### CompetitionAuction

Ƭ **CompetitionAuction**: `Object`

The components that describe a batch auction for the solver competition.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `orders?` | [`UID`](modules.md#uid)[] | The UIDs of the orders included in the auction. |
| `prices?` | [`AuctionPrices`](modules.md#auctionprices) | - |

#### Defined in

external/cow-sdk/src/order-book/generated/models/CompetitionAuction.ts:12

___

### CompetitionOrderStatus

Ƭ **CompetitionOrderStatus**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`type`](enums/CompetitionOrderStatus.type.md) | - |
| `value?` | \{ `executedAmounts?`: [`ExecutedAmounts`](modules.md#executedamounts) ; `solver`: `string`  }[] | A list of solvers who participated in the latest competition, sorted by score in ascending order, where the last element is the winner. The presence of executed amounts defines whether the solver provided a solution for the desired order. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/CompetitionOrderStatus.ts:7

external/cow-sdk/src/order-book/generated/models/CompetitionOrderStatus.ts:25

___

### ConditionalOrderParams

Ƭ **ConditionalOrderParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `handler` | `string` |
| `salt` | `string` |
| `staticInput` | `string` |

#### Defined in

external/cow-sdk/src/composable/types.ts:13

___

### ConditionalOrderRegistry

Ƭ **ConditionalOrderRegistry**: `Record`<`string`, [`FromParams`](modules.md#fromparams)<`unknown`, `unknown`\>\>

#### Defined in

external/cow-sdk/src/composable/ConditionalOrderFactory.ts:5

___

### ContextFactory

Ƭ **ContextFactory**: `Object`

A factory and it's arguments that are called at transaction mining time to generate the context
for a conditional order(s).

This allows to support the case where conditional orders may want to *commence* validity at the
time of transaction mining, like in the case of a `TWAP` executed by a DAO or `Safe` that takes
a reasonable amount of time to aggregate signatures or collect votes.

**`Remarks`**

This is used in conjunction with `setRootWithContext` or `createWithContext`.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `factoryArgs?` | \{ `args`: `unknown`[] ; `argsType`: `string`[]  } |
| `factoryArgs.args` | `unknown`[] |
| `factoryArgs.argsType` | `string`[] |

#### Defined in

external/cow-sdk/src/composable/types.ts:44

___

### CowEnv

Ƭ **CowEnv**: ``"prod"`` \| ``"staging"``

The environment to use for the Cow API.

#### Defined in

external/cow-sdk/src/common/configs.ts:35

___

### DurationOfPart

Ƭ **DurationOfPart**: \{ `durationType`: [`AUTO`](enums/DurationType.md#auto)  } \| \{ `duration`: `BigNumber` ; `durationType`: [`LIMIT_DURATION`](enums/DurationType.md#limit_duration)  }

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:138

___

### EcdsaSignature

Ƭ **EcdsaSignature**: `string`

65 bytes encoded as hex with `0x` prefix. `r || s || v` from the spec.

#### Defined in

external/cow-sdk/src/order-book/generated/models/EcdsaSignature.ts:8

___

### EthflowData

Ƭ **EthflowData**: `Object`

Provides the additional data for ethflow orders.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `refundTxHash` | [`TransactionHash`](modules.md#transactionhash) \| ``null`` | Specifies in which transaction the order was refunded. If this field is null the order was not yet refunded. |
| `userValidTo` | `number` | Describes the `validTo` of an order ethflow order. **NOTE**: For ethflow orders, the `validTo` encoded in the smart contract is `type(uint256).max`. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/EthflowData.ts:10

___

### ExecutedAmounts

Ƭ **ExecutedAmounts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buy` | [`BigUint`](modules.md#biguint) |
| `sell` | [`BigUint`](modules.md#biguint) |

#### Defined in

external/cow-sdk/src/order-book/generated/models/ExecutedAmounts.ts:7

___

### ExecutedProtocolFee

Ƭ **ExecutedProtocolFee**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | [`TokenAmount`](modules.md#tokenamount) |
| `policy?` | [`FeePolicy`](modules.md#feepolicy) |
| `token?` | [`Address`](modules.md#address) |

#### Defined in

external/cow-sdk/src/order-book/generated/models/ExecutedProtocolFee.ts:9

___

### FeePolicy

Ƭ **FeePolicy**: [`Surplus`](modules.md#surplus) \| [`Volume`](modules.md#volume) \| [`PriceImprovement`](modules.md#priceimprovement)

Defines the ways to calculate the protocol fee.

#### Defined in

external/cow-sdk/src/order-book/generated/models/FeePolicy.ts:12

___

### FromParams

Ƭ **FromParams**<`D`, `S`\>: (`params`: [`ConditionalOrderParams`](modules.md#conditionalorderparams)) => [`ConditionalOrder`](classes/ConditionalOrder.md)<`D`, `S`\>

#### Type parameters

| Name |
| :------ |
| `D` |
| `S` |

#### Type declaration

▸ (`params`): [`ConditionalOrder`](classes/ConditionalOrder.md)<`D`, `S`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ConditionalOrderParams`](modules.md#conditionalorderparams) |

##### Returns

[`ConditionalOrder`](classes/ConditionalOrder.md)<`D`, `S`\>

#### Defined in

external/cow-sdk/src/composable/ConditionalOrderFactory.ts:4

___

### GetOrdersRequest

Ƭ **GetOrdersRequest**: `Object`

The parameters for the `getOrders` request.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `limit?` | `number` |
| `offset?` | `number` |
| `owner` | [`Address`](modules.md#address) |

#### Defined in

external/cow-sdk/src/order-book/api.ts:68

___

### InteractionData

Ƭ **InteractionData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `call_data?` | [`CallData`](modules.md#calldata)[] | The call data to be used for the interaction. |
| `target?` | [`Address`](modules.md#address) | - |
| `value?` | [`TokenAmount`](modules.md#tokenamount) | - |

#### Defined in

external/cow-sdk/src/order-book/generated/models/InteractionData.ts:9

___

### IsValidResult

Ƭ **IsValidResult**: [`IsValid`](interfaces/IsValid.md) \| [`IsNotValid`](interfaces/IsNotValid.md)

#### Defined in

external/cow-sdk/src/composable/types.ts:164

___

### NativePriceResponse

Ƭ **NativePriceResponse**: `Object`

The estimated native price for the token

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `price?` | `number` | Estimated price of the token. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/NativePriceResponse.ts:9

___

### OnchainOrderData

Ƭ **OnchainOrderData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `placementError?` | [`placementError`](enums/OnchainOrderData.placementError.md) | Describes the error, if the order placement was not successful. This could happen, for example, if the `validTo` is too high, or no valid quote was found or generated. |
| `sender` | [`Address`](modules.md#address) | If orders are placed as on-chain orders, the owner of the order might be a smart contract, but not the user placing the order. The actual user will be provided in this field. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OnchainOrderData.ts:7

external/cow-sdk/src/order-book/generated/models/OnchainOrderData.ts:20

___

### Order

Ƭ **Order**: [`OrderCreation`](modules.md#ordercreation) & [`OrderMetaData`](modules.md#ordermetadata)

#### Defined in

external/cow-sdk/src/order-book/generated/models/Order.ts:8

___

### OrderCancellation

Ƭ **OrderCancellation**: `Object`

[EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature of struct
`OrderCancellation(bytes orderUid)` from the order's owner.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `signature` | [`EcdsaSignature`](modules.md#ecdsasignature) | OrderCancellation signed by owner |
| `signingScheme` | [`EcdsaSigningScheme`](enums/EcdsaSigningScheme.md) | - |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCancellation.ts:13

___

### OrderCancellationError

Ƭ **OrderCancellationError**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `errorType` | [`errorType`](enums/OrderCancellationError.errorType.md) |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCancellationError.ts:5

external/cow-sdk/src/order-book/generated/models/OrderCancellationError.ts:10

___

### OrderCancellations

Ƭ **OrderCancellations**: `Object`

EIP-712 signature of struct OrderCancellations { orderUid: bytes[] } from the order's owner.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderUids?` | [`UID`](modules.md#uid)[] | UIDs of orders to cancel. |
| `signature` | [`EcdsaSignature`](modules.md#ecdsasignature) | `OrderCancellation` signed by the owner. |
| `signingScheme` | [`EcdsaSigningScheme`](enums/EcdsaSigningScheme.md) | - |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCancellations.ts:13

___

### OrderCreation

Ƭ **OrderCreation**: `Object`

Data a user provides when creating a new order.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`AppData`](modules.md#appdata) \| [`AppDataHash`](modules.md#appdatahash) | This field comes in two forms for backward compatibility. The hash form will eventually stop being accepted. |
| `appDataHash?` | [`AppDataHash`](modules.md#appdatahash) \| ``null`` | May be set for debugging purposes. If set, this field is compared to what the backend internally calculates as the app data hash based on the contents of `appData`. If the hash does not match, an error is returned. If this field is set, then `appData` **MUST** be a string encoding of a JSON object. |
| `buyAmount` | [`TokenAmount`](modules.md#tokenamount) | see `OrderParameters::buyAmount` |
| `buyToken` | [`Address`](modules.md#address) | see `OrderParameters::buyToken` |
| `buyTokenBalance?` | [`BuyTokenDestination`](enums/BuyTokenDestination.md) | see `OrderParameters::buyTokenBalance` |
| `feeAmount` | [`TokenAmount`](modules.md#tokenamount) | see `OrderParameters::feeAmount` |
| `from?` | [`Address`](modules.md#address) \| ``null`` | If set, the backend enforces that this address matches what is decoded as the *signer* of the signature. This helps catch errors with invalid signature encodings as the backend might otherwise silently work with an unexpected address that for example does not have any balance. |
| `kind` | [`OrderKind`](enums/OrderKind.md) | see `OrderParameters::kind` |
| `partiallyFillable` | `boolean` | see `OrderParameters::partiallyFillable` |
| `quoteId?` | `number` \| ``null`` | Orders can optionally include a quote ID. This way the order can be linked to a quote and enable providing more metadata when analysing order slippage. |
| `receiver?` | [`Address`](modules.md#address) \| ``null`` | see `OrderParameters::receiver` |
| `sellAmount` | [`TokenAmount`](modules.md#tokenamount) | see `OrderParameters::sellAmount` |
| `sellToken` | [`Address`](modules.md#address) | see `OrderParameters::sellToken` |
| `sellTokenBalance?` | [`SellTokenSource`](enums/SellTokenSource.md) | see `OrderParameters::sellTokenBalance` |
| `signature` | [`Signature`](modules.md#signature) | - |
| `signingScheme` | [`SigningScheme`](enums/SigningScheme.md) | - |
| `validTo` | `number` | see `OrderParameters::validTo` |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderCreation.ts:18

___

### OrderMetaData

Ƭ **OrderMetaData**: `Object`

Extra order data that is returned to users when querying orders but not provided by users when creating orders.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `availableBalance?` | [`TokenAmount`](modules.md#tokenamount) \| ``null`` | Unused field that is currently always set to `null` and will be removed in the future. **`Deprecated`** |
| `class` | [`OrderClass`](enums/OrderClass.md) | - |
| `creationDate` | `string` | Creation time of the order. Encoded as ISO 8601 UTC. |
| `ethflowData?` | [`EthflowData`](modules.md#ethflowdata) | - |
| `executedBuyAmount` | [`BigUint`](modules.md#biguint) | The total amount of `buyToken` that has been executed for this order. |
| `executedFee?` | [`BigUint`](modules.md#biguint) | Total fee charged for execution of the order. Contains network fee and protocol fees. |
| `executedFeeAmount` | [`BigUint`](modules.md#biguint) | The total amount of fees that have been executed for this order. |
| `executedFeeToken?` | [`Address`](modules.md#address) | Token the executed fee was captured in. |
| `executedSellAmount` | [`BigUint`](modules.md#biguint) | The total amount of `sellToken` that has been executed for this order including fees. |
| `executedSellAmountBeforeFees` | [`BigUint`](modules.md#biguint) | The total amount of `sellToken` that has been executed for this order without fees. |
| `executedSurplusFee?` | [`BigUint`](modules.md#biguint) | Surplus fee that the limit order was executed with. |
| `fullAppData?` | `string` \| ``null`` | Full `appData`, which the contract-level `appData` is a hash of. See `OrderCreation` for more information. |
| `fullFeeAmount?` | [`TokenAmount`](modules.md#tokenamount) | Amount that the signed fee would be without subsidies. |
| `invalidated` | `boolean` | Has this order been invalidated? |
| `isLiquidityOrder?` | `boolean` | Liquidity orders are functionally the same as normal smart contract orders but are not placed with the intent of actively getting traded. Instead they facilitate the trade of normal orders by allowing them to be matched against liquidity orders which uses less gas and can have better prices than external liquidity. As such liquidity orders will only be used in order to improve settlement of normal orders. They should not be expected to be traded otherwise and should not expect to get surplus. |
| `onchainOrderData?` | [`OnchainOrderData`](modules.md#onchainorderdata) | There is some data only available for orders that are placed on-chain. This data can be found in this object. |
| `onchainUser?` | [`Address`](modules.md#address) | This represents the actual trader of an on-chain order. ### ethflow orders In this case, the `owner` would be the `EthFlow` contract and *not* the actual trader. |
| `owner` | [`Address`](modules.md#address) | - |
| `status` | [`OrderStatus`](enums/OrderStatus.md) | Order status. |
| `uid` | [`UID`](modules.md#uid) | - |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderMetaData.ts:18

___

### OrderParameters

Ƭ **OrderParameters**: `Object`

Order parameters.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`AppDataHash`](modules.md#appdatahash) | - |
| `buyAmount` | [`TokenAmount`](modules.md#tokenamount) | Amount of `buyToken` to be bought in atoms. |
| `buyToken` | [`Address`](modules.md#address) | ERC-20 token to be bought. |
| `buyTokenBalance?` | [`BuyTokenDestination`](enums/BuyTokenDestination.md) | - |
| `feeAmount` | [`TokenAmount`](modules.md#tokenamount) | feeRatio * sellAmount + minimal_fee in atoms. |
| `kind` | [`OrderKind`](enums/OrderKind.md) | The kind is either a buy or sell order. |
| `partiallyFillable` | `boolean` | Is the order fill-or-kill or partially fillable? |
| `receiver?` | [`Address`](modules.md#address) \| ``null`` | An optional Ethereum address to receive the proceeds of the trade instead of the owner (i.e. the order signer). |
| `sellAmount` | [`TokenAmount`](modules.md#tokenamount) | Amount of `sellToken` to be sold in atoms. |
| `sellToken` | [`Address`](modules.md#address) | ERC-20 token to be sold. |
| `sellTokenBalance?` | [`SellTokenSource`](enums/SellTokenSource.md) | - |
| `signingScheme?` | [`SigningScheme`](enums/SigningScheme.md) | - |
| `validTo` | `number` | Unix timestamp (`uint32`) until which the order is valid. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderParameters.ts:16

___

### OrderPostError

Ƭ **OrderPostError**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `errorType` | [`errorType`](enums/OrderPostError.errorType.md) |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderPostError.ts:5

external/cow-sdk/src/order-book/generated/models/OrderPostError.ts:10

___

### OrderQuoteRequest

Ƭ **OrderQuoteRequest**: [`OrderQuoteSide`](modules.md#orderquoteside) & [`OrderQuoteValidity`](modules.md#orderquotevalidity) & \{ `appData?`: [`AppData`](modules.md#appdata) \| [`AppDataHash`](modules.md#appdatahash) ; `appDataHash?`: [`AppDataHash`](modules.md#appdatahash) ; `buyToken`: [`Address`](modules.md#address) ; `buyTokenBalance?`: [`BuyTokenDestination`](enums/BuyTokenDestination.md) ; `from`: [`Address`](modules.md#address) ; `onchainOrder?`: `any` ; `priceQuality?`: [`PriceQuality`](enums/PriceQuality.md) ; `receiver?`: [`Address`](modules.md#address) \| ``null`` ; `sellToken`: [`Address`](modules.md#address) ; `sellTokenBalance?`: [`SellTokenSource`](enums/SellTokenSource.md) ; `signingScheme?`: [`SigningScheme`](enums/SigningScheme.md)  }

Request fee and price quote.

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderQuoteRequest.ts:18

___

### OrderQuoteResponse

Ƭ **OrderQuoteResponse**: `Object`

An order quoted by the backend that can be directly signed and
submitted to the order creation backend.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `expiration` | `string` | Expiration date of the offered fee. Order service might not accept the fee after this expiration date. Encoded as ISO 8601 UTC. |
| `from?` | [`Address`](modules.md#address) | - |
| `id?` | `number` | Quote ID linked to a quote to enable providing more metadata when analysing order slippage. |
| `quote` | [`OrderParameters`](modules.md#orderparameters) | - |
| `verified` | `boolean` | Whether it was possible to verify that the quoted amounts are accurate using a simulation. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderQuoteResponse.ts:13

___

### OrderQuoteSide

Ƭ **OrderQuoteSide**: \{ `kind`: [`OrderQuoteSideKindSell`](enums/OrderQuoteSideKindSell.md) ; `sellAmountBeforeFee`: [`TokenAmount`](modules.md#tokenamount)  } \| \{ `kind`: [`OrderQuoteSideKindSell`](enums/OrderQuoteSideKindSell.md) ; `sellAmountAfterFee`: [`TokenAmount`](modules.md#tokenamount)  } \| \{ `buyAmountAfterFee`: [`TokenAmount`](modules.md#tokenamount) ; `kind`: [`OrderQuoteSideKindBuy`](enums/OrderQuoteSideKindBuy.md)  }

The buy or sell side when quoting an order.

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderQuoteSide.ts:12

___

### OrderQuoteValidity

Ƭ **OrderQuoteValidity**: \{ `validTo?`: `number`  } \| \{ `validFor?`: `number`  }

The validity for the order.

#### Defined in

external/cow-sdk/src/order-book/generated/models/OrderQuoteValidity.ts:8

___

### Orders

Ƭ **Orders**: `Record`<`string`, [`ConditionalOrder`](classes/ConditionalOrder.md)<`unknown`, `unknown`\>\>

#### Defined in

external/cow-sdk/src/composable/Multiplexer.ts:15

___

### OwnerContext

Ƭ **OwnerContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainId` | [`SupportedChainId`](enums/SupportedChainId.md) |
| `owner` | `string` |
| `provider` | `providers.Provider` |

#### Defined in

external/cow-sdk/src/composable/types.ts:85

___

### PartialApiContext

Ƭ **PartialApiContext**: `Partial`<[`ApiContext`](interfaces/ApiContext.md)\>

Override some properties of the [ApiContext](interfaces/ApiContext.md).

#### Defined in

external/cow-sdk/src/common/configs.ts:40

___

### PayloadLocationEmitted

Ƭ **PayloadLocationEmitted**: `Object`

Payload for emitting a merkle root to a ComposableCoW-enabled Safe.

If setting `ProofLocation.EMITTED`, this type should be used as the `data` in the `Proof` struct.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `proofs` | [`ProofWithParams`](modules.md#proofwithparams)[] |

#### Defined in

external/cow-sdk/src/composable/types.ts:70

___

### PollParams

Ƭ **PollParams**: [`OwnerContext`](modules.md#ownercontext) & \{ `blockInfo?`: [`BlockInfo`](modules.md#blockinfo) ; `offchainInput?`: `string` ; `orderBookApi`: [`OrderBookApi`](classes/OrderBookApi.md) ; `proof?`: `string`[]  }

#### Defined in

external/cow-sdk/src/composable/types.ts:91

___

### PollResult

Ƭ **PollResult**: [`PollResultSuccess`](interfaces/PollResultSuccess.md) \| [`PollResultErrors`](modules.md#pollresulterrors)

#### Defined in

external/cow-sdk/src/composable/types.ts:107

___

### PollResultErrors

Ƭ **PollResultErrors**: [`PollResultTryNextBlock`](interfaces/PollResultTryNextBlock.md) \| [`PollResultTryOnBlock`](interfaces/PollResultTryOnBlock.md) \| [`PollResultTryAtEpoch`](interfaces/PollResultTryAtEpoch.md) \| [`PollResultUnexpectedError`](interfaces/PollResultUnexpectedError.md) \| [`PollResultDontTryAgain`](interfaces/PollResultDontTryAgain.md)

#### Defined in

external/cow-sdk/src/composable/types.ts:109

___

### PreSignature

Ƭ **PreSignature**: `string`

Empty signature bytes. Used for "presign" signatures.

#### Defined in

external/cow-sdk/src/order-book/generated/models/PreSignature.ts:8

___

### PriceEstimationError

Ƭ **PriceEstimationError**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `errorType` | [`errorType`](enums/PriceEstimationError.errorType.md) |

#### Defined in

external/cow-sdk/src/order-book/generated/models/PriceEstimationError.ts:5

external/cow-sdk/src/order-book/generated/models/PriceEstimationError.ts:10

___

### PriceImprovement

Ƭ **PriceImprovement**: `Object`

The protocol fee is taken as a percent of the order price improvement which is a difference between the executed price and the best quote.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `factor` | `number` | - |
| `maxVolumeFactor` | `number` | - |
| `quote` | [`Quote`](modules.md#quote) | The best quote received. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/PriceImprovement.ts:10

___

### PrivateKey

Ƭ **PrivateKey**: `string`

#### Defined in

external/cow-sdk/src/trading/types.ts:17

___

### ProofStruct

Ƭ **ProofStruct**: `Object`

A struct for a proof that can be used with `setRoot` and `setRootWithContext` on a
ComposableCoW-enabled Safe.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string` \| ``"0x"`` |
| `location` | [`ProofLocation`](enums/ProofLocation.md) |

#### Defined in

external/cow-sdk/src/composable/types.ts:58

___

### ProofWithParams

Ƭ **ProofWithParams**: `Object`

A proof for a conditional order and it's parameters.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `params` | [`ConditionalOrderParams`](modules.md#conditionalorderparams) |
| `proof` | `string`[] |

#### Defined in

external/cow-sdk/src/composable/types.ts:78

___

### Quote

Ƭ **Quote**: `Object`

A calculated order quote.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyAmount?` | [`TokenAmount`](modules.md#tokenamount) | The amount of the buy token. |
| `fee?` | [`TokenAmount`](modules.md#tokenamount) | The amount that needs to be paid, denominated in the sell token. |
| `sellAmount?` | [`TokenAmount`](modules.md#tokenamount) | The amount of the sell token. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/Quote.ts:11

___

### QuoterParameters

Ƭ **QuoterParameters**: `Omit`<[`TraderParameters`](interfaces/TraderParameters.md), ``"signer"``\> & \{ `account`: [`AccountAddress`](modules.md#accountaddress)  }

#### Defined in

external/cow-sdk/src/trading/types.ts:83

___

### Signature

Ƭ **Signature**: [`EcdsaSignature`](modules.md#ecdsasignature) \| [`PreSignature`](modules.md#presignature)

A signature.

#### Defined in

external/cow-sdk/src/order-book/generated/models/Signature.ts:11

___

### SigningResult

Ƭ **SigningResult**: `Object`

Encoded signature including signing scheme for the order.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signature` | `string` |
| `signingScheme` | [`EcdsaSigningScheme`](enums/EcdsaSigningScheme.md) |

#### Defined in

external/cow-sdk/src/order-signing/types.ts:13

___

### SolverCompetitionResponse

Ƭ **SolverCompetitionResponse**: `Object`

The settlements submitted by every solver for a specific auction.
The `auctionId` corresponds to the id external solvers are provided
with.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `auction?` | [`CompetitionAuction`](modules.md#competitionauction) | - |
| `auctionId?` | `number` | The ID of the auction the competition info is for. |
| `competitionSimulationBlock?` | `number` | - |
| `gasPrice?` | `number` | Gas price used for ranking solutions. |
| `liquidityCollectedBlock?` | `number` | - |
| `solutions?` | [`SolverSettlement`](modules.md#solversettlement)[] | Maps from solver name to object describing that solver's settlement. |
| `transactionHash?` | [`TransactionHash`](modules.md#transactionhash) \| ``null`` | The hash of the transaction that the winning solution of this info was submitted in. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/SolverCompetitionResponse.ts:15

___

### SolverSettlement

Ƭ **SolverSettlement**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `clearingPrices?` | `Record`<`string`, [`BigUint`](modules.md#biguint)\> | The prices of tokens for settled user orders as passed to the settlement contract. |
| `isWinner?` | `boolean` | whether the solution is a winner (received the right to get executed) or not |
| `objective?` | \{ `cost?`: `number` ; `fees?`: `number` ; `gas?`: `number` ; `surplus?`: `number` ; `total?`: `number`  } | - |
| `objective.cost?` | `number` | - |
| `objective.fees?` | `number` | - |
| `objective.gas?` | `number` | - |
| `objective.surplus?` | `number` | - |
| `objective.total?` | `number` | The total objective value used for ranking solutions. |
| `orders?` | \{ `executedAmount?`: [`BigUint`](modules.md#biguint) ; `id?`: [`UID`](modules.md#uid)  }[] | Touched orders. |
| `score?` | [`BigUint`](modules.md#biguint) \| ``null`` | The score of the current auction as defined in [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f). It is `null` for old auctions. |
| `solver?` | `string` | Name of the solver. |
| `solverAddress?` | `string` | The address used by the solver to execute the settlement on-chain. This field is missing for old settlements, the zero address has been used instead. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/SolverSettlement.ts:8

___

### StartTime

Ƭ **StartTime**: \{ `startType`: [`AT_MINING_TIME`](enums/StartTimeValue.md#at_mining_time)  } \| \{ `epoch`: `BigNumber` ; `startType`: [`AT_EPOCH`](enums/StartTimeValue.md#at_epoch)  }

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:147

___

### Surplus

Ƭ **Surplus**: `Object`

The protocol fee is taken as a percent of the surplus.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `factor` | `number` |
| `maxVolumeFactor` | `number` |

#### Defined in

external/cow-sdk/src/order-book/generated/models/Surplus.ts:8

___

### TokenAmount

Ƭ **TokenAmount**: `string`

Amount of a token. `uint256` encoded in decimal.

#### Defined in

external/cow-sdk/src/order-book/generated/models/TokenAmount.ts:8

___

### TotalSurplus

Ƭ **TotalSurplus**: `Object`

The total surplus.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `totalSurplus?` | `string` | The total surplus. |

#### Defined in

external/cow-sdk/src/order-book/generated/models/TotalSurplus.ts:9

___

### Trade

Ƭ **Trade**: `Object`

Trade data such as executed amounts, fees, `orderUid` and `block` number.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockNumber` | `number` | Block in which trade occurred. |
| `buyAmount` | [`TokenAmount`](modules.md#tokenamount) | Total amount of `buyToken` received in this trade. |
| `buyToken` | [`Address`](modules.md#address) | Address of token bought. |
| `executedProtocolFees?` | [`ExecutedProtocolFee`](modules.md#executedprotocolfee)[] | Executed protocol fees for this trade, together with the fee policies used. Listed in the order they got applied. |
| `logIndex` | `number` | Index in which transaction was included in block. |
| `orderUid` | [`UID`](modules.md#uid) | UID of the order matched by this trade. |
| `owner` | [`Address`](modules.md#address) | Address of trader. |
| `sellAmount` | [`TokenAmount`](modules.md#tokenamount) | Total amount of `sellToken` that has been executed for this trade (including fees). |
| `sellAmountBeforeFees` | [`BigUint`](modules.md#biguint) | The total amount of `sellToken` that has been executed for this order without fees. |
| `sellToken` | [`Address`](modules.md#address) | Address of token sold. |
| `txHash` | [`TransactionHash`](modules.md#transactionhash) \| ``null`` | Transaction hash of the corresponding settlement transaction containing the trade (if available). |

#### Defined in

external/cow-sdk/src/order-book/generated/models/Trade.ts:16

___

### TransactionHash

Ƭ **TransactionHash**: `string`

32 byte digest encoded as a hex with `0x` prefix.

#### Defined in

external/cow-sdk/src/order-book/generated/models/TransactionHash.ts:8

___

### TwapDataBase

Ƭ **TwapDataBase**: `Object`

Base parameters for a TWAP order. Shared by:
  - TwapStruct (modelling the contract's struct used for `staticInput`).
  - TwapData (modelling the friendly SDK interface).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | `string` | Meta-data associated with the order. Normally would be the keccak256 hash of the document generated in http://github.com/cowprotocol/app-data This hash should have been uploaded to the API https://api.cow.fi/docs/#/default/put_api_v1_app_data__app_data_hash_ and potentially to other data availability protocols like IPFS. |
| `buyToken` | `string` | which token to buy |
| `receiver` | `string` | who to send the tokens to |
| `sellToken` | `string` | which token to sell |

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:41

___

### UID

Ƭ **UID**: `string`

Unique identifier for the order: 56 bytes encoded as hex with `0x`
prefix.

Bytes 0..32 are the order digest, bytes 30..52 the owner address and
bytes 52..56 the expiry (`validTo`) as a `uint32` unix epoch timestamp.

#### Defined in

external/cow-sdk/src/order-book/generated/models/UID.ts:12

___

### UnsignedOrder

Ƭ **UnsignedOrder**: `Omit`<[`OrderParameters`](modules.md#orderparameters), ``"receiver"``\> & \{ `receiver`: `string`  }

Unsigned order intent to be placed.

#### Defined in

external/cow-sdk/src/order-signing/types.ts:8

___

### Volume

Ƭ **Volume**: `Object`

The protocol fee is taken as a percent of the order volume.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Defined in

external/cow-sdk/src/order-book/generated/models/Volume.ts:8

## Variables

### ALL\_SUPPORTED\_CHAIN\_IDS

• `Const` **ALL\_SUPPORTED\_CHAIN\_IDS**: [`SupportedChainId`](enums/SupportedChainId.md)[]

The list of supported chains.

#### Defined in

external/cow-sdk/src/common/consts.ts:16

___

### BARN\_ETH\_FLOW\_ADDRESSES

• `Const` **BARN\_ETH\_FLOW\_ADDRESSES**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

#### Defined in

external/cow-sdk/src/common/consts.ts:78

___

### COMPOSABLE\_COW

• `Const` **COMPOSABLE\_COW**: ``"0xfdaFc9d1902f4e0b84f65F49f244b32b31013b74"``

#### Defined in

external/cow-sdk/src/common/consts.ts:5

___

### COMPOSABLE\_COW\_CONTRACT\_ADDRESS

• `Const` **COMPOSABLE\_COW\_CONTRACT\_ADDRESS**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

An object containing the addresses of the `ComposableCow` contracts for each supported chain.

#### Defined in

external/cow-sdk/src/common/consts.ts:54

___

### CONDITIONAL\_ORDER\_PARAMS\_ABI

• `Const` **CONDITIONAL\_ORDER\_PARAMS\_ABI**: `string`[]

#### Defined in

external/cow-sdk/src/composable/utils.ts:19

___

### COW\_PROTOCOL\_SETTLEMENT\_CONTRACT\_ADDRESS

• `Const` **COW\_PROTOCOL\_SETTLEMENT\_CONTRACT\_ADDRESS**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

An object containing the addresses of the CoW Protocol settlement contracts for each supported chain.

#### Defined in

external/cow-sdk/src/common/consts.ts:39

___

### COW\_PROTOCOL\_VAULT\_RELAYER\_ADDRESS

• `Const` **COW\_PROTOCOL\_VAULT\_RELAYER\_ADDRESS**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

An object containing the addresses of the CoW Protocol Vault realyer contracts for each supported chain.

#### Defined in

external/cow-sdk/src/common/consts.ts:44

___

### COW\_SHED\_712\_TYPES

• `Const` **COW\_SHED\_712\_TYPES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Call` | \{ `name`: `string` = 'target'; `type`: `string` = 'address' }[] |
| `ExecuteHooks` | \{ `name`: `string` = 'calls'; `type`: `string` = 'Call[]' }[] |

#### Defined in

external/cow-sdk/src/cow-shed/types.ts:30

___

### COW\_SHED\_FACTORY

• `Const` **COW\_SHED\_FACTORY**: ``"0x00E989b87700514118Fa55326CD1cCE82faebEF6"``

#### Defined in

external/cow-sdk/src/common/consts.ts:7

___

### COW\_SHED\_IMPLEMENTATION

• `Const` **COW\_SHED\_IMPLEMENTATION**: ``"0x2CFFA8cf11B90C9F437567b86352169dF4009F73"``

#### Defined in

external/cow-sdk/src/common/consts.ts:8

___

### COW\_SHED\_PROXY\_INIT\_CODE

• `Const` **COW\_SHED\_PROXY\_INIT\_CODE**: ``"0x60a034608e57601f61037138819003918201601f19168301916001600160401b038311848410176093578084926040948552833981010312608e57604b602060458360a9565b920160a9565b6080527f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc556040516102b490816100bd8239608051818181608f01526101720152f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203608e5756fe60806040526004361015610018575b3661019457610194565b6000803560e01c908163025b22bc1461003b575063f851a4400361000e5761010d565b3461010a5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010a5773ffffffffffffffffffffffffffffffffffffffff60043581811691828203610106577f0000000000000000000000000000000000000000000000000000000000000000163314600014610101577f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc557fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b8280a280f35b61023d565b8380fd5b80fd5b346101645760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610164576020610146610169565b73ffffffffffffffffffffffffffffffffffffffff60405191168152f35b600080fd5b333003610101577f000000000000000000000000000000000000000000000000000000000000000090565b60ff7f68df44b1011761f481358c0f49a711192727fb02c377d697bcb0ea8ff8393ac0541615806101ef575b1561023d5760046040517ff92ee8a9000000000000000000000000000000000000000000000000000000008152fd5b507f400ada75000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000006000351614156101c0565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546000808092368280378136915af43d82803e1561027a573d90f35b3d90fdfea2646970667358221220c7c26ff3040b96a28e96d6d27b743972943aeaef81cc821544c5fe1e24f9b17264736f6c63430008190033"``

#### Defined in

external/cow-sdk/src/cow-shed/proxyInitCode.ts:1

___

### CURRENT\_BLOCK\_TIMESTAMP\_FACTORY\_ADDRESS

• `Const` **CURRENT\_BLOCK\_TIMESTAMP\_FACTORY\_ADDRESS**: ``"0x52eD56Da04309Aca4c3FECC595298d80C2f16BAc"``

The address of the `CurrentBlockTimestampFactory` contract

**NOTE**: This is used in the event that TWAP's have a `t0` of `0`.

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:26

___

### DEFAULT\_BACKOFF\_OPTIONS

• `Const` **DEFAULT\_BACKOFF\_OPTIONS**: `BackoffOptions`

The default backoff options for CoW Protocol's API

**`See`**

Backoff configuration: https://www.npmjs.com/package/@insertish/exponential-backoff

#### Defined in

external/cow-sdk/src/order-book/request.ts:41

___

### DEFAULT\_CONDITIONAL\_ORDER\_REGISTRY

• `Const` **DEFAULT\_CONDITIONAL\_ORDER\_REGISTRY**: [`ConditionalOrderRegistry`](modules.md#conditionalorderregistry)

#### Defined in

external/cow-sdk/src/composable/orderTypes/index.ts:5

___

### DEFAULT\_COW\_API\_CONTEXT

• `Const` **DEFAULT\_COW\_API\_CONTEXT**: [`ApiContext`](interfaces/ApiContext.md)

The default CoW Protocol API context.

#### Defined in

external/cow-sdk/src/common/configs.ts:86

___

### DEFAULT\_IPFS\_READ\_URI

• `Const` **DEFAULT\_IPFS\_READ\_URI**: ``"https://gnosis.mypinata.cloud/ipfs"``

#### Defined in

external/cow-sdk/src/common/ipfs.ts:1

___

### DEFAULT\_IPFS\_WRITE\_URI

• `Const` **DEFAULT\_IPFS\_WRITE\_URI**: ``"https://api.pinata.cloud"``

#### Defined in

external/cow-sdk/src/common/ipfs.ts:2

___

### DEFAULT\_LIMITER\_OPTIONS

• `Const` **DEFAULT\_LIMITER\_OPTIONS**: `RateLimiterOpts`

The default rate limiter options for CoW Protocol's API.

**CAUTION**: The CoW Protocol OrderBook API is limited to 5 requests per second per IP.

#### Defined in

external/cow-sdk/src/order-book/request.ts:59

___

### DOMAIN\_TYPE

• `Const` **DOMAIN\_TYPE**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `EIP712Domain` | \{ `name`: `string` = 'name'; `type`: `string` = 'string' }[] |

#### Defined in

external/cow-sdk/src/cow-shed/types.ts:21

___

### ENVS\_LIST

• `Const` **ENVS\_LIST**: [`CowEnv`](modules.md#cowenv)[]

The list of available environments.

#### Defined in

external/cow-sdk/src/common/configs.ts:81

___

### ETH\_ADDRESS

• `Const` **ETH\_ADDRESS**: ``"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"``

#### Defined in

external/cow-sdk/src/common/consts.ts:3

___

### ETH\_FLOW\_ADDRESSES

• `Const` **ETH\_FLOW\_ADDRESSES**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

An object containing the addresses of ETH flow contracts for each supported chain.

#### Defined in

external/cow-sdk/src/common/consts.ts:70

___

### EXTENSIBLE\_FALLBACK\_HANDLER

• `Const` **EXTENSIBLE\_FALLBACK\_HANDLER**: ``"0x2f55e8b20D0B9FEFA187AA7d00B6Cbe563605bF5"``

#### Defined in

external/cow-sdk/src/common/consts.ts:4

___

### EXTENSIBLE\_FALLBACK\_HANDLER\_CONTRACT\_ADDRESS

• `Const` **EXTENSIBLE\_FALLBACK\_HANDLER\_CONTRACT\_ADDRESS**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

An object containing the addresses of the `ExtensibleFallbackHandler` contracts for each supported chain.

#### Defined in

external/cow-sdk/src/common/consts.ts:49

___

### MAX\_FREQUENCY

• `Const` **MAX\_FREQUENCY**: `BigNumber`

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:29

___

### MAX\_UINT32

• `Const` **MAX\_UINT32**: `BigNumber`

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:28

___

### MAX\_VALID\_TO\_EPOCH

• `Const` **MAX\_VALID\_TO\_EPOCH**: ``4294967295``

#### Defined in

external/cow-sdk/src/common/consts.ts:86

___

### ORDER\_BOOK\_PROD\_CONFIG

• `Const` **ORDER\_BOOK\_PROD\_CONFIG**: [`ApiBaseUrls`](modules.md#apibaseurls)

An object containing *production* environment base URLs for each supported `chainId`.

**`See`**

[https://api.cow.fi/docs/#/](https://api.cow.fi/docs/#/)

#### Defined in

external/cow-sdk/src/order-book/api.ts:38

___

### ORDER\_BOOK\_STAGING\_CONFIG

• `Const` **ORDER\_BOOK\_STAGING\_CONFIG**: [`ApiBaseUrls`](modules.md#apibaseurls)

An object containing *staging* environment base URLs for each supported `chainId`.

#### Defined in

external/cow-sdk/src/order-book/api.ts:49

___

### ORDER\_PRIMARY\_TYPE

• `Const` **ORDER\_PRIMARY\_TYPE**: ``"Order"``

#### Defined in

external/cow-sdk/src/trading/types.ts:20

___

### SUBGRAPH\_PROD\_CONFIG

• `Const` **SUBGRAPH\_PROD\_CONFIG**: `SubgraphApiBaseUrls`

CoW Protocol Production Subgraph API configuration.

**`See`**

 - [https://api.thegraph.com/subgraphs/name/cowprotocol/cow](https://api.thegraph.com/subgraphs/name/cowprotocol/cow)
 - [https://api.thegraph.com/subgraphs/name/cowprotocol/cow-gc](https://api.thegraph.com/subgraphs/name/cowprotocol/cow-gc)

#### Defined in

external/cow-sdk/src/subgraph/api.ts:24

___

### SUBGRAPH\_STAGING\_CONFIG

• `Const` **SUBGRAPH\_STAGING\_CONFIG**: `SubgraphApiBaseUrls`

CoW Protocol Staging Subgraph API configuration.

**`Deprecated`**

**`See`**

 - [https://api.thegraph.com/subgraphs/name/cowprotocol/cow-staging](https://api.thegraph.com/subgraphs/name/cowprotocol/cow-staging)
 - [https://api.thegraph.com/subgraphs/name/cowprotocol/cow-gc-staging](https://api.thegraph.com/subgraphs/name/cowprotocol/cow-gc-staging)

#### Defined in

external/cow-sdk/src/subgraph/api.ts:38

___

### TWAP\_ADDRESS

• `Const` **TWAP\_ADDRESS**: ``"0x6cF1e9cA41f7611dEf408122793c358a3d11E5a5"``

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:20

___

### WRAPPED\_NATIVE\_CURRENCIES

• `Const` **WRAPPED\_NATIVE\_CURRENCIES**: `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

An object containing the addresses of wrapped native currencies for each supported chain.

#### Defined in

external/cow-sdk/src/common/consts.ts:59

___

### logPrefix

• `Const` **logPrefix**: ``"cow-sdk:"``

#### Defined in

external/cow-sdk/src/common/cow-error.ts:10

## Functions

### DEFAULT\_TOKEN\_FORMATTER

▸ **DEFAULT_TOKEN_FORMATTER**(`address`, `amount`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `amount` | `BigNumber` |

#### Returns

`string`

#### Defined in

external/cow-sdk/src/composable/utils.ts:21

___

### buildAppData

▸ **buildAppData**(`«destructured»`, `advancedParams?`): `Promise`<[`AppDataInfo`](interfaces/AppDataInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`BuildAppDataParams`](interfaces/BuildAppDataParams.md) |
| `advancedParams?` | `Partial`<`Omit`<`AppDataRootSchema`, ``"version"``\>\> |

#### Returns

`Promise`<[`AppDataInfo`](interfaces/AppDataInfo.md)\>

#### Defined in

external/cow-sdk/src/trading/appDataUtils.ts:5

___

### calculateUniqueOrderId

▸ **calculateUniqueOrderId**(`chainId`, `order`, `checkEthFlowOrderExists?`, `env?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`SupportedChainId`](enums/SupportedChainId.md) |
| `order` | [`UnsignedOrder`](modules.md#unsignedorder) |
| `checkEthFlowOrderExists?` | [`EthFlowOrderExistsCallback`](interfaces/EthFlowOrderExistsCallback.md) |
| `env?` | [`CowEnv`](modules.md#cowenv) |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/trading/calculateUniqueOrderId.ts:16

___

### createSetDomainVerifierTx

▸ **createSetDomainVerifierTx**(`domain`, `verifier`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `verifier` | `string` |

#### Returns

`string`

#### Defined in

external/cow-sdk/src/composable/utils.ts:44

___

### decodeParams

▸ **decodeParams**(`encoded`): [`ConditionalOrderParams`](modules.md#conditionalorderparams)

Decode the `ConditionalOrderParams` for the conditional order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoded` | `string` | The encoded conditional order. |

#### Returns

[`ConditionalOrderParams`](modules.md#conditionalorderparams)

The decoded conditional order.

#### Defined in

external/cow-sdk/src/composable/utils.ts:68

___

### encodeParams

▸ **encodeParams**(`params`): `string`

Encode the `ConditionalOrderParams` for the conditional order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`ConditionalOrderParams`](modules.md#conditionalorderparams) | The `ConditionalOrderParams` struct representing the conditional order as taken from a merkle tree. |

#### Returns

`string`

The ABI-encoded conditional order.

**`See`**

ConditionalOrderParams

#### Defined in

external/cow-sdk/src/composable/utils.ts:58

___

### formatEpoch

▸ **formatEpoch**(`epoch`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `epoch` | `number` |

#### Returns

`string`

#### Defined in

external/cow-sdk/src/composable/utils.ts:97

___

### fromStructToOrder

▸ **fromStructToOrder**(`order`): `Order`

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | `DataStruct` |

#### Returns

`Order`

#### Defined in

external/cow-sdk/src/composable/utils.ts:135

___

### generateAppDataFromDoc

▸ **generateAppDataFromDoc**(`doc`): `Promise`<`Pick`<[`AppDataInfo`](interfaces/AppDataInfo.md), ``"fullAppData"`` \| ``"appDataKeccak256"``\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `AppDataRootSchema` |

#### Returns

`Promise`<`Pick`<[`AppDataInfo`](interfaces/AppDataInfo.md), ``"fullAppData"`` \| ``"appDataKeccak256"``\>\>

#### Defined in

external/cow-sdk/src/trading/appDataUtils.ts:28

___

### getBlockInfo

▸ **getBlockInfo**(`provider`): `Promise`<[`BlockInfo`](modules.md#blockinfo)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `Provider` |

#### Returns

`Promise`<[`BlockInfo`](modules.md#blockinfo)\>

#### Defined in

external/cow-sdk/src/composable/utils.ts:88

___

### getCoWShedFactoryInterface

▸ **getCoWShedFactoryInterface**(): `CoWShedFactoryInterface`

#### Returns

`CoWShedFactoryInterface`

#### Defined in

external/cow-sdk/src/cow-shed/contracts.ts:16

___

### getCoWShedInterface

▸ **getCoWShedInterface**(): `CoWShedInterface`

#### Returns

`CoWShedInterface`

#### Defined in

external/cow-sdk/src/cow-shed/contracts.ts:8

___

### getDomainVerifier

▸ **getDomainVerifier**(`safe`, `domain`, `chainId`, `provider`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `safe` | `string` |
| `domain` | `string` |
| `chainId` | [`SupportedChainId`](enums/SupportedChainId.md) |
| `provider` | `Provider` |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/composable/utils.ts:31

___

### getEthFlowTransaction

▸ **getEthFlowTransaction**(`signer`, `appDataKeccak256`, `_params`, `networkCostsAmount?`, `checkEthFlowOrderExists?`): `Promise`<\{ `orderId`: `string` ; `transaction`: [`TransactionParams`](interfaces/TransactionParams.md)  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `signer` | `Signer` | `undefined` |
| `appDataKeccak256` | `string` | `undefined` |
| `_params` | [`LimitTradeParametersFromQuote`](interfaces/LimitTradeParametersFromQuote.md) | `undefined` |
| `networkCostsAmount` | `string` | `'0'` |
| `checkEthFlowOrderExists?` | [`EthFlowOrderExistsCallback`](interfaces/EthFlowOrderExistsCallback.md) | `undefined` |

#### Returns

`Promise`<\{ `orderId`: `string` ; `transaction`: [`TransactionParams`](interfaces/TransactionParams.md)  }\>

#### Defined in

external/cow-sdk/src/trading/getEthFlowTransaction.ts:17

___

### getOrderToSign

▸ **getOrderToSign**(`«destructured»`, `limitOrderParams`, `appDataKeccak256`): [`UnsignedOrder`](modules.md#unsignedorder)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `OrderToSignParams` |
| `limitOrderParams` | [`LimitTradeParameters`](interfaces/LimitTradeParameters.md) |
| `appDataKeccak256` | `string` |

#### Returns

[`UnsignedOrder`](modules.md#unsignedorder)

#### Defined in

external/cow-sdk/src/trading/getOrderToSign.ts:11

___

### getPreSignTransaction

▸ **getPreSignTransaction**(`signer`, `chainId`, `account`, `orderId`): `Promise`<[`TransactionParams`](interfaces/TransactionParams.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |
| `chainId` | [`SupportedChainId`](enums/SupportedChainId.md) |
| `account` | `string` |
| `orderId` | `string` |

#### Returns

`Promise`<[`TransactionParams`](interfaces/TransactionParams.md)\>

#### Defined in

external/cow-sdk/src/trading/getPreSignTransaction.ts:9

___

### getQuote

▸ **getQuote**(`_tradeParameters`, `trader`, `advancedSettings?`, `_orderBookApi?`): `Promise`<\{ `orderBookApi`: [`OrderBookApi`](classes/OrderBookApi.md) ; `result`: [`QuoteResults`](interfaces/QuoteResults.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_tradeParameters` | [`TradeParameters`](interfaces/TradeParameters.md) |
| `trader` | [`QuoterParameters`](modules.md#quoterparameters) |
| `advancedSettings?` | [`SwapAdvancedSettings`](interfaces/SwapAdvancedSettings.md) |
| `_orderBookApi?` | [`OrderBookApi`](classes/OrderBookApi.md) |

#### Returns

`Promise`<\{ `orderBookApi`: [`OrderBookApi`](classes/OrderBookApi.md) ; `result`: [`QuoteResults`](interfaces/QuoteResults.md)  }\>

#### Defined in

external/cow-sdk/src/trading/getQuote.ts:39

___

### getQuoteAmountsAndCosts

▸ **getQuoteAmountsAndCosts**(`params`): [`QuoteAmountsAndCosts`](interfaces/QuoteAmountsAndCosts.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Params` |

#### Returns

[`QuoteAmountsAndCosts`](interfaces/QuoteAmountsAndCosts.md)

#### Defined in

external/cow-sdk/src/order-book/quoteAmountsAndCostsUtils.ts:14

___

### getQuoteWithSigner

▸ **getQuoteWithSigner**(`swapParameters`, `advancedSettings?`, `orderBookApi?`): `Promise`<`QuoteResultsWithSigner`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `swapParameters` | [`SwapParameters`](interfaces/SwapParameters.md) |
| `advancedSettings?` | [`SwapAdvancedSettings`](interfaces/SwapAdvancedSettings.md) |
| `orderBookApi?` | [`OrderBookApi`](classes/OrderBookApi.md) |

#### Returns

`Promise`<`QuoteResultsWithSigner`\>

#### Defined in

external/cow-sdk/src/trading/getQuote.ts:139

___

### isComposableCow

▸ **isComposableCow**(`handler`, `chainId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `string` |
| `chainId` | [`SupportedChainId`](enums/SupportedChainId.md) |

#### Returns

`boolean`

#### Defined in

external/cow-sdk/src/composable/utils.ts:27

___

### isExtensibleFallbackHandler

▸ **isExtensibleFallbackHandler**(`handler`, `chainId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `string` |
| `chainId` | [`SupportedChainId`](enums/SupportedChainId.md) |

#### Returns

`boolean`

#### Defined in

external/cow-sdk/src/composable/utils.ts:23

___

### isValidAbi

▸ **isValidAbi**(`types`, `values`): `boolean`

Helper method for validating ABI types.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | readonly (`string` \| `ParamType`)[] | ABI types to validate against. |
| `values` | `any`[] | The values to validate. |

#### Returns

`boolean`

Whether the values are valid ABI for the given types.

#### Defined in

external/cow-sdk/src/composable/utils.ts:79

___

### mapAddressToSupportedNetworks

▸ **mapAddressToSupportedNetworks**(`address`): `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Record`<[`SupportedChainId`](enums/SupportedChainId.md), `string`\>

#### Defined in

external/cow-sdk/src/common/consts.ts:32

___

### mapQuoteAmountsAndCosts

▸ **mapQuoteAmountsAndCosts**<`T`, `R`\>(`value`, `mapper`): [`QuoteAmountsAndCosts`](interfaces/QuoteAmountsAndCosts.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`QuoteAmountsAndCosts`](interfaces/QuoteAmountsAndCosts.md)<`T`, \{ `buyAmount`: `T` ; `sellAmount`: `T`  }\> |
| `mapper` | (`value`: `T`) => `R` |

#### Returns

[`QuoteAmountsAndCosts`](interfaces/QuoteAmountsAndCosts.md)<`R`\>

#### Defined in

external/cow-sdk/src/trading/utils.ts:44

___

### mapSupportedNetworks

▸ **mapSupportedNetworks**<`T`\>(`value`): `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | (`chainId`: [`SupportedChainId`](enums/SupportedChainId.md)) => `T` |

#### Returns

`Record`<[`SupportedChainId`](enums/SupportedChainId.md), `T`\>

#### Defined in

external/cow-sdk/src/common/consts.ts:20

▸ **mapSupportedNetworks**<`T`\>(`value`): `Record`<[`SupportedChainId`](enums/SupportedChainId.md), `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Record`<[`SupportedChainId`](enums/SupportedChainId.md), `T`\>

#### Defined in

external/cow-sdk/src/common/consts.ts:21

___

### postCoWProtocolTrade

▸ **postCoWProtocolTrade**(`orderBookApi`, `signer`, `appData`, `params`, `networkCostsAmount?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `orderBookApi` | [`OrderBookApi`](classes/OrderBookApi.md) | `undefined` |
| `signer` | `Signer` | `undefined` |
| `appData` | [`AppDataInfo`](interfaces/AppDataInfo.md) | `undefined` |
| `params` | [`LimitTradeParameters`](interfaces/LimitTradeParameters.md) | `undefined` |
| `networkCostsAmount` | `string` | `'0'` |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/trading/postCoWProtocolTrade.ts:10

___

### postLimitOrder

▸ **postLimitOrder**(`params`, `advancedSettings?`, `_orderBookApi?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`LimitOrderParameters`](interfaces/LimitOrderParameters.md) |
| `advancedSettings?` | [`LimitOrderAdvancedSettings`](interfaces/LimitOrderAdvancedSettings.md) |
| `_orderBookApi?` | [`OrderBookApi`](classes/OrderBookApi.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/trading/postLimitOrder.ts:8

___

### postSellNativeCurrencyOrder

▸ **postSellNativeCurrencyOrder**(`orderBookApi`, `signer`, `appData`, `_params`, `networkCostsAmount?`, `checkEthFlowOrderExists?`): `Promise`<\{ `orderId`: `string` ; `txHash`: `string`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `orderBookApi` | [`OrderBookApi`](classes/OrderBookApi.md) | `undefined` |
| `signer` | `Signer` | `undefined` |
| `appData` | `Pick`<[`AppDataInfo`](interfaces/AppDataInfo.md), ``"fullAppData"`` \| ``"appDataKeccak256"``\> | `undefined` |
| `_params` | [`LimitTradeParametersFromQuote`](interfaces/LimitTradeParametersFromQuote.md) | `undefined` |
| `networkCostsAmount` | `string` | `'0'` |
| `checkEthFlowOrderExists?` | [`EthFlowOrderExistsCallback`](interfaces/EthFlowOrderExistsCallback.md) | `undefined` |

#### Returns

`Promise`<\{ `orderId`: `string` ; `txHash`: `string`  }\>

#### Defined in

external/cow-sdk/src/trading/postSellNativeCurrencyOrder.ts:9

___

### postSwapOrder

▸ **postSwapOrder**(`params`, `advancedSettings?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SwapParameters`](interfaces/SwapParameters.md) |
| `advancedSettings?` | [`SwapAdvancedSettings`](interfaces/SwapAdvancedSettings.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/trading/postSwapOrder.ts:7

___

### postSwapOrderFromQuote

▸ **postSwapOrderFromQuote**(`«destructured»`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `QuoteResultsWithSigner` |

#### Returns

`Promise`<`string`\>

#### Defined in

external/cow-sdk/src/trading/postSwapOrder.ts:11

___

### request

▸ **request**<`T`\>(`baseUrl`, `«destructured»`, `rateLimiter`, `backoffOpts`): `Promise`<`T`\>

Helper function to make a rate-limited request to an API.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseUrl` | `string` | The base URL of the API. |
| `«destructured»` | [`FetchParams`](interfaces/FetchParams.md) | - |
| `rateLimiter` | `RateLimiter` | The rate limiter to use. |
| `backoffOpts` | `Partial`<`IBackOffOptions`\> | The backoff options to use. |

#### Returns

`Promise`<`T`\>

The response of the request.

**`Throws`**

If the API returns an error or if the request fails.

#### Defined in

external/cow-sdk/src/order-book/request.ts:104

___

### swapParamsToLimitOrderParams

▸ **swapParamsToLimitOrderParams**(`params`, `quoteId`, `amounts`): [`LimitTradeParametersFromQuote`](interfaces/LimitTradeParametersFromQuote.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`TradeParameters`](interfaces/TradeParameters.md) |
| `quoteId` | `number` |
| `amounts` | [`QuoteAmountsAndCosts`](interfaces/QuoteAmountsAndCosts.md)<`bigint`, \{ `buyAmount`: `bigint` ; `sellAmount`: `bigint`  }\> |

#### Returns

[`LimitTradeParametersFromQuote`](interfaces/LimitTradeParametersFromQuote.md)

#### Defined in

external/cow-sdk/src/trading/utils.ts:7

___

### transformDataToStruct

▸ **transformDataToStruct**(`data`): [`TwapStruct`](interfaces/TwapStruct.md)

Transform parameters into a native struct.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`TwapData`](interfaces/TwapData.md) | As passed by the consumer of the API. |

#### Returns

[`TwapStruct`](interfaces/TwapStruct.md)

A formatted struct as expected by the smart contract.

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:538

___

### transformStructToData

▸ **transformStructToData**(`struct`): [`TwapData`](interfaces/TwapData.md)

Transform parameters into a TWAP order struct.

#### Parameters

| Name | Type |
| :------ | :------ |
| `struct` | [`TwapStruct`](interfaces/TwapStruct.md) |

#### Returns

[`TwapData`](interfaces/TwapData.md)

A formatted struct as expected by the smart contract.

#### Defined in

external/cow-sdk/src/composable/orderTypes/Twap.ts:580
