---
sidebar_position: 13
---

# Custom Benifeciary

When submitting your transaction to the API, use the custom parameter `refundRecipient` to define a different wallet address from the transaction originator address for receiving the rebate:

```jsx
https://rpc.mevblocker.io/?refundRecipient=(YOUR_ADDRESS)
```

note

Without this setup, by default, rebates are sent back to users (`tx.origin`)