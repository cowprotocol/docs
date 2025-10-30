---
id: "PriceQuality"
title: "Enumeration: PriceQuality"
sidebar_label: "PriceQuality"
sidebar_position: 0
custom_edit_url: null
---

How good should the price estimate be?

Fast: The price estimate is chosen among the fastest N price estimates.
Optimal: The price estimate is chosen among all price estimates.
Verified: The price estimate is chosen among all verified/simulated
price estimates.

**NOTE**: Orders are supposed to be created from `verified` or `optimal`
price estimates.

## Enumeration Members

### FAST

• **FAST** = ``"fast"``

#### Defined in

external/cow-sdk/src/order-book/generated/models/PriceQuality.ts:17

___

### OPTIMAL

• **OPTIMAL** = ``"optimal"``

#### Defined in

external/cow-sdk/src/order-book/generated/models/PriceQuality.ts:18

___

### VERIFIED

• **VERIFIED** = ``"verified"``

#### Defined in

external/cow-sdk/src/order-book/generated/models/PriceQuality.ts:19
