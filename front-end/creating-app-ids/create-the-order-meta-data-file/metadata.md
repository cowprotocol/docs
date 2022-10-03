# MetaData

The metadata document is a JSON file that follows a specific format.

Mainly, it will be formed by:&#x20;

* **Version:** The schema will be versioned using Semantic Versioning&#x20;
* **AppCode: (optional)** The code identifying the CLI, UI, service generating the order. See AppCode section for more information.&#x20;
* **JSON object with metadata descriptors:** Each metadata will specify one aspect of the order. This field is mandatory, but it can contain an empty JSON object.

Each metadata will contain one mandatory field:&#x20;

* **Version:** The same way the metadata document is versioned, so is each metadata. It's not expected that they change much, but this could allow the schemas to evolve and let the parsers handle them correctly.

So the minimum information in a AppData document would be:

```
{ 
    "version": "0.4.0", 
    "metadata": {} 
}
```

Interfaces like CoW Swap could, by default, include the hash of the following document,sSo the minimum information in a AppData document would be:&#x20;

```
{ 
    "version": "0.4.0", 
    "appCode": "CoW Swap", 
    "metadata": {} 
}
```

**Is it possible to include two Metadatas of the same kind in the same document?**&#x20;

No. Only one kind instance per document. If a kind can have a higher cardinality, its schema should take this into account and should model this cardinality within it's schema definition. This way, when processing this information, we ignore the second occurrences for the same kind.

**Referral: Example of a Metadata Kind**&#x20;

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
