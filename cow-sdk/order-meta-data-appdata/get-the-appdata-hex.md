# Get the AppData Hex

The `AppData` Hex points to an IPFS document with the meta-data attached to the order.

You can calculate the `AppData` Hex, and its corresponding `cidV0` using the SDK:

```javascript
const { appDataHash, cidv0 } = await cowSdk.metadataApi.calculateAppDataHash(appDataDoc)
```

Note how this operation is deterministic, so given the same document, it will always generate the same hash. Also, this operation is done locally, so it's not uploading anything to IPFS, its just calculating what will be the hash that maps to the provided document.

This method can be used to calculate the actual hash before uploading the document to IPFS. This way, when you post an new order, you don't need to wait until the uploading to IPFS is completed.
