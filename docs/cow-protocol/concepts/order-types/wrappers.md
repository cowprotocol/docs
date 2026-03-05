---
sidebar_position: 7
---

# Generalized Wrappers

Generalized wrappers are a new framework to allow custom logic to execute before and/or after order settlement on CoW Protocol. They enable complex DeFi workflows—like flash loans, leveraged positions, and programmatic orders—all while preserving the security and assurances granted by CoW Protocol.

## What are Wrappers?

Wrappers are smart contracts that "wrap" the settlement process, executing custom logic surrounding the settlement contract. When a solver executes a settlement that includes a wrapper, they call the wrapper contract instead of the settlement contract directly. The wrapper calls the settlement contract on behalf of the solver.

This mechanism extends CoW Protocol's functionality in a modular way, allowing new features and integrations to be added without modifying the core settlement contract or requiring any changes to solver implementations.

## Use Cases

As we begin to roll out wrappers more widely across our infrastructure, we look forward to building out new advanced trading and DeFi integrations:

* **Leveraged Positions:** By wrapping the execution context of a CoW settlement, protocols implementing leveraged position opening capabilities can be supported.
    - This case is utilized by [Euler](https://github.com/cowprotocol/euler-integration-contracts) to open, close, and collateral swap leverage positions with the [Ethereum Vault Connector](https://evc.wtf/) in the flagship implementation of the wrapper contracts.
* **Flash Loan Integration:** Currently, CoW Protocol uses a dedicated `FlashLoanRouter` contract for flash loan functionality. However, this implementation comes with additional implementation effort from both the solvers and the CoW Protocol backend infrastructure. With generalized wrappers, flash loan integration becomes simpler and more flexible.
* **Programmatic Orders:** Wrappers can place, gate, or cancel the execution of user orders when authorized, allowing for advanced order types like TWAP, OCO, Stop-Loss/Take-Profit, or DCA with support for every type of wallet.
* **Protocol-Approved Hooks:** Unlike [CoW Hooks](./cow-hooks.mdx), which can revert even if the order is executed successfully, wrappers provide a way to enforce required pre- and post-settlement operations. Since wrappers are protocol-approved through the allowlist authenticator, they can implement critical functionality that must execute:
    - Compliance checks (e.g., OFAC screening)
    - Cross chain transfers (pre- or post-transfer)
    - Deposit in a vault or other wrapper contract (swap and stake)
* **Something else:** Anyone can build and submit a new wrapper contract, and there are few restrictions on what a wrapper can do during execution.

## Considerations

While wrappers are powerful, there are important considerations to keep in mind:

### Gas Overhead

Wrappers add gas overhead to settlement transactions. This is an important factor in deciding whether to use a wrapper — see the [Integration Guide](../../integrate/wrappers.mdx#gas-estimation) for benchmarks and estimation guidance.

### Requires Protocol Approval

Wrappers cannot be deployed and used immediately—they must be approved by CoW DAO through the allowlist authenticator. This approval process ensures high-quality wrapper implementations and safety for solvers, but means there's a roadblock for developers looking to extend CoW Protocol. Developers should plan for this approval process when building wrapper-based integrations.

### On-Chain Protocol Does Not Enforce Execution

Despite off-chain rules incentivizing solvers to execute wrappers as specified by an order, this is not enforced onchain and a solver may (due to technical error or malicious intent) execute an order without the corresponding wrapper. This means wrappers must be designed defensively:

- If a wrapper is strictly required, the order should fail to settle without it
- Wrappers should validate all input data and fail in cases where a user's funds could be at risk

## Getting Started

Wrappers are a powerful tool for advanced integrations on CoW Protocol. To start building with wrappers:

- **For developers**: See the [Integration Guide](../../integrate/wrappers.mdx) for implementation details, code examples, and security guidelines
- **For technical specs**: Consult the [Technical Reference](../../reference/contracts/periphery/wrapper.mdx) for detailed contract documentation and API specifications

To learn more about wrappers and see example implementations:

- [Euler Integration Contracts Repository](https://github.com/cowprotocol/euler-integration-contracts) - Contains the `CowWrapper` abstract contract and example implementations
- [Services Repository PR #3700](https://github.com/cowprotocol/services/pull/3700) - Backend integration implementation. Good reference for solvers looking to support wrappers.

Wrappers represent a significant evolution in CoW Protocol's capabilities, enabling complex DeFi workflows while maintaining security and simplicity for solvers. As more wrappers are developed and approved, they will continue to expand what's possible with intent-based trading.
