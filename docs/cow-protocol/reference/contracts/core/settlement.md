---
sidebar_position: 1
---

import HistoricalFact from './_gpv2.md'

# GPv2Settlement

<HistoricalFact />

## Architecture

A settlement comprises of: 

- A list of traded tokens with their corresponding price in the batch
- A list of trades to execute
- A list of interactions

A solver monitors on-chain liquidity and on receiving [batch-auction instances](../../core/auctions/schema#instances-input) from the Protocol, it determines which orders can be matched, the clearing prices of the settlement, and what extra liquidity is necessary from the blockchain.

Normally, all orders in a settlement are settled with _uniform clearing prices_, which means that every user receives the same price for the same token.

If the transaction does not revert, each order will be executed during a settlement and the user will receive the desired token after the settlement.

### Guarantees and Invariants

The parameters of the order are verified for validity:

- The signature for the order matches the user's address
- The order is not expired
- The order was not previously filled
- The current prices are equal to or better than what is specified in the order

### Trades

Trades contain a description of the users' orders, a signature for verifying its validity, and the executed amount (for partially fillable orders).

The contract decodes the order parameters from the trade.

### Interactions

Interactions allow solvers to execute arbitrary calls to any on-chain contract. Normally, they are used to interact with other on-chain liquidity providers, for example, to make a swap call to Uniswap.

<details open>
  <summary>Protocol fee collection</summary>
  
  Interactions are also used for accounting / bookkeeping purposes as well. As trades are executed, the Protocol collects a fee from each trade and stores this in the settlement contract (known as <em>internal buffers</em>). At regular intervals, the Protocol withdraws the fees from the settlement contract to the Protocol's treasury Safe.

</details>

:::tip

Solvers are **NOT** able to directly access _user_ funds through interactions. There are strict guarantees enforced by the settlement contract over movement of user funds.

:::

:::caution

Allowing interactions by solvers, creates the possibility of malicious solvers that can steal funds from the settlement contract. This is why the Protocol only allows interactions to be executed by allow-listed solvers, and requires that the solver post a bond to the Protocol before it can be allowed.

:::

## Data Types and Storage

### `GPv2Order.Data` struct

The `GPV2Order.Data` is the one of the most important data structures in the Protocol. It:

- defines the parameters of an order
- is the basis of which the order digest is determined using `EIP-712` and subsequently [signed](../../core/signing-schemes) by the user

In code, it is defined as:

```solidity
struct Data {
    IERC20 sellToken;
    IERC20 buyToken;
    address receiver;
    uint256 sellAmount;
    uint256 buyAmount;
    uint32 validTo;
    bytes32 appData;
    uint256 feeAmount;
    bytes32 kind;
    bool partiallyFillable;
    bytes32 sellTokenBalance;
    bytes32 buyTokenBalance;
}
```

| **Field** | **Description** |
|---|---|
| `sellToken` | ERC-20 token sell |
| `buyToken` | ERC-20 token to buy |
| `receiver` | The address that will receive the proceedings of the trade. If this field is `address(0)` (ie. the zero address `0x00...0`), then the user who signed the trade is going to receive the funds. |
| `sellAmount` | Amount of `sellToken` that is sold in wei. |
| `buyAmount` | Amount of `buyToken` that is bought in wei |
| `validTo` | UNIX timestamp (in seconds) until which the order is valid |
| `appData` | Extra information about the order. Not enforced by the smart contract outside of signature verification (may be used for referrals etc). |
| `feeAmount` | Amount of fees paid in `sellToken` wei |
| `kind` | `buy` or `sell` |
| `partiallyFillable` | partially fillable (`true`) or fill-or-kill (`false`) |
| `sellTokenBalance` | From where the `sellToken` balance is withdrawn |
| `buyTokenBalance` | Where the `buyToken` is deposited |

<details open>
  <summary>Balance locations</summary>

  The `sellTokenBalance` and `buyTokenBalance` fields the `keccak256` hash of the balance location. The following table describes the possible values and their meaning:

  | **Value** | **Description** |
  |---|---|
  | `erc20` | User's ERC-20 balance via approvals given to the GPv2VaultRelayer (default)|
  | `external` | User's ERC-20 balance via approvals given to the Balancer vault |
  | `internal` | User's internal Balancer vault balance |

</details>

### `orderUid`

The `orderUid` is a unique identifier for an order. It is 56 bytes and defined as:

```
orderUid = orderDigest ‖ owner ‖ validTo
```

Where: 

- `orderDigest` is the `EIP-712` digest of the [`GPv2Order.Data` struct](#gpv2orderdata-struct) (32 bytes)
- `owner` is the address of the order owner (20 bytes)
- `validTo` is the timestamp until which the order is valid (4 bytes)
- `‖` is the concatenation operator

### `filledAmounts`

The `filledAmounts` mapping stores the amount of an order that has been filled. It is defined as:

```solidity
mapping(bytes => uint256) public filledAmounts;
```

The key is the `orderUid` and the value is the amount of the order that has been filled.

:::caution

Do **NOT** rely on the `filledAmounts` mapping to determine if an historical order has been filled. This is because the respective slot in the mapping may be freed by a solver after the order has expired to save gas.

:::

## Functions

This section will cover the main functions that are used by users and solvers.

### For users

#### `setPreSignature`

This function allows a user to pre-sign an order, which can be used if for some reason the user is unable to sign with `eth_sign`, `EIP-712`, or `ERC-1271`. This is most useful for smart contracts that have neither a private key, nor implement `ERC-1271`, but still want to use CoW Protocol.

```solidity
function setPreSignature(bytes calldata orderUid, bool signed) external;
```

#### `invalidateOrder`

This function allows a user to invalidate (cancel) an order:

```solidity
function invalidateOrder(bytes calldata orderUid) external;
```

### For solvers

#### `settle`

This function is permissioned and can only be called by solvers passwing the allow-list authentication. It executes a settlement:

```solidity
function settle(
    IERC20[] calldata tokens,
    uint256[] calldata clearingPrices,
    GPv2Trade.Data[] calldata trades,
    GPv2Interaction.Data[][3] calldata interactions
) external nonReentrant onlySolver;
```

## Indexing

Events that are indexed are:

* `Trade` - on any trade
* `Interaction` - on any interaction
* `Settlement` - which solver executed the settlement
* `OrderInvalidated` - when an order is invalidated
* `PreSignature` - when pre-signing or revoking a pre-signed signature

## Off-chain

As this is the main contract of CoW Protocol, all the off-chain infrastructure is built around it. This includes:

- The Protocol
- Solvers
