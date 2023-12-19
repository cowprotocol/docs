# Supported tokens

CoW Protocol supports `ERC20` tokens. However, not all `ERC20` token contracts are created equal, despite the idea of a standard interface. Some contracts introduce issues, such as fee on transfer or lockup periods, which make them unsuitable.

## Requirements

For a token to be considered tradeable on CoW Protocol, it **MUST**:

- be [`ERC20`](https://eips.ethereum.org/EIPS/eip-20) compliant
- have a valid price provided by a _price estimator_ for **0.1 ETH** worth of the token
- not be on the bad token list

:::note

In addition to the above requirements, a price estimator must also be able to provide a valid price estimate from `sellToken` to `buyToken`, depending on the kind (`sell` / `buy`) of the order.

:::

Any token that does not meet these requirements will result in a `NoLiquidity` error when attempting to retrieve a quote or place an order.

### Price estimators

Price estimators are a subset of solvers that are used to determine the value of a token and are able to quote trades. 
These services themselves may have dependencies / limitations. 
The best way to ensure a token is tradeable is to bootstrap a Uni v2 (or some other well-known AMM) pool with the token, as these should get indexed by most price estimators.

### Bad token list

There is an explicit bad token list, containing tokens that have been identified as incompatible with CoW Protocol due to edge cases or other issues.
One such example is tokens that take a fee on transfer.
The bad token list is not exhaustive and is supplemented by automated bad token detection, which may be flaky, (e.g. if a token exhibits rounding issues on transfers) depending on certain conditions.
In any case, if a token is on the bad token list, it will result in an `UnsupportedToken` error when attempting to retrieve a quote or place an order.

## New ERC-20 tokens

Have you created a new `ERC-20` and want to make it seemlessly tradeable on CoW Protocol?

- Bootstrap a Uni v2 (or some other well-known AMM) pool with the token (and it's minimum viable liquidity)
- Potentially reach out to solvers (contact us via Discord) to have any optimal execution paths added to their solvers (such as a path through the newly created pool)
- Fill out the [Add Token](https://github.com/cowprotocol/token-lists/issues/new?assignees=&labels=addToken&projects=&template=addTokenForm.yml&title=%5BAddToken%5D+%60SYMBOL%60+on+%60NETWORK%60) form if you want to have the token added to CoW Swap's token list
