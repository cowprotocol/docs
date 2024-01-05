---
title: Make custom links
draft: true
---

# Custom Links

[CoW Swap](https://swap.cow.fi) supports URL query parameters to allow anyone to create a custom link for sharing a specific trade with a friend or on social media, or for creating a custom link to a specific trade for your own use.

### Examples

- [`https://swap.cow.fi`](https://swap.cow.fi) - CoW Swap main page (`swap` is default page)
- [`https://swap.cow.fi/#/swap`](https://swap.cow.fi/#/swap) - `swap` page
- [`https://swap.cow.fi/#/limit`](https://swap.cow.fi/#/limit) - `limit` orders page
- [`https://swap.cow.fi/#/100/swap`](https://swap.cow.fi/#/100/swap) - `swap` page on Gnosis chain network
- [`https://swap.cow.fi/#/100/limit/WXDAI/COW`](https://swap.cow.fi/#/100/limit/WXDAI/COW) - Create a `limit` order to sell `WXDAI` for `COW`
- [`https://swap.cow.fi/#/1/swap/WETH/COW?sellAmount=100`](https://swap.cow.fi/#/1/swap/WETH/COW?sellAmount=100) - Swap `100 WETH` for `COW`
- [`https://swap.cow.fi/#/100/limit/WETH/WXDAI?sellAmount=2&buyAmount=6000`](https://swap.cow.fi/#/100/limit/WETH/WXDAI?sellAmount=2&buyAmount=6000) - Create a limit order to sell `2 WETH` for `6000 WXDAI`

## Query Parameters

Even though the main page is `swap`, each page has it's own specific URL parameters that can be set, in addition to global parameters that are used on all pages. Parameters not applicable to a page will have no effect on UI settings.

Fortunately, the `swap` and `limit` pages have the same URL query parameters!

### URL links format

#### Swap

`https://swap.cow.fi/#/<chainId>/swap/<sellTokenSymbolOrAddress>/<buyTokenSymbolOrAddress>?recipient=<recipient>&sellAmount=<sellAmount>&buyAmount=<buyAmount>`

#### Limit

`https://swap.cow.fi/#/<chainId>/limit/<sellTokenSymbolOrAddress>/<buyTokenSymbolOrAddress>?recipient=<recipient>&sellAmount=<sellAmount>&buyAmount=<buyAmount>`

### Global parameters

| **Parameter** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `theme` | String | (determined by browser) | Sets theme to `dark` or `light` mode. |

### Swap / limit parameters

:::note

All parameters are optional. If a parameter is not set, the default value will be used.

:::

| **Parameter** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `chainId` | Integer | `1` - Ethereum Mainnet | [Supported blockchains](/cow-protocol/reference/contracts/core#deployments) |
| `sellTokenSymbolOrAddress` | Token `symbol` or `address` | Wrapped native token symbol for the current network (for Mainnet: `WETH`) | Sell token `symbol` or `address` |
| `buyTokenSymbolOrAddress` | Token `symbol` or `address` |  | Buy token `symbol` or `address` |
| `recipient` | `address` | `undefined` | Valid Ethereum account address |
| `sellAmount` | Integer or Float | `undefined` | Amount of sell token to sell |
| `buyAmount` | Integer or Float | `undefined` | Amount of buy token to buy |

:::caution

Only one of `sellAmount` or `buyAmount` can be set for the `swap` page. If both are set, only `sellAmount` will be used.

:::

:::note Wrapped native token

Each chain has a native token and it's wrapped version. Native tokens are needed to pay any applicable transaction fees.

Native and wrapped tokens per chain:

- Ethereum Mainnet: [`WETH`](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) - wrapped `ETH`
- Gnosis chain: [`WXDAI`](https://gnosisscan.io/address/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d) - wrapped `XDAI`
- Görli: [`WETH`](https://goerli.etherscan.io/address/0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6) - wrapped `ETH`
- Sepolia: [`WETH`](https://sepolia.etherscan.io/address/0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14) - wrapped `ETH`

:::
