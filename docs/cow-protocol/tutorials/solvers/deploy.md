---
sidebar_position: 3
---

# Deploy a solver

Once the Driver is running, we can now locally deploy our solver server so that it can receive the instances from the Driver, solve them, and then report back the solution to the Driver. The solver receives the instance in JSON format via an HTTP Get request, solves the instance and then, via an HTTP POST request, sends the solution (again in JSON format) to the Driver.

An example of a publicly available solver, namely the Dex Cow Solver, can be found here:

[https://github.com/gnosis/cow-dex-solver](https://github.com/gnosis/cow-dex-solver)

You can follow the simple instructions of the Dex Cow Solver to locally deploy that particular solver.

For potential questions/issues regarding the testing of solvers, we also encourage everyone to contact our team in the CoW Swap Discord: [https://discord.com/invite/cowprotocol](https://discord.com/invite/cowprotocol)

