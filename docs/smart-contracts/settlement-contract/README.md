# Settlement Contract

#### Settlement

A settlement comprises a list of traded tokens with their corresponding price in the batch, a list of trades to execute, and a list of interactions.

A solver monitors the on-chain liquidity and the orders that are available for being matched for then determining the clearing prices of the settlement, which orders will be included, and which extra liquidity is necessary from the blockchain.

Normally, all orders in a settlement are settled with uniform clearing prices, which means that every user receives the same price for the same token.

If the transaction does not revert, each order will be executed during a settlement and the user will receive the desired token after the settlement.

**1.Interactions**

Interactions allow solvers to execute arbitrary calls to any on-chain contract.

Normally, they are used to interact with other on-chain liquidity providers, for example, to make a swap call to Uniswap.

They can also be used for other purposes: for example, an interaction can be used to approve Uniswap for trading with the tokens stored in the settlement contract, as well as withdrawing the accumulating fee from the contracts when the amount becomes too large.

**2.Trades**

Trades contain a description of the users' orders, a signature for verifying its validity, and the executed amount (for partially fillable orders).

The contract decodes the order parameters from the trade.

The parameters of the order are verified for validity:

* The signature for the order matches the user's address
* The order is not expired
* The order was not previously filled
* The current prices are equal to or better than what is specified in the order

**3.Order struct**

Here is a complete list of the parameters of a GPv2 order and the corresponding type. This is the object that a user signs to validate its order.

* **Sell Token:** the address of the token that is sold
* **Buy Token:** the address of the token that is bought
* **Sell Amount:** the amount of `sellToken` that is sold in wei
* **Buy Amount:** the amount of `buyToken` that is bought in wei
* **Receiver:** the address that will receive the proceedings of the trade. If this field is zero (the zero address `0x00...0`), then the user who signed the trade is going to receive the funds
* **Valid To:** the timestamp (in seconds) until which the order is valid
* **App Data:** extra information about the order. It is ignored by the smart contract outside of signature verification, but may be used offchain for information on the order's origin or for referrals
* **Fee Amount:** the amount of fees paid in `sellToken` wei.
* **Kind:** either `sell` or `buy`
* **Partially Fillable:** whether the order is partially fillable or fill-or-kill. (For the moment this is always FALSE as its not enabled yet)
* **Sell Token Balance:** from where the sell token balance is withdrawn. It can be `erc20` (directly from the user's ERC-20 balance), `external` (from the user's ERC-20 balancer through Balancer's vault), or `internal` (from the user's Balancer internal balance)
* **Buy Token Balance:** to where the buy token is deposited. It can be `erc20` (directly to the user's ERC-20 balance) or `internal` (to the user's Balancer internal balance)
* **SigningScheme:** The signature scheme to use when signing the order. CoW Protocol allows various signing schemes to support different wallet kinds:
  * `eip712`: Use the EIP-712 signing scheme exactly as specified [in the EIP](https://eips.ethereum.org/EIPS/eip-712).
  * `ethsign`: Use the `eth_sign` Ethereum message signature of the EIP-712 order “struct hash” (this is defined in the EIP linked above).
  * `eip1271`: Use ERC-1271 signature for the order. The order hash will be the EIP-712 order “struct hash” (defined above)
  * `presign`: Execute a transaction to the Settlement contract to indicate that an order is signed. This can be use as a fallback solution if no other signing schemes are supported by the trader.
* **Signature:** The signature bytes. For ECDSA signatures (`eip712` and `ethsign`) this just the the signature encoded as 65 bytes: `r || s || v`. For `eip1271`, this is the signature bytes to pass in at signature verification. This is ERC-1271 implementation defined and largely depends on the signing smart contract. For `presign`, this is the empty bytes `0x`.
* **From:** The Address that submits the order and authorizes the full sellAmount to be traded once executed.
