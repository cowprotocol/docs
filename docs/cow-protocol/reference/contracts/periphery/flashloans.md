---
sidebar_position: 5
id: flashloans
---

# Flashloans

There are two main flashloans contracts: `IBorrower` and `IFlashLoanRouter`.

## `IBorrower` contract

IBorrower is an abstraction around specific flash-loan providers. Each provider has slightly different syntax for the loan request, as well as for the function that is called back. The borrower contract abstracts this away for the router.

### Data Types and Storage

```solidity
interface IBorrower {
    function flashLoanAndCallBack(address lender, IERC20 token, uint256 amount, bytes calldata callBackData) external;
    function approve(IERC20 token, address target, uint256 amount) external;
    function settlementContract() external view returns (ICowSettlement);
    function router() external view returns (IFlashLoanRouter);
}
```

### Functions

#### `flashLoanAndCallBack`

Requests a flash loan with the specified parameters from the lender and, once the funds have been received, call back the router while passing through the specified custom data. The flash-loan repayment is expected to take place during the final settlement in the router.

```solidity
flashLoanAndCallBack(address lender, IERC20 token, uint256 amount, bytes calldata callBackData) external;
```

| **Parameter**  | **Description**                                                         |
|----------------|-------------------------------------------------------------------------|
| `lender`       | The address of the flash-loan lender from which to borrow               |
| `token`        | The token that is requested in the flash loan                           |
| `amount`       | The amount of funds requested from the lender                           |
| `callBackData` | The data to send back when calling the router once the loan is received |

#### `approve`

Approves the target address to spend the specified token on behalf of the Borrower up to the specified amount.

```solidity
approve(IERC20 token, address target, uint256 amount) external;
```

| **Parameter** | **Description**                                     |
|---------------|-----------------------------------------------------|
| `token`       | The token to approve for transferring               |
| `target`      | The address that will be allowed to spend the token |
| `amount`      | The amount of tokens to set as the allowance        |

#### `settlementContract`

The settlement contract supported by this contract.

```solidity
settlementContract() external view returns (ICowSettlement);
```

#### `router`

The router contract that manages this borrower contract. It will be called back once the flash-loan proceeds are received and is the only address that can trigger a flash loan request.

```solidity
router() external view returns (IFlashLoanRouter);
```

## `IFlashLoanRouter` contract

This contract manages all flash-loan requests and is eventually responsible for executing the settlement.

### Data Types and Storage

```solidity
interface IFlashLoanRouter {
    function flashLoanAndSettle(Loan.Data[] calldata loans, bytes calldata settlement) external;
    function borrowerCallBack(bytes calldata encodedLoansWithSettlement) external;
    function settlementContract() external returns (ICowSettlement);
    function settlementAuthentication() external returns (ICowAuthentication);
}
```

### Functions

#### `flashLoanAndSettle`

Request all flash loan specified in the input and, after that, executes the specified settlement.

```solidity
flashLoanAndSettle(Loan.Data[] calldata loans, bytes calldata settlement) external;
```

| **Parameter** | **Description**                                                                                                                |
|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| `loans`       | The list of flash loans to be requested before the settlement are executed. The loans will be requested in the specified order |
| `settlement`  | The ABI-encoded bytes for a call to `settle()` (as in `abi.encodeCall`)                                                        |

#### `borrowerCallBack`

Once a borrower has received the proceeds of a flash loan, it calls back the router through this function.

```solidity
borrowerCallBack(bytes calldata encodedLoansWithSettlement) external;
```

| **Parameter**                | **Description**                                                             |
|------------------------------|-----------------------------------------------------------------------------|
| `encodedLoansWithSettlement` | The data the borrower received when it was called, without any modification |

#### `settlementContract`

The settlement contract supported by this router. This is the contract that will be called when the settlement is executed.

```solidity
settlementContract() external returns (ICowSettlement);
```

#### `settlementAuthentication`

The settlement authenticator contract for CoW Protocol. This contract determines who the solvers for CoW Protocol are.

```solidity
settlementAuthentication() external returns (ICowAuthentication);
```