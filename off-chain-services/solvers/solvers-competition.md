# Solvers Competition

As stated in the "Road to decentralization" section, there are different phases in which the solver's competition will open up to new users. To recap, the methods for a user to become a solver differ depending on which phase the protocol is at:

* **Phase 1:** having a trust relationship with the Gnosis Team will allow for collaboration to spark, and for them to manually include your solver in the authenticated solvers.
* **Phase 2:** the protocol is more mature, and the GnosisDAO is the entity in charge of authenticating solvers according to the votes of the proposal, and the bond they have placed.
* **Phase 3:** the protocol will aim to make the orderbook decentralized in a P2P client network where everyone can validate the orders registered in a trustless manner.

Once the solver has been authenticated and included in the Allowlist smart contract, it will be able to submit batch settlement solutions and obtain rewards according to their performance.

At the moment, the rust backend queries and ranks solutions of the different solvers based on formally and well-defined criterion, which can be roughly described as "the solution that provides the most utility to the orders". The solver with the best solution, according to this criterion, that has passed a transaction simulation of the batch settlement solution is then chosen for settlement submission. If the submission is successful, the solver batch gets executed on-chain; in such a case, all the fees from that batch go to the solver for covering its execution costs, as well as the rewards for being the winning solver. In the event that the submission fails, the driver runs again and refetches liquidity to start a new solution-finding process.

For a solver to become part of the solvers' competitions, besides having to go through the authentication requirements, it also needs to prepare certain technical aspects. In order for the backend to integrate a new solver, this one should provide an endpoint to return a valid settlement transaction (cf. [<mark style="color:blue;">smart contracts</mark>](https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/GPv2Settlement.sol#L121)). After that, the new solver is allowed to fetch orders using the [<mark style="color:blue;">solvable orders</mark>](https://protocol-mainnet.dev.gnosisdev.com/api/#/default/get\_api\_v1\_solvable\_orders) endpoint. Various inputs are needed, but most important is the on-chain liquidity that the baseline solver can handle, which could also be passed into the HTTP request (cf. http\_solver.rs). In the future, the backend will provide an endpoint to push solutions in specific time intervals.

More information on full decentralization of the solver architecture can be found here: [<mark style="color:blue;">https://forum.gnosis.io/t/gpv2-road-to-decentralization/1245</mark>](https://forum.gnosis.io/t/gpv2-road-to-decentralization/1245)
