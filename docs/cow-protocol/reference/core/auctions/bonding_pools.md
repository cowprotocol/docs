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
