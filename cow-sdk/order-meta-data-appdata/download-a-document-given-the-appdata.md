# Download a document given the AppData

Given the `AppData` of a document that has been uploaded to IPFS, you can easily retrieve the document.

```markup
const appDataDoc = await cowSdk.metadataApi.decodeAppData('0x5ddb2c8207c10b96fac92cb934ef9ba004bc007a073c9e5b13edc422f209ed80')
```

This will return a document similar to:

```markup
{
    "version": "0.1.0",
    "appCode": "YourApp",
    "metadata": {
      "referrer": {
        "address": "0x1f5B740436Fc5935622e92aa3b46818906F416E9",
        "version": "0.1.0",
      },
    },
}
```
