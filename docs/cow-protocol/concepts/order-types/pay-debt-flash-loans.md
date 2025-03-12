---
sidebar_position: 6
---

# Repay debt with collateral using flash loans

A key use case of flash loans is the ability to repay debt with collateral, since flash loans allow users to close or reduce their debt positions without needing upfront liquidity.

Instead of requiring users to have assets readily available to repay their loans, flash loans enable them to temporarily borrow the needed funds, use those funds to repay their debt, and immediately reclaim their locked collateral. Once the collateral is received, it can be swapped or liquidated to cover the borrowed amount, ensuring the loan is repaid within the same transaction.

This approach eliminates the need for users to preemptively sell assets or find external liquidity, making it a highly flexible and efficient way to manage debt positions.

### How to take out a flash loan

This can be achieved using a buy order where:

- The **buy token** is the flash loaned asset that needs to be repaid.
- The **buy amount** is the exact amount needed to repay the debt (it must be sufficient to complete the transaction; otherwise, the transaction will revert!).
- The **sell token** is the asset used as collateral.
- The **sell amount** is the full collateral amount.

The receiver must always be the settlement contract, to let the protocol handle repaying the appropriate address for you.

When it comes to repaying debt, the approach depends on the lender's contract terms. Some lenders allow a third party to pay off the debt and transfer the unlocked funds to the owner's account, while others may not.

#### Lender allows a third-party to repay your debt

In this case, the user can sign a pre-hook that deploys a [cowshed](../../reference/sdks/cow-sdk/classes/CowShedHooks.md) to repay the debt using flash-loaned tokens. The underlying user order is then solely for repaying the required flash loan. Since the repayment is handled via `cowshed`, the user can be either an EOA (Externally Owned Account) or a contract (e.g., a SAFE wallet).

#### Lender does not allow a third-party to repay your debt

If the lender does not allow third-party debt repayment, the process becomes more involved. In this case, the repayment must come directly from the owner's account, meaning the owner cannot simply be an EOA (Externally Owned Account). Instead, it must be a smart contract (e.g.,a SAFE wallet), which can execute more complex transactions atomically. This is important because a contract can facilitate operations such as selling assets and repaying the debt in a single transaction, something an EOA cannot do.

Additionally, repayment might not always involve selling the collateral token directly. In some cases, the protocol requires selling an interest-bearing version of the token instead. For example, if the collateral is aUSDC (which represents USDC deposited in Aave and earning interest), selling aUSDC instead of withdrawing and selling USDC directly ensures a more seamless repayment process. Understanding these trade-offs helps determine the correct approach based on the specific requirements of the lending protocol.

##### Example

Let's say user (SAFE with address `0x123...321`) borrowed 2000 USDC against 1 ETH of collateral in AAVE, and now wants to repay their debt position:
1. The user first needs to determine the total repayment amount including accumulated interest: in this case, 2100 USDC is required to reclaim their 1 ETH collateral.
2. To ensure complete debt repayment, the user should set the buy amount to 2101 USDC (adding a small buffer). This approach:
   - Guarantees the debt is fully repaid
   - May result in a small amount of unused USDC ("dust") returned to the user
   - Prevents the scenario where the user ends up with remaining debt dust and must make an additional transaction
3. The user needs to define two pre-hooks: one to repay the debt with collateral and the other for withdrawing the collateral repaid. In order to define both pre-hooks, the user needs to build both transactions with their SAFE:
   - Repay the debt by calling the [repay](https://etherscan.io/address/0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2#writeProxyContract#F17) function of the AAVE's contract.
   - Withdraw the collateral by calling the [withdraw](https://etherscan.io/address/0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2#writeProxyContract#F33) function of the AAVE's contract.
4. The user places a buy order:

```json
{
  "from": "0x123...321",
  "sellToken": "ETH address", // collateral token (unlocked by repaying the debt)
  "sellAmount": 1e18, // we are willing to sell the entire collateral if necessary
  "buyToken": "USDC address", // originally borrowed token that was now advanced by the flash loan
  "buyAmount": 2101000000, // see appData.flashloan.amount
  "receiver": "settlementContract", // this is for repaying the flash loan
  "validTo": "now + 5m", // managing risk can be done by having a short validity
  "kind": "buy", // buy exactly the flash loaned amount and keep the surplus in the collateral token
  "partiallyFillable": false, // if an order is partially fillable, then it is not ensured the debt will be paid
  "appData": {
    "hooks": {
      "pre": [
         // First: Repay the debt
         {
            "target": "0x123...321",
            "value": "0",
            "callData": "signedRepayCall"
         },
         // Then: Withdraw the collateral
         {
            "target": "0x123...321",
            "value": "0",
            "callData": "signedWithdrawCall"
         }
      ]
    },
    "flashloan": {
      "token": "USDC",
      "amount": 2101000000 // 2101 USDC in atoms
    }
  }
}
```

Once an order is placed within the CoW Protocol, it enters an auction batch. When a solution is found, the following steps occur:

1. The winning solver calls the flash loan `IFlashLoanRouter` contract.
2. The 2101 USDC gets transferred to the flash loan `IFlashLoanRouter` contract.
3. In the pre-hook:
    - Transfer 2101 USDC from the flash loan `IFlashLoanRouter` contract to the user.
    - Execute the user's pre-hook: Repay the outstanding debt.
    - The user receives their 1 ETH of collateral.
4. Transfer funds into the settlement contract.
5. Execute the user's order:
    - Swap ETH for USDC.
6. Transfer funds to the `receiver` address (funds are sent to the settlement contract, which is to itself).
7. Execute the post-interaction
    - Depending on the flash loan provider, either pay back 2101 USDC to the flash loan provider from the settlement contract, or send the funds to the flash loan `IFlashLoanRouter` contract, and then send it to the flash loan provider.

State after the order's execution

- Some portion of the 1 ETH is left as surplus in the user account
- The user either has USDC dust in their account or USDC debt dust in the debt position (depending on how the flash loan size buffer was chosen)
- The flash loan provider got their 2101 USDC back
