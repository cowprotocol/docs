# Order meta-data (AppData)

The protocol have some means to attach arbitrary information to any order. This data will be available by using only on-chain data and IPFS.

Orders have some special data field called `appData`. This is a hex number that directly points to an IPFS document. This IPFS document is a JSON data file with all this arbitrary information.

Some questions that we could ask ourselves is:

* Which format does it have this JSON file?
* How do I get the JSON document given an order `appData`?
* How do I get the `appData` given a JSON document?
* How do I update the file to IPFS?

For all these questions, SDK is the answer 😎

Let's start by creating a basic meta-data document that includes the name of your app, so you can track all the volume you bring to the protocol.
