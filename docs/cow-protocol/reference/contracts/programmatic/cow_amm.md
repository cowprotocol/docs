---
sidebar_position: 1
---

# CoW AMM

CoW AMM is an automated market maker running on top of CoW Protocol.

## Overview

The AMM contract itself is a dedicated Safe multisig.
It stores reserves of two tokens and allows anyone to create orders between these two tokens on CoW Protocol as long as the trade doesn't decrease the product of the reserves stored on the contract.

The order is based on the Programmatic order framework: this repository only specifies the code needed for the dedicated handler and the related price oracles.
All the code for the `ComposableCoW` framework is [here](https://github.com/cowprotocol/composable-cow).

The AMM creates a CoW Protocol order at a regular time interval.
These orders are created with a dedicated contract function `getTradeableOrder`: it returns an order that can be traded in a way that tries to rebalance the AMM to align with the reference price of a price oracle.
These orders are provided for convenience to CoW Swap solvers so that basic CoW AMM usage does not need any dedicated implementation to tap into its liquidity.
More sophisticated solvers can create their own order to better suit the current market conditions.

The [watch tower](/cow-protocol/reference/contracts/periphery/composable-cow#watch-tower) is responsible for automatically creating the AMM order, without any necessity for the AMM to interact with the CoW Protocol API.

CoW AMM orders are executed in batches by CoW Protocol solvers.
Only one order per AMM can be executed per batch.

Further information on the theoretical research work that serves as the base of CoW AMM can be found in the paper [Arbitrageurs' profits, LVR, and sandwich attacks: batch trading as an AMM design response](https://arxiv.org/pdf/2307.02074.pdf).

Batch trading guarantees that despite the minimum viable order follows the constant-product curve (as it's the case for Uniswap v2) the surplus captured by CoW Protocol yields to a better execution price and thus higher profits for liquidity providers.

## Limitations

The current setup doesn't support pooling liquidity among different users at this point in time.
A new CoW AMM instance needs to be deployed every time a user wants to provide liquidity for a pair.
Native tokens must be wrapped before using them as a token in the pair.

## I'm a liquidity provider. How do I create my AMM?

Setting up a CoW AMM can be split in the following steps, which will be described in detail in their own section.

1. Deploy a [Safe](https://app.safe.global/).
2. Change the Safe's fallback handler to `ExtensibleFallbackHandler`.
3. Set the Safe's domain verifier for CoW Protocol to `ComposableCoW`.
4. Deposit and approve the tokens for trading on CoW Protocol.
5. Create the AMM order on `ComposableCoW`.

All these steps, with the exception of the data in the last one, aren't specific to the CoW AMM but are the same steps required for creating an order with the [`ComposableCoW`](https://github.com/cowprotocol/composable-cow) framework.

You can see an example of CoW AMM trading tokens COW/WETH at address [`0xBEEf5aFE88eF73337e5070aB2855d37dBF5493A4`](https://app.safe.global/transactions/history?safe=eth:0xBEEf5aFE88eF73337e5070aB2855d37dBF5493A4).
Example set-up transactions: [step 1](https://etherscan.io/tx/0xfb0d01c5edbf1dd80c3d9f8a54e9a4057db2419ec50045e32161044bab5a06f3), [step 2 to 4](https://app.safe.global/transactions/tx?safe=eth:0xBEEf5aFE88eF73337e5070aB2855d37dBF5493A4&id=multisig_0xBEEf5aFE88eF73337e5070aB2855d37dBF5493A4_0x2bb29ac594fd562981ac1221596ed6b471a459615bb3b8c8ebd403e9fad079af), [step 5](https://app.safe.global/transactions/tx?safe=eth:0xBEEf5aFE88eF73337e5070aB2855d37dBF5493A4&id=multisig_0xBEEf5aFE88eF73337e5070aB2855d37dBF5493A4_0x1651687da34e9a7039e3a41e81e90cde74c1bfeeb0c9ec3dac0b7432dcbb4300).

### Step 1: deploy a Safe

The CoW AMM funds will be stored in a Safe, and every pair of tokens requires its dedicated safe.
All interactions of the owner with the AMM will go through the Safe interface.
There are no requirements on the ownership structure of the Safe, but keep in mind that the owners have full access to the funds.

You can create a Safe following the instruction on [the dedicated page on the Safe interface](https://app.safe.global/new-safe/create).

You should not use this Safe for purposes other than running a CoW AMM: the token balances represent the state of the AMM and should not be altered outside of the normal AMM trading process.
The same Safe must **not** be used as the AMM for multiple simultaneous pairs.

### Step 2: switch to the extensible fallback handler

CoW Protocol supports validation of smart-contract orders via ERC-1271 signatures.
Signature verification for `ComposableCoW` orders (like the order used in the CoW AMM) is handled by a dedicated [fallback handler](https://help.safe.global/en/articles/40838-what-is-a-fallback-handler-and-how-does-it-relate-to-safe), the `ExtensibleFallbackHandler`.

You can find more details on the design of `ComposableCoW` in the [dedicated page of the CoW Protocol documentation](/cow-protocol/reference/contracts/periphery/composable-cow#conditional-order-verification-flow).

On the AMM Safe Wallet interface, create a new transaction on the transaction builder with the following parameters:
- Address: the address of the AMM Safe itself (confirm loading the implementation ABI once prompted)
- To Address: again, the address of the AMM Safe itself
- Contract Method selector: `setFallbackHandler`
- `handler`: the address of the `ExtensibleFallbackHandler` contract for the current chain (all addresses for each supported chain can be found in the [`ComposableCoW` contract repo](https://github.com/cowprotocol/composable-cow?tab=readme-ov-file#deployed-contracts))

### Step 3: set the domain verifier

This step is used to tell the extensible fallback handler to use `ComposableCoW` to verify CoW Protocol signatures.

You can find more details on the design of `ComposableCoW` in the [dedicated page of the CoW Protocol documentation](/cow-protocol/reference/contracts/periphery/composable-cow#conditional-order-verification-flow).

On the AMM Safe interface, create a new transaction on the transaction builder with the following parameters:
- Address: the address of the `ExtensibleFallbackHandler` contract for the current chain
- To Address: the address of the AMM Safe itself
- Contract Method selector: `setDomainVerifier`
- `domainSeparator`: the EIP-712 domain separator of the CoW Protocol settlement contract on the current chain (obtained by calling `domainSeparator()` on the chain's instance of the [settlement contract](https://github.com/cowprotocol/contracts/blob/main/networks.json); for example, on mainnet it can be retrieved from [Etherscan](https://etherscan.io/address/0x9008d19f58aabd9ed0d60971565aa8510560ab41#readContract#F2))
- `newVerifier`: the address of the `ComposableCoW` contract for the current chain (see the [`ComposableCoW` contract repo](https://github.com/cowprotocol/composable-cow?tab=readme-ov-file#deployed-contracts))

### Step 4: deposit and approve tokens

To approve the pair, call the `approve` function on each token for an unlimited amount (`115792089237316195423570985008687907853269984665640564039457584007913129639935`) and with CoW Protocol's vault relayer as the spender (see [contract repo's `networks.json`](https://github.com/cowprotocol/contracts/blob/main/networks.json) for the official deployment addresses).

To deposit the tokens into the CoW AMM, simply send the funds to the AMM Safe as you would do for any other Safe.

Caution: the funds must be sent before executing step 5.
Otherwise, the watch tower will encounter an error and stop posting orders to the CoW Protocol API. 
If this happened, you'd need to [recreate your order](#updating-the-amm) to restore automated trading.

### Step 5: order creation

A `ComposableCoW` order is created by calling the function `create(ConditionalOrderParams params, bool dispatch)` on the `ComposableCoW` main contract.

The conditional order parameters should be set as follows:
- `IConditionalOrder handler`: the address of the standard deployment of `ConstantProduct` for the desired chain. See file `networks.json` for a list of official deployments by chain id.
- `bytes32 salt`: this value is used to make the order unique. It's recommended to use a value that hasn't been used before for an order on the same safe. Note that it's discouraged to use the CoW AMM safe for other orders outside of setting up the AMM, in which case conflicts are not a concern.
- `bytes staticInput`: The configuration values for the CoW AMM. See next section for more details.

If `dispatch` is set to true, then the order will be automatically picked up on CoW Protocol's orderbook by the [watchtower service](https://github.com/cowprotocol/watch-tower).

#### ConstantProduct static input

The static input of the constant product handler comprises the following parameters:

- `IERC20 token0`: the first of the two tokens traded by the AMM.
- `IERC20 token1`: the second of the two tokens traded by the AMM.
- `uint256 minTradedToken0`: the minimum amount of token0 that needs to be traded for an order to be returned by `getTradeableOrder`. Order with lower traded amount can still be created manually.
- `IPriceOracle priceOracle`: the address of a contract that implements the generic price oracle interface.
  See the [section below](#supported-price-oracles) for more information on which price oracles are available.
- `bytes priceOracleData`: the extra oracle information needed to recover the price.
  See the section below for more information on how to set this value based on the chosen price oracle.
- `bytes32 appData`: The app data (as defined in a CoW Protocol order) that must be used for the order to be valid.

If Foundry is available in your system, you can generate the bytes calldata with the following command:
```sh
token0=0x1111111111111111111111111111111111111111
token1=0x2222222222222222222222222222222222222222
minTradedToken0=31337
priceOracle=0x1337133713371337133713371337133713371337
priceOracleData=0xca11d47a
appData=0x3232323232323232323232323232323232323232323232323232323232323232
cast abi-encode 'f((address,address,uint256,address,bytes,bytes32))' "($token0, $token1, $minTradedToken0, $priceOracle, $priceOracleData, $appData)"
```

## Supported price oracles

Price oracles are an abstraction that transform disparate on-chain price information into a standardized price source that can be used by the `ConstantFroduct` to retrieve token price information.

We support the following price oracles:
- `UniswapV2PriceOracle`, based on the limit price of a predefined Uniswap v2 pair.

Contract addresses for each supported chain can be found in the file `networks.json`.

### UniswapV2PriceOracle

The Uniswap v2 price oracle returns the limit price that can be computed from an address (pool) that supports the `IUniswapV2Pair` interface.
The oracle data contains a single parameter:
- `IUniswapV2Pair referencePair`: the address of a Uniswap pool for the tokens `token0` and `token1`.

Note that the order of the tokens does _not_ need to be consistent with the order of the tokens in the pool.
The order of the tokens in the constant product static input determines that the price is expressed in terms of amount of token0 per amount of token1.
If the tokens are not the same as those traded on the chosen reference pair, no order will be created.

If Foundry is available in your system, you can generate the bytes calldata with the following command:
```sh
referencePair=0x1111111111111111111111111111111111111111
cast abi-encode 'f((address))' "($referencePair)"
```

### BalancerWeightedPoolPriceOracle

The Balancer weighted pool price oracle returns the limit price that can be computed from one of the [Balancer weighted pool](https://docs.balancer.fi/concepts/pools/weighted.html) implementations.

The oracle data contains a single parameter:
- `bytes32 poolId`: the [Balancer pool id](https://docs.balancer.fi/reference/contracts/pool-interfacing.html#poolids) representing the weighted pool that will be used to compute the reference price.

The reference weighted pool can use any weights and token combination.
However, it must be a weighted pool and not a different pool type: there is currently no check in the smart contract to guarantee that the chosen pool is indeed a weighted pool. If used with a different type of pool, the output of the oracle is likely to be completely unreliable.

If the tokens in the AMM orders are not all included in the reference pool, then no order will be created.

If Foundry is available in your system, you can generate the bytes calldata with the following command:
```sh
poolId=0x1111111111111111111111111111111111111111111111111111111111111111
cast abi-encode 'f((bytes32))' "($poolId)"
```


## Stopping the AMM

To stop trading, it's sufficient to execute a single transaction to `ComposableCoW` to the function `remove(bytes32 singleOrderHash)`.

The input parameter `singleOrderHash` can be computed with the help of the view function `hash` in `ComposableCoW`.
Its input is the same as the parameters in call to `create` of [step 5](#step-5-order-creation).

You can verify that the hash is valid by querying the view function `singleOrders` on `ComposableCoW` with input the AMM Safe addess and the order hash.
The call returns `true` if the order is currently being traded and `false` after the call to `remove` has been executed.

On mainnet, you can compute the hash, as well as verify if the hash is valid, directly from Etherscan's contract [read contract page](https://etherscan.io/address/0xfdaFc9d1902f4e0b84f65F49f244b32b31013b74#readContract).

## Updating the AMM

To update the order parameters you should first [stop the AMM](#stopping-the-amm).

Then, you just need to repeat [step 5](#step-5-order-creation) of the initial setup using the new order parameters.
This leads to a single AMM transaction.
Remember to use a different value for the salt!

## Add funds after deployment

You can always deposit funds to the AMM Safe with simple transfers, both to add funds and to to rebalance the AMM manually.

Be careful: depositing funds changes the state of the AMM.
It's very important that you transfer both tokens at the same time with no side effects. If only one token transfer is executed, the AMM will be unbalanced until the second transfer is executed, causing the AMM to trade at an unfavorable price. 
