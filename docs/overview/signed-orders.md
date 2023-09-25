# Signed Orders



CoW Protocol does not need to work with executed transactions in order for users to be able to trade. The smart contract architecture is composed of an allowance manager and a settlement smart contract. The combination of these two contracts allow the protocol to offer users gas-free trades because it works with off-chain orders submitted via signed messages.

In order to benefit from off-chain order, the users first need to approve the vault relayer contract to execute the signed orders on their behalf. This means that the only transaction to be executed by the user in which they will have to pay a gas fee, is the token approval. Once you approve your funds for spending on the protocol, you can submit orders via signed messages that contain the trade's details, such as limit price, amount, timestamp, and so on.

CoW Protocol is able to work with signed messages because it bases its mechanism in batch auctions. After the users have submitted their signed order, the solvers check the order submission and include them in the batch auction that the trade fits best. Once a trade order, aka signed message, has been included in a batch, the solvers send the transaction to the settlement contract, which checks with the allowance manager if such signed order has been given the approval to be spent. The combination of these two smart contracts allow CoW Protocol to work with off-chain order submission, as ultimately, the user has the guarantee that the settlement contract will not be able to spend any funds that have not previously been approved in the allowance manager contract. To sum up, the CoW Protocol smart contracts guarantee the users that:

* Funds can only be transferred if a trader has approved GPv2 and signed an order to sell the given token for another
* Limit prices and amounts of the signed order will always be satisfied
* Signed orders have an expiry date, can be cancelled on-chain, and not be replayed
* Only solvers subject to slashing can execute the batch auction settlement
* Smooth transaction management, in the case of multisignature wallets, as once the first signature is done, the minimum price shown is guaranteed. If the protocol can find the promised price no matter when the rest of the signatures are done, the trade will be executed, if not, the order will simply expire without any cost for the trading participants.
