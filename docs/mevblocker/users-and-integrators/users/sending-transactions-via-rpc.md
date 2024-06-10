---
sidebar_position: 3
---

# Sending Transactions via RPC

MEV Blocker supports sending transactions via multiple endpoints (as discussed [here](/mevblocker/users-and-integrators/users/available-endpoints)) using the standard `eth_sendRawTransaction` method.

## `eth_sendRawTransaction`

### Parameters​

transaction data: [Required] The signed transaction data.

### Returns​

**Transaction hash:** 32 bytes. The transaction hash, or the zero hash if the transaction is not yet available.

### Request​

```shell
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0",
       "method":"eth_sendRawTransaction",
       "params": 
           ["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"],
       "id":1
       }'
```

### Response​ Json

```json
{
 "id": 1,
 "jsonrpc": "2.0",
 "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```
