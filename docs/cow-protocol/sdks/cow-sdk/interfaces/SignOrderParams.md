---
id: "SignOrderParams"
title: "Interface: SignOrderParams"
sidebar_label: "SignOrderParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters for signing an order intent.

**`Param`**

The CoW Protocol `chainId` context that's being used.

**`Param`**

The signer who is placing the order intent.

**`Param`**

The unsigned order intent to be placed.

**`Param`**

The signing scheme to use for the signature.

## Properties

### chainId

• **chainId**: [`SupportedChainId`](../enums/SupportedChainId.md)

#### Defined in

external/cow-sdk/src/order-signing/types.ts:23

___

### order

• **order**: [`UnsignedOrder`](../modules.md#unsignedorder)

#### Defined in

external/cow-sdk/src/order-signing/types.ts:25

___

### signer

• **signer**: `Signer`

#### Defined in

external/cow-sdk/src/order-signing/types.ts:24

___

### signingScheme

• **signingScheme**: [`EcdsaSigningScheme`](../enums/EcdsaSigningScheme.md)

#### Defined in

external/cow-sdk/src/order-signing/types.ts:26
