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
