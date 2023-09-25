# Additional Use Cases

GAT orders aren't the only thing that is possible:

* Stop-loss orders
  * Orders that become valid only once an on-chain oracle reports that the order's sell token reaches some "stop-price".
  * For example, you can place an Ether stop-loss order to buy USDC that only becomes valid once a price oracle reports that Ether dropped below $500.00.
* Time-weighted average price (TWAP) orders
  * A large order that becomes available a little at a time.
  * This can be useful for a DAO that wants to sell a large portion of a token in their treasury over a month, a little at a time.
* And wherever else your imagination takes you!

What, I believe is so interesting about Smart Orders is that they don't require any special integration. You just need an on-chain contract that follows the ERC-1271 signature verification standard! This allows anyone to extend CoW Protocol to add special orders with all kinds of on-chain logic without requiring any special integration. This democratises the ability of external parties to make special orders with special semantics that perfectly suits their needs, while having strong on-chain guarantees that the rules of their orders are being followed.
