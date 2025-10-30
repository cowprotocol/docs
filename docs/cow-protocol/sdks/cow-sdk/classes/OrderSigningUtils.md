---
id: "OrderSigningUtils"
title: "Class: OrderSigningUtils"
sidebar_label: "OrderSigningUtils"
sidebar_position: 0
custom_edit_url: null
---

Utility class for signing order intents and cancellations.

**`Remarks`**

This class only supports `eth_sign` and wallet-native EIP-712 signing. For use of
         `presign` and `eip1271` [see the docs](https://docs.cow.fi/).

**`Example`**

```typescript
import { OrderSigningUtils, SupportedChainId, UnsignedOrder } from '@cowprotocol/cow-sdk'
import { Web3Provider } from '@ethersproject/providers'

const account = 'YOUR_WALLET_ADDRESS'
const chainId = 100 // Gnosis chain
const provider = new Web3Provider(window.ethereum)
const signer = provider.getSigner()

async function main() {
    const orderToSign: UnsignedOrder = { ... }
    const orderSigningResult = await OrderSigningUtils.signOrder(orderToSign, chainId, signer)

    const orderId = await orderBookApi.sendOrder({ ...orderToSign, ...orderSigningResult })

    const order = await orderBookApi.getOrder(orderId)

    const trades = await orderBookApi.getTrades({ orderId })

    const orderCancellationSigningResult = await OrderSigningUtils.signOrderCancellations([orderId], chainId, signer)

    const cancellationResult = await orderBookApi.sendSignedOrderCancellations({...orderCancellationSigningResult, orderUids: [orderId] })

    console.log('Results: ', { orderId, order, trades, orderCancellationSigningResult, cancellationResult })
}
```

## Constructors

### constructor

• **new OrderSigningUtils**(): [`OrderSigningUtils`](OrderSigningUtils.md)

#### Returns

[`OrderSigningUtils`](OrderSigningUtils.md)

## Methods

### generateOrderId

▸ **generateOrderId**(`chainId`, `order`, `params`): `Promise`<\{ `orderDigest`: `string` ; `orderId`: `string`  }\>

Hashes the order intent and generate deterministic order ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`SupportedChainId`](../enums/SupportedChainId.md) | The CoW Protocol `chainId` context that's being used. |
| `order` | `Order` | order to sign |
| `params` | `Pick`<`OrderUidParams`, ``"owner"``\> | order unique identifier parameters. |

#### Returns

`Promise`<\{ `orderDigest`: `string` ; `orderId`: `string`  }\>

#### Defined in

external/cow-sdk/src/order-signing/orderSigningUtils.ts:109

___

### getDomain

▸ **getDomain**(`chainId`): `Promise`<`TypedDataDomain`\>

Get the EIP-712 typed domain data being used for signing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`SupportedChainId`](../enums/SupportedChainId.md) | The CoW Protocol `chainId` context that's being used. |

#### Returns

`Promise`<`TypedDataDomain`\>

The EIP-712 typed domain data.

**`See`**

https://eips.ethereum.org/EIPS/eip-712

#### Defined in

external/cow-sdk/src/order-signing/orderSigningUtils.ts:98

___

### getDomainSeparator

▸ **getDomainSeparator**(`chainId`): `Promise`<`string`\>

Get the domain separator hash for the EIP-712 typed domain data being used for signing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`SupportedChainId`](../enums/SupportedChainId.md) | {SupportedChainId} chainId The CoW Protocol protocol `chainId` context that's being used. |

#### Returns

`Promise`<`string`\>

A string representation of the EIP-712 typed domain data hash.

#### Defined in

external/cow-sdk/src/order-signing/orderSigningUtils.ts:123

___

### getEIP712Types

▸ **getEIP712Types**(): `Record`<`string`, `unknown`\>

Get the EIP-712 types used for signing a GPv2Order.Data struct. This is useful for when
signing orders using smart contracts, whereby this SDK cannot do the EIP-1271 signing for you.

#### Returns

`Record`<`string`, `unknown`\>

The EIP-712 types used for signing.

#### Defined in

external/cow-sdk/src/order-signing/orderSigningUtils.ts:134

___

### signOrder

▸ **signOrder**(`order`, `chainId`, `signer`): `Promise`<[`SigningResult`](../modules.md#signingresult)\>

Sign the order intent with the specified signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | [`UnsignedOrder`](../modules.md#unsignedorder) | The unsigned order intent to be placed. |
| `chainId` | [`SupportedChainId`](../enums/SupportedChainId.md) | The CoW Protocol `chainId` context that's being used. |
| `signer` | `Signer` | The signer who is placing the order intent. |

#### Returns

`Promise`<[`SigningResult`](../modules.md#signingresult)\>

Encoded signature including signing scheme for the order.

**`Remarks`**

If the API reports an error with the signature, it is likely to be due to an incorrectly
         specified `chainId`. Please ensure that the `chainId` is correct for the network you are
         using.

#### Defined in

external/cow-sdk/src/order-signing/orderSigningUtils.ts:55

___

### signOrderCancellation

▸ **signOrderCancellation**(`orderUid`, `chainId`, `signer`): `Promise`<[`SigningResult`](../modules.md#signingresult)\>

Sign a cancellation message of an order intent with the specified signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderUid` | `string` | The unique identifier of the order to cancel. |
| `chainId` | [`SupportedChainId`](../enums/SupportedChainId.md) | The CoW Protocol `chainid` context that's being used. |
| `signer` | `Signer` | The signer who initially placed the order intent. |

#### Returns

`Promise`<[`SigningResult`](../modules.md#signingresult)\>

Encoded signature including signing scheme for the cancellation.

#### Defined in

external/cow-sdk/src/order-signing/orderSigningUtils.ts:67

___

### signOrderCancellations

▸ **signOrderCancellations**(`orderUids`, `chainId`, `signer`): `Promise`<[`SigningResult`](../modules.md#signingresult)\>

Sign a cancellation message of multiple order intents with the specified signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderUids` | `string`[] | An array of `orderUid` to cancel. |
| `chainId` | [`SupportedChainId`](../enums/SupportedChainId.md) | The CoW Protocol `chainId` context that's being used. |
| `signer` | `Signer` | The signer who initially placed the order intents. |

#### Returns

`Promise`<[`SigningResult`](../modules.md#signingresult)\>

Encoded signature including signing scheme for the cancellation.

#### Defined in

external/cow-sdk/src/order-signing/orderSigningUtils.ts:83
