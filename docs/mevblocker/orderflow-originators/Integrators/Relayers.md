---
sidebar_position: 5
---

# Relayers - Bundlers - Paymasters

Transaction relayers, such as Gelato, enable projects and users to bypass the complexities of on-chain transaction submission and gas management. These relayers facilitate transaction submissions on behalf of the projects and users according to predetermined preferences.

By using MEV Blocker, transaction relayers can guarantee their transactions are free from MEV, and can even capture value in cases where backrunning opportunities are present.

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
Want visibility into flows, usage, and rewards? Ping us on Telegram — we’ll help you set up a custom Dune dashboard to transparently track everything.