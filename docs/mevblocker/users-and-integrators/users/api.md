---
sidebar_position: 2
---

# API for Status of Transaction

MEV Blocker offers an API to keep track of transactions and their attached auctions. To learn about the status of a transaction, you can use the following URL: 

```
https://rpc.mevblocker.io/tx/Your_Tx_Hash
```

```json
{
    "status": 
    "hash":  
    "rpc_timestamp":
    "transaction": 
    "from": "",
    "to": "", 
    "gasLimit": "", 
    "maxFeePerGas": "", 
    "nonce": "", 
    "value": "", 
    "fastMode": 
    "shared": 
    "simulationError": 
    "backruns": 
    "referrer":
    "refundRecipient":
    "refund"
}
```