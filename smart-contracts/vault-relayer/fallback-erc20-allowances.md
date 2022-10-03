# Fallback ERC20 Allowances

The third and final method of approving tokens for CoW protocol is to use direct ERC20 allowances to the Vault relayer. This works like most other trading protocols, where for each token you want to sell, an allowance must first be approved for the Vault relayer contract.

Orders with the sell token balance flag set to "erc20" will withdraw using this process. The buy token balance flag can also be set to "erc20" in order to receive trade proceeds directly in ERC20 amounts.
