---
sidebar_position: 6
---

# Set Up Custom Fee Recipient Of Rebates

When submitting your transaction to the API, use the custom parameter "refundRecipient" to define a different wallet address from the transaction originator address for receiving the rebate:

```
https://rpc.mevblocker.io/?refundRecipient=(YOUR_ADDRESS)
```s

Note: Without this setup, by default, rebates are sent back to users (tx.origin)