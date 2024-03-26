---
title: Partner fee
id: partner-fee
---


### Partner Fee Calculation

Partner fee is calculated as the sum of all transactions traded through your project's Widget with Partner Fee defined
in the `appData`, multiplied by the % percentage of the Partner Fee bps defined in the [`appData`](/cow-protocol/reference/core/intents/app-data).

The Partner Fee per order is calculated based on the surplus token of the order (i.e. buy token for sell orders, and
sell token for buy orders) and is then converted into WETH using an external price provider at the time of the
settlement of the order.

A percentage % of the Partner Fee shall be retained as a service fee to CoW Protocol (the "Service Fee") which is
currently set at 15% of the total eligible Partner Fee amount.

The Partner Fee net of the Service Fee is the Partner Fee amount (the "Net Partner Fee") eligible for weekly payment.
See the next section for Partner Fee calculation examples.

:::note

You may charge users a fee of no more than 100 bps of order volume through your Widget. Partner Fee will begin to
accrue from the release date of this Partner Fee feature on 4 April 2024.

:::

### Partner Fee Calculation Examples

#### A User Sells 1 ETH for DAI on your Widget

- Partner Fee: **100 BPS**
- Quote to User on Widget:
  - Swap Sell Amount (estimated): **0.995 ETH**
  - Gas Fee (estimated): **0.005 ETH**
  - Total Sell Amount: **1 ETH**
  - Buy Amount: **3,500 DAI**
- User Slippage = **0%**
- User's Signed Order (integrating bps for partner fee):
  - Raw sell amount: **1 ETH**
  - Raw fee: **0 ETH** (as all orders now have zero-signed fee)
  - Min buy amount: **3,465 DAI** (= 3,500 - 3,500 * 0.01)

  **Order Execution**

- Imagine, the solver used **0.003 ETH** for gas and sold the **0.997 ETH** for **3,525 DAI** (managed to get "raw surplus" of 60 DAI)
  - Partner Fee: **35.25 DAI** ( 3,525 * 0.01)
  - User receives: **3489.75 DAI** (3,525 - 35.25)
  - User's Surplus: **24.75 DAI** (3,489.75 - 3465)
  
#### A User Buys 1 ETH for DAI on your Widget
    
- Partner fee: **100 BPS**
- Quote to User on Widget:
  - Swap Sell Amount (estimated): **3520 DAI**
  - Gas Fee (estimated): **30 DAI**
  - Total Sell Amount: **3550 DAI**
  - Buy Amount: **1 ETH**
- User Slippage = **0%**
- User's Signed Order (integrating bps for partner fee):
  - Max sell amount: **3,585.5 DAI** (3,550 + 3,550 * 0.01)
  - Raw fee: **0 DAI** (as all orders now have zero-signed fee)
  - Buy amount: **1 ETH**
      
  **Order Execution**
      
- Imagine, the solver used **20 DAI** for gas and bought the **1 ETH** for **3500 DAI** (managed to get a "raw surplus" of 65.5 DAI)
  - Partner Fee: **35.2 DAI** (3520 * 0.01)
  - User Pays: **3555.2 DAI** (3520 + 35.2)
  - User's Surplus: **30.3 DAI** (3585.5 - 3555.2)

### Partner Fee Payment Process

1. Upon completing the implementation of the Partner Fee parameters on your Widget, you will be eligible to receive the
Partner Fee on trades executed by your users through the Widget.
2. A data script will be run on a weekly basis on your project's eligible Partner Fee amount calculated based on the sum of
all transactions traded through your project's Widget integration associated with Partner Fee defined in the [`appData`](/cow-protocol/reference/core/intents/app-data)
your AppKey.
3. The Net Partner Fee (refer to the Partner Fee Calculation section for details on calculations) will be transferred to
your designated Ethereum wallet address defined under the Partner Fee Recipient parameter of the Widget on a weekly
basis.

:::note

Payments will be made only if the accrued fee value equals or exceeds **0.001 WETH**. Any lesser amount will be voided.

:::
