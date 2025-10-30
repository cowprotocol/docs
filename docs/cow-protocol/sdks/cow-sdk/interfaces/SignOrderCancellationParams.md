---
id: "SignOrderCancellationParams"
title: "Interface: SignOrderCancellationParams"
sidebar_label: "SignOrderCancellationParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters for signing an order cancellation.

**`Param`**

The CoW Protocol `chainId` context that's being used.

**`Param`**

The signer who initially placed the order intent.

**`Param`**

The unique identifier of the order to cancel.

**`Param`**

The signing scheme to use for the signature.

## Properties

### chainId

• **chainId**: [`SupportedChainId`](../enums/SupportedChainId.md)

#### Defined in

external/cow-sdk/src/order-signing/types.ts:37

___

### orderUid

• **orderUid**: `string`

#### Defined in

external/cow-sdk/src/order-signing/types.ts:39

___

### signer

• **signer**: `Signer`

#### Defined in

external/cow-sdk/src/order-signing/types.ts:38

___

### signingScheme

• **signingScheme**: [`EcdsaSigningScheme`](../enums/EcdsaSigningScheme.md)

#### Defined in

external/cow-sdk/src/order-signing/types.ts:40
