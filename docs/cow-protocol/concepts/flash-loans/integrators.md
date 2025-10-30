---
sidebar_position: 2
---

# How to specify an order with flash loan

The flash loan is encoded into the [appData](/cow-protocol/reference/intents/app-data)'s metadata as an optional object. This information serves as a hint for the solver, but the solver ultimately can decide for a different approach in order to make the operation more optimal.

It is important to ensure that the flash loan gas overhead is added to the slippage tolerance when creating the order.

```json
{
  "flashloan": {
    "lender": "0x1111111111111111111111111111111111111111",
    "borrower": "0x2222222222222222222222222222222222222222",
    "token": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "amount": "1000000"
  }
}
````

- **lender:** the contract that could be used to borrow the funds from. For example `0x60744434d6339a6B27d73d9Eda62b6F66a0a04FA` for any `ERC-3156` compliant lender contract, or `0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2` for AAVE. 
- **borrower (optional):** who should receive the borrowed tokens. If no value is provided, the order owner's address will be used as the borrower.
- **token:** the token that needs to get borrowed.
- **amount:** how many atoms of the token need to get borrowed (e.g., 1 `WETH` would be 10¹⁸).

# How a lender protocol can be compatible with CoW Protocol

If the lender supports ERC-3156 then there is no extra smart-contract work needed.

If the lender protocol rely on direct repayment from the borrower through `transferFrom`, then the lender protocol could implement the borrower functions as in [Aave Borrower](https://github.com/cowprotocol/flash-loan-router/blob/main/src/AaveBorrower.sol) or in [ERC-3156 wrapper](https://github.com/cowprotocol/flash-loan-router/blob/main/src/ERC3156Borrower.sol).