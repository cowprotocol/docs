---
sidebar_position: 7
---

# Atomic Bundles

Atomic Bundles are a new framework to allow custom logic to execute before and/or after order settlement on CoW Protocol. They enable complex DeFi workflows—like flash loans, leveraged positions, and programmatic orders—all while preserving the security and assurances granted by CoW Protocol.

## What are Bundles?

Bundles are smart contracts that "wrap" the settlement process, executing custom logic surrounding the settlement contract. When a solver executes a settlement that includes a bundle, they call the bundle contract instead of the settlement contract directly. The bundle calls the settlement contract on behalf of the solver.

This mechanism extends CoW Protocol's functionality in a modular way, allowing new features and integrations to be added without modifying the core settlement contract or requiring any changes to solver implementations.

## Use Cases

As we begin to roll out Atomic Bundles more widely across our infrastructure, below is an overview of some of the ways Wrappers can be used.

* **Leveraged Positions:** By bundling the execution context of a CoW settlement, protocols implementing leveraged position opening capabilities can be supported.
    - This case is utilized by [Euler](https://github.com/cowprotocol/euler-integration-contracts) to open, close, and collateral swap leverage positions with the [Ethereum Vault Connector](https://evc.wtf/) in the flagship implementation of the bundle contracts.
* **Flash Loan Integration:** Currently, CoW Protocol uses a dedicated `FlashLoanRouter` contract for flash loan functionality. However, this implementation comes with additional implementation effort from both the solvers and the CoW Protocol backend infrastructure. With Atomic Bundles, flash loan integration becomes simpler and more flexible.
* **Programmatic Orders:** Atomic Bundles can place, gate, or cancel the execution of user orders when authorized, allowing for advanced order types like TWAP, OCO, Stop-Loss/Take-Profit, or DCA with support for every type of wallet.
* **Protocol-Approved Hooks:** Unlike [CoW Hooks](./cow-hooks.mdx), which can revert even if the order is executed successfully, wrappers provide a way to enforce required pre- and post-settlement operations that the user may want. Since Atomic Bundles are protocol-approved through the allowlist authenticator, they can implement critical functionality that must execute:
    - Cross chain transfers (pre- or post-transfer)
    - Deposit in a vault or other bundle contract (swap and stake)
* **Something else:** Anyone can build and submit a new Atomic Bundles contract, and there are few restrictions on what a wrapper can do during execution.

## Considerations

While Atomic Bundles are powerful, there are important considerations to keep in mind:

### Gas Overhead

Atomic Bundles add gas overhead to settlement transactions. This is an important factor in deciding whether to use a Atomic Bundles — see the [Integration Guide](../../integrate/wrappers.mdx#gas-estimation) for benchmarks and estimation guidance.

### Requires Protocol Approval

Atomic Bundles cannot be deployed and used immediately—they must be approved by CoW DAO through the allowlist authenticator. This approval process ensures high-quality Atomic Bundles implementations and safety for solvers, but means there's a roadblock for developers looking to extend CoW Protocol. Developers should plan for this approval process when building bundle-based integrations.

### Atomic Bundles and Settlement Call Pairing not Guaranteed On-chain

Despite off-chain rules incentivizing solvers to execute Atomic Bundles as specified by an order, this is not enforced onchain and a solver may (due to technical error or malicious intent) execute an order without the corresponding bundle. Conversely, the solver may execute the bundle without the corresponding order in the settlement call. This means bundles must be designed defensively:

- If a bundle is strictly required as part of an order, the order should fail to settle without it
- If the bundle call must be executed with the order settlement, it should revert if the settlement output is not delivered.
- Atomic Bundles should validate all input data and fail in cases where a user's funds could be at risk

## Getting Started

Atomic Bundles are a powerful tool for advanced integrations on CoW Protocol. To start building with Atomic Bundles:

- **For developers**: See the [Integration Guide](../../integrate/wrappers.mdx) for implementation details, code examples, and security guidelines
- **For technical specs**: Consult the [Technical Reference](../../reference/contracts/periphery/wrapper.mdx) for detailed contract documentation and API specifications

To learn more about Atomic Bundles and see example implementations:

- **For Atomic Bundles Contract Builders:** [Euler Integration Contracts Repository](https://github.com/cowprotocol/euler-integration-contracts) - Contains the `CowWrapper` abstract contract and example implementations
- **For Solvers:** [Services Repository PR #3700](https://github.com/cowprotocol/services/pull/3700) - Example backend integration implementation. Good reference for solvers looking to support Atomic Bundles.

Atomic Bundles represent a significant evolution in CoW Protocol's capabilities, enabling complex DeFi workflows while maintaining security and simplicity for solvers. As more Atomic Bundles are developed and approved, they will continue to expand what's possible with intent-based trading.
