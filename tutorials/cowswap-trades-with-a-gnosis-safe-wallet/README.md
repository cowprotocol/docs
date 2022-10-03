# CoW Protocol trades with a Gnosis Safe Wallet

## This tutorial was fully composed by [<mark style="color:blue;">poolpitako</mark>](https://twitter.com/poolpitako), link to the original tutorial doc can be found <mark style="color:blue;"></mark> [<mark style="color:blue;">here</mark>](https://hackmd.io/@2jvugD4TTLaxyG3oLkPg-g/H14TQ1Omt) <mark style="color:yellow;"></mark>&#x20;

In this tutorial, we are going to discuss how to execute CoW Protocol transactions using the new presign functionality. This feature allows smart contracts to use CoW Protocol either via the CoW Swap interface or directly by interacting with the smart contracts.

To batch actions in a single transaction, I am going to use [<mark style="color:blue;">ape-safe</mark>](https://github.com/banteg/ape-safe). At Yearn, ape-safe is used extensively to test transactions before sending them to the multisign to approve.
