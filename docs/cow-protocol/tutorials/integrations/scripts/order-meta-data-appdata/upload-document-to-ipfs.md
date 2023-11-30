# Upload document to IPFS

The SDK uses Pinata to upload it to IPFS, so you will need an API Key in order to upload it using the SDK.

Alternativelly, you can upload the document on your own using any other service.

```typescript
import { MetadataApi } from '@cowprotocol/app-data'

export const metadataApi = new MetadataApi()

const IPFS_OPTIONS = {
    pinataApiKey: `PINATA_API_KEY`,
    pinataApiSecret: `PINATA_SECRET_API_KEY`,
}

const appDataDoc = await metadataApi.generateAppDataDoc(...)

// Make sure you provide the IPFS params when instantiating the SDK
const uploadedAppDataHash = await metadataApi.uploadMetadataDocToIpfs(appDataDoc, IPFS_OPTIONS)

console.log(uploadedAppDataHash)
```

# Upload the file to IPFS

Having the JSON file, now you need to upload it to IPFS.

If you are using the [Cow Protocol Explorer's tool to build the meta-data file](https://explorer.cow.fi/appdata), you'll be able to upload and pin it to IPFS using [Pinata](https://www.pinata.cloud/) from the UI, as long as you provide your own Pinata keys.

Alternatively, you could upload/pin the file yourself. Read more about [IPFS pinning here](https://docs.ipfs.tech/how-to/pin-files/).

:::warning

KEEP YOUR FILE PINNED

Make sure your file remains pinned. Files that are not pinned won't be accessible once the creator of the file stops serving it. Read more about that on [IPFS docs](https://docs.ipfs.tech/how-to/pin-files/).

:::

:::warning

WATCH OUT FOR THE HASHES

If you upload the file directly, the resulting hash/appDataHash might differ.

The hash/IPFS CID calculated by the tool is a stringified file without a new line at the end. That means that you will get different results if the file is uploaded directly as a file.

For example:

Consider the content `hello world`.

Using IPFS's cli tool to upload a file with the contents above (`ipfs add file`), it'll have the line ending and result in this CIDv0: `QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o`

While the tool does NOT add a new line, which will give you this CIDv0: `Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD`
