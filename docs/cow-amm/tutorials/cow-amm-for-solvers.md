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
