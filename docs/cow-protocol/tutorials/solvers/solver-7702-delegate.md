---
sidebar_position: 11
---

# Using Solver7702Delegate for parallel settlement submission

`Solver7702Delegate` is an ERC-7702 delegation target for CoW Protocol solvers. It lets a solver keep using its existing allowlisted solver EOA, while extra submission EOAs send settlement transactions through that solver EOA.

The main use case is parallel settlement submission. A single EOA has one nonce lane. If settlement `B` uses nonce `101`, it has to wait for the nonce of settlement `A` with nonce `100` to be mined. With `Solver7702Delegate`, each auxiliary EOA has its own nonce lane, but the settlement contract still sees the solver EOA as `msg.sender`.

## Why use it?

Without ERC-7702, a solver that wants parallel submission would need one of these options:

- allowlist several solver EOAs;
- migrate to a smart contract solver account;
- keep using one EOA and accept one nonce lane.

`Solver7702Delegate` keeps the current solver identity. The solver EOA delegates execution to the delegate contract, and a fixed set of auxiliary EOAs can call through it.

```text
auxiliary EOA 1 -> solver EOA running Solver7702Delegate -> GPv2Settlement
auxiliary EOA 2 -> solver EOA running Solver7702Delegate -> GPv2Settlement
auxiliary EOA 3 -> solver EOA running Solver7702Delegate -> GPv2Settlement
```

Inside the delegate:

```text
msg.sender = auxiliary EOA
address(this) = solver EOA
```

Inside `GPv2Settlement`:

```text
msg.sender = solver EOA
```

This keeps settlement authorization tied to the solver EOA.

## Call shape

Normal settlement submission:

```text
from = solver EOA
to   = GPv2Settlement
data = GPv2Settlement.settle(...)
```

ERC-7702 settlement submission:

```text
from = auxiliary EOA
to   = solver EOA
data = bytes20(target) || targetCalldata
```

For a settlement:

```text
target         = GPv2Settlement
targetCalldata = GPv2Settlement.settle(...)
```

The calldata format is packed on purpose:

```solidity
abi.encodePacked(bytes20(target), targetCalldata)
```

Do not use this format:

```solidity
abi.encode(target, targetCalldata)
```

The first 20 bytes are parsed as the target address. The remaining bytes are forwarded as calldata. Return data and revert data are bubbled back as-is.

## Contract model

`Solver7702Delegate` has no normal public methods. Its interface is the constructor and `fallback()`:

```solidity
constructor(address[5] memory approvedCallers);
fallback() external payable;
```

A fixed number of approved callers is set in the constructor. They are embedded into the deployed bytecode, not stored in contract storage. This keeps the hot path small and avoids mutable admin logic.

If calldata is shorter than 20 bytes, the fallback accepts ETH and returns. Otherwise, it checks that `msg.sender` is one of the approved callers, parses the target address from the first 20 bytes, and calls the target from the solver EOA context.

Only `CALL` is supported. `DELEGATECALL` is not supported, because the delegate already runs in the solver EOA context through ERC-7702.

There are no events. This keeps gas lower for the submission path.

## Setup

The exact setup depends on whether you use the reference driver or your own driver.

At a high level:

1. Choose a number of auxiliary EOAs up to the limit defined in `Solver7702Delegate`.
2. Deploy `Solver7702Delegate` with those auxiliary EOAs as approved callers.
3. Have the solver EOA sign an ERC-7702 authorization pointing to the delegate.
4. Submit a transaction that includes that authorization.
5. Verify that the solver EOA now delegates to the expected delegate.
6. Configure the driver to use the auxiliary EOAs for delegated submission.

If you use the reference driver, configure extra submission accounts for the solver. The driver treats these as EIP-7702 submission accounts and sets up the delegate and delegation during startup when the accounts are available as signers.

```toml
[[solver]]
name = "my-solver"
endpoint = "https://solver.example"
account = "<solver-private-key-or-signer-config>"
max-solutions-to-propose = 2
submission-accounts = [
  "<auxiliary-private-key-or-signer-config-1>",
  "<auxiliary-private-key-or-signer-config-2>",
  ...
]
```

The solver `account` must be able to sign the ERC-7702 authorization. Submission accounts must also be signer-backed, not address-only config.

When `submission-accounts` is set, the reference driver:

- requires every submission account to be a signer;
- supports up to the number of submission accounts defined in `Solver7702Delegate`;
- pads unused approved caller slots with the zero address;
- deploys the delegate through [Arachnid's deterministic CREATE2 deployer](https://github.com/Arachnid/deterministic-deployment-proxy) with zero salt;
- reuses the same delegate deployment if the expected code is already present (using CREATE2 and the same constructor arguments);

If `max-solutions-to-propose` is greater than `1`, `submission-accounts` must be configured. The driver refuses to start otherwise, because proposing multiple solutions needs parallel submission lanes.

If you run a custom driver, it must:

- deploy the delegate with the expected caller set;
- create the ERC-7702 authorization for the solver EOA;
- submit the authorization transaction;
- route delegated settlements with `to = solver EOA`;
- encode delegated calldata as `bytes20(target) || targetCalldata`;
- simulate the exact transaction shape before sending it.

The reference driver sends the delegation setup as an inert zero-value transaction from the solver EOA to the zero address with the ERC-7702 authorization attached. It does not combine delegation setup with delegate deployment, because a reverted transaction can still leave the ERC-7702 authorization applied.

## Verification

Before using delegated submission, verify both pieces:

1. The solver EOA delegates to the expected delegate.
2. The delegate bytecode matches the expected caller set.

For ERC-7702, delegated account code has this shape:

```text
0xef0100 || delegateAddress
```

So the solver EOA code should be 23 bytes:

```text
0xef0100<20-byte delegate address>
```

The delegate bytecode must also be checked. Because approved callers are immutable constructor values, each solver's deployed runtime bytecode can be different. Do not only check that the delegate address has code. Compute the expected runtime bytecode from:

- the official `Solver7702Delegate` artifact;
- the compiler settings;
- the approved caller addresses.

Then compare that expected runtime bytecode, or its hash, with `eth_getCode(delegateAddress)`.

## How the driver should submit

Prefer direct submission when the solver EOA is idle:

```text
from = solver EOA
to   = GPv2Settlement
data = settle(...)
```

Use delegated submission when the solver EOA already has a pending transaction and parallel submission is useful:

```text
from = auxiliary EOA
to   = solver EOA
data = bytes20(GPv2Settlement) || settle(...)
```

Each auxiliary EOA has its own nonce lane. Do not send more than one transaction from the same auxiliary EOA unless you intentionally want nonce ordering for that account.

The driver should simulate the same transaction shape it will submit. For delegated submission, that means simulating with:

- `from = auxiliary EOA`;
- `to = solver EOA`;
- `data = bytes20(target) || targetCalldata`;
- the solver EOA already delegated to the expected `Solver7702Delegate`.

## Funding

Auxiliary EOAs pay gas. The delegate does not fund them.

If an auxiliary EOA is underfunded:

- skip it;
- alert the operator;
- use another idle funded account;
- fall back to direct submission if that is safe;
- otherwise wait.

## Replacing callers

Approved callers cannot be changed on an existing delegate. To replace any auxiliary EOA:

1. Deploy a new `Solver7702Delegate` with the new caller set.
2. Have the solver EOA sign a new ERC-7702 authorization to the new delegate.
3. Submit the replacement authorization transaction.
4. Verify the solver EOA code is `0xef0100 || newDelegate`.
5. Verify the new delegate runtime bytecode matches the new caller set.
6. Update driver config and monitoring.
7. Treat the old delegate as deprecated.

The old delegate remains on-chain, but it has no power unless the solver EOA delegates to it.

## Revoking delegation

To clear ERC-7702 delegation:

1. Have the solver EOA sign an ERC-7702 authorization to the zero address.
2. Submit a transaction with that authorization.
3. Verify that the solver EOA no longer has delegated code.
4. Disable delegated submission in the driver.
5. Fall back to direct solver EOA submission.

Revocation is useful when auxiliary submission is no longer needed, or when the caller set cannot be safely replaced immediately.

## Compromised auxiliary key response

Treat a compromised auxiliary EOA as severe. An approved auxiliary EOA can trigger arbitrary calls from the solver EOA context until it is removed.

Recommended response:

1. Disable ERC-7702 submission for that solver.
2. Consider disabling the solver while you assess the risk.
3. Deploy a new `Solver7702Delegate` without the compromised caller.
4. Have the solver EOA authorize the new delegate.
5. Verify delegation and delegate bytecode.
6. Move funds and revoke approvals from the solver EOA if needed.
7. Mark the old delegate/config as deprecated in monitoring.

If replacement cannot be done quickly, clear the solver EOA delegation and use direct submission only.

## Warnings

Approved auxiliary EOAs are trusted hot keys. They can cause arbitrary calls from the solver EOA context. That includes token transfers, approvals, protocol interactions, and ETH transfers if the solver EOA holds funds.

Use these safeguards:

- do not share auxiliary EOAs across solvers;
- keep solver EOA funds and approvals minimal;
- monitor auxiliary keys and delegated calls;
- rotate callers immediately if a key is compromised;
- only enable this on chains and infrastructure that support ERC-7702 transaction authorization handling;
- fall back to direct solver EOA submission when ERC-7702 is not supported.

`Solver7702Delegate` does not implement ERC-721 or ERC-1155 receiver functions. It is meant for settlement submission, not for receiving NFTs.

## FAQ

### How many auxiliary EOAs are supported?

Version 1 supports up to five immutable approved caller slots.

### Can the delegate call only `GPv2Settlement`?

No. It supports arbitrary targets. The driver should normally use `GPv2Settlement` as the target for settlement submissions.

### Can an auxiliary EOA drain funds?

The contract does not prevent that. Approved auxiliary EOAs are trusted execution keys. Keep funds and approvals on the solver EOA as small as possible.

### What happens when all auxiliary EOAs are busy?

The driver should wait or queue until one lane is idle. It should not reuse the same auxiliary EOA unless nonce ordering is intended.

### Should direct submission still be used?

Yes. Direct submission is cheaper and simpler when the solver EOA is idle. Delegated submission is useful when parallel settlement submission adds value.
