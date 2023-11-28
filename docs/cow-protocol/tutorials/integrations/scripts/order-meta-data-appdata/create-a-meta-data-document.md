# Create a meta-data document

Orders in CoW Protocol can contain arbitrary data in a field called `AppData`.

The SDK facilitates the creation of these documents, and getting the `AppData` Hex number that summarizes it.

The most important thing to define in the meta-data is the name of your app, so the order-flow can be credited to it.

```typescript
import { MetadataApi } from "@cowprotocol/app-data";

export const metadataApi = new MetadataApi();

const appCode = "YOUR_APP_CODE";

const appDataDoc = await metadataApi.generateAppDataDoc({
  appDataParams: { appCode },
});

console.log(appDataDoc);
```

This will create a document similar to:

```json
{
  "version": "0.5.0",
  "appCode": "YOUR_APP_CODE",
  "metadata": {}
}
```

After creating the most basic document, you can see how to attach additional meta-data items.

For example, you could give information about who reffered the user creating the order.

```typescript
import { MetadataApi } from "@cowprotocol/app-data";

export const metadataApi = new MetadataApi();

const appCode = "YOUR_APP_CODE";
const referrerParams = {
  address: "0x1f5B740436Fc5935622e92aa3b46818906F416E9",
};

const appDataDoc = await metadataApi.generateAppDataDoc({
  appDataParams: { appCode },
  metadataParams: { referrerParams },
});

console.log(appDataDoc);
```

This will create a document similar to:

```json
{
  "version": "0.5.0",
  "appCode": "YOUR_APP_CODE",
  "metadata": {
    "referrer": {
      "address": "0x1f5B740436Fc5935622e92aa3b46818906F416E9",
      "version": "0.2.0"
    }
  }
}
```

For a complete list of meta-data that can be attach check [@cowprotocol/app-data](https://github.com/cowprotocol/app-data)

Know that you know how to create meta-data documents, let's review how to get the `appData` that we need when we post orders. Just a hint, this `appData` is deterministic based on the content of the meta-data document.
