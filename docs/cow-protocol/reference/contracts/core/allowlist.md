---
sidebar_position: 3
---

# GPv2AllowlistAuthentication

## Architecture

The allow-list authenticator contract determines which addresses are solvers. Before executing any operation which is access-restricted to a solver, the settlement contract queries this contract to determine if the caller is a solver.

The smart contract allows a manager to add or remove solvers with an on-chain transaction. The manager can be replaced in a transaction by the proxy owner or itself. Any of these actions emit the corresponding event.


### Guarantees and Invariants

* Only the `manager` or the `owner` can change the `manager`
* Only the `manager` can add or remove solvers

:::note

As this contract is deployed with a proxy pattern, these guarantees are only valid for the current implementation of the contract. If the contract is upgraded, these guarantees may not hold.

Any malicious actor with access to the `manager` may be able to introduce a malicious solver. The malicious solver may be able to steal funds from the settlement contract (i.e. CoW Protocol), however, this does **NOT** affect user funds.

:::

## Data Types and Storage

### `manager`

The manager is the address that can add or remove solvers.

```solidity
address public manager;
```

### `solvers`

The `solvers` mapping stores whether an address is a solver.

```solidity
mapping(address => bool) private solvers;
```

:::tip

The `solvers` mapping is private, but it is exposed through the `isSolver` function.

:::

## Functions

### For `owner` or `manager`

#### `setManager`

Allows the `owner` or the `manager` to set a new manager.

```solidity
function setManager(address manager_) external onlyManagerOrOwner;
```

### For `manager`

#### `addSolver`

Allows the `manager` to add a solver.

```solidity
function addSolver(address solver) external onlyManager;
```

#### `removeSolver`

Allows the `manager` to remove a solver.

```solidity
function removeSolver(address solver) external onlyManager;
```

### For anyone

#### `isSolver`

A view function that returns whether an address is a solver.

```solidity
function isSolver(
    address prospectiveSolver
) external view override returns (bool);
```

## Indexing

* `ManagerChanged` - when the manager is changed
* `SolverAdded` - when a solver is added
* `SolverRemoved` - when a solver is removed

## Off-chain

Nil