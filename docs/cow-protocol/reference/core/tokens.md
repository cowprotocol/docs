# Supported tokens

CoW Protocol supports `ERC20` tokens, however not all `ERC20` token contracts are created equal, despite the idea of a standard interface. Some contracts introduce issues such as fee on transfer, or lockup periods, which make them unsuitable.

## Requirements

For a token to be considered tradeable on CoW Protocol, it **MUST**:

- be [`ERC20`](https://eips.ethereum.org/EIPS/eip-20) compliant
- have a valid price provided by a _price estimator_ for **0.1 ETH** worth of the token
- not be on the bad token list

:::note

In addition to the above requirements, a price estimator must also be able to provide a valid price estimate from `sellToken` to `buyToken`, depending on the kind (`sell` / `buy`) of the order.

:::

Any token that does not meet these requirements will result in an `UnsupportedToken` error when attempting to retrieve a quote or place an order.

### Price estimators

Price estimators are external services that are used to determine the value of a token. These services themselves may have dependencies / limitations. For example, some price estimators may specialize in stablecoins, and therefore are not able to provide a valid price estimate for a token that is not a stablecoin.

### Bad token list

There is an explicit bad token list, containing tokens that have been identified as incompatible with CoW Protocol due to edge cases or other issues. The bad token list is not exhaustive and is supplemented by automated bad token detection. In any case, if a token is on the bad token list, it will result in an `UnsupportedToken` error when attempting to retrieve a quote or place an order.
