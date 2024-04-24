---
sidebar_position: 3
---

# CoW Protocol vs. CoW Swap

While the two are intertwined, there are important differences between CoW Protocol and CoW Swap.

![CoW Protocol vs. CoW Swap](/img/concepts/protocol-vs-swap.png)

## CoW Protocol

CoW Protocol is a trading protocol that leverages [intents](../introduction/intents) and [batch auctions](../introduction/batch-auctions) to find optimal prices and protect orders from Maximal Extractable Value (MEV).

The protocol groups orders together into batches and relies on a competition between third parties, known as [solvers](../introduction/solvers), to find the best execution price for all orders in a given batch.

Solvers search all available on-chain liquidity and even tap off-chain private inventory to fill orders.
If two orders in a batch are swapping opposite assets, solvers match them together in a peer-to-peer [*Coincidence of Wants (CoW)*](./coincidence-of-wants) trade.

Once they have found their solutions, solvers compete to win the right to settle a batch of orders.
The protocol runs a solver competition and picks the "winning" solver to settle each batch of orders, defined as the solver that can maximize surplus for traders.
Solvers typically win the competition by finding the best combination of on- and off-chain liquidity sources, the most optimal CoW, the most efficient technical execution, or a combination of these in a single settlement.

## CoW Swap

CoW Swap was the first trading interface built on top of CoW Protocol and is currently the most popular way for users to trade with CoW Protocol. 

Other trading apps and dApps, like Balancer, have also integrated CoW Protocol natively within their trading interfaces and advanced traders often place trades directly through the protocol.

The UI of CoW Swap includes some unique features, such as:

- Wallet history
- User token balances
- Games
- The legendary "Moo" sound
- Fortune cookies

CoW Swap works with many popular wallets, including [Rabby](https://rabby.io/), [MetaMask](https://metamask.io/), [Trust Wallet](https://trustwallet.com/), [Safe](https://safe.global/), [Trezor](https://trezor.io/), [Ledger](https://www.ledger.com/), and any wallet supporting [WalletConnect v2](https://walletconnect.com/).
