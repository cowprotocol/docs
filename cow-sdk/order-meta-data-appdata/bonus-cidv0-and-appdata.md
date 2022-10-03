# BONUS: CIDv0 and AppData

As explained before, the `AppData` points to an IPFS document. So given any `CIDv0` we can calculate the equivalent`AppData` and the other way around.

Given an IPFS CIDv0 you can convert it to an `AppData`

```markup
const decodedAppDataHex = await cowSdk.metadataApi.cidToAppDataHex('QmUf2TrpSANVXdgcYfAAACe6kg551cY3rAemB7xfEMjYvs')
```

This will return an `AppData` hex: `0x5ddb2c8207c10b96fac92cb934ef9ba004bc007a073c9e5b13edc422f209ed80`

> This might be handy if you decide to upload the document to IPFS yourself and then you need the AppData to post your order

Similarly, you can do the opposite and convert an `AppData` into an IPFS document:

```markup
const decodedAppDataHex = await cowSdk.metadataApi.appDataHexToCid(hash)
```

This will return an IPFS CIDv0: `QmUf2TrpSANVXdgcYfAAACe6kg551cY3rAemB7xfEMjYvs`

🎉Congrats! you've learned how meta-data in orders work.
