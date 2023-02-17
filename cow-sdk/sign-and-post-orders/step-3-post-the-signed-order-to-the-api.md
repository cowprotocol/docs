# STEP 3: Post the signed order to the API

Once you have a signed order, last step is to send it to the API.

* The API will accept the order if its correctly signed, the deadline is correct, and the fee is enough to settle it
* Once accepted, the order will be `OPEN` until the specified `validTo` date (expiration)
* The possible outcomes once accepted are:
  * The order is `EXECUTED`: you will pay the signed fee, and get at least the `buyAmount` tokens you specified, although you will probably get more! (you will probably get a so-called **Surplus**).
  * The order `EXPIRES`: If your price is not good enough, and the order is out of the market price before expiration, your order will expire. This doesn't have any cost to the user, which **only pays the fee if the trade is executed**.
  * You cancel the order, so it becomes `CANCELLED`. Cancelling an order can be done both as a free meta-transaction (**soft cancelations**) or as a regular on-chain transaction (**hard cancelations**).
* The API will return an `orderId` which identifies the order, and is created as a summary (hash) of it. In other words, the `orderId` is deterministic given all the order parameters.

Post an order using the SDK:

```javascript
const orderId = await cowSdk.cowApi.sendOrder({
  order: { ...order, ...signedOrder },
  owner: '0x1811be0994930fe9480eaede25165608b093ad7a',
})
```

Success 🎉! You managed to post a new valid order. Note that even though you awaited for the `sendOrder` call, this only signals that the order was accepted by the protocol.\
\
As a bonus, next section will show you how to view the estate of the order in the explorer.
