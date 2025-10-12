---
sidebar_position: 4
---

# How to execute flashloans orders

This short tutorial explains how orders with flashloans hints can be executed by solvers.

## Where to get information about an order’s flashloan?

This information is added by the user inside the order’s appdata. If you have a colocated driver you’ll only get the appdata hash as part of the order from the autopilot.

For example this [order](https://explorer.cow.fi/gc/orders/0x413a7246f58441ad92ea19c09cef90d1b23a1e211e0963f3d39b7db48140533d669685c660c260d80b614f8d1a5ffd24c4e3b82668cd8760) (staging) has the appdata hash `0xa8476d34ec1e22b818cf3d6289e30271a04a4e38a8a3a71f947b5881de06a852` which can be looked up [here](https://barn.api.cow.fi/xdai/api/v1/app_data/0xa8476d34ec1e22b818cf3d6289e30271a04a4e38a8a3a71f947b5881de06a852).

As you can see the `flashloan` field contains just a few pieces of information:
- `amount`: units (in wei) that should be flashloaned
- `token`: which token should be flashloaned
- `receiver`: address that is supposed to receive the tokens
- `liquidityProvider`: the lending protocol’s contract (i.e. AavePool)
- `protocolAdapter`: which address needs to be used to adapt the `liquidityProvider` to CoW Protocol’s flashloan machinery.

The reference driver is already doing all that for you and is also propagating the flashloan data to the connected solver endpoint as a field on the `order` struct. For example, [this](https://solver-instances.s3.eu-central-1.amazonaws.com/staging/xdai/auction/146823591.json) is `/solve` request that your solver will get from the driver. (just search for `flashloan` and you’ll find it)

## Adjustments needed in the solver

### Encode the Call to the Flashloan Router

Because the flashloan needs to be available over the entire duration of the settlement, all flashloan settlements will have to go through the [flashloan router](https://docs.cow.fi/cow-protocol/reference/contracts/periphery/flashloans#iflashloanrouter-contract) (deterministically deployed at `0x9da8b48441583a2b93e2ef8213aad0ec0b392c69`). So instead of calling `settle()` on the settlement contract you have to call `flashloanAndSettle()` on the flashloan router contract. That’s very simple, though. It only takes 2 arguments:
1. `Loan.Data[]` which can be trivially initialized with the data from the order’s `flashloan` field
2. the settlement, those are just the calldata for the regular `settle()` call the router will eventually initiate after taking out all the flashloans

:::note

Specifically for the AAVE integration, the driver is not required to inject any additional permissioned interactions. If you call the flashloan router correctly and include the pre- and post-hooks of the order the call should pass.

This is completely handled by the reference driver.

:::

### Estimating the Gas Costs

Your solver should know how much gas overhead the flashloan logic adds to the solution in order to capture enough network fees to break even. If this does not happen every time your solver settles a flashloan order it would lose the underestimated gas costs. This will be needed for all solvers - even the ones connected to a reference driver as the reference driver will forward your gas costs are the solver reported them.

Assuming you simply do a simulation of the `eth_call` you’ll have to adjust it to call the flashloan router instead of the settlement contract (see section about calling the router). Alternatively you can consider adding a heuristic for the additional gas overhead. Some information on the gas can be found [here](https://github.com/cowprotocol/flash-loan-router/pull/19).

### Adjust the Order Filtering Logic

Many solvers implement some order filtering logic that, for example, discards orders with missing balances early so the matching engine does not have to waste time on them. Orders may be placed if taking out a flashloan and executing the pre-hooks will lead to sufficient balance and allowance for the order. In AAVE’s case, for example, the order will only pass the signature verification check if the pre-hook executed successfully. And that can only be executed if the `receiver` in the flashloan hint got enough tokens before hand.

There are multiple ways to handle this:
- assume an order is good if it uses flashloan
- adjust your verification logic to simulate the whole flashloan (as discussed in section about calling the router)
- adjust your verification logic to “fake” the flashloan by using state overrides to make it appear as if the flashloan `receiver` got the tokens it needed

### Handle Bigger Auction Instances

Together with the support for flashloans we want to minimize the order filtering the autopilot does before even building the auction. This was implemented as a performance optimization since most of the orders do not have sufficient balance. The order filtering is already implemented in the reference driver so nothing should change for solvers connected to that. For colocated drivers the auction in the `/solve` endpoint will contain ~3K orders or more going forward.

## Details on AAVE’s Integration

AAVE will cover 3 new use cases:

1. Collateral swap

User has a debt position and wants to change the collateral they use.

Example: https://explorer.cow.fi/gc/orders/0x413a7246f58441ad92ea19c09cef90d1b23a1e211e0963f3d39b7db48140533d669685c660c260d80b614f8d1a5ffd24c4e3b82668cd8760

2. Repay debt with collateral

Use some of the collateral to repay the debt. This is basically, auto-liquidating without a fee.

Example:

https://explorer.cow.fi/gc/orders/0xab8596fb7eae317bf15b1b4d57169f5e6714479e38661e0f06df7e7f12409915d20982aedc2074bd3b798cd6c02f6e03e51743cc68cdd580

3. Debt swap

User has a debt in a token and wants to swap for something else. Think about leverage, changing the debt to reduce interest for example.

Example:

https://explorer.cow.fi/gc/orders/0x6c100f2f6bb46ebf1c9f52660fdbe31079d4f982f56b524605358bd419af3a6237c390b08d5a3104b3efc1401e8d11e52624c75868d305a0

These orders do not involve AAVE’s `aToken` (i.e. `aUSDC` instead of `USDC`) but supporting them is recommended to participate in the non-flashloan version of each of the three usecases.

Assuming you encoded the flashloan router call correctly, AAVE’s orders will move the flashloaned funds to the correct spot using the pre-hook and will repay the flashloan in the post-hook. No additional calls have to be encoded in your solution. But for this to work you absolutely have to take out the flashloan with the given flashloan information. Fronting the tokens by private liquidity is not supported in this use case.