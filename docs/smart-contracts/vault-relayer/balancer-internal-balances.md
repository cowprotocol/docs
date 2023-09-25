# Balancer Internal Balances

The second mechanism is to use balances internal to the Vault. The Balancer V2 vault can accrue ERC20 token balances and keep track of them internally in order to allow extremely gas-efficient transfers and swaps. The CoW protocol contracts can make use of this in order to decrease the gas cost of settling a user order on-chain. In order for this to work, the user must approve the Vault relayer contract and have internal Vault balances available.

Internal balances can be withdrawn from the Vault at any time for their ERC20 equivalent amounts.

Orders with the sell token balance flag set to "internal" will withdraw using this process. The buy token balance flag can also be set to "internal" in order to receive trade proceeds in internal balances instead of ER20 token balances.
