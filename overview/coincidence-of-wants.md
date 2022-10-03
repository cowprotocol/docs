# Coincidence of Wants

CoW Protocol, because of its use of Batch Auctions, is optimized for finding Coincidence of Wants (CoWs) amongst the trades within a batch, as well as ring trades. But what exactly are Coincidence of Wants and ring trades?

Coincidence of wants can be explained as "economic phenomenon where two parties each hold an item the other wants, and therefore exchange these items directly. This means that on CoW Protocol, when two trades or more, each hold an asset that the other wants, their orders can be settled directly between all of them without the need for an external market maker or liquidity provider. CoW Protocol can create CoWs in a two dimensional orderbook, but can also create them on a multi-dimensional orderbook.

One of the advantages of using batch auctions is that not only can you find perfect Coincidence of Wants matching, but you can also create ring trades. Essentially, a ring trade shares liquidity across all orders, rather than a single token pair. This functionality allows the protocol to offer traders better prices as they do not need to wait to have the perfect match between trades since they can dissect the trades into pieces to improve the outcome of them. Ring trades are one of the solutions to work around the fragmented liquidity.

Once we know the theory behind Coincidence of Wants, and Ring trades, let's deep dive in an example for both of them to understand them deeper.

[<mark style="color:blue;">https://etherscan.io/tx/0x71d6f5bb2f29d16a0649d2b6a2eb3fabde8040598c21e675511d54e27399f6d2</mark>](https://etherscan.io/tx/0x71d6f5bb2f29d16a0649d2b6a2eb3fabde8040598c21e675511d54e27399f6d2)<mark style="color:blue;"></mark>

In this batch auction, CoW Protocol found a Coincidence of Wants, from multiple users' orders. In this CoW, what we can see is that 12 swaps were mixed together to share liquidity amongst all of them. This allowed the protocol to settle a portion of the trade size internally, via CoWs, while only needing to tap into two different on-chain AMMs to cover for the rest of the liquidity within the batch.

Ring trades are a form of Coincidence of Wants that not only maximize the liquidity on a two dimensional orderbook, but instead maximize on a multidimensional level, meaning that the Coincidence of wants can be found in minimum three different tokens. Because of it, the protocol is able to match different trading token pairs in the same batch auction, to avoid having to interact with multiple AMM pools. One important aspect to understand the slight difference between CoWs and ring trades is that every ring trade is a CoW, but not every CoW is a ring trade. An example of a ring trade would be the following:

![](../.gitbook/assets/Cow\_Ring\_trade.png)

_In our example, we have 3 different people, Alice is trying to sell DAI -OWL, Daniel is trying to sell OWL-USDC, and Bob & Carry are trying to sell USDC-DAI. Instead of having all of them trading against multiple liquidity pools to get the liquidity for their trade, the protocol forms a ring matching the three traders directly amongst each other._

Overall, by leveraging Batch Auctions which are tailored for Coincidence of Wants, CoW Protocol is able to give better prices for trades because batching transactions results in a lower spread, as well as a much more optimized transaction management for the user.
