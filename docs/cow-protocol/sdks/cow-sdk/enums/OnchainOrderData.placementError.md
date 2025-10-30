---
id: "OnchainOrderData.placementError"
title: "Enumeration: placementError"
sidebar_label: "placementError"
custom_edit_url: null
---

[OnchainOrderData](../namespaces/OnchainOrderData.md).placementError

Describes the error, if the order placement was not successful. This could happen, for example, if the `validTo` is too high, or no valid quote was found or generated.

## Enumeration Members

### PRE\_VALIDATION\_ERROR

• **PRE\_VALIDATION\_ERROR** = ``"PreValidationError"``

#### Defined in

external/cow-sdk/src/order-book/generated/models/OnchainOrderData.ts:29

___

### QUOTE\_NOT\_FOUND

• **QUOTE\_NOT\_FOUND** = ``"QuoteNotFound"``

#### Defined in

external/cow-sdk/src/order-book/generated/models/OnchainOrderData.ts:27

___

### VALID\_TO\_TOO\_FAR\_IN\_FUTURE

• **VALID\_TO\_TOO\_FAR\_IN\_FUTURE** = ``"ValidToTooFarInFuture"``

#### Defined in

external/cow-sdk/src/order-book/generated/models/OnchainOrderData.ts:28
