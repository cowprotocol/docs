---
description: >-
  Here is a complete list of the parameters of a limit order and the
  corresponding type. This is the object that a user signs to validate its order
---

# Limit Order Structure

* **Sell Token:** the address of the token that is sold
* **Buy Token:** the address of the token that is bought
* **Sell Amount:** the amount of `sellToken` that is sold in wei
* **Buy Amount:** the amount of `buyToken` that is bought in wei
* **Receiver:** the address that will receive the proceedings of the trade. If this field is zero (the zero address `0x00...0`), then the user who signed the trade is going to receive the funds
* **Valid To:** the timestamp (in seconds) until which the order is valid
* **App Data:** extra information about the order. It is ignored by the smart contract outside of signature verification, but may be used offchain for information on the order's origin or for referrals
* **Fee Amount:** the amount of fees paid in `sellToken` wei. In the case for Limit Orders this field will always be `0.`
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
