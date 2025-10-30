---
id: "SubgraphApi"
title: "Class: SubgraphApi"
sidebar_label: "SubgraphApi"
sidebar_position: 0
custom_edit_url: null
---

TheGraph API client for CoW Protocol.

## Constructors

### constructor

• **new SubgraphApi**(`context?`): [`SubgraphApi`](SubgraphApi.md)

Create a new CoW Protocol API instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Partial`<`SubgraphApiContext`\> | Any properties of the SubgraphApiContext may be overridden by passing a PartialSubgraphApiContext. |

#### Returns

[`SubgraphApi`](SubgraphApi.md)

#### Defined in

external/cow-sdk/src/subgraph/api.ts:58

## Properties

### API\_NAME

• **API\_NAME**: `string` = `'CoW Protocol Subgraph'`

#### Defined in

external/cow-sdk/src/subgraph/api.ts:50

___

### context

• **context**: `SubgraphApiContext`

#### Defined in

external/cow-sdk/src/subgraph/api.ts:52

## Methods

### getContextWithOverride

▸ **getContextWithOverride**(`contextOverride?`): `SubgraphApiContext`

Override parts of the context for a specific call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contextOverride` | `Partial`<`SubgraphApiContext`\> | Override the context for this call only. |

#### Returns

`SubgraphApiContext`

The context with the override applied.

#### Defined in

external/cow-sdk/src/subgraph/api.ts:133

___

### getEnvConfigs

▸ **getEnvConfigs**(`env`): `SubgraphApiBaseUrls`

Get the base URLs for the given environment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `env` | [`CowEnv`](../modules.md#cowenv) | The environment to get the base URLs for. |

#### Returns

`SubgraphApiBaseUrls`

The base URLs for the given environment.

#### Defined in

external/cow-sdk/src/subgraph/api.ts:142

___

### getLastDaysVolume

▸ **getLastDaysVolume**(`days`, `contextOverride?`): `Promise`<`LastDaysVolumeQuery`\>

Query the volume over the last N days from TheGraph for the CoW Protocol.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `days` | `number` | The number of days to query. |
| `contextOverride` | `Partial`<`SubgraphApiContext`\> | Override the context for this call only. |

#### Returns

`Promise`<`LastDaysVolumeQuery`\>

The volume for the last N days.

#### Defined in

external/cow-sdk/src/subgraph/api.ts:81

___

### getLastHoursVolume

▸ **getLastHoursVolume**(`hours`, `contextOverride?`): `Promise`<`LastHoursVolumeQuery`\>

Query the volume over the last N hours from TheGraph for the CoW Protocol.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hours` | `number` | The number of hours to query. |
| `contextOverride` | `Partial`<`SubgraphApiContext`\> | Override the context for this call only. |

#### Returns

`Promise`<`LastHoursVolumeQuery`\>

The volume for the last N hours.

#### Defined in

external/cow-sdk/src/subgraph/api.ts:91

___

### getTotals

▸ **getTotals**(`contextOverride?`): `Promise`<\{ `__typename?`: ``"Total"`` ; `feesEth?`: `any` ; `feesUsd?`: `any` ; `orders`: `any` ; `settlements`: `any` ; `tokens`: `any` ; `traders`: `any` ; `volumeEth?`: `any` ; `volumeUsd?`: `any`  }\>

Query the totals from TheGraph for the CoW Protocol.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contextOverride` | `Partial`<`SubgraphApiContext`\> | Override the context for this call only. |

#### Returns

`Promise`<\{ `__typename?`: ``"Total"`` ; `feesEth?`: `any` ; `feesUsd?`: `any` ; `orders`: `any` ; `settlements`: `any` ; `tokens`: `any` ; `traders`: `any` ; `volumeEth?`: `any` ; `volumeUsd?`: `any`  }\>

The totals for the CoW Protocol.

#### Defined in

external/cow-sdk/src/subgraph/api.ts:70

___

### runQuery

▸ **runQuery**<`T`\>(`query`, `variables?`, `contextOverride?`): `Promise`<`T`\>

Run a query against the CoW Protocol Subgraph.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `query` | `string` \| `DocumentNode` | `undefined` | GQL query string or DocumentNode. |
| `variables` | `undefined` \| `Variables` | `undefined` | To be passed to the query. |
| `contextOverride` | `Partial`<`SubgraphApiContext`\> | `{}` | Override the context for this call only. |

#### Returns

`Promise`<`T`\>

Results of the query.

**`Throws`**

[CowError](CowError.md) if the query fails.

#### Defined in

external/cow-sdk/src/subgraph/api.ts:106
