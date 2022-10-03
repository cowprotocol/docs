# BONUS: Show link to Explorer

Once the order is posted, its good to allow to check the state of it.

One easy is to check in the CoW Explorer. You can create a CoW Explorer link if you have the `orderId`:

For example, you can see one valid order in the explorer by following the link [https://explorer.cow.fi/rinkeby/orders/0xa0a77033edd3ce261f6c7d2afa6c59f07b126e328ebaa8284aca01e4f30437d8](https://explorer.cow.fi/rinkeby/orders/0xa0a77033edd3ce261f6c7d2afa6c59f07b126e328ebaa8284aca01e4f30437d8)

```markup
// View order in explorer
console.log(`https://explorer.cow.fi/rinkeby/orders/${orderId}`)
```

🍾 Congrats, you've made it to the end of SDK's Sign and Post Orders tutorial.&#x20;

You can continue with learning how to attach meta-data to the order. This is really important, because among other things, it allows to attach information like the source App that created the trade, which is very relevant for analysing the volume each App brings to the protocol, and is base to implement reward programs.&#x20;
