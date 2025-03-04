---
sidebar_position: 6
---

# Repay debt with collateral using flashloans

A key advantage of flashloans is the ability to repay debt with collateral, since flashloans allow users to close or reduce their debt positions without needing upfront liquidity.

Instead of requiring users to have assets readily available to repay their loans, flashloans enable them to temporarily borrow the needed funds, use those funds to repay their debt, and immediately reclaim their locked collateral. Once the collateral is received, it can be swapped or liquidated to cover the borrowed amount, ensuring the loan is repaid within the same transaction.

This approach eliminates the need for users to preemptively sell assets or find external liquidity, making it a highly flexible and efficient way to manage debt positions.

### How to do it

The user can sign a pre-hook that deploys a [cowshed](../../reference/sdks/cow-sdk/classes/CowShedHooks.md) which pays back the debt using the flashloaned tokens. The underlying user order then it is just for paying back the required flashloan.

This can be achieved through a buy order where the **buy token** is the flash-loaned asset, the **sell token** is the asset used as collateral, and the **sell amount** equals the full collateral amount. The receiver must always be the settlement contract, while the protocol ensures that the funds are sent to the appropriate address.

Let's say user `0x123...321` borrowed 2000 USDC against 1 ETH of collateral in AAVE, and now wants to repay their debt position:
1. The user first needs to determine the total repayment amount including accumulated interest: in this case, 2100 USDC is required to reclaim their 1 ETH collateral.
2. To ensure complete debt repayment, the user should set the buy amount to 2101 USDC (adding a small buffer). This approach:
   - Guarantees the debt is fully repaid
   - May result in a small amount of unused USDC ("dust") returned to the user
   - Prevents the scenario where the user ends up with remaining debt dust and must make an additional transaction
3. Define the [cowshed](../../reference/sdks/cow-sdk/classes/CowShedHooks.md) by calling the `executeHooks` call of the cowshed factory contract (`0x00E989b87700514118Fa55326CD1cCE82faebEF6`), and encode its encoded abi:
```json
{
   "user": "0x123...321",
   "calls": [
     {
       "target": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2", // AAVE pool address
       "value": 0,
       "callData": {
         "asset": "USDC address",
         "amount": 2101000000, // 2101 USDC in atoms
         "interestRateMode": 2,
         "onBehalfOf": "0x123...321"
       }
     }
   ],
   "deadline": 1741095615,
   "nonce": 0,
   "signature": "signature" 
}
```
4. Get the user's cowshed proxy address by calling `proxyOf` with the user address as an input (`"0x123...321"`).
5. The user places a buy order:

```json
{
  "from": "0x123...321",
  "sellToken": "ETH address", // collateral token (unlocked by repaying the debt)
  "sellAmount": 1e18, // we are willing to sell the entire collateral if necessary
  "buyToken": "USDC address", // originally borrowed token that was now advanced by the flashloan
  "buyAmount": 2101000000, // see appData.flashloan.amount
  "receiver": "settlementContract", // this is for repaying the flashloan
  "validTo": "now + 5m", // managing risk can be done by having a short validity
  "kind": "buy", // buy exactly the flashloaned amount and keep the surplus in the collateral token
  "partiallyFillable": false, // if an order is partially fillable, then it is not ensured the debt will be paid
  "appData": {
    "hooks": {
      "pre": [{
         "target": "0x00E989b87700514118Fa55326CD1cCE82faebEF6", // cowshed factory address
         "value": "0",
         "callData": "cowshedFactoryCallEncoded"
      }],
    },
    "flashloan": {
      "borrower": "cowshedUserProxyAddress", // user's cowshed proxy addressed obtained from the proxyOf call
      "token": "USDC",
      "amount": 2101000000 // 2101 USDC in atoms
    }
  }
}
```

Once an order is placed within the CoW Protocol, it enters an auction batch. When a solution is found, the following steps occur:

1. The winning solver calls the Flashloan Settlement Wrapper contract.
2. The 2101 USDC gets transferred to the Flashloan Settlement Wrapper contract.
3. In the pre-hook:
    - Transfer 2101 USDC from the Flashloan Settlement Wrapper contract to the user.
    - Execute the user's pre-hook: Repay the outstanding debt.
    - The user receives their 1 ETH of collateral.
4. Transfer funds into the settlement contract.
5. Execute the user's order:
    - Swap ETH for USDC.
6. Transfer funds to the `receiver` address (funds are sent to the settlement contract, which is to itself).
7. Execute the post-interaction
    - Depending on the flashloan provider, either pay back 2101 USDC to the flashloan provider from the settlement contract, or send the funds to the Flashloan Settlement Wrapper contract, and then send it to the flashloan provider.

State after the order's execution

- Some portion of the 1 ETH is left as surplus in the user account
- The user either has USDC dust in their account or USDC debt dust in the debt position (depending on how the flashloan size buffer was chosen)
- The flashloan provider got their 2101 USDC back
