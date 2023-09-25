# Good After Time (GAT) Orders

Good after time, or GAT, orders are very basically orders that become valid only after a given timestamp. Currently, this is not supported natively by CoW Protocol, which only supports order expiry. Thanks to ERC-1271, creating such an order and _extending_ the CoW Protocol becomes possible. All we need to do is add a check in the `isValidSignature` implementation that the current block timestamp is older than some `validFrom` value. The CoW Protocol services constantly simulate `isValidSignature` before each batch, meaning that the order would get automatically picked up and included in a batch auction once it matures. Since the signature validation would revert if the check is not met, this means that we would effectively have a **trust-less** check preventing the order from being filled. Even if a malicious solver would try to include a GAT order before it was mature, the CoW Protocol settlement contract would prevent it from executing a trade because the `isValidSignature` call would fail. Trust-less protocol extensions, nice!

<figure><img src="../../img/image (7).png" alt="" /><figcaption></figcaption></figure>

<figure><img src="../../img/image (6).png" alt="" /><figcaption></figcaption></figure>

<figure><img src="../../img/image (4).png" alt="" /><figcaption></figcaption></figure>

<figure><img src="../../img/image (11).png" alt="" /><figcaption></figcaption></figure>

<figure><img src="../../img/image (2).png" alt="" /><figcaption></figcaption></figure>

We also add a `GATOrders` factory contract that allows traders to place GAT orders by:

<figure><img src="../../img/image (3).png" alt="" /><figcaption></figcaption></figure>

This factory is responsible for:

1. Making an ERC-20 approval to the factory contract for the tokens they want to trade
2. Calling the `place` function which internally:
3. Stores the specified `validFrom` parameter
4. Creates a new `GATOrder` contract instance
5. Transfers the sell tokens from the trader to the Smart Order
6. Set an ERC-20 approval to the CoW Protocol vault relayer contract

After this `place` transaction is executed, the order is ready!

<figure><img src="../../img/image (1).png" alt="" /><figcaption></figcaption></figure>

For the order to trade:

1. The trader can then let the CoW Protocol know about the order by sending the order details to the API
2. The CoW Protocol would, before every auction, check wether or not the order is valid by simulating a `isValidSignature` call
   * Internally, the `isValidSignature` call would compare the current block timestamp to the order's configured `validFrom` and only validate the signature once this is the case.
3. Once the order matures, it will automatically be included in the next auction. This would make the order available to the CoW Protocol solvers for trading.
4. The CoW Protocol contract would call the `isValidSignature` on-chain
   * This ensures that we truly have a **trust-less** order validity check, regardless of whether or not the protocol or solvers misbehave.

#### Getting Rid of the API Call

We can also add an `OrderPlacement` event emission to the factory contract. This would cause GAT order placement to additionally emit an on-chain event. We are currently building a new Ether trading flow on top of CoW Protocol and will start indexing these events in order to automatically add orders created this way to the order-book. This would mean that traders no longer need to make an HTTP request to the API to add an order to it, but instead will have the order added automatically.

<figure><img src="../../img/image (9).png" alt="" /><figcaption></figcaption></figure>
