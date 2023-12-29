---
sidebar_position: 1
---

# Market orders

Market orders are orders to buy or sell tokens as soon as possible at the current market rate. 

They are essentially limit orders where the limit price is close to or below the current market rate. 

When users place a market order on CoW Protocol, they agree to receive the best price that the solvers can find at that moment in time. Market orders are **fill or kill** (as opposed to partially fillable), meaning solvers have to find liquidity for the order in its entirety or wait to execute the order until enough liquidity is available.

As with other exchanges, users also need to specify a “slippage tolerance” which allows the price to deviate by some percentage in order to ensure execution even in volatile market conditions. 

:::note

Unlike other DEXs, your slippage tolerance cannot be extracted by MEV Bots (cf. [MEV Protection](cow-protocol/concepts/benefits/mev-protection)).
If the solvers are able to find optimizations within the batch auction your order is settled with, you may also get a better price.

:::

To learn more about market orders, check out our [tutorials section](cow-protocol/tutorials/cow-swap/swap)
