# Snapshot (Voting)

CoW DAO uses [Snapshot](https://snapshot.org/#/cow.eth) for voting on [CoW DAO Improvement Proposals (CIPs)](process/#cow-dao-improvement-proposals-cips). Votes on snapshot are weighted by the number of vCOW+COW held, or delegated to the addressed, as determined by the [snapshot strategies](#snapshot-strategies).

:::tip Voting requirements

For a proposal to pass, it must have a _simple majority_ of **YES** votes **and** a _quorum_ of **35,000,000** votes.

:::

## Settings

| **Parameter** | **Value** |
| --- | --- |
| `vote.type` | Basic |
| `vote.quorum` | 35,000,000 |
| `vote.period` | 7 days |

:::tip

Any change to the snapshot settings requires a CIP to change the [`snapshot` text record on cow.eth](https://app.ens.domains/name/cow.eth/details).

:::

:::note

The settings are located in a JSON file that is stored on IPFS, whose hash is referenced in the `snapshot` text record on cow.eth. The JSON file is managed in a [GitHub repository](https://github.com/cowprotocol/snapshot-settings).

:::

### ENS name controller

Snapshot spaces are tied to ENS names. In CoW DAO's case; [cow.eth](https://app.ens.domains/name/cow.eth/details). The method of assigning the ENS name controller is by adding the address of the desired controller to the `snapshot` text record.

### Roles

#### Super admin

The super admin is able to control all of the spaces' parameters including adding authors, admins, changing strategies etc. The super admin role is assigned by the ENS name controller and is [currently set](https://app.ens.domains/name/cow.eth/details) to the [CoW DAO main safe](https://app.safe.global/eth:0xcA771eda0c70aA7d053aB1B25004559B918FE662/home)

#### Regular admins

[Regular admins](https://snapshot.org/#/cow.eth/about) can do all of what the super admin can do except adding and removing admins. As of CIP-31 CoW DAO's snapshot space has no admins except the [CoW DAO main safe](https://app.safe.global/eth:0xcA771eda0c70aA7d053aB1B25004559B918FE662/home) as a super admin.

#### Moderators

Moderators can create and delete proposals but cannot change any space parameters. As of CIP-31, there are three community moderators responsible for removing spam proposals.

#### Authors

Authors cannot change any of the space parameters but they are able to create proposals.  As of CIP-31, there are no authors on CoW DAO's snapshot space. Anyone with at least 10K COW holding can create proposals on snapshot according the the [governance process](process). 

## Snapshot strategies

To ensure a democratic and fair voting process within the CoW DAO, the organization has implemented a comprehensive snapshot strategy. This strategy employs a multi-faceted approach to determine the voting power of each participant, utilizing a combination of eight strategies based on the balance of ERC20 COW and vCOW tokens across different chains and states of delegation. The following table outlines the strategies used:

| Strategy Number | Strategy Description | Token Type | Chain | Delegation Status |
|--- | --- | --- | --- | --- |
| 1 | Balance of ERC20s vCOW | vCOW | Ethereum Mainnet | No |
| 2 | Balance of ERC20s vCOW | vCOW | Gnosis Chain | No |
| 3 | Balance of delegated ERC20s vCOW | vCOW | Ethereum Mainnet | Yes |
| 4 | Balance of delegated ERC20s vCOW | vCOW | Gnosis Chain  | Yes |
| 5 | Balance of ERC20s COW | COW | Ethereum Mainnet | No |
| 6 | Balance of ERC20s COW | COW | Gnosis Chain  | No |
| 7 | Balance of delegated ERC20s COW | COW | Ethereum Mainnet | Yes |
| 8 | Balance of delegated ERC20s COW | COW | Gnosis Chain  | Yes  |

The aggregate voting power of a CoW DAO member is the sum of their balances across all eight strategies. This system ensures that every token, whether it is vCOW or COW, and regardless of its location or delegation status, contributes to the overall governance process. By accounting for both vested and liquid tokens, and considering their respective delegation choices, the CoW DAO captures a complete snapshot of an individual's vested interests and participation in the ecosystem. This comprehensive approach underlines the CoW DAO's commitment to an inclusive and representative governance structure, where each stakeholder's voice is heard and weighted accurately in the collective decision-making process.

To confirm, the current deployed voting strategies can be found [here](https://snapshot.org/#/cow.eth/about).
