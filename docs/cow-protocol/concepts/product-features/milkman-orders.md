---
sidebar_position: 4
---

# Milkman Orders

Through Milkman, instead of specifying a ‘min out’ to receive, you specify an on-chain data source to pull the market price of your trading pair. 

For example, if you’re swapping ETH/USDC, you can supply the ETH/USDC Chainlink price feed. Milkman will automatically adjust the minimum price that you should receive, giving you better on-chain price guarantees and reducing the chances of placing orders with stale prices.

Let’s say you’re looking to sell 1,000 ETH and you want to make sure to get the most accurate price for your trade, even if it’s far out in the future. By sending your order through Milkman, you can rely on a price oracle to guarantee that you receive a price that is at least 99.5% (or another custom percentage) of the oracle price at any moment in time. 

Your order then gets sent to CoW Protocol, where solvers pick it up and compete to find the best execution price for it. Milkman solves the problem of timing for DAOs of all sizes!![](https://lh7-eu.googleusercontent.com/__Zm4KsqJ_PWye96GTXiTBjCcWViRNtm5N8fPrLW0aac3pAjTfpVl9bxIuUD-cw-ofk4QKJ2Jk5SOQFMnb5ODYxgpjH3po9sMHi1VVX-or6IvG-UOSnen7Q7YJfunGAR5S8q-rDNzIKJiPinY526dgc)
