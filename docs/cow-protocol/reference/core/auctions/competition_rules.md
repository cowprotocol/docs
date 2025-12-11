---
id: competition-rules
sidebar_position: 2
---

# Solver competition rules

All solvers participating in the solver competition must abide by certain rules. In this section, we outline all these rules. They naturally split into three classes:

1. Those enforced explicitly by the [smart contract](#smart-contract)
2. Those enforced by the [off-chain protocol](#off-chain-protocol) infrastructure
3. So-called social consensus rules enforced by [governance](#governance)

## Smart contract

- Limit price constraint: this rule enforces that an order cannot be executed if its limit price is violated.
- Solver submitting a transaction needs to be whitelisted (the process about how a solver can get whitelisted is described [here](/cow-protocol/reference/core/auctions/bonding-pools)).

## Off-chain protocol

- Scores: Every solution is associated with a _score_. The score is computed from executed amounts of all trades and is roughly equivalent to the amount of surplus a solution generates for users. For concrete formulas see [the section on solving](the-problem) or [CIP-38](https://snapshot.box/#/s:cow.eth/proposal/0xfb81daea9be89f4f1c251d53fd9d1481129b97c6f38caaddc42af7f3ce5a52ec) and [CIP-65](https://snapshot.box/#/s:cow.eth/proposal/0xd172281444c48254398881c57a57a2acbf0802a385e6c94384fd358b943aa4f4).

- Valid solutions: A solution is _valid_ if:
  - it has a positive score; and
  - respects Uniform Directional Clearing Prices (UDCP): all orders trading the same tokens in the same direction must receive the same price (with an exception for orders containing hooks to account for the cost of gas). Importantly, each solution must respect UDCP, but there is no obligation to respect UDCP across solutions, even if submitted by the same solver.

- Winner selection: The set of winning solutions (and corresponding winning solvers) is chosen using a _Fair Combinatorial Auction_ (see [CIP-67](https://snapshot.box/#/s:cow.eth/proposal/0xf9ecb08c4738f04c4525373d6b78085d16635f86adacd1b8ea77b2c176c99d32)) from all valid solutions. Each solution corresponds to a bid in the auction.
  - The protocol first considers bids containing only orders on the same _directed token pair_, i.e., on the same token pair and in the same direction, and computes the best bid on each directed token pair, where the best bid is the one generating the highest score. The collection of these best bids is the reference outcome for each directed token pair, representing the best possible execution against outside liquidity.
  - The protocol then uses the reference outcome to filter out _unfair_ bids from the remaining batched bids (batched because, by definition, they contain orders on multiple directed token pairs). A batched bid is filtered out whenever it generates lower score for a given directed token pair than the reference outcome.
  - In the final step, the protocol considers all the batched bids that survived the filtering and the best bids on individual directed token pairs. It computes the collection of winning bids, under the constraint that all orders on the same directed token pair must be part of the same winning bid.
  Winning solvers are rewarded according to a second-price auction mechanism; for more information see the [rewards section](rewards).

- Valid settlements: A settlement executed on-chain is _valid_ if:
  - The solution was selected as winner and is executed as specified in the bidding stage with respect to solver, score, and executed amounts.
  - Hooks of executed trades, as specified in app data of respective orders, are executed according to the following rules:
    1. Pre-hooks need to be executed before pulling in user funds
    2. Post-hooks need to be executed after pushing out user order proceeds
    3. Partially fillable orders:
      1. Should execute the pre-hooks on the first fill only
      2. Should execute the post-hooks on every fill
    4. Execution of a hook means:
      1. There exists an internal CALL in the settlement transaction with a
      matching triplet: target, gasLimit, calldata
      2. The hook needs to be attempted, meaning the hook reverting is not violating any rules
      3. Intermediate calls between the call to settle and hook execution must not revert
      4. The available gas forwarded to the hook CALL is greater or equal than specified gasLimit
  - The settlement is executed before or at the deadline of that auction.
  Not following these rules can result in immediate denylisting of a solver until a manual inspection is executed. These rules are currently implemented in the [circuit-breaker-validator](https://github.com/cowprotocol/circuit-breaker-validator).

- Buffer usage: solvers are allowed to use funds in the settlement contract for certain types of use cases.
  - Solvers are supposed to store _protocol and partner fees_ in the settlement contract.
  - Solvers are allowed to store funds to cover _network fees_ in the contract.
  - Solvers are allowed to use funds in the settlement contract to offset price variations on liquidity sources, also referred to as _slippage_.
  - Solvers are allowed to use funds in the settlement contract for executing trades, also referred to as _internalizations_, if the token which accumulates in the contract is among a [list of allowlisted tokens](https://files.cow.fi/token_list.json).
  Solvers bear responsibility for all changes to balances of the settlement contract. The concrete implementation of buffer accounting is described in the [accounting section](accounting).


:::note

The deadline for solutions depends on the network and is set as a specific number of blocks after the current block at the time of sending the settle request to the solver:

- Mainnet: 3 blocks
- Arbitrum: 40 blocks
- Gnosis chain: 5 blocks
- Base: 20 blocks
- Avalanche: 20 blocks
- Polygon: 20 blocks
- Lens: 40 blocks
- BNB: 40 blocks
- Linea: 20 blocks
<!-- Blocks defined here https://github.com/cowprotocol/infrastructure/blob/staging/services/autopilot/config/index.ts#L21 -->

:::

## Governance

Social consensus rules are not enforced by the smart contract or the autopilot. However, by voting on them in a CoW Improvement Proposal (CIP), CoW DAO has decided that these rules should be followed to ensure a healthy competition. For that, the core team has developed monitoring tools that check every on-chain settlement and flag suspicious ones.

:::caution

At CoW DAO's discretion, systematic violation of these rules may lead to penalizing or slashing of the offending solver.

:::

- Provision of unfair solutions ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Uniform directional clearing prices computed by solvers should be in line (or even better) than what the users would get elsewhere. This becomes particularly relevant for solutions where CoWs happen, i.e., when some volume is settled as part of a CoW and not by routing through an AMM. This rule is often referenced as "EBBO" (Ethereum Best Bid and Offer), and the AMMs that "should" be considered by solvers when computing an execution route for an order are referenced as "Baseline liquidity". Baseline liquidity is defined with a set of protocols and a set of so-called base tokens, such that for every protocol and every order, the following pairs are considered:

  - sell token / base token
  - buy token / base token
  - sell token / buy token

  ### Base protocols and tokens

  The following detail sections list the protocols and base tokens that are considered for Ethereum Mainnet and Gnosis Chain:

  <details>
    <summary>Ethereum mainnet baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v2/v3, Sushiswap, Swapr, Balancer v2, Pancakeswap
  - **Base tokens**: [`WETH`](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), [`DAI`](https://etherscan.io/token/0x6B175474E89094C44Da98b954EedeAC495271d0F), [`USDC`](https://etherscan.io/token/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48), [`USDT`](https://etherscan.io/token/0xdAC17F958D2ee523a2206206994597C13D831ec7), [`COMP`](https://etherscan.io/token/0xc00e94Cb662C3520282E6f5717214004A7f26888), [`MKR`](https://etherscan.io/token/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2), [`WBTC`](https://etherscan.io/token/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599), [`GNO`](https://etherscan.io/token/0x6810e776880C02933D47DB1b9fc05908e5386b96)
  </details>

  <details>
    <summary>Gnosis Chain baseline protocols and tokens</summary>

  - **Protocols**: Honeyswap, Sushiswap, Baoswap, Swapr, Balancer v2
  - **Base tokens**: [`WXDAI`](https://gnosisscan.io/token/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d), [`HNY`](https://gnosisscan.io/token/0x71850b7e9ee3f13ab46d67167341e4bdc905eef9), [`USDT`](https://gnosisscan.io/token/0x4ECaBa5870353805a9F068101A40E0f32ed605C6), [`USDC`](https://gnosisscan.io/token/0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83), [`sUSD`](https://gnosisscan.io/token/0xB1950Fb2C9C0CbC8553578c67dB52Aa110A93393), [`WBTC`](https://gnosisscan.io/token/0x8e5bbbb09ed1ebde8674cda39a0c169401db4252), [`GNO`](https://gnosisscan.io/token/0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb), [`STAKE`](https://gnosisscan.io/token/0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e), [`xOWL`](https://gnosisscan.io/token/0x0905Ab807F8FD040255F0cF8fa14756c1D824931), [`WETH`](https://gnosisscan.io/token/0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1), [`wstETH`](https://gnosisscan.io/address/0x6c76971f98945ae98dd7d4dfca8711ebea946ea6), [`sDAI`](https://gnosisscan.io/address/0xaf204776c7245bf4147c2612bf6e5972ee483701), [`USDC.e`](https://gnosisscan.io/address/0x2a22f9c3b484c3629090FeED35F17Ff8F88f76F0)
  </details>

  <details>
    <summary>Arbitrum baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v2/v3, Sushiswap, Swapr, Balancer v2, Pancakeswap
  - **Base tokens**: [`WETH`](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1), [`USDC`](https://arbiscan.io/token/0xaf88d065e77c8cc2239327c5edb3a432268e5831), [`USDT`](https://arbiscan.io/token/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9), [`DAI`](https://arbiscan.io/token/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1), [`GNO`](https://arbiscan.io/token/0xa0b862f60edef4452f25b4160f177db44deb6cf1)
  </details>

  <details>
    <summary>Base chain baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v2/v3, Balancer v2
  - **Base tokens**: [`WETH`](https://basescan.org/address/0x420000000000000000000000000000000000000), [`USDC`](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913), [`DAI`](https://basescan.org/address/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb)
  </details>

  <details>
    <summary>Avalanche chain baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v2/v3, Balancer v2
  - **Base tokens**: [`WAVAX`](https://snowscan.xyz/address/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7), [`USDC`](https://snowscan.xyz/address/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e), [`USDT`](https://snowscan.xyz/address/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7)
  </details>

  <details>
    <summary>Polygon chain baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v2/v3, Balancer v2
  - **Base tokens**: [`WPOL`](https://polygonscan.com/address/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270), [`USDC`](https://polygonscan.com/address/0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359), [`USDT`](https://polygonscan.com/address/0xc2132d05d31c914a87c6611c10748aeb04b58e8f)
  </details>

  <details>
    <summary>Lens chain baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v3
  - **Base tokens**: [`WGHO`](https://explorer.lens.xyz/address/0x6bdc36e20d267ff0dd6097799f82e78907105e2f), [`USDC`](https://explorer.lens.xyz/address/0x88f08e304ec4f90d644cec3fb69b8ad414acf884), [`WETH`](https://explorer.lens.xyz/address/0xe5ecd226b3032910ceaa43ba92ee8232f8237553), [`BONSAI`](https://explorer.lens.xyz/address/0xb0588f9a9cade7cd5f194a5fe77acd6a58250f82)
  </details>

  <details>
    <summary>BNB chain baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v2/v3, Pancake Swap
  - **Base tokens**: [`WBNB`](https://bnbscan.com/address/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c), [`BUSD`](https://bnbscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56), [`USDT`](https://bnbscan.com/address/0x55d398326f99059ff775485246999027b3197955), [`WETH`](https://bnbscan.com/address/0x2170ed0880ac9a755fd29b2688956bd959f933f8)
  </details>

  <details>
    <summary>Linea chain baseline protocols and tokens</summary>

  - **Protocols**: Uniswap v3
  - **Base tokens**: [`WETH`](https://lineascan.build/token/0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f), [`USDC`](https://lineascan.build/token/0x176211869ca2b568f2a7d4ee941e073a821ee1ff), [`USDT`](https://lineascan.build/token/0xa219439258ca9da29e9cc4ce5596924745e12b93)

  </details>

More details about how a certificate of an EBBO violation is computed, and what are the steps taken in case such a violation occurs can be found in [this](ebbo-rules) section.


- Inflation of the score ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Using tokens for the sole purpose of inflating the score of a solution or maximizing the reward is forbidden (e.g., by creating fake tokens, or wash-trading with real tokens).

- Illegal use of internal buffers ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). The internal buffers may only be used to replace legitimate AMM interactions available to the general public for the purpose of saving transaction costs, and also to allow for the successful execution of settlements that incur some slippage. However, systematic and intentional buffer trading with tokens that are not safe, although will be accounted for as slippage, is discouraged as it poses a significant inventory risk to the protocol, and solvers that do so can be flagged and potentially slashed. In general, any attack vector to the internal buffers that is created by a solver can be considered a malicious and illegal behavior.

- Local Token Conservation, aka illegal surplus shifts ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Due to the nature of batching, a solver can intentionally transfer surplus among orders that share a common token. This is not allowed, and non-trivial surplus shifts can be penalized and can lead to solver slashing.

- Pennying/overbidding ([CIP-13](https://snapshot.org/#/cow.eth/proposal/0x812273c78abe1cea303d8381e1fb901a4cb701715fd24f4b769d0a0b3779b3e2)). Pennying or overbidding is the intentional inflation of the reported score, by a solver, with the hope that their solution will win and that solver rewards, and/or the possibility of positive slippage, will cover the loss that they seem to be committing to. Systematically doing so can lead to solver slashing.

- Other malicious behavior ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870)). Malicious solver behavior is not limited to the above examples. Slashing can still happen for other reasons where there is intentional harm caused to the user and/or the protocol at the discretion of the CoW DAO. A concrete example of such is a solver intentionally not including the [pre/post hooks](/cow-protocol/reference/core/intents/hooks) associated with an order.
