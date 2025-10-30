---
id: "QuoteAmountsAndCosts"
title: "Interface: QuoteAmountsAndCosts<AmountType, Amounts>"
sidebar_label: "QuoteAmountsAndCosts"
sidebar_position: 0
custom_edit_url: null
---

CoW Protocol quote has amounts (sell/buy) and costs (network fee), there is also partner fees.
Besides that, CoW Protocol supports both sell and buy orders and the fees and costs are calculated differently.

The order of adding fees and costs is as follows:
1. Network fee is always added to the sell amount
2. Partner fee is added to the surplus amount (sell amount for sell-orders, buy amount for buy-orders)

For sell-orders the partner fee is subtracted from the buy amount after network costs.
For buy-orders the partner fee is added on top of the sell amount after network costs.

## Type parameters

| Name | Type |
| :------ | :------ |
| `AmountType` | `bigint` |
| `Amounts` | \{ `buyAmount`: `AmountType` ; `sellAmount`: `AmountType`  } |

## Properties

### afterNetworkCosts

• **afterNetworkCosts**: `Amounts`

#### Defined in

external/cow-sdk/src/order-book/types.ts:42

___

### afterPartnerFees

• **afterPartnerFees**: `Amounts`

#### Defined in

external/cow-sdk/src/order-book/types.ts:43

___

### afterSlippage

• **afterSlippage**: `Amounts`

#### Defined in

external/cow-sdk/src/order-book/types.ts:44

___

### beforeNetworkCosts

• **beforeNetworkCosts**: `Amounts`

#### Defined in

external/cow-sdk/src/order-book/types.ts:41

___

### costs

• **costs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `networkFee` | \{ `amountInBuyCurrency`: `AmountType` ; `amountInSellCurrency`: `AmountType`  } |
| `networkFee.amountInBuyCurrency` | `AmountType` |
| `networkFee.amountInSellCurrency` | `AmountType` |
| `partnerFee` | \{ `amount`: `AmountType` ; `bps`: `number`  } |
| `partnerFee.amount` | `AmountType` |
| `partnerFee.bps` | `number` |

#### Defined in

external/cow-sdk/src/order-book/types.ts:30

___

### isSell

• **isSell**: `boolean`

#### Defined in

external/cow-sdk/src/order-book/types.ts:28
