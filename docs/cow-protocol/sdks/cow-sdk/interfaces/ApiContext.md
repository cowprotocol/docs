---
id: "ApiContext"
title: "Interface: ApiContext"
sidebar_label: "ApiContext"
sidebar_position: 0
custom_edit_url: null
---

Define the context to use for the CoW Protocol API.

CoW Protocol is a set of smart contracts and off-chain services, deployed on **multiple chains**.
[Supported chains](../enums/SupportedChainId.md) are:
- Mainnet
- Gnosis Chain
- Arbitrum One
- Base
- Sepolia

Each chain has it's own API, and each API has it's own base URL.

Options may be selectively overridden by passing a [PartialApiContext](../modules.md#partialapicontext) to the constructor.

**`See`**

[https://api.cow.fi/docs/#/](https://api.cow.fi/docs/#/)

## Properties

### backoffOpts

• `Optional` **backoffOpts**: `Partial`<`IBackOffOptions`\>

#### Defined in

external/cow-sdk/src/common/configs.ts:75

___

### baseUrls

• `Optional` **baseUrls**: [`ApiBaseUrls`](../modules.md#apibaseurls)

URls that may be used to connect to this context.

#### Defined in

external/cow-sdk/src/common/configs.ts:73

___

### chainId

• **chainId**: [`SupportedChainId`](../enums/SupportedChainId.md)

The `chainId`` corresponding to this CoW Protocol API instance.

#### Defined in

external/cow-sdk/src/common/configs.ts:71

___

### env

• **env**: [`CowEnv`](../modules.md#cowenv)

The environment that this context corresponds to.

#### Defined in

external/cow-sdk/src/common/configs.ts:72

___

### limiterOpts

• `Optional` **limiterOpts**: `RateLimiterOpts`

#### Defined in

external/cow-sdk/src/common/configs.ts:74
