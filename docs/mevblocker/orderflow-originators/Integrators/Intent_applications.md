---
sidebar_position: 7
---

# Intent Based dApps

Intent-based DEXs, such as CoW Protocol, utilize an off-chain competition among solvers to secure better settlement prices for their users. These solvers, tasked with identifying the most efficient transaction paths, are responsible for submitting transactions on-chain on the user's behalf.

MEV Blocker serves as a critical tool for safeguarding these transactions from manipulation by MEV bots. By integrating MEV Blocker, solvers ensure their transactions are protected from frontrunning and sandwich attacks, while also benefiting from additional guarantees such as no reverts. Moreover, solvers can capture up to 90% of the backrun value their transactions might generate, thereby creating an alternative revenue stream beyond the solver competition.

## Integrating MEV Blocker

MEV Blocker was built for effortless integration — just switch your app or wallet’s RPC endpoint to ours and you're good to go.

Our infrastructure mirrors the standard Ethereum RPC spec, so no special setup or code changes are needed.

MEV Blocker is fully permissionless. You can start using our endpoints right away — no signup, no gatekeeping. If you ever need help or want to reach the team, join us on Telegram.

## Integration Steps

1. **Choose Your Endpoint**
Decide which MEV Blocker endpoint suits your use case best. Refer to our Endpoints section to learn how each variant works and what differences they offer.

 2. **Customize Your Setup**
Add your own referrer ID for analytics and set a custom beneficiary address to receive rebates. Details are available in our customization sections.

3. **Swap Your RPC URL**
Update your current RPC endpoint to:

```jsx
https://rpc.mevblocker.io
```

4. **Track Your Activity**
Want visibility into flows, usage, and rewards? Ping us on [Telegram](https://t.me/mevblocker) — we’ll help you set up a custom Dune dashboard to transparently track everything.
