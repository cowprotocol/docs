---
sidebar_position: 1
draft: true
---

# Create a solver

## Requirements

Creating a solver requires knowledge of:

- Programming
- Optimization algorithms; or
- An easy route / path that is not yet used by the existing solvers

For the example below, we will use:

- Rust as the programming language
- Knowledge of a route that is not yet used by the existing solvers

## Idea

Let us consider the case of [Yearn](https://yearn.fi) tokens. A user has `USDC` and wants to buy `yvUSDC`. If no solver understands how to deposit into a yearn vault, all solutions from solvers will require an LP `USDC/yvUSDC` to settle the order. But, we know how to deposit into a yearn vault, so we can create a solver that understands how to do that.

:::tip Get the big picture

CoW Protocol infrastructure is a lot of services running together in herd harmony, which is a bit intimidating at the beginning. Before proceeding, it would be advisable to read the [architectural overview](/cow-protocol/reference/architecture) to get a better understanding of how CoW Protocol works and its entities.

:::

### Setup

:::caution

it is assumed you have rust setup correctly with `rustup`.

:::


Let’s start simple. Let’s first run a solver which solves a json we send by hand with curl.

Start by cloning [https://github.com/gnosis/cow-dex-solver](https://github.com/gnosis/cow-dex-solver)

cow-dex-solver will give you a good idea of how a solver service is architectured.
You have a method called `solve()` which receives the batch `orders` and returns a `SettledBatchAuctionModel` aka a solution.

To run, exec:

```
cargo run -v
```

Once the service is running you can start throwing jsons at it.
I started reading the code and playing with different json setups calling:

```bash
curl -vX POST "http://127.0.0.1:8000/solve" \
  -H  "accept: application/json" \
  -H  "Content-Type: application/json" \
  --data "@/Users/user/dev/cow-dex-solver/sample.json"
```

You can get some inspiration from prod examples here: (insert example)
[http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com/index.html#data/prod/2022/01/](http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com/index.html#data/prod/2022/01/)

Make sure to test what happens when there is a **COW**

### My solver code

I forked cow-dex-solver and wrote my first lines of rust.
You can checkout my solver’s code at:
[https://github.com/poolpitako/cow-dex-solver/pull/1](https://github.com/poolpitako/cow-dex-solver/pull/1)


## References

- Set of problem instances and solutions, for testing the algorithm
- [CoW Protocol driver](https://github.com/cowprotocol/services), for simulating solutions on-chain.
- Problem specification
- [Batch auction MIP formulation](https://github.com/gnosis/dex-research/blob/master/BatchAuctionOptimization/batchauctions.pdf)

