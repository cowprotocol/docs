# Upload document to IPFS



The SDK uses Pinata to upload it to IPFS, so you will need an API Key in order to upload it using the SDK.

Alternativelly, you can upload the document on your own using any other service.

```markup
// Make sure you provide the IPFS params when instantiating the SDK
const cowSdk = new CowSdk(4, {
  ipfs: { 
    pinataApiKey: 'YOUR_PINATA_API_KEY', 
    pinataApiSecret: 'YOUR_PINATA_API_SECRET'
  },
})

// Upload to IPFS
const uploadedAppDataHash = await cowSdk.metadataApi.uploadMetadataDocToIpfs(appDataDoc)
```
