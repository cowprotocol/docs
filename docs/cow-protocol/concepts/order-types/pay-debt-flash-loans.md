---
sidebar_position: 6
---

# Repay debt with collateral using flash loans

A key use case of flash loans is the ability to repay debt with collateral, since flash loans allow users to close or reduce their debt positions without needing upfront liquidity.

Instead of requiring users to have assets readily available to repay their loans, flash loans enable them to temporarily borrow the needed funds, use those funds to repay their debt, and immediately reclaim their locked collateral. Once the collateral is received, it can be swapped or liquidated to cover the borrowed amount, ensuring the loan is repaid within the same transaction.

This approach eliminates the need for users to preemptively sell assets or find external liquidity, making it a highly flexible and efficient way to manage debt positions.

### How to pay back a debt with collateral

This can be achieved using a buy order where:

- The **buy token** is the flash loaned asset that needs to be repaid.
- The **buy amount** is the exact amount needed to repay the flash loan (it must be sufficient to complete the transaction; otherwise, the transaction will revert!).
- The **sell token** is the asset used as collateral.
- The **sell amount** is the full collateral amount.

The flash loan receiver must always be the settlement contract, to let the protocol handle repaying the appropriate amount for you.

When it comes to repaying debt, the approach depends on the lender's contract terms. Some lenders allow a third party to initiate the transfer of collateral tokens from the lending pool to the trader's address, while others may not.

#### Lender allows a third-party to initiate the transfer of collateral tokens

In this case, the user can sign a pre-hook that deploys a `cowshed` to repay the debt using flash-loaned tokens. The underlying user order is then solely for repaying the required flash loan. Since the repayment is handled via `cowshed`, the user can be either an EOA (Externally Owned Account) or a contract (e.g., a SAFE wallet).

#### Lender does not allow a third-party to initiate the transfer of collateral tokens

If the lender does not allow third-party to initiate the transfer of collateral tokens from the lending pool to the trader's address, the process becomes more involved. In this case, the repayment must come directly from the owner's account, meaning the owner cannot simply be an EOA (Externally Owned Account). Instead, it must be a smart contract (e.g. a SAFE wallet). That enables you to authorize function calls coming from the safe by signing them with the safe. That way you can create a hook initiating the withdrawal of the collateral tokens that a third-party can initiate. This is not possible when the collateral owner is an EOA.

Additionally, repayment might not always involve selling the collateral token directly. In some cases, the protocol allows selling an interest-bearing version of the token instead. For example, if the collateral is aUSDC (which represents USDC deposited in Aave and earning interest), selling aUSDC instead of withdrawing and selling USDC directly ensures a more seamless repayment process. Understanding these trade-offs helps determine the correct approach based on the specific requirements of the lending protocol.