---
description: FINDING THE BEST TRADING PATHS/SCENARIOS WITH YOUR SOLVER
---

# Solver Workshop

Here is a full video tutorial/workshop on how to build your own solver\
\
[https://www.youtube.com/watch?v=uW\_w5yGSAPk\&t=3s](https://www.youtube.com/watch?v=uW\_w5yGSAPk\&t=3s)\
\
At the heart of the CoW Protocol there are "solvers". In essence, a solver is a computer program that takes the orderbook as input, and computes the prices and traded amounts of all orders and liquidity sources (AMMs) that make the best possible overall trading experience. This problem, known as the batch auction problem, is an interesting and challenging optimization problem for which there is not a "perfect algorithm" for (and most likely will never be https://en.wikipedia.org/wiki/P\_versus\_NP\_problem).

In the spirit of decentralization, in CoW Protocol multiple independent solvers compete for finding the best solution to the batch auction problem. Every few seconds, a round of the competition takes place giving the participating solvers the chance to solve a batch reflecting the most recent orderbook state. The solver that outputs the \*best\* solution is rewarded, and thus its solution is the one to be settled on-chain.

This bounty aims at incentivizing the development of CoW Protocol solvers. More specifically, the challenge is to write a solver that finds good solutions to the batch auction problem. A good solution must comply with the solution specification, and should map to a good objective value - both of which will be formally verified by the CoW Swap driver.

There are different avenues to explore for designing a solver that is competitive, including, but not limited to,

\- Developing an efficient optimization algorithm

\- Identifying and solving special problem instances that are "easy" to solve.

\- Considering more liquidity sources (AMMs) in addition to those that are supplied.

\- Integrating external dex-aggregators.

**References:**

* Set of problem instances and solutions, for testing the algorithm [http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com](http://gnosis-europe-gpv2-solver.s3-website.eu-central-1.amazonaws.com)
* CoW Swap driver, for simulating solutions onchain [https://github.com/gnosis/gp-v2-services](https://github.com/gnosis/gp-v2-services)
* Problem specification: [https://docs.cow.fi/off-chain-service...](https://www.youtube.com/redirect?event=video\_description\&redir\_token=QUFFLUhqbHQwclY0N1puN2wtUUJEVzNkSmg3STdTUzdLQXxBQ3Jtc0trUnZZZXpVUG9VVTJvZXpXOGF5V21NNmRwdnBNSWZ6endDekZWbWpyUHhNM21JLXE3WmhBQ3dTanpXVnJDdngtTnVERTRNUjBDQ2k3ZUVpeTdpeVp3Nzhidm5lMFNsNU41bi1nRE9VWFV1ZkZDdlJpaw\&q=https%3A%2F%2Fdocs.cow.fi%2Foff-chain-services%2Fin-depth-solver-specification)&#x20;
* Batch auction MIP formulation: [https://github.com/gnosis/dex-researc...](https://www.youtube.com/redirect?event=video\_description\&redir\_token=QUFFLUhqblNILWswc0ZtY1M4bWhPQWhoV1k2LTNlUS1lUXxBQ3Jtc0ttVE9OOHlOOUNRRHlLT2RCOVhnX2hRTmx0MEI4azJzM3ZRZEx5N01yanY0SVRxV201SDFKUkhBcFh3SVJBMlAyaHAtZG4wN0N2VHBnR3ByX2U4dHdLSF90MUNCXy11Z3pZRk5LdjRSQk9QUDRCWWE0cw\&q=https%3A%2F%2Fgithub.com%2Fgnosis%2Fdex-research%2Fblob%2Fmaster%2FBatchAuctionOptimization%2Fbatchauctions.pdf)&#x20;
* Jupyter notebook with exercises: [http://shorturl.at/fnHW7](https://www.youtube.com/redirect?event=video\_description\&redir\_token=QUFFLUhqbkZZb29SRHhBT09NM254X2IwY08ydnRoSFNsZ3xBQ3Jtc0trS0FzNmZ2SnRaakU1TEh5ODE3VndqcEN0cThYaG8wYWJtZm44YWxFRTFra0lxcExJQnFmdzlmWklmUDhUNndIR3pWOWdNX2swejBOQmd1QTRRNWR4bTBod3hKREp5LVRSaGdqOS14N2Q5WXNrZHU4MA\&q=http%3A%2F%2Fshorturl.at%2FfnHW7)&#x20;
* TEST instances: [https://drive.google.com/drive/folder...](https://www.youtube.com/redirect?event=video\_description\&redir\_token=QUFFLUhqbEE2UklseU53RjBjdDRQdnNKZlBla3ZPV1pXd3xBQ3Jtc0ttbmRWTXJqMTFqZy1HMVUzT0FUYWpWNjhkOGYzTENYVkh0R3MxZTJ2bVJPbTA2NXhRbEZkM0NYcmFiSk1aNm9fcEU5RFB4ZDBFZ1h2VVlILVBvbG9iSUtyWnN3cTB2YVI1SHEtU1UwYVNqendQbnd6OA\&q=https%3A%2F%2Fdrive.google.com%2Fdrive%2Ffolders%2F1TETEiaDcq3vqJU14WdQlsHiv9ljracjn%3Fusp%3Dsharing)\
