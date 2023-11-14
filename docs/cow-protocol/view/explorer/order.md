---
sidebar_position: 1
draft: true
---

# By order

A user may want to see the details of a specific order that they have placed. They can search for this order by its unique identifier, the `orderUid`. This identifier is returned when an order is placed and can be used to query the details of the order.

:::note

For brevity, the `orderUid` is referred to as "Order ID" in the explorer, and is shortened to the first 8 characters of the `orderUid`.

:::

Below is a simple example of Order ID [`56ac15a9`](https://explorer.cow.fi/orders/0x56ac15a9dd943743936e29d45e836e87de20b69ee32481338588922b5cc9ee4a04d84e1d86cfad5ffea5e9ab833276481bf965e46322d6ea) that has been filled:

![Order overview](/img/explorer/order_overview.png)

<details close>
    <summary>Understanding order details</summary>

| **Field** | **Description** |
|---|---|
| **Order ID** | The first 8 characters of the `orderUid` for the submitted order.  |
| **From** | The account address which signed the order. |
| **To** | The account address which will/did receive the bought amount. |
| **Transaction hash** | The on-chain settlement transaction for this order (only applicable when Status is `Filled` and not partially fillable). Can be viewed on Etherscan. |
| **Status** | The order status is either `Open`, `Filled`, `Expired` or `Cancelled`. |
| **Submission time** | The date and time at which the order was submitted. The timezone is based on the browser locale settings. |
| **Expiration time** | The date and time at which an order will expire and effectively be cancelled. Depending on the type of order, it may have partial fills upon expiration. |
| **Type** | CoW Protocol supports three types of orders - `Market`, `Limit` and `Liquidity`. May be further classed `Fill or Kill` or `Partial execution`. |
| **Amount** | The total sell and buy amount for this order. Sell amount includes the fee. |
| **Limit price** | The limit price is the price at which this order shall be (partially) filled, in combination with the specified slippage. The fee is already deducted from the sell amount. |
| **Execution price** | The actual price at which this order has been matched and executed, after deducting fees from the amount sold. |
| **Order surplus** | The (averaged) surplus for this order. This is the positive difference between the initial limit price and the actual (average) execution price. |
| **Filled** | Indicates what percentage amount this order has been filled and the amount sold/bought. Amount sold includes the fee. |
| **Fees** | The amount of fees paid for this order. This will show a progressive number for orders with partial fills. |
| **App Data** | The AppData hash for this order. It can denote encoded metadata with info on the app, environment and more, although not all interfaces follow the same pattern. Show more will try to decode that information. |

</details>

A more complex example may be a user who has placed a _partially fillable_ order. This means that the user has expressed a swap intent for a certain amount of tokens, but the order may be filled in multiple batches. This can only be used with `Limit` orders.

![Partially fillable order overview](/img/explorer/order_partial_overview.png)

![Partially fillable order fills](/img/explorer/order_partial_fills.png)


#### States

As CPE is meant to help users visualize meta transactions (signed orders), a critical parameter to show is the State of the signed order. This parameter has the following status:

- **Open** (pending)**:** State for a standing order. Orders in this state are being considered by the solvers. It is the entry state for all orders, the default from the moment the order is placed. From here the order can transition to all other states
- **Filled:** State for an executed/settled order. Orders in this state have been executed and the corresponding funds transferred to the target account. Orders in this state will have available a link to the corresponding Etherscan settlement transaction. This settlement transaction would contain your order's execution and any other orders that are part of the same batch.
- **Expired:** State for orders that have not been executed. Orders in this state have not been executed during the defined expiration time (20 min by default).
- **Cancelled:** State for orders that have been cancelled. Orders in this state have been cancelled as per user request.

#### Surplus

All the Orders placed on CoW Protocol are essentially limit orders behind the scenes. When a user signs an order to trade it accepts the following:

- the sell and buy tokens they want to trade,
- the minimum price they are willing to receive,
- the slippage tolerance they have,
- the fee that is taken by the protocol and,
- how long is the order valid for.

Through Batch Auctions and CoWs (Coincidence of Wants), the protocol can improve on the minimum price that has been shown to the user. That improvement is called _"Surplus"_, and it measures how much better your actual trade price was as opposed to your original limit order price.

#### Prices

As mentioned before, CoW Protocol has the capability of offering users a better price than the limit price that they signed their orders with. Therefore, CoW Protocol has two different prices to take into account, these are:

- **Limit price:** The price set when the order was placed (minus the slippage) & signed. This is the minimum price that you will receive.
- **Execution price:** The actual price the order was executed at. This parameter can only be equal to or better than the limit price.
