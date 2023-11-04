---
id: app-data
sidebar_position: 1
---

# Application specific data

# Order meta-data (AppData)

The protocol have some means to attach arbitrary information to any order. This data will be available by using only on-chain data and IPFS.

Orders have some special data field called `appData`. This is a hex number that directly points to an IPFS document. This IPFS document is a JSON data file with all this arbitrary information.

Some questions that we could ask ourselves is:

- Which format does it have this JSON file?
- How do I get the JSON document given an order `appData`?
- How do I get the `appData` given a JSON document?
- How do I update the file to IPFS?

For all these questions, SDK is the answer 😎

Let's start by creating a basic meta-data document that includes the name of your app, so you can track all the volume you bring to the protocol.

# BONUS: CIDv0 and AppData

As explained before, the `AppData` points to an IPFS document. So given any `CIDv0` we can calculate the equivalent`AppData` and the other way around.

Given an IPFS CIDv0 you can convert it to an `AppData`

```typescript
import { MetadataApi } from "@cowprotocol/app-data";

export const metadataApi = new MetadataApi();

const decodedAppDataHex = await metadataApi.cidToAppDataHex(
  "QmUf2TrpSANVXdgcYfAAACe6kg551cY3rAemB7xfEMjYvs",
);
```

This will return an `AppData` hex: `0x5ddb2c8207c10b96fac92cb934ef9ba004bc007a073c9e5b13edc422f209ed80`

> This might be handy if you decide to upload the document to IPFS yourself and then you need the AppData to post your order

Similarly, you can do the opposite and convert an `AppData` into an IPFS document:

```typescript
import { MetadataApi } from "@cowprotocol/app-data";

export const metadataApi = new MetadataApi();

const decodedAppDataHex = await metadataApi.appDataHexToCid(hash);
```

This will return an IPFS CIDv0: `QmUf2TrpSANVXdgcYfAAACe6kg551cY3rAemB7xfEMjYvs`

🎉Congrats! you've learned how meta-data in orders work.

# Get the AppData Hex

The `AppData` Hex points to an IPFS document with the meta-data attached to the order.

You can calculate the `AppData` Hex, and its corresponding `cidV0` using the SDK:

```javascript
import { MetadataApi } from "@cowprotocol/app-data";

export const metadataApi = new MetadataApi();

const { appDataHash, cidv0 } =
  await metadataApi.calculateAppDataHash(appDataDoc);
```

Note how this operation is deterministic, so given the same document, it will always generate the same hash. Also, this operation is done locally, so it's not uploading anything to IPFS, its just calculating what will be the hash that maps to the provided document.

This method can be used to calculate the actual hash before uploading the document to IPFS. This way, when you post an new order, you don't need to wait until the uploading to IPFS is completed.

---
description: This sections is relevant for CoW Hooks
---

# Additional Order Preferences

App-data also allows for additional order options to be specified. These are options to extend CoW Protocol orders allowing for more advanced swap intents to be specified, while being signed and by virtue of being included in order’s `appData`. Thus, going from an trading engine to an execution engine. Currently, we support an additional optional “hooks” field for configuring [CoW Hooks for an order](https://docs.cow.fi/overview/cow-hooks).

```json
{
  "version": "0.4.0",
  "appCode": "MyAwesomeUi",
  "metadata": {
    "hooks": {
      "pre": [
        {
          "target": "<address>",
          "callData": "<hex encoded bytes>",
          "gasLimit": "<number>"
        }
      ],
      "post": [
        {
          "target": "<address>",
          "callData": "<hex encoded bytes>",
          "gasLimit": "<number>"
        }
      ]
    }
  }
}
```

Note that both pre and post hooks support multiple hooks, so feel free to mix and match!

# AppCode

**What is the AppCode?**

The code identifying the CLI, UI, service generating the order. It would be an UTF8 string of up to 50 chars

**How to get your own AppCode**

Assuming you are building a tool to interact with the protocol without using one of the existing UIs/interfaces, you are free to pick one for yourself.

Just make sure you reach out to CoW Swap team before using it to avoid picking an invalid or already existing **AppCode**.

For example, to use the AppCode "MyAwesomeUi" the JSON would look like:

```json
{
  "version": "0.4.0",
  "appCode": "MyAwesomeUi",
  "metadata": {}
}
```

On the next step you'll see what to do with this JSON.

# MetaData

The metadata document is a JSON file that follows a specific format.

Mainly, it will be formed by:

- **Version:** The schema will be versioned using Semantic Versioning
- **AppCode: (optional)** The code identifying the CLI, UI, service generating the order. See AppCode section for more information.
- **JSON object with metadata descriptors:** Each metadata will specify one aspect of the order. This field is mandatory, but it can contain an empty JSON object.

Each metadata will contain one mandatory field:

- **Version:** The same way the metadata document is versioned, so is each metadata. It's not expected that they change much, but this could allow the schemas to evolve and let the parsers handle them correctly.

So the minimum information in a AppData document would be:

```json
{
  "version": "0.4.0",
  "metadata": {}
}
```

Interfaces like CoW Swap could, by default, include the hash of the following document,sSo the minimum information in a AppData document would be:

```json
{
  "version": "0.4.0",
  "appCode": "CoW Swap",
  "metadata": {}
}
```

**Is it possible to include two Metadatas of the same kind in the same document?**

No. Only one kind instance per document. If a kind can have a higher cardinality, its schema should take this into account and should model this cardinality within it's schema definition. This way, when processing this information, we ignore the second occurrences for the same kind.

**Referral: Example of a Metadata Kind**

Just for illustrative purposes, let's see how a referral metadata could look like.

This metadata could be included by any user of an interface. It's data could be:

```
{
    "version": "0.1.0",
    "referrer": "0x0000000000000000000000000000000000000000"
}
```

So, for example, a CoW Swap user creating an order after following a referral link from another user (0x0000000000000000000000000000000000000000) would include in their order the IPFS hash of the following metadata document:

```
{
    "version": "0.4.0",
    "appCode": "CoW Swap",
    "metadata": {
        "referrer": {
            "version": "0.1.0",
            "address": "0x0000000000000000000000000000000000000000"
        }
    }
}
```

The schema is defined using a [https://json-schema.org](https://json-schema.org) schema specification.

# Create the order meta-data file

There's a tool part of CoW Protocol Explorer to assist in the process of defining a custom meta-data file. It's available at [https://explorer.cow.fi/appdata](https://explorer.cow.fi/appdata). There you will be able to interactively build the file, upload it to IPFS and decode existing appData hashes.

Alternatively, you can also produce the file manualy. Create a text file document with the following content, where: version, appCode, metadata is mandatory environment and referrer are optional

For more details on the file format, go to the spec.

```
{
  "version": "0.4.0",
  "appCode": "YourAppCode",
  "environment": "production",
  "metadata": {
    "referrer": {
      "version": "0.1.0",
      "referrer": "0x0000000000000000000000000000000000000000"
    }
  }
}
```

# Choose the appCode for the app

The appCode is an unique identifier for the app or person who has created this data point.

There are already some dapps using appCode such as:

- Aura
- Balancer
- Cow Swap
- DeFi Llama
- Dump.services
- Raise Finance
- Safe&#x20;
- ShapeShift
- Swapr
- Yearn Finance

Thanks to it, you can now track the volume each integration partner brings in the following [dashboard](https://dune.com/cowprotocol/cow-swap-integration-partner-dashboard).

# Get the digest hash from the CID

Now that your file has been uploaded to IPFS, there's one last step to get the appData:

- Head to https://cid.ipfs.io/&#x20;
- Enter the CID from the file you uploaded&#x20;
- Get the "Digest (Hex)"

![Screenshot of CID inspector, highlighting the Digest (Hex) field](/img/Screen Shot 2022-08-24 at 10.29.01.png>)

The digest hash is what is used as **appData** and should be included in your orders to track your created **appCode**.

If you are instead using the [CoW Protocol Explorer's appData tool](https://explorer.cow.fi/appdata?tab=encode), the appData hash will be displayed in the interface.

# Creating App Ids

AppData is field is a bytes32 data include in all the orders: [**https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/libraries/GPv2Order.sol#L18**](https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/libraries/GPv2Order.sol#L18)

The AppData can be empty, if you don't want to include any metadata, or can contain an IPFS hash otherwise.

The clients/UIs would be responsible for uploading the metadata to IPFS, and include the 32 bytes of the [IPFS hash](https://docs.ipfs.io/concepts/hashing/) in the order.
