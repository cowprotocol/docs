---
sidebar_position: 1
---

# Endpoints

MEV Blocker users can choose from several different endpoints depending on their particular needs.

![The Best Protection Under the Sun](/img/mevblocker/endpointsProtection.png)

[**Fast - https://rpc.mevblocker.io/fast**](https://rpc.mevblocker.io/fast) - Used to get transactions included on-chain as fast as possible while also finding users a rebate. _The transactions sent to this endpoint get simulated in pending block._

```jsx
https://rpc.mevblocker.io/fast
```

[**No Revert - https://rpc.mevblocker.io/noreverts**](https://rpc.mevblocker.io/noreverts) - Used to get transactions included on-chain without any possibility of reverting. If a transaction is no longer valid, it will stop being broadcast to builders at no extra cost to the user. _The transactions sent to this endpoint get simulated in pending block._

```jsx
https://rpc.mevblocker.io/noreverts
```

[**Full Privacy - https://rpc.mevblocker.io/fullprivacy**](https://rpc.mevblocker.io/fullprivacy) - Used to get transactions included on-chain directly via a builder. This method does not offer a rebate, but guarantees that the information a user's transaction carries remains private. Users should keep in mind that builders will still see their transaction information due to the architecture of PoS on Ethereum and can theoretically act maliciously. In theory, however, they shouldn't, as it's not in their interest. _The transactions sent to this endpoint get simulated in pending block._

```jsx
https://rpc.mevblocker.io/fullprivacy
```

[**Max Backruns - https://rpc.mevblocker.io/maxbackruns**](https://rpc.mevblocker.io/maxbackruns) - Used to get as many backruns for transactions as possible. This endpoint shares all received transactions with searchers no matter what. _The transactions sent to this endpoint get simulated in pending block._

```jsx
https://rpc.mevblocker.io/maxbackruns
```

[**No Checks - https://rpc.mevblocker.io/nochecks**](https://rpc.mevblocker.io/nochecks) - Used to let transactions go through the endpoint even if the simulation fails. This endpoint doesn't perform a transaction simulation in the pending block and only sends private transactions (not bundles). _The transactions sent to this endpoint DO NOT Get simulated in pending block._

```jsx
https://rpc.mevblocker.io/nochecks
```

## Restricted Searcher Configuration

As you might have read in ##concepts, MEV Blocker shares transaction information with all permissionlessly connected searchers because it mixes real transactions with fake transactions. In the event of using "vanilla AMM swaps", the fake transactions are good enough to spoof searchers to not not know which of the transactions are real or fake. However, if you participate in more "advanced swaps protocols" such as CoW Swap, 1inch fusion, or Uniswap X, your solution might be a bit more complex than the "vanilla swaps", and hence the fake transactions might not be as good at spoofing real transaction information from searchers.

Because of this, we enabled the option for you to choose between sharing the transactions with all permissionlessly connected searchers, for which we know nothing about, or to share the transactions with a curated list of searchers with whom the team might have a bit more background.\*

\*Note that the absence of this parameter specific configuration makes all the flow go via the default endpoint

For sharing with ALL connected searchers leverage this:

```jsx
 - Endpoint_you_Choose - https://rpc.mevblocker.io/{your_chosen_endpoint}?shareAll=1
```

This endpoint forces RPC to share transactions publicly with all searchers that are permissionlessly connected to MEV Blocker.

For sharing with CURATED connected searchers leverage this:

```jsx
- Endpoint_you_Choose - https://rpc.mevblocker.io/{your_chosen_endpoint}?shareSafe=1
```

This endpoints forces RPC to share transactions only with registered / curated searchers.

## MEV Blocker Boost

However, if you do not want to rely on MEV Blocker being up 100% of the time and failing to submit your transactions, you can leverage our Boost services which in the event of MEV Blocker RPC being down, forwards traffic to Flashbots RPC so that your transactions land on-chain.

[**Fast - https://boost.rpc.mevblocker.io/fast**](https://rpc.mevblocker.io/fast) - Used to get transactions included on-chain as fast as possible while also finding users a rebate.

```jsx
https://boost.rpc.mevblocker.io/maxbackruns
```

[**No Revert - https://rpc.mevblocker.io/noreverts**](https://boost.rpc.mevblocker.io/noreverts) - Used to get transactions included onchain without any possibility of reverting. If a transaction is no longer valid, it will stop being broadcast to builders at no extra cost to the user. _The transactions sent to this endpoint get simulated in pending block._

```jsx
https://boost.rpc.mevblocker.io/noreverts
```
