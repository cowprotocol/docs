# Getting notified about the ranking

A very useful functionality provided by the driver is the "notify" endpoint, which notifies all solvers participating in an auction about the ranking, once the bidding has closed, i.e., once all solutions have been submitted and have been ranked. (To find out about how solutions are ranked, see [this](https://docs.cow.fi/off-chain-services/in-depth-solver-specification/solver-auction-and-rewards) section).\
\
The implementation details of the notify endpoint can be found in this PR:\
[https://github.com/cowprotocol/services/pull/684](https://github.com/cowprotocol/services/pull/684)\
\
which describes the callback that the driver does to the solvers once the ranking is complete.\
\
This is very useful both for debugging purposes (as the endpoint also reveals whether the solution failed to simulate) and for interacting with private liquidity quotes that can be immediately "released", once the solver is notified that they did not win the auction.
