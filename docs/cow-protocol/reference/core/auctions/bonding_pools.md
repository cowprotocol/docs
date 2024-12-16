---
id: bonding-pools
---

# Bonding pools

A bonding pool is an Ethereum mainnet safe whose sole owner is the CoW DAO, and which contains $0.5M worth of (yield-bearing) stable coins and 1.5M COW, as specified by [CIP-7](https://snapshot.org/#/cow.eth/proposal/0x267edf7a0bd3c771cfca763322f011ee106d8d5158612c11da29183260d1dba7). When a solver wants to join the solver competition, it first needs to join a bonding pool. The main rationale behind this is that a solver in the live competition gets access to the settlement contract, its buffers and the orderflow of the protocol, which means that the attack vector is non-trivial. For the protocol to be protected from a potentially malicious solver, a substantial bonding pool is required so that in case of misbehavior, there are sufficient funds to reimburse the affected parties (users and/or the DAO).

Thus, in order to get whitelisted and be able to execute transactions onchain, each solver needs to join a bonding pool, and the onchain proof of a solver joining a pool is the "vouching" transaction.

The vouching contract, that is deployed on every chain the protocol operates on, allows the creators of a bonding pool to publicly vouch for a solver address; this is the only certificate that is currently accepted for proving that a solver has joined a bonding pool. Once such vouching has taken place, then the core team is mandated to proceed with the white-listing of the solver.

:::note
The vouching contract addresses are the following:
- Mainnet: https://etherscan.io/address/0xb422f2520b0b7FD86f7DA61b32Cc631A59ed7E8F
- Gnosis: https://gnosisscan.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501
- Arbitrum: https://arbiscan.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501
- Base: https://basescan.org/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501
:::

# Setting up a bonding pool
The first step for setting up a bonding pool is to deploy a Gnosis safe on Mainnet with only [the CoW DAO safe](https://etherscan.io/address/0xcA771eda0c70aA7d053aB1B25004559B918FE662) as a signer as is described in [CIP-7](https://snapshot.box/#/s:cow.eth/proposal/0x267edf7a0bd3c771cfca763322f011ee106d8d5158612c11da29183260d1dba7).

Once this safe has been confirmed by the CoW DAO team, the safe should be funded with $500.000 USD in stable coins and 1.500.000 COW tokens. After this is done, the bonding pool can be used to vouch for solvers in the solver competition.

# Setting up a reduced bonding pool
Solvers that are currently vouched under the CoW Bonding pool may decide to set up a reduced bonding pool according to [CIP-44](https://snapshot.box/#/s:cow.eth/proposal/0x1b6f1171633ec3d20c4370db37074aa1bd830486d4d0d6c26165915cc42d9412).

The first step for setting up a reduced bonding pool is to deploy a Gnosis safe on Mainnet that has only one signer ([the CoW DAO Solver Payouts safe](0xA03be496e67Ec29bC62F01a428683D7F9c204930)). After this is done and has been confirmed by the CoW DAO team, the solver will deposit $50.000 in yield bearing stable coins or ETH and 500.000 COW tokens to the newly created safe.

# How to join a bonding pool
This is done by vouching for a solver's submission address and rewards address with the bonding pool address. This is done by calling the `Vouch` method on the [VouchRegister contract](https://etherscan.io/address/0xb422f2520b0b7fd86f7da61b32cc631a59ed7e8f) using the address that owns the bonding pool (the address that sent the full initial funding to the bonding pool). 

Vouching contracts:
- [Mainnet](https://etherscan.io/address/0xb422f2520b0b7FD86f7DA61b32Cc631A59ed7E8F)
- [Gnosis Chain](https://gnosisscan.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Arbitrum](https://arbiscan.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Base](https://basescan.org/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)

The `Vouch` method receives a list as an argument and can vouch for multiple submission addresses in a single transaction. The transaction must contain: the submission address for the solver, the bonding pool that is vouching for the solver, and the rewards address that the solver would like to use to receive their [rewards](https://docs.cow.fi/cow-protocol/reference/core/auctions/rewards).

# How to leave a bonding pool
Leaving a bonding pool involves the same process as joining a bonding pool, except that the owner of the bonding pool will call the `invalidateVouching` method instead with the solver's submission address and the bonding pool that vouched for the solver as arguments.

# How to dissolve a bonding pool
In order to dissolve a bonding pool you must first post a CIP to unwind the bonding pool. This involves first writing a post on [the CoW forum](https://forum.cow.fi/). This can be a very short post detailing the safe creation address and which address funded the pools together with the transaction details for dissolving the bonding pool. [Here is an example from the dissolution of the Project Blanc bonding pool.](https://forum.cow.fi/t/cip-54-dissolve-project-blanc-bonding-pool/2645)

After some discussion in the forum, you will need to post a [CIP on snapshot](https://snapshot.box/#/s:cow.eth). This CIP should contain details of the creation of the bond and details of how the bond will be dissolved. Alongside this it should contain a simulation of the transaction to dissolve the bond that would be executed if the CIP passes. [For example, here is the CIP that proposed the dissolution of the Project Blanc bonding pool.](https://snapshot.box/#/s:cow.eth/proposal/0x2638ee59df1f402421fe69abe76cd0154ec32d8b4ad88a136318c6c8c76b210d)
