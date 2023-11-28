# Enable Tokens

Because of the use of off-chain signing (meta-transactions), users will need to **Enable the sell token** before signed orders can be considered as valid ones.

This enabling is technically an `ERC-20` approval, and is something that needs to be done only once. After this all order creation can be done for free using offchain signing.

> For more details see [https://docs.cow.fi/tutorials/how-to-submit-orders-via-the-api/1.-set-allowance-for-the-sell-token](https://docs.cow.fi/tutorials/how-to-submit-orders-via-the-api/1.-set-allowance-for-the-sell-token)

If you are trying to just get a sense on how to post orders, you can skip this step now and come back later after you manage to create valid orders. Let's continue then with how to instantiate the SDK if we need to sign some orders.
