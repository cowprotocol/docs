---
sidebar_position: 2
---

# Token

At the core of CoW Protocol lies the COW token, which serves as a governance token within the CoW Protocol ecosystem, allowing stakeholders to participate directly in the decision-making processes that guide the protocol's development and evolution. The governance framework is designed to align incentives between the protocol's users, developers, and supporters, creating a robust and community-driven governance system.

### Contract Address

#### `COW` - Main token

| **Chain**    | **COW Token Address**                                                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum     | [`0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB`](https://etherscan.io/token/0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB)                     |
| Gnosis Chain | [`0x177127622c4a00f3d409b75571e12cb3c8973d3c`](https://gnosisscan.io/token/0x177127622c4a00f3d409b75571e12cb3c8973d3c) [^bridgedTokens]   |
| Arbitrum One | [`0xcb8b5cd20bdcaea9a010ac1f8d835824f5c87a04`](https://arbiscan.io/token/0xcb8b5cd20bdcaea9a010ac1f8d835824f5c87a04) [^bridgedTokens]     |
| Base         | [`0xc694a91e6b071bf030a18bd3053a7fe09b6dae69`](https://basescan.org/token/0xc694a91e6b071bf030a18bd3053a7fe09b6dae69) [^bridgedTokens]    |
| Polygon      | [`0x2f4efd3aa42e15a1ec6114547151b63ee5d39958`](https://polygonscan.com/token/0x2f4efd3aa42e15a1ec6114547151b63ee5d39958) [^bridgedTokens] |
| Avalanche    | N/A                                                                                                                                       |
| Lens         | N/A                                                                                                                                       |
| BNB          | [`0x5bfdaa3f7c28b9994b56135403bf1acea02595b0`](https://bscscan.com/token/0x5bfdaa3f7c28b9994b56135403bf1acea02595b0)                      |
| Linea        | N/A                                                                                                                                       |
| Plasma       | N/A                                                                                                                                       |

[^bridgedTokens]:
    These contracts were not developed nor deployed by CoW DAO, however, they are the bridged versions of the canonical token from Ethereum, using the official bridges.
    [Omni bridge](https://gnosisscan.io/address/0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d#code) for Gnosis Chain, [Arbitrum One bridge](https://arbiscan.io/address/0x09e9222e96e7b4ae2a407b98d48e330053351eee#code) for Arbitrum one, [Superbridge](https://basescan.org/tx/0xf76a915b7db279a4e559dbc382462e23cb63615f3d3a87ddf36bd96cedf4ca56) for Base, and [Polygon Bridge](https://portal.polygon.technology/bridge) for Polygon.

#### `vCOW` - Vesting token

| **Chain**    | **vCOW Token Address**                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Ethereum     | [`0xD057B63f5E69CF1B929b356b579Cba08D7688048`](https://etherscan.io/token/0xD057B63f5E69CF1B929b356b579Cba08D7688048)  |
| Gnosis Chain | [`0xc20C9C13E853fc64d054b73fF21d3636B2d97eaB`](https://gnosisscan.io/token/0xc20C9C13E853fc64d054b73fF21d3636B2d97eaB) |
| Arbitrum One | N/A                                                                                                                    |
| Base         | N/A                                                                                                                    |
| Avalanche    | N/A                                                                                                                    |
| Polygon      | N/A                                                                                                                    |
| Lens         | N/A                                                                                                                    |
| BNB          | N/A                                                                                                                    |
| Linea        | N/A                                                                                                                    |
| Plasma       | N/A                                                                                                                    |

## Supply & Inflation Schedule

The COW token is engineered to support the long-term sustainability and autonomy of CoW Protocol. The maximum inflation rate is capped at 3% per annum, and any inflationary measures can only be enacted with a minimum frequency of once every 365 days. This cautious approach to inflation ensures that any increase in the token supply is both measured and deliberate, guarding against the potential dilutive effects of unchecked token issuance.

## How many tokens were issued?

There were 1 billion tokens issued during the TGE.

## How were tokens distributed?

The allocation of the initial 1 Billion COW token supply is as follows:

- CoW DAO Treasury: 44.4%. This significant share underscores the community's central role in the protocol's ongoing development and maintenance.

- Team: 15%, rewarding the individuals who have built and continue to enhance the CoW Protocol.

- GnosisDAO: 10%, recognizing their partnership and collaboration in the CoW Protocol venture.

- CoWmunity Airdrop: 10%, ensuring that early users and contributors are acknowledged and retained.

- CoWmunity Investment: 10%, as an option to increase early users' stakes on the protocol in exchange for a financial contribution to the protocol, fostering engagement and long-term commitment from the broader CoW Protocol community.

- CoW Advisory: 0.6%, rewarding strategic guidance and expertise provided to the protocol.

- Investment Round: 10%, providing necessary funding and financial support for the protocol's growth.

## The difference between COW and vCOW

vCOW is a separate token contract with token holders that was issued during the TGE. The contract exposes a “swap” function allowing the conversion of vCOW into COW at 1:1.

vCOW tokens are a virtual representation of the [CoW Protocol](https://docs.cow.fi/governance/token)'s core token, COW, used to incentivize long-term engagement by certain stakeholders like advisors, team members, and early investors.

vCOW tokens are subject to a vesting schedule, unlocking linearly over a period of 4 years that starts at the time of deployment.

## How does vCOW affect the circulating supply of COW Tokens?

Historically, all vCOW was excluded from circulating supply, but as the amount of vested - and thus claimable - tokens is growing, we have updated our API to include how much vCOW is now swappable.

The updated API now includes vested - yet unclaimed - vCOW tokens. This offers a more accurate representation of the circulating supply as vested vCOW tokens can be converted to COW any moment by their holders.

## How is the circulating supply calculated?

The current formula CoW DAO uses to calculate circulating token supply is the following:

Circulating Supply = Total Supply - Unvested Tokens - DAO Treasury Holdings

Here's what each of those components means:

1. Total Supply (1 Billion COW)

This is the maximum number of COW tokens that will ever exist. For CoW Protocol, that number is fixed at 1,000,000,000 COW.

This is the starting point of the calculation-but not all of those tokens are active or tradeable yet.

1. Unvested COW Tokens

These are tokens that have been allocated (to team members, contributors, advisors, etc.) but are locked and not yet available for use or sale.

Vesting schedules are a common mechanism in crypto projects to align long-term incentives. For example, a team member might receive COW tokens on a 4-year vesting schedule, meaning those tokens unlock gradually over time.

These are tokens that have been allocated (to team members, investors, advisors, etc.) but are not yet vested and therefore not yet available for use or sale.

1. DAO Treasury Holdings

The DAO treasury holds a significant portion of the token supply for long-term governance, ecosystem growth, partnerships, and grants. These tokens are not circulating because they're not in the hands of individual users or entities who can trade them freely.

Even if the DAO eventually allocates these tokens (via votes, incentive programs, etc.), until that happens, they're considered non-circulating.
