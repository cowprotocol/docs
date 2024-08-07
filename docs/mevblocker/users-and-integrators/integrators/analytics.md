---
sidebar_position: 5
---

# Set Up Data Analytics

When submitting your transaction to the API, define the custom parameter `referrer=xxx` to associate transactions on MEV Blocker's transaction origin analytics dashboard to your project:

```
https://rpc.mevblocker.io/?referrer=(PROJECT_NAME/PROJECT_NICKNAME/YOUR_ADDRESS)
```

By setting up a referrer tag, you allow the MEV Blocker team to more easily track the order flow you create and to more easily detect and fix issues. Additionally, it is much easier for the MEV Blocker team to create personalized dashboards based on your flow.
