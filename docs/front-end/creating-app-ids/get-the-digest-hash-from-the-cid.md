# Get the digest hash from the CID

Now that your file has been uploaded to IPFS, there's one last step to get the appData:

* Head to https://cid.ipfs.io/&#x20;
* Enter the CID from the file you uploaded&#x20;
* Get the "Digest (Hex)"

![Screenshot of CID inspector, highlighting the Digest (Hex) field](<../../../static/img/Screen Shot 2022-08-24 at 10.29.01.png>)

The digest hash is what is used as **appData** and should be included in your orders to track your created **appCode**.

If you are instead using the [CoW Protocol Explorer's appData tool](https://explorer.cow.fi/appdata?tab=encode), the appData hash will be displayed in the interface.
