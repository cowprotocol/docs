---
title: 'CoW Swap deeplinks: swaps and limit orders'
sidebar_label: Create trade deeplinks
description: Create CoW Swap limit-order deeplinks from natural-language requests, with price conversion, exact-buy and exact-sell examples, token units, and supported settings.
---

# CoW Swap deeplinks: swaps and limit orders {#custom-links}

Create prefilled [CoW Swap](https://swap.cow.fi) trade links for swaps and limit orders.
A link opens a form. It does not sign or place an order.

## More link examples {#examples}

- [`https://swap.cow.fi`](https://swap.cow.fi) - CoW Swap main page (`swap` is default page)
- [`https://swap.cow.fi/#/swap`](https://swap.cow.fi/#/swap) - `swap` page
- [`https://swap.cow.fi/#/limit`](https://swap.cow.fi/#/limit) - `limit` orders page
- [`https://swap.cow.fi/#/100/swap`](https://swap.cow.fi/#/100/swap) - `swap` page on Gnosis chain network
- [`https://swap.cow.fi/#/100/limit/WXDAI/COW`](https://swap.cow.fi/#/100/limit/WXDAI/COW) - Create a `limit` order to sell `WXDAI` for `COW`
- [`https://swap.cow.fi/#/1/swap/WETH/COW?sellAmount=100`](https://swap.cow.fi/#/1/swap/WETH/COW?sellAmount=100) - Swap `100 WETH` for `COW`
- [`https://swap.cow.fi/#/1/swap/WETH/COW?buyAmount=10000&recipient=vitalik.eth`](https://swap.cow.fi/#/1/swap/WETH/COW?buyAmount=10000&recipient=vitalik.eth) - Buy on `swap` sending the outcome to a custom recipient (can be either address or ens)
- [`https://swap.cow.fi/#/100/limit/WETH/WXDAI?sellAmount=2&buyAmount=6000`](https://swap.cow.fi/#/100/limit/WETH/WXDAI?sellAmount=2&buyAmount=6000) - Create a limit order to sell `2 WETH` for `6000 WXDAI`

## Query Parameters

The default page is `swap`. The `swap` and `limit` pages accept amount and recipient parameters.
Limit-order links also use `orderKind` to distinguish exact-sell and exact-buy orders.
Unsupported parameters do not configure form settings.

### URL links format

#### Swap

`https://swap.cow.fi/#/<chainId>/swap/<sellTokenSymbolOrAddress>/<buyTokenSymbolOrAddress>?recipient=<recipient>&sellAmount=<sellAmount>&buyAmount=<buyAmount>`

#### Limit

`https://swap.cow.fi/#/<chainId>/limit/<sellTokenSymbolOrAddress>/<buyTokenSymbolOrAddress>?recipient=<recipient>&sellAmount=<sellAmount>&buyAmount=<buyAmount>&orderKind=<sell|buy>`

### Global parameters

| **Parameter** | **Type** | **Default**             | **Description**                       |
| ------------- | -------- | ----------------------- | ------------------------------------- |
| `theme`       | String   | (determined by browser) | Sets theme to `dark` or `light` mode. |

### Swap / limit parameters

:::note

The app accepts partial links and uses defaults for omitted fields.
For a complete limit-order request, supply the chain, token pair, both amounts, and order kind.

:::

| **Parameter**              | **Type**                    | **Default**                                                               | **Description**                                                             |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `chainId`                  | Integer                     | `1` - Ethereum Mainnet                                                    | [Supported blockchains](/cow-protocol/reference/contracts/core#deployments) |
| `sellTokenSymbolOrAddress` | Token `symbol` or `address` | Wrapped native token symbol for the current network (for Mainnet: `WETH`) | Sell token `symbol` or `address`                                            |
| `buyTokenSymbolOrAddress`  | Token `symbol` or `address` |                                                                           | Buy token `symbol` or `address`                                             |
| `recipient`                | `address`                   | `undefined`                                                               | Recipient address or ENS name. URL-encode the value.                        |
| `sellAmount`               | Integer or Float            | `undefined`                                                               | Sell-token amount in human units                                            |
| `buyAmount`                | Integer or Float            | `undefined`                                                               | Buy-token amount in human units                                             |
| `orderKind`                | `sell` or `buy`             | `sell` when both amounts are supplied                                     | For limit orders: fixes the sell amount or buy amount, respectively.        |

:::caution

Only one of `sellAmount` or `buyAmount` can be set for the `swap` page. If both are set, only `sellAmount` will be used.

:::

:::note Wrapped native token

Each chain has a native token and it's wrapped version. Native tokens are needed to pay any applicable transaction fees.

Native and wrapped tokens per chain:

- Ethereum Mainnet: [`WETH`](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) - wrapped `ETH`
- Gnosis chain: [`WXDAI`](https://gnosisscan.io/address/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d) - wrapped `XDAI`
- Arbitrum one: [`WETH`](https://arbiscan.io/address/0x82af49447d8a07e3bd95bd0d56f35241523fbab1) - wrapped `ETH`
- Base: [`WETH`](https://basescan.org/address/0x4200000000000000000000000000000000000006) - wrapped `ETH`
- Avalanche: [`WAVAX`](https://snowscan.xyz/address/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7) - wrapped `AVAX`
- Polygon: [`WPOL`](https://polygonscan.com/address/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270) - wrapped `POL`
- BNB: [`WBNB`](https://bscscan.com/address/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c) - wrapped `BNB`
- Linea: [`WETH`](https://lineascan.build/token/0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f) - wrapped `ETH`
- Plasma: [`WXPL`](https://plasmascan.to/token/0x6100E367285b01F48D07953803A2d8dCA5D19873) - wrapped `XPL`
- Ink: [`WETH`](https://explorer.inkonchain.com/token/0x4200000000000000000000000000000000000006) - wrapped `ETH`
- Sepolia: [`WETH`](https://sepolia.etherscan.io/address/0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14) - wrapped `ETH`

:::

## Create a limit-order deeplink

### Build the URL

The query parameters belong after the hash route.
Ethereum mainnet uses chain ID `1`. Gnosis Chain uses `100`.
Other chain IDs appear in the [supported blockchain deployments](/cow-protocol/reference/contracts/core#deployments).

`sellAmount` and `buyAmount` use human token units, not integer base units.
For example, `sellAmount=0.125` means 0.125 sell tokens, regardless of the token's decimal count.
Use positive decimal amounts without thousands separators.
For complete limit-order links, supply both amounts and an explicit `orderKind`.

| Request              | `sellAmount`       | `buyAmount`          | `orderKind` |
| -------------------- | -------------------- | ---------------------- | ----------- |
| Sell an exact amount | Fixed sell amount    | Minimum receive amount | `sell`      |
| Buy an exact amount  | Maximum spend amount | Fixed buy amount       | `buy`       |

With both amounts supplied, `orderKind` defaults to `sell`.

### Convert the price into amounts

Deeplinks accept token amounts, not a price.
Convert the limit price into the minimum receive or maximum spend amount.

#### Exact-sell example

Request: “On Ethereum, sell exactly 4 WETH for USDC at a minimum of 2,500 USDC per WETH.”

The minimum receive amount is `4 × 2500 = 10000 USDC`.

[Open the exact-sell limit order](https://swap.cow.fi/#/1/limit/WETH/USDC?sellAmount=4&buyAmount=10000&orderKind=sell)

#### Exact-buy example

Request: “On Ethereum, buy exactly 4 WETH with USDC, paying at most 2,500 USDC per WETH.”

The maximum spend amount is `4 × 2500 = 10000 USDC`.
The sell token is USDC. The buy token is WETH.

[Open the exact-buy limit order](https://swap.cow.fi/#/1/limit/USDC/WETH?sellAmount=10000&buyAmount=4&orderKind=buy)

If the price uses reverse units, divide the fixed amount by that price instead of multiplying.
Preserve the requested precision and the minimum receive or maximum spend bound.

### Expiry and partial fills

The limit-order deeplink format does not support expiry or partial-fill settings.
Parameters such as `validTo` and `partiallyFillable` do not configure these settings.

Configure expiry and partial-fill settings manually in CoW Swap.

### Review and share

Before signing, review the chain, token addresses, amounts, order kind, recipient, expiry, and partial-fill settings in the form.
Opening a link does not guarantee that the requested fields applied or that the order will fill.

CoW Swap can remove amount and order-kind parameters from the address bar after it consumes them.
Share the original generated URL to preserve the requested trade fields.

## Tips for AI agents

- If the chain or price bound is missing, ask for it. Do not assume Ethereum or substitute a market quote.
- If a token symbol is ambiguous, ask for its address or resolve it from reliable sources for the requested chain.
  Preserve supplied addresses and native or wrapped token choices.
- If the request includes expiry or partial fills, explain that those settings require manual setup in CoW Swap.
  Do not invent URL parameters or claim the link applies those settings.
