---
sidebar_position: 3
---

#### ERC-1271 orders (Native Flow)

The CoW ETH Flow Contract is a new way of trading on CoW Protocol. It’s specifically designed to handle ETH, since the CoW Protocol settlement contract is only compatible with ERC-20 tokens.

This new swapping method was developed for users who have ETH, but no WETH in their wallets, and thus do not have WETH approved in the settlement contract. This new flow saves time and money as users don’t have to worry about converting ETH to WETH, but can trade ETH natively through CoW Protocol. 

An intermediary smart contract needs to be involved in this process because you cannot sign an intent to trade with ETH. Since you cannot sign an intent to trade, and CoW Protocol only works with intents, we developed a custom smart contract that auto-converts your ETH into WETH to later place an ERC-1271 order (intent) on your behalf.
