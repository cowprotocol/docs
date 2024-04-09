---
sidebar_position: 7
---

# What is Backrunning?

Backrunning is a specific type of MEV (Maximal Extractable Value) which causes traders to miss out on potential profit from their trades.

In practice, backrunning involves strategically executing a transaction immediately after another, high-value transaction. By doing this, the backrunning transaction capitalizes on the arbitrage opportunity left over from the [price impact](https://blog.cow.fi/cow-protocol-glossary-ad7313a2c71#:~:text=price%20impact) of the initial transaction.

![backrunning](/img/mevblocker/backrunning.webp)

Backrunning involves the tactical use of the information contained within the Ethereum mempool - a holding area for all pending transactions - to place transactions immediately after high-value trades in order to profit.

Out of the three types of MEV (frontrunning, sandwich attacks, and backrunning) backrunning is considered the least harmful. In fact, if performed by itself, this method simply captures the arbitrage opportunity left over by a large trade without affecting the initial trade itself. Backrunning is only harmful to the user when combined with a frontrunning attack, which results in the worst kind of MEV - the sandwich attack.

For advanced traders who are capable of capturing the leftover arbitrage from their trades, backrunning may be considered a missed opportunity since it is money left on the table.

Thankfully, not everyone has to be an experienced trader to capture the backrunning profits from their trades. Retail traders can automatically benefit from backrunning opportunities through specialized RPC endpoints such as MEV Blocker.

## How backrunning works

The most common perpetrators of backrunning are MEV bots programmed to monitor pending Ethereum transactions. These bots place strategic trades directly after existing trades in order to capture the arbitrage left over from their price impact.

The process takes advantage of the mechanisms of [automated market makers (AMMs)](https://blog.cow.fi/cow-protocol-glossary-ad7313a2c71#:~:text=price%20impact). Whenever a large trade goes through, it imbalances the liquidity pools of the AMM, causing the price of the asset being sold to go down, and the price of the asset being bought to go up. This price imbalance leaves an arbitrage that MEV bots correct by placing a follow-up trade, earning a profit in the process.

### Backrunning example

To better understand the concept of backrunning, let's consider an example scenario. In this example, a user named Alex initiates a substantial trade, selling $10,000 of ETH to buy COW on Uniswap. Due to the nature of AMMs, this swap leads to a jump in the value of COW and a drop in the value of ETH on this particular exchange (Uniswap).

At the same time, an MEV bot notices Alex's large transaction and springs into action. The MEV bot acquires Alex's sell token (ETH) at this lower price and immediately turns around and sells it for a higher price on a different exchange where this price arbitrage has not yet been reflected. The bot profits from the price difference between the assets on these two exchanges.

From a technical perspective, Alex's transaction doesn't result in any realized loss for him, since he still got the price he was quoted for his trade. However, his trade created an arbitrage opportunity that he didn't capture, leaving money on the table.

The actions of the MEV bot have broader implications for the DeFi ecosystem. Bots monopolize arbitrage opportunities between exchanges and deny regular users the chance to benefit from the price impact their trades create.