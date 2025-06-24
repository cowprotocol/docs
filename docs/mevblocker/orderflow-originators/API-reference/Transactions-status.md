---
sidebar_position: 11
---

# Transaction Status

MEV Blocker offers an API to keep track of transactions and their attached auctions. To learn about the status of a transaction, you can use the following URL:

```jsx
https://rpc.mevblocker.io/tx/Your_Tx_Hash
```

Note that transaction status can also be fetched via eth_getTransactionByHash.

INPUTS

```jsx
{
	"status": " The status of the submitted txs. Value can be INCLUDED / FAILED / UNKNOWN",
	"hash": "The hash of the submitted transactions",
	"rpc_timestamp": "The timestamp at which the transaction was received",
	"transaction":
		{
			"from": "The sender of the transaction",
			"to": "The receiver of the transaction",
			"gas": "The amount of gas used for the transaction",
			"nonce": "The nonce of the transaction",
			"value": ""
		},
	"fastMode": "If the transaction was shared through the fast endpoint",
	"shared": "If the transaction was shared with searchers",
	"simulationError": "If the transaction gave an error simulating it",
	"backruns": "How many backruns bid did we receive for the tx",
	"referrer": "Where is the transaction originating from. If full, field will shopw string used my integrator ( ie CoWSwap) and if empty, it will show No Referrer",
	"refundRecipient": "To which address is the backrun being sent to. If empty, the backrun is sent to tx.orign",
	"refund": "Amount of ETH searchers were able to rebate via backrun"
}
```

Example of a transaction

```jsx
{
	"status": "UNKNOWN", 
	"hash": "0xb4b11a74ca505a8225226f1cc6e1662ce83298a7b4364e5ca5bad1049cc05d2b", 
	"rpc_timestamp": null, 
	"transaction": 
		{
			"from": "", 
			"to": "", 
			"gas": "", 
			"nonce": "", 
			"value": ""
		}, 
	"fastMode": true, 
	"shared": false, 
	"simulationError": null, 
	"backruns": 0, 
	"referrer": null, 
	"refundRecipient": null, 
	"refund": 0.0
}
```