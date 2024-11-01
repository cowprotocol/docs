---
sidebar_position: 2
---

# Token

At the core of CoW Protocol lies the COW token, which serves as a governance token within the CoW Protocol ecosystem, allowing stakeholders to participate directly in the decision-making processes that guide the protocol's development and evolution. The governance framework is designed to align incentives between the protocol's users, developers, and supporters, creating a robust and community-driven governance system.

### Contract Address

#### `COW` - Main token

| **Chain**    | **COW Token Address**                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum     | [`0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB`](https://etherscan.io/token/0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB)                   |
| Gnosis Chain | [`0x177127622c4a00f3d409b75571e12cb3c8973d3c`](https://gnosisscan.io/token/0x177127622c4a00f3d409b75571e12cb3c8973d3c) [^bridgedTokens] |
| Arbitrum One | [`0xcb8b5cd20bdcaea9a010ac1f8d835824f5c87a04`](https://arbiscan.io/token/0xcb8b5cd20bdcaea9a010ac1f8d835824f5c87a04) [^bridgedTokens]   |
| Base         | [`0xc694a91e6b071bf030a18bd3053a7fe09b6dae69`](https://basescan.org/token/0xc694a91e6b071bf030a18bd3053a7fe09b6dae69) [^bridgedTokens]  |

[^bridgedTokens]:
    These contracts were not developed nor deployed by CoW DAO, however, they are the bridged versions of the canonical token from Ethereum, using the official bridges.
    [Omni bridge](https://gnosisscan.io/address/0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d#code) for Gnosis Chain, [Arbitrum One bridge](https://arbiscan.io/address/0x09e9222e96e7b4ae2a407b98d48e330053351eee#code) for Arbitrum one and [Superbridge](https://basescan.org/tx/0xf76a915b7db279a4e559dbc382462e23cb63615f3d3a87ddf36bd96cedf4ca56) for Base.

#### `vCOW` - Vesting token

| **Chain**    | **vCOW Token Address**                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Ethereum     | [`0xD057B63f5E69CF1B929b356b579Cba08D7688048`](https://etherscan.io/token/0xD057B63f5E69CF1B929b356b579Cba08D7688048)  |
| Gnosis Chain | [`0xc20C9C13E853fc64d054b73fF21d3636B2d97eaB`](https://gnosisscan.io/token/0xc20C9C13E853fc64d054b73fF21d3636B2d97eaB) |
| Arbitrum One | N/A                                                                                                                    |
| Base         | N/A                                                                                                                    |

## Supply & Inflation Schedule

The COW token is engineered to support the long-term sustainability and autonomy of the CoW Protocol. The maximum inflation rate is capped at 3% per annum, and any inflationary measures can only be enacted with a minimum frequency of once every 365 days. This cautious approach to inflation ensures that any increase in the token supply is both measured and deliberate, guarding against the potential dilutive effects of unchecked token issuance.

:::tip

Inflation actions are **fully under the control of the CoW DAO**, which means that token holders have a direct say in the inflationary policies of the protocol. This grants the community a significant level of control over the token economy, ensuring that the interests of the CoW Protocol users and stakeholders remain at the forefront of governance decisions.

:::

:::note

To date, no inflationary measures have been enacted, and the current supply of COW tokens remains at 1 Billion.

:::

## Distribution

The initial distribution of COW tokens was executed with precision, aimed at establishing a balanced and sustainable ecosystem. The allocation of the initial 1 Billion COW token supply is as follows:

- **CoW DAO Treasury**: 44.4%. This significant share underscores the community's central role in the protocol's ongoing development and maintenance.
- **Team**: 15%, rewarding the individuals who have built and continue to enhance the CoW Protocol.
- **GnosisDAO**: 10%, recognizing their partnership and collaboration in the CoW Protocol venture.
- **CoWmunity Airdrop**: 10%, ensuring that early users and contributors are acknowledged and retained.
- **CoWmunity Investment**: 10%, as an option to increase early users' stakes on the protocol in exchange for a financial contribution to the protocol, fostering engagement and long-term commitment from the broader CoW Protocol community.
- **CoW Advisory**: 0.6%, rewarding strategic guidance and expertise provided to the protocol.
- **Investment Round**: 10%, providing necessary funding and financial support for the protocol's growth.

The distributed COW tokens in the form of vCOW for certain stakeholders (advisory, team, investment round, GnosisDAO, and community investment options) are subject to a vesting schedule, unlocking linearly over a period of 4 years that starts at the time of deployment. This vesting mechanism is designed to encourage long-term alignment between the stakeholders and the protocol's success, as the vCOW tokens are non-transferrable until they fully vest, ensuring that the interests of the token holders are closely tied to the health and prosperity of the CoW Protocol.
