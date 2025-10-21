---
sidebar_position: 4
---

# How to execute flashloans orders

This short tutorial explains how orders with flashloans hints can be executed by solvers.

## Where to get information about an order’s flashloan?

Information about an order's flashloan is added by the user inside the order’s [appdata](/docs/cow-protocol/reference/core/intents/app_data.mdx). As a reminder, the autopilot only shares the appdata hash as part of the auction instance it shares with the [drivers](/docs/cow-protocol/tutorials/arbitrate/solver/driver.md), and so it is the driver's responsibility to recover the full appdata.

:::note
[Solvers](/docs/cow-protocol/tutorials/arbitrate/solver/solver-engine.md) connected to the reference driver already receive the full appdata from the driver.
:::

For example, this [staging order](https://explorer.cow.fi/gc/orders/0x413a7246f58441ad92ea19c09cef90d1b23a1e211e0963f3d39b7db48140533d669685c660c260d80b614f8d1a5ffd24c4e3b82668cd8760) has the appdata hash `0xa8476d34ec1e22b818cf3d6289e30271a04a4e38a8a3a71f947b5881de06a852` which can be looked up [here](https://barn.api.cow.fi/xdai/api/v1/app_data/0xa8476d34ec1e22b818cf3d6289e30271a04a4e38a8a3a71f947b5881de06a852). Specifically, in the `metadata` field, the `flashloan` entry looks as follows:

```
      "flashloan": {
        "amount": "20000000000000000000",
        "liquidityProvider": "0xb50201558B00496A145fE76f7424749556E326D8",
        "protocolAdapter": "0x19167A179bcDDBecc2d655d059f20501E5323560",
        "receiver": "0x19167A179bcDDBecc2d655d059f20501E5323560",
        "token": "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"
      }
```

We now briefly explain what each entry means:
- `amount`: units (in wei) that should be flashloaned;
- `token`: which token should be flashloaned;
- `receiver`: address that is supposed to receive the tokens;
- `liquidityProvider`: the lending protocol’s contract (i.e. AavePool);
- `protocolAdapter`: which address needs to be used to adapt the `liquidityProvider` to CoW Protocol’s flashloan machinery.

## Adjustments needed in the solver/driver

### Encoding the Call to the Flashloan Router

As the flashloan needs to be available over the entire duration of the settlement, all flashloan settlements will have to go through the [flashloan router](/docs/cow-protocol/reference/contracts/periphery/flashloans#iflashloanrouter-contract) (deterministically deployed at `0x9da8b48441583a2b93e2ef8213aad0ec0b392c69`; see the contract [here](https://github.com/cowprotocol/flash-loan-router) and the mainnet deployment  [here](https://etherscan.io/address/0x9da8b48441583a2b93e2ef8213aad0ec0b392c69#code)). So, instead of calling `settle()` on the settlement contract, the driver has to call `flashloanAndSettle()` on the flashloan router contract. This is `flashloanAndSettle()` call takes 2 arguments:
1. `Loan.Data[]`, which can be trivially initialized with the data from the order’s `flashloan` field;
2. the settlement, which is the calldata for the regular `settle()` call the router will eventually initiate after taking out all the flashloans.

:::note

Specifically for the AAVE integration, the driver is not required to inject any additional permissioned interactions. If the call to the flashloan router correctly is constructed correctly and the pre- and post-hooks of the order are included, the call should succeed.

We stress again that this is fully handled by the reference driver.

:::

### Estimating the Gas Costs

Solvers are responsible for capturing enough network fees to cover the total gas cost of a settlement. The flashloan flow requires a call to a wrapper contract, which takes the loans and then call to the settlement contract. This wrapper adds an overhead compared to just calling the settlement contract, and for this reason solvers should pay extra attention when estimating the total gas needed. 


:::caution

Proper gas estimation will be needed for all solvers - even the ones connected to the reference driver, as the reference driver does not do any post-processing and adjustments of the network fees computed by solvers. If this overhead is not taken into account, every time a solver settles a flashloan order would result in losses due to the underestimated gas costs. 

:::

:::note

If the solver does a simulation of the `eth_call` as part of its gas estimation logic, one will need to adjust it to call the flashloan router instead of the settlement contract. Alternatively, one can consider heuristically adding an overhead to estimate the additional gas needed. Some information on the gas can be found [here](https://github.com/cowprotocol/flash-loan-router/pull/19).

:::

### Adjusting the Order Filtering Logic

Many solvers implement some order filtering logic that, for example, discards orders with missing balances early so the matching engine does not have to process them. Orders may be placed if taking out a flashloan and executing the pre-hooks will lead to sufficient balance and allowance for the order. In AAVE’s case, for example, the order will only pass the signature verification check if the pre-hook executed successfully. And that can only be executed if the `receiver` in the flashloan hint got enough tokens before hand.

There are multiple ways for a solver to handle this:
- assume an order is good if it uses flashloan;
- adjust the solver's verification logic to simulate the whole flashloan (as discussed in the section about calling the router);
- adjust the solver's verification logic to "fake" the flashloan by using state overrides to make it appear as if the flashloan `receiver` got the tokens it needed.

### Handling Bigger Auction Instances

Together with the support for flashloans, we want to minimize the order filtering the autopilot does before even building the auction. This filtering was initially implemented as a performance optimization since most of the orders do not have sufficient balance, and the plan is to remove it. The order filtering is already implemented in the reference driver as well so nothing should change for solvers connected to that. For other solver/ drivers the auction in the `/solve` endpoint will contain ~3K orders or more from now on.

## Details on AAVE’s Integration

AAVE will cover 3 new use cases:

1. **Collateral swap**: User has a debt position and wants to change the collateral they use ([example]( https://explorer.cow.fi/gc/orders/0x413a7246f58441ad92ea19c09cef90d1b23a1e211e0963f3d39b7db48140533d669685c660c260d80b614f8d1a5ffd24c4e3b82668cd8760)).

2. **Repay debt with collateral**:  Use some of the collateral to repay the debt. This is essentially auto-liquidating without a fee ([example](https://explorer.cow.fi/gc/orders/0xab8596fb7eae317bf15b1b4d57169f5e6714479e38661e0f06df7e7f12409915d20982aedc2074bd3b798cd6c02f6e03e51743cc68cdd580
)).

3. **Debt swap**: User has a debt in a token and wants to swap for something else. Think about leverage, changing the debt to reduce interest for example ([example](https://explorer.cow.fi/gc/orders/0x6c100f2f6bb46ebf1c9f52660fdbe31079d4f982f56b524605358bd419af3a6237c390b08d5a3104b3efc1401e8d11e52624c75868d305a0
)).

:::note 

These orders do not involve AAVE’s `aToken` (i.e. `aUSDC` instead of `USDC`) but supporting them is recommended to participate in the non-flashloan version of each of the three usecases.

:::

Assuming the flashloan router call is encoded correctly, AAVE’s orders will move the flashloaned funds to the correct spot using the pre-hook and will repay the flashloan in the post-hook. No additional calls have to be encoded in a solution. However, for this to work the flashloan has to be taken out with the given flashloan information. Getting the tokens, for example, by private liquidity is not supported in this use case.
