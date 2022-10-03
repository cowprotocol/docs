# Learnings & Improvements of GPv1



Gnosis Protocol v1 was released by the Gnosis team at the beginning of 2020. The protocol had the right intention and design in place, but it was flawed in certain aspects such as:

* Its non-atomicity did not allow connectivity to existing on-chain liquidity,
* Gas cost of placing on-chain orders would prevent market makers from offering tight spreads,
* Time of trading for most operations (e.g. trading, withdrawing) took too long, making them too cumbersome for a good retail user experience.

Because of it, the protocol was mainly used for IDOs, as its batch trading service was recognized as a fair price finding mechanism due to benefits like:

* Liquidity
* Batch Timing
* Gas efficiency

The CoW Protocol (formerly Gnosis Protocol v2) is built for retail customers who prefer a simple and smooth user experience and private market makers competing with Uniswap spreads. The main objectives of this protocol are:

* Gasless UX: User orders only need to be signed and can be submitted off-chain, so there will be no gas estimations or any possibility of failed transactions. This alone will be a major contributor to a smoother user experience than existing DEX aggregators.
* Better prices than existing dex-aggregators: This is a result of competing solvers along with accounting for [<mark style="color:blue;">coincidences of wants</mark>](https://en.wikipedia.org/wiki/Coincidence\_of\_wants) <mark style="color:blue;"></mark> between retail customers before invoking other on-chain liquidity sources. For example, two "overlapping" orders can be matched directly with each other before incurring any fees that would be imposed if the traders had traded on Uniswap.
* Easy market maker integration: The protocol is built in a way such that it minimizes the volatility risk for market makers by settling their off-chain signed orders quickly. This allows them to offer tight spreads.
* No deposits or withdrawals into an exchange contract: For a settlement of orders, there is only one Ethereum transaction required from the solver. This means that all trades are matched and balances are credited directly to the users' accounts atomically in a single Ethereum transaction.
* Access to on-chain liquidity: This protocol is built to natively interact with any contract in the Ethereum blockchain; this allows trading with any existing atomic exchanges. Thanks to this ability, users have access to existing liquidity pools and hence can expect to get prices that are at least as good as what they would receive elsewhere on-chain.
