---
sidebar_position: 2
---

# Test a solver

### Settling Real Orders

Once I understood how a solver works, I wanted to solve a real order. To test this out without setting up the orderbook I used a little trick. I created an order in a production orderbook, but I set up an impossible limit order. For that I used the staging orderbook in the gnosis-chain. I deployed a yvUSDC vault, and I created an LP USDC/yvUSDC in Honeyswap.

You have different options to create a limit order:

- [https://docs.cow.fi/tutorials/cowswap-trades-with-a-gnosis-safe-wallet](https://docs.cow.fi/tutorials/cowswap-trades-with-a-gnosis-safe-wallet)
- [https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=https://barn.api.cow.fi/xdai](https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=https://barn.api.cow.fi/xdai)
- You call the API by hand

Here's the example I created while testing:\
[https://barn.gnosis-protocol.io/gc/orders/0xcc37de3ba70474948f838e8b4af9c6b66577c08202323a4a3060a645b2918dae2813a7e97fd0bc1b80cb63afe136510d940ddc236208633c](https://barn.gnosis-protocol.io/gc/orders/0xcc37de3ba70474948f838e8b4af9c6b66577c08202323a4a3060a645b2918dae2813a7e97fd0bc1b80cb63afe136510d940ddc236208633c)

I am trading 10 USDC for 91.412 yvUSDC, which of course will never settle by regular solvers, since 1 `USDC == 1 yvUSDC` (price per share is 1).

Now that we have the real order, the orderbook will return it in the `solvable_orders` endpoint.
To consume it, we will need to use the driver.

The cow-dex-solver repo now has a nice README with an explanation of how to run the driver:
[https://github.com/gnosis/cow-dex-solver#how-to-run-simulations-together-with-the-cowswap-official-driver](https://github.com/gnosis/cow-dex-solver#how-to-run-simulations-together-with-the-cowswap-official-driver)

The way I had it running was:

```bash
cargo run -p solver -- --orderbook-url https://protocol-xdai.dev.gnosisdev.com \
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

If you got to this point, you have 99% of stuff you need to write your solver.

Until the trade expires, the solver will always find the crazy limit order and send it to your solver. If the solver responds with a solution, the driver will spit out a Tenderly link with the execution simulation.

### Full E2E testing

Is your solver working and you want to try a more real order?
You will need to run your own orderbook. For that, you will need docker.
Follow the steps at: [https://github.com/gnosis/gp-v2-services/#db-migrationinitialization](https://github.com/gnosis/gp-v2-services/#db-migrationinitialization)

I run my orderbook with:

```bash
cargo run --bin orderbook -- \
  --skip-trace-api true \
  --skip-event-sync \
  --base-tokens 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83 \
  --enable-presign-orders true \
  --node-url "https://rpc.xdaichain.com"
```

and created an order using [https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=http://localhost:8080](https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=http://localhost:8080)

The last step is connecting the driver to the new orderbook local service doing:

```bash
cargo run -p solver --  --orderbook-url http://localhost:8080 \
     --base-tokens 0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83 \
     --node-url "https://rpc.xdaichain.com" \
     --cow-dex-ag-solver-url "http://127.0.0.1:8000" \
    --solver-account 0x7942a2b3540d1ec40b2740896f87aecb2a588731 \
    --solvers CowDexAg \
    --transaction-strategy DryRun
```

Full process will be:

- Orderbook at [http://localhost:8080](http://localhost:8080/) is returning your order in the `solvable_orders` endpoint
- Driver will fetch orders from your orderbook and query your
- Solver at [http://localhost:8000](http://localhost:8000/)


# How to test a solver locally

In this short tutorial, we describe the steps needed in order to set up the _Driver_ locally and allow a custom _Solver_ to interact with it.

### Installing Rust

The first step is to install Rust by using the Rustup tool. We strongly encourage the reader to follow the steps described here:

[https://www.rust-lang.org/learn/get-started](https://www.rust-lang.org/learn/get-started)

Once we are done with the installation, we turn to the Driver setup.

### Driver setup

Reading the state of the blockchain requires issuing RPC calls to an Ethereum node. The simplest way to do so is by using a third party service like [Infura](https://infura.io/) to get access to an Ethereum node; thus, in this tutorial we use Infura. After registering for a free Infura account, Infura offers "endpoints" for mainnet and different testnets. We will refer to those as node-urls. Since CoW Protocol only runs on mainnet, Goerli, Sepolia, and Gnosis Chain, we need to select one of those.

In order to start the Driver, we can execute the following command in a terminal:

```bash
cargo run -p solver -- --orderbook-url https://api.cow.fi/mainnet \
  --node-url "https://mainnet.infura.io/v3/INFURA_KEY" \
  --cow-dex-ag-solver-url "http://127.0.0.1:8000" \
  --solver-account 0xa6DDBD0dE6B310819b49f680F65871beE85f517e \
  --solvers CowDexAg \
  --transaction-strategy DryRun
```

where the `INFURA_KEY` entry should be replaced with the key associated with our Infura account.

We clarify that the `cow-dex-ag-solver-url` is just a placeholder flag that indicates where the http solver (i.e., a custom solver) receives requests (which, in our case, will be a localhost server whose IP address is the standard 127.0.0.1), and `CowDexAg` is just a dummy name for the solver we will use. These should not be edited!



## Sample Test Instances

In this section, we provide sample instances following the json format described in the previous sections, along with the optimal solution, again in the appropriate json format. These can be used for testing purposes while developing a solver. We clarify that the solutions provided are optimal up to a very small factor (caused by rounding very small amounts).

- [Single order Instances](https://drive.google.com/file/d/1VIfuMVOG62bFHHbXAEOCtPG4ZTRiPi3O/view?usp=sharing)
- [Multiple-orders on single token pairs Instances](https://drive.google.com/file/d/13RaEsDaqt7IHnLcEefFLj_yPIrlJHYX7/view?usp=sharing)
- [Multiple orders on multiple token pairs Instances](https://drive.google.com/file/d/10RuJ93gHwo5uBZ6xST4k7-UMTlXBbmj-/view?usp=sharing)
- [Example Instance with solution containing calldata](https://drive.google.com/file/d/1sOXd8t4dfckVxAMz2TAnsisUve3M6iiG/view?usp=sharing)

In general, the instance json's of all recent auctions can be found in the following links:
- [prod] https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/$AUCTION_ID.json
- [barn] https://solver-instances.s3.eu-central-1.amazonaws.com/staging-mainnet/$AUCTION_ID.json

In the above urls, one needs to replace the $AUCTION_ID with an actual auction_id. As a clarification, each auction taking place has a unique identifier that determines it. The easiest way to recover the id of an auction that resulted in a settlement taking place on-chain is to start from the tx hash of the settlement, and use the competition endpoint to recover this id. Here is one such example.

Here is a tx hash of a settlement that was executed on-chain.

0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240

Starting from this hash, we can use the competition endpoint:

[https://api.cow.fi/mainnet/api/v1/solver_competition/by_tx_hash/0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240](https://api.cow.fi/mainnet/api/v1/solver_competition/by_tx_hash/0x17271e39305217d36635afbcc882e9431f9195d561d814aba96986cdd12dd240)

and then we can see that the auction id was 6462225. Note also that the competition endpoint reveals the calldata of all submitted solutions that successfully simulated and got ranked.

Using this id, we can now recover the instance.json of that auction:

[https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/6462225.json](https://solver-instances.s3.eu-central-1.amazonaws.com/prod-mainnet/6462225.json)
