# CoW Protocol Custom Linking

## Query Parameters

The **CoW Protocol** supports several different interfaces routing orders to it. **CoW Swap**, is the first interface developed on top of CoW Protocol, and the main protocol interface providing the best UI and UX. Here you will find two interfaces for trading: Swap and Limit orders, such front end supports URL query parameters to allow anyone to create a custom link to that particular front end.

Even though Swap is the main page of the front end, each page can have its own specific URL parameters that can be set, while global parameters are still used on all pages. Keep in mind that if a parameter is used on an incorrect page, this will have no effect on UI settings. Parameters not set with a URL parameter will be set to standard frontend defaults. Global# Parameter Type Description theme String Sets them to dark or light mode.

Since you can use Swap or Limit orders, both of them use the same URL format, with which you can specify all the necessary parameters, such as: network id, assets for trading, recipient address, amount to sell or buy.

_**Parameters not set with the URL parameter will be set by default.**_

### URL links format

#### Swap

https://swap.cow.fi/#/networkId/swap/sellCurrencyId/buyCurrencyId?recipient=0x000...000\&sellAmount=5000.205\&buyAmount=325.65

#### Limit orders

https://swap.cow.fi/#/networkId/limit/sellCurrencyId/buyCurrencyId?recipient=0x000...000\&sellAmount=5000.205\&buyAmount=325.65

### Parameters

All parameters are optional.

[https://swap.cow.fi](https://swap.cow.fi/#/1/swap/WETH?utm\_source=docs.cow.fi\&utm\_medium=web\&utm\_content=custom-linking-page) - CoW Swap URL

| Parameter        | Type                       | Default                                                                      | Description                                                                                                                                                                                                                                                               |
| ---------------- | -------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `networkId`      | Number                     | `1` - Ethereum Mainnet                                                       | Each network has a unique identifier, represented as an integer. Currently CoW Swap supports these networks: Ethereum Mainnet (networkId: `1`), Gnosis chain (networkId: `100`), Görli (networkId: `5`)                                                                   |
| `sellCurrencyId` | Currency address or symbol | Wrapped native currency symbol for the current network (for Mainnet: `WETH`) | Currency to sell. An address or a symbol can be specified. For example: `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` or `WETH`. Read below to understand what `Wrapped native currency` is.                                                                               |
| `buyCurrencyId`  | Currency address or symbol |                                                                              | Currency to buy. An address or a symbol can be specified. For example: `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` or `WETH`.                                                                                                                                            |
| `recipient`      | Address                    |                                                                              | Valid Ethereum account address.                                                                                                                                                                                                                                           |
| `sellAmount`     | Integer or Float           |                                                                              | Amount of currency to be sold. For example: `56000.201`                                                                                                                                                                                                                   |
| `buyAmount`      | Integer or Float           |                                                                              | Amount of currency to buy. For example: `1208`. Important: only one of `sellAmount` or `buyAmount` can be set for Swap. If both are set, only `sellAmount` will be used. In case of Limit orders, you can set both values and the price will be calculated automatically. |

## Wrapped native currency

Each network has a native currency and it's wrapped version. Native currency is needed to pay transaction fees.

Native and wrapped currencies per network:
- Ethereum Mainnet: **WETH** - wrapped ETH
- Gnosis chain: **WXDAI** - wrapped XDAI
- Görli: **WETH** - wrapped ETH

## Example Usage

* https://swap.cow.fi - CoW Swap main page (Swap is default)
* https://swap.cow.fi/#/swap - Swap page
* https://swap.cow.fi/#/limit - Limit orders page
* https://swap.cow.fi/#/5/swap - Swap page on Görli network
* https://swap.cow.fi/#/100/limit - Limit orders page on Gnosis chain network
* https://swap.cow.fi/#/1/swap/COW/WETH - Swap `COW` to `WETH`
* https://swap.cow.fi/#/100/limit/WXDAI/COW - Create a limit order to sell `WXDAI` for `COW`
* https://swap.cow.fi/#/1/swap/COW/WETH?sellAmount=100 - Swap `100 COW` for `WETH` (by current market price)
* https://swap.cow.fi/#/100/limit/WETH/WXDAI?sellAmount=2\&buyAmount=6000 - Create a limit order to sell `2 WETH` for `6000 WXDAI`
