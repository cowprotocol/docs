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
`cargo run -p solver -- --orderbook-url` [`https://api.cow.fi/mainnet`](https://api.cow.fi/mainnet)``\
`--node-url "https://mainnet.infura.io/v3/<INFURA_KEY>"`\
`--cow-dex-ag-solver-url "http://127.0.0.1:8000"`\
`--solver-account 0xa6DDBD0dE6B310819b49f680F65871beE85f517e`\
`--solvers CowDexAg`\
`--transaction-strategy DryRun`

where the `INFURA_KEY` entry should be replaced with the key associated with our Infura account.

We clarify that the `cow-dex-ag-solver-url` is just a placeholder flag that indicates where the http solver (i.e., a custom solver) receives requests (which, in our case, will be a localhost server whose IP address is the standard 127.0.0.1), and the `CowDexAg` is just a dummy name for the solver we will use. These should not be edited!

### Solver deployment

Once the Driver is running, we can now locally deploy our solver server so that it can receive the instances from the Driver, solve them, and then report back the solution to the Driver. The solver receives the instance in JSON format (as described [here](../off-chain-services/in-depth-solver-specification/)) via an HTTP Get request, solves the instance and then, via an HTTP POST request, sends the solution (again in JSON format) to the Driver.

An example of a publicly available solver, namely the Dex Cow Solver, can be found here:

[https://github.com/gnosis/cow-dex-solver](https://github.com/gnosis/cow-dex-solver)

You can follow the simple instructions of the Dex Cow Solver to locally deploy that particular solver.

For potential questions/issues regarding the testing of solvers, we also encourage everyone to contact our team in the CoW Swap Discord: [https://chat.cowswap.exchange](https://chat.cowswap.exchange/)\
\
