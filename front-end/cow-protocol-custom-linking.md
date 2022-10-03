# CoW Protocol Custom Linking

## Query Parameters

The CoW Protocol supports several different interfaces routing orders to it. CoW Swap, the first interface developed on top of CoW Protocol, and such front end supports URL query parameters to allow anyone to create a custom link to that particular front end.

Even though Swap is the main page of the front end, each page can have its own specific URL parameters that can be set, while global parameters are still used on all pages. Keep in mind that if a parameter is used on an incorrect page, this will have no effect on UI settings. Parameters not set with a URL parameter will be set to standard frontend defaults. Global# Parameter Type Description theme String Sets them to dark or light mode.

## Swap Page \#

| Parameter      | Type           | Description                                                        |
| -------------- | -------------- | ------------------------------------------------------------------ |
| inputCurrency  | Address        | Input currency that will be swapped for output currency.           |
| outputCurrency | Address or ETH | Output currency that input currency will be swapped for.           |
| exactAmount    | Number         | The custom token amount to buy or sell.                            |
| exactField     | String         | The field to set custom token amount for. Must be input or output. |

## Example Usage\#

**Sell order:**&#x20;

Input, output, amount

Sell 0.3 WETH for DAI&#x20;

<mark style="color:blue;">https://swap.cow.fi/#/swap?inputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\&outputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f\&exactAmount=0.3</mark>&#x20;

**Buy Order:**&#x20;

Input, output, amount, exactField=output&#x20;

Buy 1500 DAI with WETH&#x20;

<mark style="color:blue;">https://swap.cow.fi/#/swap?inputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\&outputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f\&exactAmount=1500\&exactField=output</mark>
