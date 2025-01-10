---
sidebar_position: 3
---

# CoW AMM Liquidity for Solvers

## I'm a solver. How do I use CoW AMM liquidity?

CoW AMM orders already appear in the CoW Protocol orderbook, so you're already using its liquidity.
However, CoW AMMs allow solvers to specify custom buy and sell amounts, as long as the order preserves or increase the constant product invariant of the token reserves. 

CoW AMMs can be treated as a liquidity source akin to Uniswap or Balancer weighted pools with uniform weights.
Each CoW AMM is a pair that trades two tokens.

Importantly, surplus for a CoW AMM order is measured differently when computing the solver reward payout.

### Indexing Balancer CoW AMMs

CoW AMM pairs can be detected by listening to the `COWAMMPoolCreated` events emitted by the `BCowFactory` instance for the current chain (see the [official contract repository](https://github.com/balancer/cow-amm) for the current deployment addresses).
All addresses of Balancer CoW AMMs are sent as part of the auction instance as `surplusCapturingJitOrderOwners`.

The AMM reserves are the balance of the two tokens traded by the AMM.

### Creating CoW AMM orders with the helper contract

[The source code for the helper contract can be found here.](https://github.com/balancer/cow-amm/blob/main/src/contracts/BCoWHelper.sol) The `orderFromBuyAmount` and 'orderFromSellAmount' methods return the  order, preInteractions, postInteractions, and signature. This can be used to generate the order with the CoW AMM and check the prices that the CoW AMM would provide for the order you would like to settle.

Doing this will generate additional surplus in the solver competition. For example, if a solver would like to settle a user using outside liquidity that trades a pair for which there is a CoW AMM, then that solver can compare those prices with that of the CoW AMM. This (or part of this) interaction can then be replaced with the CoW AMM to generate additional surplus. This way the solver can integrate CoW AMMs by solving as if these CoW AMM's do not exist, and then check whether some of the outside interactions can be replaced by CoW AMMs (note: UPC and EBBO apply to CoW AMMs as well).

Another way that a solver can use CoW AMM's is by using outside liquidity from the competition/auction to trade with the CoW AMM, thereby re-balancing the AMM and receiving an additional surplus for doing so if the prices of the CoW AMM is off relative to the outside world.

The helper contracts are deployed here:
- [Mainnet](https://etherscan.io/address/0x03362f847b4fabc12e1ce98b6b59f94401e4588e#code)
- [Arbitrum](https://arbiscan.io/address/0xdb2aeab529c035469e190310def9957ef0398ba8#code)
- [Gnosis](https://gnosisscan.io/address/0xdb2aeab529c035469e190310def9957ef0398ba8#code)
- [Base](https://basescan.org/address/0x467665d4ae90e7a99c9c9af785791058426d6ea0#code)

### Settling a custom order

You need to choose a valid CoW Swap order with the following restrictions:

- `sellToken`: any token in the pair.
- `buyToken`: the other token in the pair.
- `receiver`: must be `RECEIVER_SAME_AS_OWNER` (zero address).
- `sellAmount`: any value.
- `buyAmount`: any value such that, after trading these exact amounts, the product of the token reserves is no smaller than before trading.
- `validTo`: at most 5 minutes after the block timestamp at execution time.
- `appData`: must be the value specified in `staticInput`.
- `feeAmount`: must be zero.
- `kind`: any value.
- `partiallyFillable`: any value.
- `sellTokenBalance`: must be `BALANCE_ERC20`.
- `buyTokenBalance`: must be `BALANCE_ERC20`.

:::note

The sell and buy amount specified are the limit amounts of the order. The actual executed amounts are determined using prices from the auction.
In that regard, CoW AMM orders behave exactly like normal trader orders.

:::

You also need to compute:
- the order hash `hash` as defined in the library `GPv2Order`, and
- the order signature

Example code that generates an order can be found in [the `order` function of the BCoWHelper contract](https://github.com/balancer/cow-amm/blob/04c915d1ef6150b5334f4b69c7af7ddd59e050e2/src/contracts/BCoWHelper.sol).

This order can be included in a batch as any other CoW Protocol orders with two extra conditions:
- One of the pre-interactions must set the commitment by calling `BCoWPool.commit(hash)`.
- Must contain at most one order from the AMM in the same batch.

::note

Solvers using the non co-located driver should add a [`JitTrade`](https://github.com/cowprotocol/services/blob/95ecc4e01b7fd06ec0b71c6486cb2cdd962e5040/crates/solvers/openapi.yml#L744C1-L774C52) and a [`preInteraction`](https://github.com/cowprotocol/services/blob/95ecc4e01b7fd06ec0b71c6486cb2cdd962e5040/crates/solvers/openapi.yml#L920C1-L925C46) to their solution.

::


### Surplus

The surplus for a CoW AMM order is measured the same way as other orders, by comparing the traded amounts to limit amounts.

When creating a CoW AMM order it is therefore encouraged to use the smallest possible limit amount which does not violate the invariant of the pool. 

If we call `X` (resp. `Y`) the reserves of sell (resp. buy) token, and `x` (resp. `y`) the executed sell (resp. buy) amount, then the minimal buy amount is `x Y / (X - x)`
and the order surplus with that choice for the limit amount is:
```
                 x Y
surplus =  y -  ----- .
                X - x
```

Maximizing this quantity will lead to the largest score in the solver competition.
