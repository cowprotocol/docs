# ETH Flow Contract

The CoW ETH Flow Contract is a new way of trading on CoW Protocol. This new way of trading is specifically designed to handle ETH, since the CoW Protocol Settlement Contract is only compatible with ERC20 tokens.

This new swapping method was developed for those users who have ETH (and no WETH) in their wallets, and thus do not have WETH approved in the settlement contract. The goal of this new swapping flow is to avoid forcing the user to convert their ETH into WETH and having them set the approval of WETH in the settlement contract, thus saving time and costs in the process.

<figure><img src="https://cdn-images-1.medium.com/max/1600/0*3_pVJhfBelMB--Tf" alt="" /><figcaption></figcaption></figure>

The reason that an intermediary smart contract needs to be involved in this process is because you cannot sign an intent to trade with ETH. Since you cannot sign an intent to trade, and CoW Protocol only works with intents, we developed a custom smart contract that auto-converts your ETH into WETH to later place an ERC1271 order (intent) on your behalf.
