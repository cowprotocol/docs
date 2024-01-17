---
sidebar_position: 5
---

# Integrating your solver


## Shadow competition (testing)

- When a solver team has a solver prototype ready for testing, we encourage them to get in touch with the core team so that they can test their solver in the so-called shadow competition. The shadow competition is a risk-free environment that receives production orderflow but only does simulations, and is a good first step for solvers to test their matching engines against the competition.

:::note

In order to get connected to the shadow competition, feel free to reach out to an admin of the ["CoW Swap Solvers"](https://t.me/+2Z_-DW57meA1MDlh) group on Telegram.

:::

## Live competition (production)

- To connect to the live competition, each solver is required to be part of a "bonding pool", as specified by [CIP-7](https://snapshot.org/#/cow.eth/proposal/0x267edf7a0bd3c771cfca763322f011ee106d8d5158612c11da29183260d1dba7). The main rationale behind this is that a solver in the live competition gets access to the settlement contract, its buffers and the orderflow of the protocol. For the protocol to be protected from a potentially malicious solver, a substantial bonding pool is required so that in case of misbehavior, there are sufficient funds to reimburse the affected parties (users and/or the DAO).

:::note

As the requirements for a bonding pool are substantial, the DAO has also set up the CoW bonding pool, currently managed by the core team, and any solver team can apply to be part of that pool. In such a case, the core team will schedule some meetings with the corresponding solver team, will do some KYC and will make an informed decision about whether the solver can join that pool or not. As a requirement, any solver team that is part of the CoW bonding pool is required to lock 25% of the COW rewards they receive (via the solver rewards program) until they exit the CoW bonding pool. For more information about the CoW bonding pool and for applying to become part of it, feel free to reach out to an admin of the ["CoW Swap Solvers"](https://t.me/+2Z_-DW57meA1MDlh) group on Telegram.

:::

Once a solver becomes part of a bonding pool, then the core team will proceed to allow-list the solver and connect it to the live competition.