# CoW Swap

CoW Swap is the first trading interface built on top of CoW Protocol. It allows you to buy and sell tokens using gas-less orders that are settled p2p.

#### Differences between CoW Swap & UniSwap

CoW Swap's interface may look very familiar to the average DeFi user, as it's based on the Open Source code used for building the Uniswap front end. Although it looks similar, there are huge differences between the two products, which are:

* Uniswap uses only Uniswap pools; CoW Swap can settle orders on Uniswap, Sushiswap, 1inch, Paraswap and more to come (Matcha, Balancer...) giving users the best price
* CoW Swap enables users to trade directly with other users without going through any pools when there is Coincidence of Wants (CoWs), removing the need to pay Liquidity Provider fees.
* Orders on CoW Swap are signed messages and therefore gasless, costing nothing to submit. In case of price movements against your order, in the worst case, the order will expire and you won't spend gas on failed transactions, while on Uniswap you would still spend it.

#### Providing liquidity

CoW Swap does not have liquidity providers. Instead, it connects to all on-chain liquidity that is provided across different protocols. Since orders only incur a cost if traded, active market makers can observe the order book and place counter orders (creating a CoW) to prevent settling trades via external liquidity.

#### Cancelling orders

CoW Swap allows you to cancel your orders without any cost. As a user, you simply sign the order cancellation - similar to how the order placement was done - and if the solution has not been mined yet, the order will not be executed, and therefore cancelled.

#### Supported wallets

CoW Swap uses offline signatures to offer gasless orders, aka signed orders. The currently supported wallets by CoW Swap can be grouped in the following way:

* **EOA wallets:** Most of the most popular EOA wallets are supported. Metamask or any injected wallet (Mobile Wallet app browser) as well as wallets through WalletConnect.
  If you have a wallet that's not working, let us know.
*   **Smart Contract wallets**: Currently, Smart Contract (SC) wallets such as Gnosis Safe, Argent or Pillar are not supported because it would require signing an on-chain transaction to place the order, making it no longer gasless. We are working to make this a possibility and support will be added soon.


    Nevertheless, even if your wallet is not a SC wallet, it might be unsupported in some cases. Not all wallets implement the necessary signing methods from the EIP-712 standard. If that is the case for you, reach out to your wallet developers and ask for it.

#### Interactions encountered when using CoW Swap

CoW Swap has different types of interactions that a user is capable of executing. These interactions can be separated into internal & external operations. The following table clarifies the reasons for each interaction

Internal CoW Swap Operations

![](https://lh5.googleusercontent.com/RJ6EW2gCoHLbzkNraqAn\_ctFAH88DPeyJPe6MUeOxpKsBgh\_kJlKDpfgtpQVROBff1Bqb9OBSSIsOBCs34rBeEAc6XcaX6O3SeNNoluWY6o20nzchUgKBpK6p8OlHex2uLS2ZXPS)

#### FAQ

Want to know more about CoW Swap and how it works. Head over to its [FAQ section](https://cowswap.exchange/#/faq).
