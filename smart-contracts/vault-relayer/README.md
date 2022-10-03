# Vault relayer

The Vault relayer contract is an important component used to protect user funds from malicious solvers. As previously mentioned, the settlement contract allows using arbitrary on-chain liquidity through interactions (such as performing a swap on Balancer V2, or performing a Paraswap trade). If Vault and ERC20 allowances were made directly to a settlement contract, a malicious solver could drain user funds through the interaction mechanism. However, since these allowances are made to the Vault relayer contract and interactions to the contract are strictly forbidden, malicious solvers have no direct access to user funds. The settlement contract uses the vault relayer to withdraw user tokens only as part of the trade, which contains strong guarantees that the user's signed order parameters are respected.

The Vault relayer has access to user balancers through 3 mechanisms:

1. Balancer External Balances
2. Balancer Internal Balances
3. Fallback ERC20 Allowances

Let's explore each way more deeply
