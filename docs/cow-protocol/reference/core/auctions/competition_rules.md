---
id: competition-rules
sidebar_position: 2
---

# Solver competition rules

All solvers participating in the solver competition must abide by certain rules. In this section, we outline all these rules, which are naturally split into three classes:

1. Those enforced explicitly by the [smart contract](#smart-contract)
2. Those enforced by the [off-chain protocol](#off-chain-protocol) infrastructure
3. So-called social consensus rules enforced by [governance](#governance)

## Smart contract

- Limit price constraint: this rule enforces that an order cannot be executed if its limit price is violated.

## Off-chain protocol

- Uniform clearing prices (UCP): this rule is an integral component of the protocol, and specifies that there is one clearing price per token per batch.

- A solution is valid only if it contains at least one user order.

- Every solution is associated with a score, and the solutions are ranked in decreasing order of their scores. The solver whose solution has the highest positive score is declared the winner of the batch auction, and gets the right to execute its solution on-chain. Moreover, specifically for Ethereum Mainnet, the solver that provided the winning solution is also rewarded according to the rules specified in [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f). On the other hand, on Gnosis Chain solvers are not rewarded, and thus the score associated with a solution is simply equal to the quantity "surplus + fees - costs".

- Internalization of interactions (rule applies only on Ethereum Mainnet): a solver is allowed to "internalize" publicly available AMM interactions whose buy token (i.e., the token that the AMM buys) is classified as a "safe" token by the protocol. Concretely, if there is enough balance of the sell token of such an interaction in the settlement contract, then a solver can signal an internalization of such an interaction, which effectively means that the protocol is willing to market make with the same rate specified in this interaction. 

- [Slippage accounting](/cow-protocol/reference/core/auctions/slippage) (rule applies only on Ethereum Mainnet): With the exception of fees paid by users and internalized interactions, any token imbalance within the settlement contract that is the result of a settlement is accounted for under the term "slippage accounting", and is fully owned by the corresponding solver, as specified in [CIP-17](https://snapshot.org/#/cow.eth/proposal/0xf9c98a2710dc72c906bbeab9b8fe169c1ed2e9af6a67776cc29b8b4eb44d0fb2).

## Governance

Social consensus rules are not enforced by the smart contract or the autopilot. However, by voting on them in a CoW improvement proposal (CIP), CoW DAO has decided that these rules should be followed to ensure a healthy competition. For that, the core team has developed monitoring tools that check every single on-chain settlement and flag suspicious ones.

:::caution

At CoW DAO's discretion, systematic violation of these rules may lead to penalizing or slashing of the offending solver.

:::

- Provision of unfair solutions ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Uniform clearing prices computed by solvers should be in line (or even better) than what the users would get elsewhere. This becomes particularly relevant for solutions where CoWs happen, i.e., when some volume is settled as part of a CoW and not by routing through an AMM. This rule is often referenced as "EBBO" (Ethereum Best Bid and Offer), and the AMMs that "should" be considered by solvers when computing an execution route for an order are referenced as "Baseline liquidity". Baseline liquidity is defined with a set of protocols and a set of so-called base tokens, such that for every protocol and every order, the following pairs are considered:

  - sell token / base token
  - buy token / base token
  - sell token / buy token

  <a name="base_tokens"></a>The following detail sections list the protocols and base tokens that are considered for Ethereum Mainnet and Gnosis Chain:

  <details>
    <summary>Ethereum mainnet baseline protocols and tokens</summary>

    - **Protocols**: Uniswap v2/v3, Sushiswap, Swapr, Balancer v2
    - **Base tokens**: [`WETH`](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), [`DAI`](https://etherscan.io/token/0x6B175474E89094C44Da98b954EedeAC495271d0F), [`USDC`](https://etherscan.io/token/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48), [`USDT`](https://etherscan.io/token/0xdAC17F958D2ee523a2206206994597C13D831ec7), [`COMP`](https://etherscan.io/token/0xc00e94Cb662C3520282E6f5717214004A7f26888), [`MKR`](https://etherscan.io/token/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2), [`WBTC`](https://etherscan.io/token/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599), [`GNO`](https://etherscan.io/token/0x6810e776880C02933D47DB1b9fc05908e5386b96)
  </details>

  <details>
    <summary>Gnosis Chain baseline protocols and tokens</summary>

    - **Protocols**: Honeyswap, Sushiswap, Baoswap, Swapr, Balancer v2
    - **Base tokens**: [`WXDAI`](https://gnosisscan.io/token/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d), [`HNY`](https://gnosisscan.io/token/0x71850b7e9ee3f13ab46d67167341e4bdc905eef9), [`USDT`](https://gnosisscan.io/token/0x4ECaBa5870353805a9F068101A40E0f32ed605C6), [`USDC`](https://gnosisscan.io/token/0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83), [`sUSD`](https://gnosisscan.io/token/0xB1950Fb2C9C0CbC8553578c67dB52Aa110A93393), [`WBTC`](https://gnosisscan.io/token/0x8e5bbbb09ed1ebde8674cda39a0c169401db4252), [`GNO`](https://gnosisscan.io/token/0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb), [`STAKE`](https://gnosisscan.io/token/0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e), [`xOWL`](https://gnosisscan.io/token/0x0905Ab807F8FD040255F0cF8fa14756c1D824931), [`WETH`](https://gnosisscan.io/token/0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1)
  </details>

  <details>
    <summary>Arbitrum baseline protocols and tokens</summary>

    - **Protocols**:  Uniswap v2/v3, Sushiswap, Swapr, Balancer v2
    - **Base tokens**: [`WETH`](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1), [`USDC`](https://arbiscan.io/token/0xaf88d065e77c8cc2239327c5edb3a432268e5831), [`USDT`](https://arbiscan.io/token/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9), [`DAI`](https://arbiscan.io/token/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1), [`GNO`](https://arbiscan.io/token/0xa0b862f60edef4452f25b4160f177db44deb6cf1)
  </details>

More details about how a certificate of an EBBO violation is computed, and what are the steps taken in case such a violation occurs can be found in [this](/cow-protocol/reference/core/auction/ebbo_specifics.md) section.

- Inflation of the objective function ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Using tokens for the sole purpose of inflating the objective value or maximizing the reward is forbidden (e.g., by creating fake tokens, or wash-trading with real tokens).

- Illegal use of internal buffers ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). The internal buffers may only be used to replace legitimate AMM interactions available to the general public for the purpose of saving transaction costs, and also to allow for the successful execution of settlements that occur some slippage. However, systematic and intentional buffer trading with tokens that are not safe, although will be accounted for as slippage, is discouraged as it poses a significant inventory risk to the protocol, and solvers that do so can be flagged and potentially slashed. In general, any attack vector to the internal buffers that is created by a solver can be considered a malicious and illegal behavior.

- Local Token Conservation, aka illegal surplus shifts ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Due to the nature of batching, a solver can intentionally transfer surplus among orders that share a common token. This is not allowed, and non-trivial surplus shifts can be penalized and can lead to solver slashing.

- Pennying/overbidding ([CIP-13](https://snapshot.org/#/cow.eth/proposal/0x812273c78abe1cea303d8381e1fb901a4cb701715fd24f4b769d0a0b3779b3e2)) (rule applies only on Ethereum Mainnet). Pennying or the evolution of it in the context of CIP-20 known as overbidding, is the intentional inflation of the surplus, or the reported score, by a solver, with the hope that their solution will win and that solver rewards, and/or the possibility of positive slippage, will cover the loss that they seem to be committing to. Such behavior does not benefit anyone and thus, systematically doing so can lead to solver slashing.

- Other malicious behavior ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Malicious solver behavior is not limited to the above examples. Slashing can still happen for other reasons where there is intentional harm caused to the user and/or the protocol at the discretion of the CoW DAO. A concrete example of such is a solver intentionally not including the [pre/post hooks](/cow-protocol/reference/core/intents/hooks) associated with an order.
