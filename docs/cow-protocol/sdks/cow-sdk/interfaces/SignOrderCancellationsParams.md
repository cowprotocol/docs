---
id: "SignOrderCancellationsParams"
title: "Interface: SignOrderCancellationsParams"
sidebar_label: "SignOrderCancellationsParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters for signing multiple bulk order cancellations.

**`Param`**

The CoW Protocol `chainId` context that's being used.

**`Param`**

The signer who initially placed the order intents.

**`Param`**

An array of `orderUid` to cancel.

**`Param`**

The signing scheme to use for the signature.

## Properties

### chainId

• **chainId**: [`SupportedChainId`](../enums/SupportedChainId.md)

#### Defined in

external/cow-sdk/src/order-signing/types.ts:51

___

### orderUids

• **orderUids**: `string`[]

#### Defined in

external/cow-sdk/src/order-signing/types.ts:53

___

### signer

• **signer**: `Signer`

#### Defined in

external/cow-sdk/src/order-signing/types.ts:52

___

### signingScheme

• **signingScheme**: [`EcdsaSigningScheme`](../enums/EcdsaSigningScheme.md)

#### Defined in

external/cow-sdk/src/order-signing/types.ts:54
