# User and ETH Flow Contract Orders

Every ETH sell order from a user ("user order") will have a unique associated order in the eth-flow contract ("contract order").

This order will be implicitly created when the user deposits ETH.

For simplicity, both orders will have the same representation that is used for settlement orders, but eth-flow order have slightly different parameters in the contract (for example, there is no need to specify a sell token since it's assumed to be WETH).

The next table describes how to convert a user order into a contract order.

Note that what is described here as a user order is not a valid order for the settlement contract. It represents the data used by the eth-flow contract for bookkeeping. The contract order will be the one to be executed.

<table data-header-hidden><thead><tr><th>Parameter</th><th>User</th><th>Contract</th><th data-hidden></th></tr></thead><tbody><tr><td>sellToken</td><td>ETH</td><td>WETH</td><td>Comment</td></tr><tr><td>buyToken</td><td>any</td><td>same as user</td><td> </td></tr><tr><td>receiver</td><td>any except 0x0..0</td><td>same as user</td><td>Removing 0x0..0 because the receiver must be explicit. Using the zero address would imply a change of the receiver in the conversion.</td></tr><tr><td>sellAmount</td><td>any</td><td>same as user</td><td> </td></tr><tr><td>buyAmount</td><td>any</td><td>same as user</td><td> </td></tr><tr><td>validTo</td><td>any</td><td>infinity</td><td>It needs to be infinity because we rely on filledAmount in the exchange contract, which could be cleared by freeFilledAmountStorage.</td></tr><tr><td>appData</td><td>any</td><td>same as user</td><td> </td></tr><tr><td>feeAmount</td><td>any</td><td>same as user</td><td> </td></tr><tr><td>kind</td><td>sell</td><td>sell</td><td>This setup doesn't work well for BUY orders as the (small) ETH leftovers would be left in the eth-flow contract and it wouldn't be worth it in general to spend the gas to withdraw.</td></tr><tr><td>partiallyFillable</td><td>any</td><td>same as user</td><td>Supporting partially fillable orders with replacement makes things more complicated, but it should be possible.</td></tr><tr><td>sellTokenBalance</td><td>external</td><td>external</td><td>Probably we could make internal Balancer balances work as well, but I consider this low prio and didn't think about it.</td></tr><tr><td>buyTokenBalance</td><td>external</td><td>external</td><td>↑</td></tr></tbody></table>

