---
sidebar_position: 5
---

# Milkman orders

Milkman is an order placement mechanism developed by [Yearn Finance](https://yearn.fi/) in collaboration with CoW Protocol through the [CoW DAO Grants program](https://grants.cow.fi/). 

The contract allows users to utilize a price feed for their orders rather than specifying a fixed price.
This means orders can execute at a fair market price even far into the future, making Milkman a popular choice for DAOs and governance-dependent trades. 

![Milkman Order Flow](/img/concepts/milkman-order-flow.png)

Let's say a DAO wants to sell 10,000 ETH from its treasury for USDC.
The DAO's governance process dictates that the trade must first be put to a vote, but this means that the price of ETH will fluctuate significantly from the time the proposal is created to the time the trade actually executes.

Rather than specifying a minimum fixed number of tokens they are willing to receive for their trade, users can utilize Milkman to specify a price feed (from an oracle source such as Chainlink, Tellor, or any custom on-chain data source) that will give the order a fair market price at the time of execution. 

Finally, once a user places a trade via Milkman, the order gets sent to the CoW Protocol order book where solvers pick it up and compete to find the best execution price for it. 

## Getting started

Milkman follows a UniswapV2-style interface. To interact with Milkman, smart contracts need only to call the following function:

```solidity
function requestSwapExactTokensForTokens(
	uint256 amountIn,
	IERC20 fromToken,
	IERC20 toToken,
	address to,
	address priceChecker,
	bytes calldata priceCheckerData
)
```

The priceChecker is the data feed provider, and priceCheckerData is an array of arbitrary bytes that the function passes to the price checker (e.g. the desired slippage tolerance).

Price checkers have been deployed for Chainlink, Curve, SushiSwap, Uniswap V2, Uniswap V3, and combinations of these. Deployment addresses can be found [here](https://github.com/cowdao-grants/milkman/blob/main/DEPLOYMENTS.md), and the core Milkman code can be found [here](https://github.com/cowdao-grants/milkman/blob/main/contracts/Milkman.sol). Anyone can run a [Milkman bot](https://github.com/cowprotocol/milkman-bot), which simply functions as a hook that watches for new swap requests and surfaces them to CoW Protocol. Running a bot is fairly easy if you have a Kubernetes cluster; the instructions are in the repo.
