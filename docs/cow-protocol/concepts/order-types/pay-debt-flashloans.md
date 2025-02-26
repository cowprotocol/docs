---
sidebar_position: 6
---

# Repay debt with collateral using flashloans

A key advantage of flashloans is the ability to repay debt with collateral, since flashloans allow users to close or reduce their debt positions without needing upfront liquidity.

Instead of requiring users to have assets readily available to repay their loans, flashloans enable them to temporarily borrow the needed funds, use those funds to repay their debt, and immediately reclaim their locked collateral. Once the collateral is received, it can be swapped or liquidated to cover the borrowed amount, ensuring the loan is repaid within the same transaction.

This approach eliminates the need for users to preemptively sell assets or find external liquidity, making it a highly flexible and efficient way to manage debt positions.

### How to do it

The user can sign a pre-hook that deploys a cowshed which pays back the debt using the flashloaned tokens. The underlying user order then it is just for paying back the required flashloan.

This can be done with a buy order with flashloaned tokens by selling at most X collateral tokens. The receiver has to be always the settlement contract. The driver will take care of sending the funds to the appropriate address.

Let's say the user `0x123...321` borrowed 2000 USDC against 1 ETH of collateral and wants to repay their debt position.
1. The user needs to determine how much interest their debt position accumulated already: let’s say they now have to pay 2100 USDC to get back their 1 ETH.
2. Therefore, the user could set the buy amount to 2101 USDC. The reason is that if a small buffer is added, the debt will be wiped out completely, but there might remain some USDC dust,
   but if a buffer is not added, the user will end up with remaining debt dust (but no USDC dust).
3. The user places a buy order:

```json
{
  "from": "0x123...321",
  "sellToken": "ETH", // collateral token (unlocked by repaying the debt)
  "sellAmount": 1e18, // we are willing to sell the entire collateral if necessary
  "buyToken": "USDC", // originally borrowed token that was now advanced by the flashloan
  "buyAmount": "2101", // see appData.flashloan.amount
  "receiver": "settlementContract", // this is for repaying the flashloan
  "validTo": "now + 5m", // managing risk can be done by having a short validity
  "kind": "buy", // buy exactly the flashloaned amount and keep the surplus in the collateral token
  "partiallyFillable": false, // if an order is partially fillable, then it is not ensured the debt will be paid
  "appData": {
    "hooks": {
      "pre": [{
          // repay the outstanding debt
      }],
    },
    "flashloan": {
      "token": "USDC",
      "amount": "2101" 
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
- The flashloan provider got their 2100 USDC back
