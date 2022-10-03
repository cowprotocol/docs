# How to write a solver

## This tutorial was fully composed by [<mark style="color:blue;">poolpitako</mark>](https://twitter.com/poolpitako), link to the original tutorial doc can be found <mark style="color:blue;"></mark> [<mark style="color:blue;">here</mark> <mark style="color:yellow;"></mark> ](https://hackmd.io/Qx3i17ZMRLSFFNyw0tn8sQ?view)<mark style="color:yellow;"></mark>

### Idea <a href="#idea" id="idea"></a>

I wanted to start with something super basic to understand all the moving pieces. In my example, I am going to build a solver for Yearn tokens. User has a token, let’s say, `USDC` and wants to buy `yvUSDC`. Right now, CoW Swap would need a LP `USDC/yvUSDC` to settle the trade, but what if the solver understands how to deposit into a yearn vault? ![:thinking\_face:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/thinking\_face.png)

### The Big Picture <a href="#the-big-picture" id="the-big-picture"></a>

CoW Swap infrastructure is a lot of services running together, which is a bit intimidating at the beginning. Here’s the ELI5 of how CoW Swap works and it’s entities.

#### The Orderbook <a href="#the-orderbook" id="the-orderbook"></a>

The orderbook is a service that uses a database to stores trades.\
When you go to [https://swap.cow.fi/](https://swap.cow.fi/) and create a trade, the website uses the orderbook API to add the trade to the database. If the trade is ready to go (it might be created but missing a signature), it will be listed in the `solvable_orders` endpoint.

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

* [https://docs.cow.fi/tutorials/cowswap-trades-with-a-gnosis-safe-wallet](https://docs.cow.fi/tutorials/cowswap-trades-with-a-gnosis-safe-wallet)
* [https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=https://barn.api.cow.fi/xdai](https://bafybeias5x3tgdshkhj5umriqze2wioy5mjw4fdo2zzp2sl4pacq7rnwtm.ipfs.infura-ipfs.io/?orderbook=https://barn.api.cow.fi/xdai)
* You call the api by hand

Here’s the example I created while testing:\
[https://barn.gnosis-protocol.io/gc/orders/0xcc37de3ba70474948f838e8b4af9c6b66577c08202323a4a3060a645b2918dae2813a7e97fd0bc1b80cb63afe136510d940ddc236208633c](https://barn.gnosis-protocol.io/gc/orders/0xcc37de3ba70474948f838e8b4af9c6b66577c08202323a4a3060a645b2918dae2813a7e97fd0bc1b80cb63afe136510d940ddc236208633c)

I am trading 10 USDC for 91.412 yvUSDC, which of course, will never settle by regular solvers since 1 `USDC == 1 yvUSDC` (price per share is 1).

Now that we have the real order, the orderbook will return it in the `solvable_orders` endpoint.\
To consume it, we will need to use the driver.

the cow-dex-solver repo now has a nice [README.md](http://readme.md/) with an explanation of how to run the driver:\
[https://github.com/gnosis/cow-dex-solver/blob/219ff56d309416bda0d7be4225b95a96711779f6/README.md#how-to-run-simulations-together-with-the-cowswap-official-driver](https://github.com/gnosis/cow-dex-solver/blob/219ff56d309416bda0d7be4225b95a96711779f6/README.md#how-to-run-simulations-together-with-the-cowswap-official-driver)

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

* **orderbook-url**: points to the gnosis staging version
* **node-url** connects to gnosis-chain (VERY IMPORTANT, liquidity sources are based on this)
* **cow-dex-ag-solver-url** our running solver instance
* **solver-account** An address that has permissions to run txs in the settlement contract
* **solvers** just use our CowDexAg instance
* **transaction-strategy** DryRun will give us a tenderly link after running

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

* Orderbook at [http://localhost:8080](http://localhost:8080/) is returning your oder in the `solvable_orders` endpoint
* Driver will fetch orders from your orderbook and query your
* Solver at [http://localhost:8000](http://localhost:8000/)

### My solver code <a href="#my-solver-code" id="my-solver-code"></a>

I forked cow-dex-solver and wrote my first lines of rust.\
You can checkout my solver’s code at:\
[https://github.com/poolpitako/cow-dex-solver/pull/1](https://github.com/poolpitako/cow-dex-solver/pull/1)

### Conclusion <a href="#conclusion" id="conclusion"></a>

While there are several services you need to run for an e2e testing, I gotta say I enjoyed developing this prototype. I believe that in the future CoW Swap will not only be used for regular trades but it will be used for settling positions. Want to add liquidity to a curve pool in a single click? Go to CoW Swap. Want to swap your DAI for two yearn vault positions, go to CoW Swap.\
![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png) ![:cow2:](https://assets.hackmd.io/build/emojify.js/dist/images/basic/cow2.png)
