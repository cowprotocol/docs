---
sidebar_position: 2
id: orders
---

# How to specify an order with flashloan

The flashloan is encoded into the [appData](/cow-protocol/reference/core/intents/app-data)'s metadata as an optional object. This information serves as a hint for the solver, but the solver ultimately can modify this data in order to make the operation more optimal.

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

- **lender (optional):** the contract that could be used to borrow the funds from. For example `0x60744434d6339a6B27d73d9Eda62b6F66a0a04FA` for Maker DAO, or `0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2` for AAVE.
- **borrower (optional):** who should receive the borrowed tokens.
- **token:** the token that needs to get borrowed.
- **amount:** how many atoms of the token need to get borrowed (e.g., 1 `WETH` would be 10¹⁸).

If optional values were not provided the solver will choose sensible defaults.
