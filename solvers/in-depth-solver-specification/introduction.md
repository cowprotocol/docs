# Introduction

The Cow Protocol uses batch auctions (see [here](../../overview/batch-auctions.md) for more details) for executing the trades. Within a given batch, the goal is to compute prices and traded amounts in order to maximize a well-defined utility function. This can be formulated as a concrete optimization problem that needs to be solved, and this is where the Solvers comes into place.

Informally, a _Solver_ is an algorithm that takes as input a batch auction instance and outputs a batch auction solution, both described precisely in a formal language. The solution is then processed by the _Driver_, another key component of the Cow Protocol infrastructure. The Driver validates all Solver candidate solutions and ranks them according to a well-defined objective function.
