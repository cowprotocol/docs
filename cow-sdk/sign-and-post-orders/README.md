# Sign and Post orders



In order to trade, you will need to create a valid order first.

On the contrary to other decentralised exchanges, creating orders is free in CoW Protocol. This is because, one of the most common ways to do it is by created offchain signed messages (meta-transactions, uses `EIP-712` or `EIP-1271`).

Posting orders is a three steps process:

1. **Get Market Price**: Fee & Price
2. **Sign the order**: Using off-chain signing or Meta-transactions
3. **Post the signed order to the API**: So, the order becomes `OPEN`

The next sections will guide you through the process of creating a valid order step by step. If you feel impatient and you want just a quick example, please out the the [Post an Order Example](https://github.com/cowprotocol/cow-sdk/blob/e086d9edeb24b25bb873a11c462019fa1ea4c021/docs/post-order-example.ts).
