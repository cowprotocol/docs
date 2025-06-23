---
sidebar_position: 3
---

# eth_sendBundle

Example Request

```jsx
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendBundle",
  "params": [
    {
      "txs": [
        "txHash", // originator transaction
        "rawTxHex" // searcher transaction
      ],
      "blockNumber": "0x102286B",       // (Optional) String, a hex-encoded block number for which this bundle is valid. Default, current block number
      "replacementUuid": "blinklabsxyz",   // (Optional) String, any arbitrary string that can be used to replace or cancel this bundle
    }
  ]
}
```

Example Response

```jsx
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0x164d7d41f24b7f333af3b4a70b690cf93f636227165ea2b699fbb7eed09c46c7"
}
```