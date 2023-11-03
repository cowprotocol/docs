---
sidebar_position: 1
draft: true
---

# Create a solver

---
description: FINDING THE BEST TRADING PATHS/SCENARIOS WITH YOUR SOLVER
---

# Solver Workshop

Here is a full video tutorial/workshop on how to build your own solver

[https://youtu.be/ErPJthFGKrg](https://youtu.be/ErPJthFGKrg)\
\
At the heart of the CoW Protocol there are "solvers". In essence, a solver is a computer program that takes the orderbook as input, and computes the prices and traded amounts of all orders and liquidity sources (AMMs) that make the best possible overall trading experience. This problem, known as the batch auction problem, is an interesting and challenging optimization problem for which there is not a "perfect algorithm" for (and most likely will never be https://en.wikipedia.org/wiki/P\_versus\_NP\_problem).

In the spirit of decentralization, in CoW Protocol multiple independent solvers compete for finding the best solution to the batch auction problem. Every few seconds, a round of the competition takes place giving the participating solvers the chance to solve a batch reflecting the most recent orderbook state. The solver that outputs the \*best\* solution is rewarded, and thus its solution is the one to be settled on-chain.

This bounty aims at incentivizing the development of CoW Protocol solvers. More specifically, the challenge is to write a solver that finds good solutions to the batch auction problem. A good solution must comply with the solution specification, and should map to a good objective value - both of which will be formally verified by the CoW Swap driver.

There are different avenues to explore for designing a solver that is competitive, including, but not limited to,

\- Developing an efficient optimization algorithm

\- Identifying and solving special problem instances that are "easy" to solve.

\- Considering more liquidity sources (AMMs) in addition to those that are supplied.

\- Integrating external dex-aggregators.

**References:**

- Set of problem instances and solutions, for testing the algorithm [http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com](http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com)
- CoW Swap driver, for simulating solutions onchain [https://github.com/gnosis/gp-v2-services](https://github.com/gnosis/gp-v2-services)
- Problem specification: [https://docs.cow.fi/off-chain-service...](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbHQwclY0N1puN2wtUUJEVzNkSmg3STdTUzdLQXxBQ3Jtc0trUnZZZXpVUG9VVTJvZXpXOGF5V21NNmRwdnBNSWZ6endDekZWbWpyUHhNM21JLXE3WmhBQ3dTanpXVnJDdngtTnVERTRNUjBDQ2k3ZUVpeTdpeVp3Nzhidm5lMFNsNU41bi1nRE9VWFV1ZkZDdlJpaw&q=https%3A%2F%2Fdocs.cow.fi%2Foff-chain-services%2Fin-depth-solver-specification)
- Batch auction MIP formulation: [https://github.com/gnosis/dex-researc...](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqblNILWswc0ZtY1M4bWhPQWhoV1k2LTNlUS1lUXxBQ3Jtc0ttVE9OOHlOOUNRRHlLT2RCOVhnX2hRTmx0MEI4azJzM3ZRZEx5N01yanY0SVRxV201SDFKUkhBcFh3SVJBMlAyaHAtZG4wN0N2VHBnR3ByX2U4dHdLSF90MUNCXy11Z3pZRk5LdjRSQk9QUDRCWWE0cw&q=https%3A%2F%2Fgithub.com%2Fgnosis%2Fdex-research%2Fblob%2Fmaster%2FBatchAuctionOptimization%2Fbatchauctions.pdf)
- Jupyter notebook with exercises: [http://shorturl.at/fnHW7](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbkZZb29SRHhBT09NM254X2IwY08ydnRoSFNsZ3xBQ3Jtc0trS0FzNmZ2SnRaakU1TEh5ODE3VndqcEN0cThYaG8wYWJtZm44YWxFRTFra0lxcExJQnFmdzlmWklmUDhUNndIR3pWOWdNX2swejBOQmd1QTRRNWR4bTBod3hKREp5LVRSaGdqOS14N2Q5WXNrZHU4MA&q=http%3A%2F%2Fshorturl.at%2FfnHW7)
- TEST instances: [https://drive.google.com/drive/folder...](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbEE2UklseU53RjBjdDRQdnNKZlBla3ZPV1pXd3xBQ3Jtc0ttbmRWTXJqMTFqZy1HMVUzT0FUYWpWNjhkOGYzTENYVkh0R3MxZTJ2bVJPbTA2NXhRbEZkM0NYcmFiSk1aNm9fcEU5RFB4ZDBFZ1h2VVlILVBvbG9iSUtyWnN3cTB2YVI1SHEtU1UwYVNqendQbnd6OA&q=https%3A%2F%2Fdrive.google.com%2Fdrive%2Ffolders%2F1TETEiaDcq3vqJU14WdQlsHiv9ljracjn%3Fusp%3Dsharing)\\

# How to write a solver

## This tutorial was fully composed by [poolpitako](https://twitter.com/poolpitako), link to the original tutorial doc can be found [here](https://hackmd.io/Qx3i17ZMRLSFFNyw0tn8sQ?view)

### Idea <a href="#idea" id="idea"></a>

I wanted to start with something super basic to understand all the moving pieces. In my example, I am going to build a solver for Yearn tokens. User has a token, let’s say, `USDC` and wants to buy `yvUSDC`. Right now, CoW Swap would need a LP `USDC/yvUSDC` to settle the trade, but what if the solver understands how to deposit into a yearn vault? ![:thinking_face:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/thinking_face.png)

### The Big Picture <a href="#the-big-picture" id="the-big-picture"></a>

CoW Swap infrastructure is a lot of services running together, which is a bit intimidating at the beginning. Here’s the ELI5 of how CoW Swap works and it’s entities.

#### The Orderbook <a href="#the-orderbook" id="the-orderbook"></a>

The orderbook is a service that uses a database to stores trades.\
When you go to [https://swap.cow.fi/](https://swap.cow.fi/#/1/swap/WETH?utm_source=docs.cow.fi&utm_medium=web&utm_content=write-solver-page) and create a trade, the website uses the orderbook API to add the trade to the database. If the trade is ready to go (it might be created but missing a signature), it will be listed in the `solvable_orders` endpoint.

#### The Driver <a href="#the-driver" id="the-driver"></a>

The driver is a polling service that queries the orderbook API for orders and tries to settle them using the different solvers. The driver calls different solvers by using an http API. The driver prunes the orderbook `solvable_orders` and sends orders, in json, to the different solvers. If a solver finds a solution to the batch, the driver executes the trade on chain.

#### Solver <a href="#solver" id="solver"></a>

The solver is a standalone service which receives a json with orders and tries to settle them.\
The settlement can be a list of actions which are executed by the settlement contract on chain.

**Warning**: I assume you have rust setup correctly with rustup.

### The most basic setup <a href="#the-most-basic-setup" id="the-most-basic-setup"></a>

Let’s start simple. Let’s first run a solver which solves a json we send by hand with curl.

Start by cloning [https://github.com/gnosis/cow-dex-solver](https://github.com/gnosis/cow-dex-solver)

cow-dex-solver will give you a good idea of how a solver service is architectured.\
You have a method called `solve()` which receives the batch `orders` and returns a `SettledBatchAuctionModel` aka a solution.

To run, exec:

```
cargo run -v
```

Once the service is running you can start throwing jsons at it.\
I started reading the code and playing with different json setups calling:

```
curl -vX POST "http://127.0.0.1:8000/solve" -H  "accept: application/json" -H  "Content-Type: application/json" --data "@/Users/user/dev/cow-dex-solver/sample.json"
```

You can get some inspiration from prod examples here:\
[http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com/index.html#data/prod/2022/01/](http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com/index.html#data/prod/2022/01/)

Make sure to test what happens when there is a COW ![:cow:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow.png)

### Settling Real Orders <a href="#settling-real-orders" id="settling-real-orders"></a>

Once I understood how a solver works, I wanted to solve a real order. To test this out without setting up the orderbook I used a little trick. I created an order in a production orderbook but I setup an impossible limit order. For that I used the staging orderbook in the gnosis-chain. I deployed a yvUSDC vault, and I created an LP USDC/yvUSDC in Honeyswap.

You have different options to create a limit oder:

- [https://docs.cow.fi/tutorials/cowswap-trades-with-a-gnosis-safe-wallet](https://docs.cow.fi/tutorials/cowswap-trades-with-a-gnosis-safe-wallet)
- [https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=https://barn.api.cow.fi/xdai](https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=https://barn.api.cow.fi/xdai)
- You call the api by hand

Here’s the example I created while testing:\
[https://barn.gnosis-protocol.io/gc/orders/0xcc37de3ba70474948f838e8b4af9c6b66577c08202323a4a3060a645b2918dae2813a7e97fd0bc1b80cb63afe136510d940ddc236208633c](https://barn.gnosis-protocol.io/gc/orders/0xcc37de3ba70474948f838e8b4af9c6b66577c08202323a4a3060a645b2918dae2813a7e97fd0bc1b80cb63afe136510d940ddc236208633c)

I am trading 10 USDC for 91.412 yvUSDC, which of course, will never settle by regular solvers since 1 `USDC == 1 yvUSDC` (price per share is 1).

Now that we have the real order, the orderbook will return it in the `solvable_orders` endpoint.\
To consume it, we will need to use the driver.

the cow-dex-solver repo now has a nice README with an explanation of how to run the driver:\
[https://github.com/gnosis/cow-dex-solver#how-to-run-simulations-together-with-the-cowswap-official-driver](https://github.com/gnosis/cow-dex-solver#how-to-run-simulations-together-with-the-cowswap-official-driver)

The way I was it running was:

```
cargo run -p solver --  --orderbook-url https://protocol-xdai.dev.gnosisdev.com \
     --base-tokens 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83 \
     --node-url "https://rpc.xdaichain.com" \
     --cow-dex-ag-solver-url "http://127.0.0.1:8000" \
    --solver-account 0x7942a2b3540d1ec40b2740896f87aecb2a588731 \
    --solvers CowDexAg \
    --transaction-strategy DryRun
```

A small explanation of the parameters:

- **orderbook-url**: points to the gnosis staging version
- **node-url** connects to gnosis-chain (VERY IMPORTANT, liquidity sources are based on this)
- **cow-dex-ag-solver-url** our running solver instance
- **solver-account** An address that has permissions to run txs in the settlement contract
- **solvers** just use our CowDexAg instance
- **transaction-strategy** DryRun will give us a tenderly link after running

If you got to this point, you have 99% of stuff you need to write your solver.\
Until the trade expires, the solver will always find the crazy limit order and send it to your solver. If the solver responds with a solution, the driver will spit out a tenderly link with the execution simulation.

### Full E2E testing <a href="#full-e2e-testing" id="full-e2e-testing"></a>

Is your solver working and you want to try a more real order?\
You will need to run your own orderbook. For that, you will need docker.\
Follow the steps at: [https://github.com/gnosis/gp-v2-services/#db-migrationinitialization](https://github.com/gnosis/gp-v2-services/#db-migrationinitialization)

I run my orderbook with:

```
cargo run --bin orderbook -- \
  --skip-trace-api true \
  --skip-event-sync \
  --base-tokens 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83 \
  --enable-presign-orders true \
  --node-url "https://rpc.xdaichain.com"
```

and created an order using [https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=http://localhost:8080](https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=http://localhost:8080)

The last step is connecting the driver to the new orderbook local service doing:

```
cargo run -p solver --  --orderbook-url http://localhost:8080 \
     --base-tokens 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83 \
     --node-url "https://rpc.xdaichain.com" \
     --cow-dex-ag-solver-url "http://127.0.0.1:8000" \
    --solver-account 0x7942a2b3540d1ec40b2740896f87aecb2a588731 \
    --solvers CowDexAg \
    --transaction-strategy DryRun
```

Full process will be:

- Orderbook at [http://localhost:8080](http://localhost:8080/) is returning your oder in the `solvable_orders` endpoint
- Driver will fetch orders from your orderbook and query your
- Solver at [http://localhost:8000](http://localhost:8000/)

### My solver code <a href="#my-solver-code" id="my-solver-code"></a>

I forked cow-dex-solver and wrote my first lines of rust.\
You can checkout my solver’s code at:\
[https://github.com/poolpitako/cow-dex-solver/pull/1](https://github.com/poolpitako/cow-dex-solver/pull/1)

### Conclusion <a href="#conclusion" id="conclusion"></a>

While there are several services you need to run for an e2e testing, I gotta say I enjoyed developing this prototype. I believe that in the future CoW Swap will not only be used for regular trades but it will be used for settling positions. Want to add liquidity to a curve pool in a single click? Go to CoW Swap. Want to swap your DAI for two yearn vault positions, go to CoW Swap.\
![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png)

# How to test a solver locally

In this short tutorial, we describe the steps needed in order to set up the _Driver_ locally and allow a custom _Solver_ to interact with it.

### Installing Rust

The first step is to install Rust by using the Rustup tool. We strongly encourage the reader to follow the steps described here:

[https://www.rust-lang.org/learn/get-started](https://www.rust-lang.org/learn/get-started)

Once we are done with the installation, we turn to the Driver setup.

### Driver setup

Reading the state of the blockchain requires issuing RPC calls to an Ethereum node. The simplest way to do so is by using a third party service like [Infura](https://infura.io/) to get access to an Ethereum node; thus, in this tutorial we use Infura. After registering for a free Infura account, Infura offers "endpoints" for the Mainnet and different testnets. We will refer to those as node-urls. Since the CoW Protocol only runs on Mainnet, Rinkeby and GnosisChain, we need to select one of those.

In order to start the Driver, we can execute the following command in a terminal:\
\
`cargo run -p solver -- --orderbook-url` [`https://api.cow.fi/mainnet`](https://api.cow.fi/mainnet)\`\`\
`--node-url "https://mainnet.infura.io/v3/<INFURA_KEY>"`\
`--cow-dex-ag-solver-url "http://127.0.0.1:8000"`\
`--solver-account 0xa6DDBD0dE6B310819b49f680F65871beE85f517e`\
`--solvers CowDexAg`\
`--transaction-strategy DryRun`

where the `INFURA_KEY` entry should be replaced with the key associated with our Infura account.

We clarify that the `cow-dex-ag-solver-url` is just a placeholder flag that indicates where the http solver (i.e., a custom solver) receives requests (which, in our case, will be a localhost server whose IP address is the standard 127.0.0.1), and the `CowDexAg` is just a dummy name for the solver we will use. These should not be edited!

### Solver deployment

Once the Driver is running, we can now locally deploy our solver server so that it can receive the instances from the Driver, solve them, and then report back the solution to the Driver. The solver receives the instance in JSON format (as described [here](../in-depth-solver-specification/)) via an HTTP Get request, solves the instance and then, via an HTTP POST request, sends the solution (again in JSON format) to the Driver.

An example of a publicly available solver, namely the Dex Cow Solver, can be found here:

[https://github.com/gnosis/cow-dex-solver](https://github.com/gnosis/cow-dex-solver)

You can follow the simple instructions of the Dex Cow Solver to locally deploy that particular solver.

For potential questions/issues regarding the testing of solvers, we also encourage everyone to contact our team in the CoW Swap Discord: [https://discord.com/invite/cowprotocol](https://discord.com/invite/cowprotocol)\
\\



## Getting notified about the ranking

A very useful functionality provided by the driver is the "notify" endpoint, which notifies all solvers participating in an auction about the ranking, once the bidding has closed, i.e., once all solutions have been submitted and have been ranked. (To find out about how solutions are ranked, see [this](https://docs.cow.fi/off-chain-services/in-depth-solver-specification/solver-auction-and-rewards) section).

The implementation details of the notify endpoint can be found in this PR:
[https://github.com/cowprotocol/services/pull/684](https://github.com/cowprotocol/services/pull/684)

which describes the callback that the driver does to the solvers once the ranking is complete.

This is very useful both for debugging purposes (as the endpoint also reveals whether the solution failed to simulate) and for interacting with private liquidity quotes that can be immediately "released", once the solver is notified that they did not win the auction.

## Sample Test Instances

In this section, we provide sample instances following the json format described in the previous sections, along with the optimal solution, again in the appropriate json format. These can be used for testing purposes while developing a solver. We clarify that the solutions provided are optimal up to a very small factor (caused by rounding very small amounts).

- [Single order Instances](https://drive.google.com/file/d/1VIfuMVOG62bFHHbXAEOCtPG4ZTRiPi3O/view?usp=sharing)
- [Multiple-orders on single token pairs Instances](https://drive.google.com/file/d/13RaEsDaqt7IHnLcEefFLj_yPIrlJHYX7/view?usp=sharing)
- [Multiple orders on multiple token pairs Instances](https://drive.google.com/file/d/10RuJ93gHwo5uBZ6xST4k7-UMTlXBbmj-/view?usp=sharing)
- [Example Instance with solution containing calldata](https://drive.google.com/file/d/1sOXd8t4dfckVxAMz2TAnsisUve3M6iiG/view?usp=sharing)

In general, the instance json's of all recent auctions can be found in the following links:
- [prod] https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/$AUCTION_ID.json
- [barn] https://solver-instances.s3.eu-central-1.amazonaws.com/staging-mainnet/$AUCTION_ID.json

In the above urls, one needs to replace the $AUCTION_ID with an actual auction_id. As a clarifcation, each auction taking place has a unique identifier that determines it. The easiest way to recover the id of an auction that resulted in a settlement taking place onchain is to start from the tx hash of the settlement, and use the competition endpoint to recover this id. Here is one such example.

Here is a tx hash of a settlement that was executed onchain.

0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240

Starting from this hash, we can use the competition endpoint:

[https://api.cow.fi/mainnet/api/v1/solver_competition/by_tx_hash/0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240](https://api.cow.fi/mainnet/api/v1/solver_competition/by_tx_hash/0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240)

and then we can see that the auction id was 6462225. Note also that the competition endpoint reveals the calldata of all submitted solutions that successfully simulated and got ranked.

Using this id, we can now recover the instance.json of that auction:

[https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/6462225.json](https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/6462225.json)