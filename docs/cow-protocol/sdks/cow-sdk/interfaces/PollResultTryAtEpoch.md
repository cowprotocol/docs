---
id: "PollResultTryAtEpoch"
title: "Interface: PollResultTryAtEpoch"
sidebar_label: "PollResultTryAtEpoch"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### epoch

• `Readonly` **epoch**: `number`

The epoch after which it is ok to retry to to poll this order.
The value is expressed as a Unix timestamp (in seconds).

This epoch will be inclusive, meaning that it is ok to retry at the block mined precisely at this epoch or later.

#### Defined in

external/cow-sdk/src/composable/types.ts:155

___

### reason

• `Optional` **reason**: `string`

#### Defined in

external/cow-sdk/src/composable/types.ts:156

___

### result

• `Readonly` **result**: [`TRY_AT_EPOCH`](../enums/PollResultCode.md#try_at_epoch)

#### Defined in

external/cow-sdk/src/composable/types.ts:148
