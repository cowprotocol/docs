---
sidebar_position: 1
---

# Locally testing a solver with the CoW Protocol orderflow

CoW Protocol infrastructure is a lot of services running together in herd harmony, which is a bit intimidating at the beginning. Before proceeding, it would be advisable to read the architectural overview to get a better understanding of how CoW Protocol works and its entities.

In order to test a solver against CoW Protocol's orderflow, one needs to locally run the following components
- autopilot, which will be configured to point, for example, to the production orderbook and to send the auctions to a local driver.
- driver, which will receive auctions from the autopilot and forward them to the solver engine
- the solver engine that is meant to be tested.

:::caution

It is assumed you have rust setup correctly with `rustup`.

:::

The repository where all the backend services can be found is this one: [https://github.com/cowprotocol/services](https://github.com/cowprotocol/services). Here are the main instructions to run the autopilot and the driver.

For the autopilot, we run

```
    cargo run --bin autopilot -- --skip-event-sync true --node-url $NODE_URL --shadow https://api.cow.fi/mainnet --drivers "mysolver1|http://localhost:11088/mysolver1"
```

where one needs to set the NODE_URL appropriately (e.g., a free Infura endpoint).

For the driver, we run

```
    cargo run -p driver -- --config driver.config.toml --ethrpc $NODE_URL
```
where one needs to configure driver.config.toml to point to their solver engine. A sample such file can be found [here](https://github.com/cowprotocol/services/blob/main/crates/driver/example.toml).

Once the above are set up and running, one can then start testing their solver engine against one of the following orderbooks:

| Orderbook URL                       | Network      | Environment |
|-------------------------------------|--------------|-------------|
| https://barn.api.cow.fi/mainnet/api | Mainnet      | Staging     |
| https://api.cow.fi/mainnet/api      | Mainnet      | Production  |
| https://barn.api.cow.fi/goerli/api  | Görli        | Staging     |
| https://api.cow.fi/goerli/api       | Görli        | Production  |
| https://barn.api.cow.fi/sepolia/api | Sepolia      | Staging     |
| https://api.cow.fi/sepolia/api      | Sepolia      | Production  |
| https://barn.api.cow.fi/xdai/api    | Gnosis Chain | Staging     |
| https://api.cow.fi/xdai/api         | Gnosis Chain | Production  |




