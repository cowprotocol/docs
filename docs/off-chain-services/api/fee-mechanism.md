# Fee Mechanism

In CoW Protocol, the blockchain transactions that settle user orders are submitted by the settlement backend run by the solvers, which incurs gas costs. This cost is forwarded to orders in the form of protocol fees. The aim of this protocol fee is for the solvers to cover the costs of executing the order within a batch auction.

As you know, CoW Protocol works with off-chain transactions in the form of signed orders. These orders contain a field called "feeAmount" which is the maximum amount of fees that can be charged to the owner of the order. When the order gets executed, the fee is enforced by the settlement smart contract and given to the backend solver that submitted the settlement solution that contained such an order.

In the smart contract, the fee is taken from the order's sell token. As Ethereum's gas price and the relative price between the sell token and buy token change, so does the minimum fee that makes it viable for a solver to include an order. Because of changing conditions, CoW Protocol is able to execute orders in a full or partial style, meaning that if the order is completely filled, the fee taken by the protocol is 100%, while if the order is partially executed, a prorated amount of the total fee is taken.

This is communicated through the [/api/v1/feeAndQuote](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/api/get_fee_and_quote.rs) endpoint. Based on the order's type, sell token, buy token, and amount, the backend calculates an acceptable fee and a validity period. When submission of a new order is attempted, the backend checks if the fee is appropriate and rejects the order if the fee is not sufficient. The validity period improves the user experience by guaranteeing that order submission with this fee will not be rejected for some time. Otherwise, the price could move and by the time a user has signed their order, it would get rejected.

Once accepted the order is expected to be executed even if gas prices change (this might change in the future).

Fee estimation estimates the amount of gas needed on a per order basis taking into account that for some token pairs the route through automated market makers like Uniswap pools is longer than for others. Fee estimation is handled in [orderbook/src/fee.rs](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/fee.rs)

Fees are persisted in the min_fee_measurements postgres table from which we can efficiently look up valid fees and discard expired fees. Fee Persistence is handled in [orderbook/src/database/fees.rs](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/database/fees.rs)
