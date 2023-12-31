---
draft: true
---

# Permit and Bridge

Instead of just talking about this shiny new feature, let's see it in action! In this post, we will provide some sample code for integrating CoW Protocol and making the most out of CoW Hooks.

This section will give you a walkthrough of the requirements & configurations needed for creating and executing CoW Hooks, finishing off with a [real live example of CoW Hooks](https://docs.cow.fi/overview/cow-hooks/cow-hooks-example/permit-swap-and-bridge-cow-hook).

### Requirements

The sample code shared in this post will assume that you have a recent version of [Deno](https://gist.github.com/) installed. This is just an alternative to JavaScript runtime to NodeJS with some great security features (such as fine-grained access control).

```
% deno --version
deno 1.34.3 (release, aarch64-apple-darwin)
v8 11.5.150.2
typescript 5.0.4
```

### Configuration

First things first, we need to configure some required user-specific things:

- A URL of an Ethereum node to connect to
- The private key of the account to trade

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

# Permit, Swap & Bridge CoW Hook

Now that we have the setup out of the way, lets make use of CoW Hooks to set up an order that, when executed will:

1. Set the required token approval to CoW Protocol - this allows the user to trade regardless of whether or not they have Ether to execute the approval transaction themselves and so that the approval is only set if the order were to execute (no reason to pay for an approval that doesn't get used amirite?). Note that this requires a token that has EIP-2612 permit support (such as COW, USDC, and DAI; many modern tokens support this).
2. Bridges the resulting trade proceeds to Gnosis Chain

## EIP-2612 Permit

The next order of business is to compute the pre-hook for setting the required approval of the CoW Protocol Vault Relayer contract.

For this, we make use of EIP-2612 permit. This EIP defines an extension for ERC-20 tokens that allows any account to set ERC-20 approvals on behalf of another with an off-chain signature. In other words, we can sign with an off-chain signature permission for anyone to set a single approval to CoW Protocol for us. This signature can be used in a pre-hook so that a solver can execute the approval on your behalf only if your order were to trade.

Let's compute the `permit` parameters and sign them:

```javascript
const permit = {
  owner: wallet.address,
  spender: VAULT_RELAYER.address,
  value: orderParams.sellAmount,
  nonce: await USDC.nonces(wallet.address),
  deadline: ethers.constants.MaxUint256,
};
const permitSignature = ethers.utils.splitSignature(
  await wallet._signTypedData(
    {
      name: await USDC.name(),
      version: await USDC.version(),
      chainId,
      verifyingContract: USDC.address,
    },
    {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    permit,
  ),
);
```

And finally, we can build our `permit` pre-hook:

```javascript
const permitParams = [
  permit.owner,
  permit.spender,
  permit.value,
  permit.deadline,
  permitSignature.v,
  permitSignature.r,
  permitSignature.s,
];
const permitHook = {
  target: USDC.address,
  callData: USDC.interface.encodeFunctionData("permit", permitParams),
  gasLimit: `${await USDC.estimateGas.permit(...permitParams)}`,
};
```

## Token Bridging

<UnauditedCaution />

### On-chain

Now, we want to add a post-hook to bridge the funds that we receive from trading over to Gnosis Chain.

Unfortunately, bridging contracts aren't designed with this use-case in mind. In particular, the hooks are called from an unprivileged context (specifically, the settlement will "trampoline" the user-specified hooks over an intermediary contract as a security measure):

<figure><img src="../../../img/image.png" alt="" /><figcaption></figcaption></figure>

The existing Gnosis Chain `Omnibridge` contract takes tokens for bridging from `msg.sender`, so we need to design an on-chain contract to temporarily hold the funds for the bridging process. Fortunately, this is very easy to do:

```solidity
contract BridgeAccount {
    address public immutable user;
    address public immutable omnibridge;

    constructor(address user_, address omnibridge_) {
        user = user_;
        omnibridge = omnibridge_;
    }

    function bridge(address token, uint256 amount) external {
        IERC20(token).approve(omnibridge, amount);
        IOmnibridge(omnibridge).relayTokens(token, user, amount);
    }

    function withdraw(address token, uint256 amount) external {
        IERC20(token).transfer(user, amount);
    }
}
```

This contract works by deploying a per-user "bridging account", where funds deposited can only be bridged to the user, or withdrawn back to the user, keeping the funds safe!

> Note that there are no on-chain guarantees that order hooks will get executed as part of a settlement. These are guaranteed by off-chain protocol rules where damages will be taken from solver bonding pools (which sets an upper bound for how much in funds is protected). Keep this in mind as you design your hooks.

In addition to this contract, we also create a `Bridger` factory contract that deploys accounts per user and makes bridging with hooks easier. For the full source code, see [`[contracts/Bridger.sol]`](https://etherscan.io/address/0xe71ccc8d4e0a298e1300a702ad0ac93303dc8ae5#code).

This can be extended to allow for bridging to different receivers, this is left as an exercise to the reader

### Off-chain

Now that we have our bridging intermediary contract, we can generate the hook for bridging the funds received from trading.

This is a walk in the park, just compute the receiver address and generate data for the hook:

```javascript
orderConfig.receiver = await BRIDGER.getAccountAddress(wallet.address);
const bridgeHook = {
  target: BRIDGER.address,
  callData: BRIDGER.interface.encodeFunctionData("bridgeAll", [
    wallet.address,
    COW.address,
  ]),
  // Approximate gas limit determined with Tenderly.
  gasLimit: "228533",
};
```

## Order Creation

Now that we have our hooks set up, it is time to create our order!

First, we need to include our hooks in the order's `appData`. Hooks are specified as part of [`appData` documents](https://docs.cow.fi/front-end/creating-app-ids)[ ](https://docs.cow.fi/front-end/creating-app-ids/create-the-order-meta-data-file/additional-order-preferences)in order to ensure that hook preferences are signed by the order:

```javascript
orderConfig.appData = JSON.stringify({
  metadata: {
    hooks: {
      pre: [permitHook],
      post: [bridgeHook],
    },
  },
});
```

Now, lets get a quote for our order:

```javascript
const { id: quoteId, quote } = await fetch(
  "https://barn.api.cow.fi/mainnet/api/v1/quote",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: wallet.address,
      sellAmountBeforeFees: orderConfig.sellAmount,
      ...orderConfig,
    }),
  },
).then((response) => response.json());
console.log("quote:", quoteId, quote);
```

Note that the API will compute a `feeAmount` that takes the hook gas amounts into account. This means that gas for the `permit` and bridging transactions are paid in the sell token only if (and when) the order executes! Account abstraction at its finest 😄.

Now all we need to do is sign the order:

```javascript
const orderData = {
  ...orderConfig,
  sellAmount: quote.sellAmount,
  buyAmount: `${ethers.BigNumber.from(quote.buyAmount).mul(99).div(100)}`,
  validTo: quote.validTo,
  appData: ethers.utils.id(orderConfig.appData),
  feeAmount: quote.feeAmount,
};
const orderSignature = await wallet._signTypedData(
  {
    name: "Gnosis Protocol",
    version: "v2",
    chainId,
    verifyingContract: SETTLEMENT.address,
  },
  {
    Order: [
      { name: "sellToken", type: "address" },
      { name: "buyToken", type: "address" },
      { name: "receiver", type: "address" },
      { name: "sellAmount", type: "uint256" },
      { name: "buyAmount", type: "uint256" },
      { name: "validTo", type: "uint32" },
      { name: "appData", type: "bytes32" },
      { name: "feeAmount", type: "uint256" },
      { name: "kind", type: "string" },
      { name: "partiallyFillable", type: "bool" },
      { name: "sellTokenBalance", type: "string" },
      { name: "buyTokenBalance", type: "string" },
    ],
  },
  orderData,
);
```

And submit it to the API:

```javascript
const orderUid = await fetch("https://barn.api.cow.fi/mainnet/api/v1/orders", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    ...orderData,
    from: wallet.address,
    appData: orderConfig.appData,
    appDataHash: orderData.appData,
    signingScheme: "eip712",
    signature: orderSignature,
    quoteId,
  }),
}).then((response) => response.json());
console.log("order:", orderUid);
```

## Ready, Action

![](https://youtu.be/FT36lWtC1Oc)

[Here](https://explorer.cow.fi/orders/0xa4a6be09da793762bbeb8e55d1641c52c83e5a441388f5578f7038ab6c4073b4d0a3a35ddce358bfc4f706e6040c17a50a2e3ba564a7e172?tab=overview) is the demo executed order on Mainnet. As you can see from the [transaction](https://etherscan.io/tx/0x5c7f61a9364efdc841d680be88c0bd33ab6609b518f9c62df04e26fa356c57ac#eventlog), the USDC approval to CoW Protocol was set just-in-time for the swap to happen, and the trade proceeds were sent to the Omnibridge so that the bridging of the COW tokens that were received was initiated.

[Here](https://gnosisscan.io/tx/0x9979234fb3b5416c6413f75374cbe79354bcc212fa82fb5537506afcc1693f3c) are the relayed COW tokens to the same address on Gnosis Chain.

Here is the complete code listing for the script that was used for creating the order.

- `index.js`

```javascript
import { ethers } from "https://unpkg.com/ethers@5.7.2/dist/ethers.esm.js";

/*** Configuration ***/

const provider = new ethers.providers.JsonRpcProvider(Deno.env.get("NODE_URL"));
const wallet = new ethers.Wallet(Deno.env.get("PRIVATE_KEY"), provider);

const { chainId } = await provider.getNetwork();
console.log(`connected to chain ${chainId} with account ${wallet.address}`);

/*** Contracts ***/

const SETTLEMENT = new ethers.Contract(
  "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
  [],
  provider,
);

const VAULT_RELAYER = new ethers.Contract(
  "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110",
  [],
  provider,
);

const COW = new ethers.Contract(
  "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB",
  [],
  provider,
);

const USDC = new ethers.Contract(
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [
    `
      function decimals() view returns (uint8)
    `,
    `
      function name() view returns (string)
    `,
    `
      function version() view returns (string)
    `,
    `
      function nonces(address owner) view returns (uint256)
    `,
    `
      function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
      )
    `,
  ],
  provider,
);

const BRIDGER = new ethers.Contract(
  "0xE71CcC8d4e0a298E1300a702ad0Ac93303dc8Ae5",
  [
    `
      function getAccountAddress(address user) view returns (address)
    `,
    `
      function bridgeAll(address user, address token)
    `,
  ],
  provider,
);

/*** Order Configuration ***/

const orderConfig = {
  sellToken: USDC.address,
  buyToken: COW.address,
  sellAmount: `${ethers.utils.parseUnits("200.0", await USDC.decimals())}`,
  kind: "sell",
  partiallyFillable: false,
  sellTokenBalance: "erc20",
  buyTokenBalance: "erc20",
};

/*** EIP-2612 Permit ***/

const permit = {
  owner: wallet.address,
  spender: VAULT_RELAYER.address,
  value: orderConfig.sellAmount,
  nonce: await USDC.nonces(wallet.address),
  deadline: ethers.constants.MaxUint256,
};
const permitSignature = ethers.utils.splitSignature(
  await wallet._signTypedData(
    {
      name: await USDC.name(),
      version: await USDC.version(),
      chainId,
      verifyingContract: USDC.address,
    },
    {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    permit,
  ),
);
const permitParams = [
  permit.owner,
  permit.spender,
  permit.value,
  permit.deadline,
  permitSignature.v,
  permitSignature.r,
  permitSignature.s,
];
const permitHook = {
  target: USDC.address,
  callData: USDC.interface.encodeFunctionData("permit", permitParams),
  gasLimit: `${await USDC.estimateGas.permit(...permitParams)}`,
};
console.log("permit hook:", permitHook);

/*** Bridging ***/

orderConfig.receiver = await BRIDGER.getAccountAddress(wallet.address);
const bridgeHook = {
  target: BRIDGER.address,
  callData: BRIDGER.interface.encodeFunctionData("bridgeAll", [
    wallet.address,
    COW.address,
  ]),
  // Approximate gas limit determined with Tenderly.
  gasLimit: "228533",
};
console.log("bridge hook:", bridgeHook);

/*** Order Creation ***/

orderConfig.appData = JSON.stringify({
  metadata: {
    hooks: {
      pre: [permitHook],
      post: [bridgeHook],
    },
  },
});
const { id: quoteId, quote } = await fetch(
  "https://barn.api.cow.fi/mainnet/api/v1/quote",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: wallet.address,
      sellAmountBeforeFee: orderConfig.sellAmount,
      ...orderConfig,
    }),
  },
).then((response) => response.json());
console.log("quote:", quoteId, quote);

const orderData = {
  ...orderConfig,
  sellAmount: quote.sellAmount,
  buyAmount: `${ethers.BigNumber.from(quote.buyAmount).mul(99).div(100)}`,
  validTo: quote.validTo,
  appData: ethers.utils.id(orderConfig.appData),
  feeAmount: quote.feeAmount,
};
const orderSignature = await wallet._signTypedData(
  {
    name: "Gnosis Protocol",
    version: "v2",
    chainId,
    verifyingContract: SETTLEMENT.address,
  },
  {
    Order: [
      { name: "sellToken", type: "address" },
      { name: "buyToken", type: "address" },
      { name: "receiver", type: "address" },
      { name: "sellAmount", type: "uint256" },
      { name: "buyAmount", type: "uint256" },
      { name: "validTo", type: "uint32" },
      { name: "appData", type: "bytes32" },
      { name: "feeAmount", type: "uint256" },
      { name: "kind", type: "string" },
      { name: "partiallyFillable", type: "bool" },
      { name: "sellTokenBalance", type: "string" },
      { name: "buyTokenBalance", type: "string" },
    ],
  },
  orderData,
);

const orderUid = await fetch("https://barn.api.cow.fi/mainnet/api/v1/orders", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    ...orderData,
    from: wallet.address,
    appData: orderConfig.appData,
    appDataHash: orderData.appData,
    signingScheme: "eip712",
    signature: orderSignature,
    quoteId,
  }),
}).then((response) => response.json());
console.log("order:", orderUid);
```

# Conclusion

With CoW Hooks, the sky (or rather the MOOn) is the limit! There are many use cases which can now be fully automated with CoW Protocol orders thanks to hooks. Kickstarting some CoWMOOnity creativity: you can set up an order to un-stake a token with a pre-hook, swap it to a different token, then stake the newly received tokens. This allows you to maximize yields, and never hold any un-staked tokens while swapping.

Happy hooking!