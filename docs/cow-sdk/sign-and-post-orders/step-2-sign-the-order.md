# STEP 2: Sign the order

Once you know the price and fee, we can create the order and sign it:

* Technically the order is just a signed message with your intent to trade, and contains your `Limit Price` and `Fee`.
* As explained before, you can choose your `Limit Price`, but some general approach is to take the current Market Price and apply some slippage tolerance to it. `Received Amount = Expected Amount * (1 - Slippage Tolerance)`
* The SDK will provide an easy way to sign orders given the raw data

```typescript
import { OrderSigningUtils, OrderKind, SupportedChainId } from '@cowprotocol/cow-sdk'
import { Web3Provider } from '@ethersproject/providers'

const provider = new Web3Provider(window.ethereum)
const signer = provider.getSigner()

const { sellToken, buyToken, validTo, buyAmount, sellAmount, receiver, feeAmount } = quoteResponse.quote

// Prepare the RAW order
const order = {
  kind: OrderKind.SELL, // SELL or BUY  
  receiver, // Your account or any other
  sellToken,
  buyToken,

  partiallyFillable: false, // "false" is for a "Fill or Kill" order, "true" for allowing "Partial execution" which is not supported yet
  // Deadline
  validTo,

  // Limit Price
  //    You can apply some slippage tolerance here to make sure the trade is executed. 
  //    CoW protocol protects from MEV, so it can work with higher slippages
  sellAmount,
  buyAmount, 

  // Use the fee you received from the API
  feeAmount,

  // The appData allows you to attach arbitrary information (meta-data) to the order. Its explained in their own section. For now, you can use this 0x0 value
  appData: '0x0000000000000000000000000000000000000000000000000000000000000000'
}

// Sign the order
const signedOrder = await OrderSigningUtils.signOrder(order, SupportedChainId.MAINNET, signer)
```

At this point, you have a signed order. So next step will be to post it to the API so it's considered by the solvers and executed.

> 📚 Read more about `appData` [here](https://github.com/cowprotocol/app-data)