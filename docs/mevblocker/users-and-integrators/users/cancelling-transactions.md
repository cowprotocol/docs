---
sidebar_position: 4
---

# Cancelling MEV Blocker Submitted Transactions

If you want to cancel a pending MEV Blocker transaction without paying gas, you need to be connected to either the noreverts or fullprivacy endpoint and enable the softcancel feature flag.

Even when soft cancellations are disabled, you can cancel a transaction by sending another transaction with equal nonce but higher priority fee. However, this will cost you transaction fees.

Soft cancellations are an optimistic feature where MEV Blocker will stop broadcasting your transaction and thus may prevent it from being included if it's not yet too late.

## Preparing the transaction we want to cancel
To increase our chances of our target transaction not getting immediately included we will submit it with no priority fee:

```typescript
const nonce = await signer.getTransactionCount();
const tx = {
	to: await signer.getAddress(),
	value: utils.parseEther('0.01'),
	maxPriorityFeePerGas: 0,
	maxFeePerGas: utils.parseUnits('100', 'gwei'),
	nonce
};
```

## Preparing the cancellation tx
Cancellation transactions are calls to self without any value or calldata, that use the same nonce as the target transaction in order to invalidate it:

```typescript
const cancellation = {
	to: await signer.getAddress(),
	nonce
};
```

MEV Blocker doesn't broadcast such transactions but instead takes it as a signal to stop broadcasting any other transactions that have the same nonce allowing for "gasless" cancellations.

## Sending and awaiting target and cancellation

We need to send both transactions in short concession in order for the cancellation to take effect. There is always a chance that due to latency the cancellation arrives too late and builders end up including the target transaction. It might therefore take multiple attempts to demonstrate the exact behavior.

Metamask may sometimes ask you to sign the second transaction first. Make sure you sign the transactions with non-zero value first!

To sign both transactions using the same popup we await for both sendTransaction calls in parallel and return the target transaction hash to observe its status via the API:

```typescript
const [transactionResponse, _] = await Promise.all([
	signer.sendTransaction(tx),
	signer.sendTransaction(cancellation)
]);

return `Cancellation sent! Check https://rpc.mevblocker.io/tx/${transactionResponse.hash}`;
```

If all goes well the target transaction should show its status as FAILED.

If you want to test how to cancel a transction, you can leverage in browser tutorials from CoW DAO's new [learning website](https://learn.cow.fi/tutorial/cancel-transaction-mevblocker)