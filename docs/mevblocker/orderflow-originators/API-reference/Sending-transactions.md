---
sidebar_position: 9
---

# Sending transactions

MEV Blocker  supports sending transactions via the standard eth_sendRawTransaction method through its multiple endpoints. If you would rather send to custom endpoint instead of the default, you can be found the list of available endpoints in here.

## eth_sendRawTransaction

This is the recommended way to send transactions.

Example of a request:

```jsx

curl https://rpc.mevblocker.io/fast
  -X POST
  -H "Content-Type: application/json"
  -d '{
  "jsonrpc":"2.0",
"method":"eth_sendRawTransaction",
  "params":["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"],
  "id":1
}
```

Example of a response:

```jsx
{
 "id": 1,
 "jsonrpc": "2.0",
 "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## eth_getTransactionByHash

This RPC method mimics the standard eth_getTransactionByHash for private transactions.

Example of a request:

```jsx
curl https://rpc.mevblocker.io/fast
  -X POST
  -H "Content-Type: application/json"
  -d '{
	"jsonrpc": "2.0", 
	"method": "eth_getTransactionByHash", 
	"params": ["0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0"], // your_tx_hash 
	"id": 1
}
```

Our transaction response closely follows the format of the standard eth_getTransactionByHash method used in Ethereum. However, in our response, the fields gasPrice, v, r, and s are set to "0x0". 

Example of a response:

```jsx
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "accessList": [],
    "blockHash": "0x0155db99111f10086bad292d3bd0be9472aff9cf0f33d7d35f2db4814ffad0f6",
    "blockNumber": "0x112418d",
    "chainId": "0x1",
    "from": "0xe2a467bfe1e1bedcdf1343d3a45f60c50e988696",
    "gas": "0x3c546",
    "gasPrice": "0x20706def53",
    "hash": "0xce0aadd04968e21f569167570011abc8bc17de49d4ae3aed9476de9e03facff9",
    "input": "0xb6f9de9500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000e2a467bfe1e1bedcdf1343d3a45f60c50e9886960000000000000000000000000000000000000000000000000000000064e54a3b0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000de15b9919539113a1930d3eed5088cd10338abb5",
    "maxFeePerGas": "0x22b05d8efd",
    "maxPriorityFeePerGas": "0x1bf08eb000",
    "nonce": "0x12c",
    "r": "0x0",
    "s": "0x0",
    "to": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
    "transactionIndex": "0x0",
    "type": "0x2",
    "v": "0x0",
    "value": "0x2c68af0bb140000",
    "yParity": "0x1"
  }
}
```

## eth_getTransactionCount

This method implements the standard eth_getTransactionCount. If using the pending parameter instead of a block number, the private mempool will automatically compute the next nonce using both private transactions and public transactions.

Example of a request:

```jsx
curl https://rpc.mevblocker.io/fast
  -X POST
  -H "Content-Type: application/json"
  -d '{
	"jsonrpc": "2.0", 
	"method": "eth_getTransactionCount", 
	"params": 
			[
			"0xc94770007dda54cF92009BFF0dE90c06F603a09f", 
			"0x5bad55"
			], 
	"id": 1
}
```

Example of response:

```jsx
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1a"
}
```

## eth_sendPrivateTransaction

This method is not supported since the method eth_sendRawTransaction never shares transactions inside the public mempool anyway, and this all received transactions are private by definition.

## eth_cancelTransaction

MEV Blocker provides a best-effort transaction cancellation feature. While we will notify all participating builders not to process the transaction, we cannot fully guarantee that the transaction will not be mined, particularly if the cancellation request is made close to the slot's end time.

To cancel a transaction, you can use the eth_cancelTransaction method via your MEV Blocker RPC:

```jsx
{
{
    jsonrpc: "2.0",
    id: 1,
    method: "eth_cancelTransaction",
    params: [
        // The hash of the transaction to be cancelled
        "0xb8101baf6bfd31243578e8847c12316f47318f567b02296fdf7fc783bef74826"
    ]
}
```

A successfull response will return true:

```jsx
{
{
    id: 1,
    result: true,
}
```

## mev_sendBundle

mev_sendBundle uses a new bundle format to send bundles to MEV-Share. See the Understanding Bundles page for more information, or check out the Sending Bundles page for a short guide.

example request:

```jsx
curl https://rpc.mevblocker.io/fast
  -X POST
  -H "Content-Type: application/json"
  -d '{
    "params": [
    {
      "version": "v0.1",
      "inclusion": {
        "block": "0x8b8da8",
        "maxBlock": "0x8b8dab"
      },
      "body": [
        {
          "tx": "0x02f880058201d685e9103fda0085e9103fda368255f0940000c335bc9d5d1af0402cad63fa7f258363d71a8092696d206261636b72756e6e69696969696e67c080a0c5058ccf5759e29d4ad28e038f632a9b6269bbb0644c61447e0f14d56c453d73a048e877ee621c4b6be1234a8ad84379e80d45b288a7271e2b1aede7a04f06fd98",
          "canRevert": false
        }
      ],
      "validity": {
        "refund": [],
        "refundConfig": []
      }
    }
  ],
  "method": "mev_sendBundle",
  "id": 1,
  "jsonrpc": "2.0"
}'
```

example response:

```jsx
{
    "jsonrpc": "2.0", 
    "id": 1, 
    "result": 
        {"bundleHash": "0x0"}
}
```

## eth_callMany

eth_callMany can be used to simulate a bundle against a specific block number, including simulating a bundle at the top of the next block. The eth_callMany RPC has the following payload format:

```jsx
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_callMany",
  "params": [
    {
      txs,               // Array[String], A list of signed transactions to execute in an atomic bundle
      blockNumber,       // String, a hex encoded block number for which this bundle is valid on
      stateBlockNumber,  // String, either a hex encoded number or a block tag for which state to base this simulation on. Can use "latest"
      timestamp,         // (Optional) Number, the timestamp to use for this bundle simulation, in seconds since the unix epoch
    }
  ]
}
```

example:

```jsx
curl https://rpc.mevblocker.io/fast
  -X POST
  -H "Content-Type: application/json"
  -d '{
    "jsonrpc":"2.0",
    "method":"eth_callMany",
    "params":[[{
        "transactions":     
        [{
            "from":"0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5",
            "to":"0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "gas":"0x92c0",
            "gasPrice":"0x7896e72a000",
            "value":"0x0",
            "data":"0x70a0823100000000000000000000000047ac0fb4f2d84898e4d9e7b4dab3c24507a6d503"}],
            "blockOverride":
                    {"blockNumber":"0xe39dd0"}}],
                          {"blockNumber":"0x103434E",
                                                  "transactionIndex":234}],"id":1}'
```

example response:

```jsx
 {
     "jsonrpc":"2.0",
     "id":1,
     "result":[[{
         "value":"000000000000000000000000000000000000000000000000000470de54da7138"
             }]]}
```