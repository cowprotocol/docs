---
id: bonding-pools
---

# Setting up a bonding pool
The first step for setting up a bonding pool is to deploy a Gnosis safe on Mainnet with only [the CoW DAO safe](https://etherscan.io/address/0xcA771eda0c70aA7d053aB1B25004559B918FE662) as a signer, as is described in [CIP-7](https://snapshot.box/#/s:cow.eth/proposal/0x267edf7a0bd3c771cfca763322f011ee106d8d5158612c11da29183260d1dba7).

Once this safe has been confirmed by the CoW DAO team, the safe should be funded with \$500,000 USD in (yield bearing) stable coins and 1,500,000 COW tokens. After this is done, the bonding pool can be used to vouch for solvers in the solver competition.

# Setting up a reduced bonding pool
Solvers that are currently vouched under the CoW DAO Bonding pool may decide to set up a reduced bonding pool according to [CIP-44](https://snapshot.box/#/s:cow.eth/proposal/0x1b6f1171633ec3d20c4370db37074aa1bd830486d4d0d6c26165915cc42d9412), where the main benefit is that then they can fully control their calldata and the onchain submission process. Note that the interested solver team first needs to coordinate with the core team, that is currently managing the CoW DAO bonding pool, and the core team maintains the right to reject such a reduced pool setup.

Assuming that the core team approves the creation of a reduced bonding pool, the first step for setting up a reduced bonding pool is to deploy a Gnosis safe on Mainnet that has only one signer (the CoW DAO Solver Payouts safe, that is, eth:0xA03be496e67Ec29bC62F01a428683D7F9c204930). After this is done and has been confirmed by the CoW DAO team, the solver needs to deposit \$50,000 in (yield-bearing) stable coins or ETH, and 500,000 COW tokens to the newly created safe, and gradually build the pool's size over the course of the following year all the way to \$100,000 in (yield-bearing) stable coins or ETH, and 1,000,000 COW tokens.

We stress that the reduced bonding pool setup is just an arrangement within the CoW DAO bonding pool; meaning that a solver with a reduced bonding pool is still formally vouched under the CoW DAO bonding pool.

# How to join a bonding pool
This is done by vouching for a solver's submission address and rewards address with the bonding pool address. This is done by calling the `Vouch` method on the VouchRegister contract using the address that created the bonding pool.

Vouching contracts:
- [Mainnet](https://etherscan.io/address/0xb422f2520b0b7FD86f7DA61b32Cc631A59ed7E8F)
- [Gnosis Chain](https://gnosisscan.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Arbitrum](https://arbiscan.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Base](https://basescan.org/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Avalanche](https://snowtrace.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Polygon](https://polygonscan.com/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Lens](https://lenscan.io/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [BNB](https://bscscan.com/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)
- [Linea](https://lineascan.build/address/0xAAA4De096D02AE21729aA31D967E148D4e3Ae501)

The `Vouch` method receives a list as an argument and can vouch for multiple submission addresses in a single transaction. The transaction must contain: the submission address for the solver, the bonding pool that is vouching for the solver, and the rewards address that the solver would like to use to receive their [rewards](/cow-protocol/reference/core/auctions/rewards).

# How to leave a bonding pool
Leaving a bonding pool involves the same process as joining a bonding pool, except that the owner of the bonding pool will call the `invalidateVouching` method instead with the solver's submission address and the bonding pool that vouched for the solver as arguments.

# How to dissolve a bonding pool
In order to dissolve a bonding pool you must first unvouch for all solvers that have been vouched for by this bonding pool. Then you can post a CIP to unwind the bonding pool. This involves first writing a post on [the CoW forum](https://forum.cow.fi/). This can be a very short post detailing the safe creation address and which address funded the pools together with the transaction details for dissolving the bonding pool. [Here is an example from the dissolution of the Project Blanc bonding pool.](https://forum.cow.fi/t/cip-54-dissolve-project-blanc-bonding-pool/2645)

After the post has been in the forum for at least 6 days, you will need to post a [CIP on snapshot](https://snapshot.box/#/s:cow.eth). This CIP should contain details of the creation of the bond and details of how the bond will be dissolved. Alongside this it should contain a simulation of the transaction to dissolve the bond that would be executed if the CIP passes. [For example, here is the CIP that proposed the dissolution of the Project Blanc bonding pool.](https://snapshot.box/#/s:cow.eth/proposal/0x2638ee59df1f402421fe69abe76cd0154ec32d8b4ad88a136318c6c8c76b210d)
