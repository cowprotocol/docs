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

- **lender (optional):** the contract that could be used to borrow the funds from.
- **borrower (optional):** who should get the proceeds of the trader.
- **token:** wthen token that needs to get borrowed.
- **amount:** how many atoms of the token need to get borrowed (e.g., 1 `WETH` would be 10¹⁸).

If optional values were not provided the solver will choose sensible defaults.
