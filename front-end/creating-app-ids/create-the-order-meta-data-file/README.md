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
