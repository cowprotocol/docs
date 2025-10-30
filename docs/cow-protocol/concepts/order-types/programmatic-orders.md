---
sidebar_position: 4
---

# Programmatic orders

In addition to normal wallets, CoW Protocol also supports smart contract wallets that implement `ERC-1271`.
This allows users to place orders through smart contracts with programmable parameters that execute based on certain conditions. 

We call these types of orders "programmatic orders" and we've developed a framework for creating programmatic orders, aptly named the "Programmatic Order Framework."

## Creating & Using Programmatic Orders

CoW Protocol's Programmatic Order Framework makes it easy to create conditional orders that execute when certain on-chain conditions are met (such as asset prices, wallet balances, time elapsed, and much more).

The Framework takes care of all the boilerplate code necessary to create orders through CoW Protocol, so users only have to focus on coding the order logic itself.
Programmatic order intents can also be created, updated, or deleted as a group with just a single transaction.  

Thanks to the Programmatic Order Framework, users can automate everything from complex trading strategies to advanced order types, portfolio management, DAO operations, and more with just a few lines of code.

**Example Use-Cases of Programmatic Orders:**

- **Advanced order types:** The conditional nature of programmatic orders allows for complex order types such as stop-loss, good-after-time, take-profit, and more. In fact, CoW Protocol's [TWAP orders](./twap-orders) are built on top of the Programmatic Order Framework.
- **Automated wallet operations:** Wallets of all sizes can automate recurring actions using the Programmatic Order Framework. DAOs can automate payroll, treasury diversification, fee collections and more, while individuals can automate portfolio rebalancing, yield farming, hedge market positions and more.
- **Protocol integrations:** Through the Programmatic Order Framework, protocols can add custom functionality to any transaction type. DAO tooling companies, for example, can build plug-n-play products while DeFi protocols can leverage the power of the Framework to assist with recurring protocol-level transactions like loan liquidations.

## Getting started

To start developing with the Programmatic Order Framework, check out our [technical documentation](/cow-protocol/contracts/periphery/composable-cow). You can also read more about programmatic orders [on our blog](https://blog.cow.fi/introducing-the-programmatic-order-framework-from-cow-protocol-088a14cb0375).
