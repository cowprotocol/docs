# Getting Started with the SDK



Install the SDK:

```markup
yarn add @cowprotocol/cow-sdk
```

Instantiate the SDK:

```markdown
import { CowSdk } from '@cowprotocol/cow-sdk'

const chainId = 4 // Rinkeby
const cowSdk = new CowSdk(chainId)
```

The SDK will expose:

* The CoW API (`cowSdk.cowApi`)
* The CoW Subgraph (`cowSdk.cowSubgraphApi`)
* Convenient method to facilitate signing orders (i.e `cowSdk.signOrder`)

> 💡 For a quick snippet with the full process on posting an order see the [Post an Order Example](https://github.com/cowprotocol/cow-sdk/blob/e086d9edeb24b25bb873a11c462019fa1ea4c021/docs/post-order-example.ts)

Now you should have a ready to use SDK instance. Let's explore in the next section, how we can use it to query the CoW API.
