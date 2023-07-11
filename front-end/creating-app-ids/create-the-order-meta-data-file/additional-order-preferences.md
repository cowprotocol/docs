---
description: This sections is relevant for CoW Hooks
---

# Additional Order Preferences

App-data also allows for additional order options to be specified. These are options to extend CoW Protocol orders to increase the trade expression for users, while being signed and by virtue of being included in order’s `appData`. Currently, we support an additional optional “hooks” field for configuring [CoW Hooks for an orders](https://docs.cow.fi/overview/cow-hooks).\


```json
{
  "version": "0.4.0",
  "appCode": "MyAwesomeUi",
  "metadata": {}
  "backend": {
    "hooks": {
      "pre": [
        { "target": "<address>", "callData": "<hex encoded bytes>", "gasLimit": "<number>" },  
      ],
      "post": [
        { "target": "<address>", "callData": "<hex encoded bytes>", "gasLimit": "<number>" },
      ]
    }
  }
}
```

Note that both pre and post hooks support multiple hooks, so feel free to mix and match!
