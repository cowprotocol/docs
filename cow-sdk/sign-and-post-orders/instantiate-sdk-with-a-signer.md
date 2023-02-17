# Instantiate SDK with a signer

Before you can sign any transaction, you have to instantiate the SDK with a [Ethers.JS signer](https://docs.ethers.io/v5/api/signer/):

```typescript
import { Wallet } from 'ethers'
import { CowSdk, OrderKind } from '@cowprotocol/cow-sdk'

const mnemonic = 'fall dirt bread cactus...'
const wallet = Wallet.fromMnemonic(mnemonic)
const cowSdk = new CowSdk(
  4, {              // Leaving chainId empty will default to MAINNET
    signer: wallet  // Provide a signer, so you can sign order
  }) 
```

So know we have a SDK instance liked to our signer. That's great, because now creating orders will be a matter of:

1. **Get Market Prices**: Fee & Price
2. **Sign the order**: Using off-chain signing or Meta-transactions
3. **Post the signed order to the API**: So, the order becomes `OPEN`

Let's start in next section with the first step, getting the Market Price.

***
