# Running the tx from the safe

The last step is running a tx submission to the multisign using the previous method.

```python
def run_trade_sep_21():
    safe = ApeSafe("0xMySafeAddress")

    yfi = safe.contract("0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e")
    usdc = safe.contract("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
    link = safe.contract("0x514910771AF9Ca656af840dff83E8264EcF986CA")
    gusd = safe.contract("0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd")

    cowswap_sell(safe, yfi, gusd)
    cowswap_sell(safe, usdc, gusd)
    cowswap_sell(safe, link, gusd)

    safe_tx = safe.multisend_from_receipts()
    account = click.prompt("signer", type=click.Choice(accounts.load()))
    safe_tx.sign(accounts.load(account).private_key)
    safe.preview(safe_tx, events=False, call_trace=False)
    safe.post_transaction(safe_tx)
```

This run will not be the typical ape safe tx. When you run the code you are actually calling the api and creating an order. You can create as many orders as you want BUT they are not valid until you sign them. In our case, executing the tx in the multisign will do the trick.

Once the tx is signed, you can query the `/solvable_orders` endpoint to see your trades avaiable to solvers. You can check the output from [https://api.cow.fi/mainnet/#/default/get_api_v1_solvable_orders](https://api.cow.fi/mainnet/#/default/get_api_v1_solvable_orders).

After a few minutes I got two transfers, the first was `yfi` and `link` converted to `gusd` and on the second one `usdc` converted to `gusd`.
