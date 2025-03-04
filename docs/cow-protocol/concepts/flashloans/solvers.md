---
sidebar_position: 4
---

# Solvers

The solver receives for each order an optional object indicating the flashloan's hints. This information serves as a hint for the solver, but the solver ultimately can modify this data in order to make the operation more optimal.

## How to get the flashloan's hints

The user is able to create a flashloan order's hint by attaching to the `appData` the specified metadata. The autopilot reads the order and cuts it into a [batch auction](../introduction/batch-auctions). Then the driver fetches the `appData` by calling the orderbook with `GET /v1/app_data/<app_data_hash>` for every order and caches them in memory. The driver includes the flashloan information into the batch auction's order before sending it to the solver(s).


```mermaid
sequenceDiagram
    actor User
    participant Orderbook
    participant Autopilot
    participant Driver
    participant Solver(s)

    User->>+Orderbook: placeOrder
    activate Orderbook
    Orderbook-->>-User: orderPlaced
    deactivate Orderbook

    Autopilot->>+Orderbook: readOrder
    activate Orderbook
    Orderbook-->>-Autopilot: orderData
    deactivate Orderbook

    Autopilot->>+Driver: solve
    activate Driver
    Driver->>+Orderbook: getAppData
    activate Orderbook
    Orderbook-->>-Driver: appData
    deactivate Orderbook

    Driver->>+Solver(s): solve (order with flashloan's information)
    activate Solver(s)
    Solver(s)-->>-Driver: solution
    deactivate Solver(s)
    Driver->>+Autopilot: solution
    deactivate Driver
```

## Contract call

The solver must interact with the Flashloan Settlement Wrapper contract.

TODO
