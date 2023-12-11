---
draft: true
---

# Approving the tokens to sell

The first step is approving the tokens you want to sell to the **GPv2VaultRelayer**.

The safe that I am using had `yvUSDC`, `yvYFI` and `yvLINK`, so my first tx takes care of withdrawing and approving each token. Code is the following:

```python
import click
from ape_safe import ApeSafe
from brownie *

def withdraw_and_approve_tokens_sep_21():
    # Get the safe
    safe = ApeSafe("0xMySafeAddress")

    # Contract we need to approve so our tokens can be transferFrom
    gnosis_vault_relayer = safe.contract("0xC92E8bdf79f0507f65a392b0ab4667716BFE0110")

    # yearn vault tokens
    yvUSDC = safe.contract("0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9")
    yvYFI = safe.contract("0xE14d13d8B3b85aF791b2AADD661cDBd5E6097Db1")
    yvLINK = safe.contract("0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2")

    for vault in [yvUSDC, yvYFI, yvLINK]:
        print(f"Processing {vault.name()}")

        # Withdraw everything from the vault
        vault.withdraw()
        token = safe.contract(vault.token())
        token_balance = token.balanceOf(safe.address)
        print(f"Balance of {token.name()}: {(token_balance / 10 ** token.decimals()):_}")
        assert token.balanceOf(safe.address) > 0

        # Approve so we can create a cowswap order
        token.approve(gnosis_vault_relayer, 2**256-1)


    safe_tx = safe.multisend_from_receipts()
    account = click.prompt("signer", type=click.Choice(accounts.load()))
    safe_tx.sign(accounts.load(account).private_key)
    safe.preview(safe_tx, events=False, call_trace=False)
    safe.post_transaction(safe_tx)
```

After testing in a fork, ape-safe will ask for your account password and submit the tx to the multisign.

After the tx is executed, we would have our vanilla erc-20 tokens plus all approvals needed to submit an order.
