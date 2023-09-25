# Configuration

First things first, we need to configure some required user-specific things:

* A URL of an Ethereum node to connect to
* The private key of the account to trade

```
# Configure the following values...
export NODE_URL="...";
export PRIVATE_KEY="...";
```

```javascript
import { ethers } from "https://unpkg.com/ethers@5.7.2/dist/ethers.esm.js";

const provider = new ethers.providers.JsonRpcProvider(Deno.env.get("NODE_URL"));
const wallet = new ethers.Wallet(Deno.env.get("PRIVATE_KEY"), provider);

const { chainId } = await provider.getNetwork();
console.log(`connected to chain ${chainId} with account ${wallet.address}`);
```
