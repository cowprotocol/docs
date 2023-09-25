# The Basics of ERC-1271



While this works for EOAs, which have private keys, it does not work for Smart Contracts, and specifically Smart Contract Wallets. This is because Smart Contracts have no "private keys", to use for elliptic curve cryptography. Meaning, that Smart Contracts really be used for ECDSA signing. In order to work around this, a different signature is needed that does not depend on elliptic curve cryptography.

The solution was to standardise a new form of on-chain signature verification for Smart Contracts: [ERC-1271](https://eips.ethereum.org/EIPS/eip-1271). This is a simple standard that requires Smart Contracts that want to perform signature verification to implement a `isValidSignature` method:



<figure><img src="https://lh4.googleusercontent.com/jyTXFIF5mfZG8pZOIXx_4CKvi9XMrq39uR3RXgu_dLccgVVxfY43WgO2sJlJZe9JRn5V53Zfj857WmdBfef7shmtsNB86ui0goIPLCPvZlDKPUeHass7f7DOhBJlz3pc4dX6N7oxpvOm98DPGAPdGKUUQezQ-fD5tMf-ZzoU2C71pAiab_6xQymi2rIy" alt="" /><figcaption></figcaption></figure>



The interface is very simple, but also incredibly flexible. The verifying Smart Contract would get passed in the 32-byte hash that it wants to verify along with an implementation dependant arbitrary length byte array. This arbitrary length byte array allows all kinds of data to be encoded and passed in, making signature verification extremely powerful. Also, since this is just a Smart Contract `CALL`, the logic that verifies the signature can be arbitrary and make use of any on-chain state that it wants.

With respect to CoW Protocol orders, the flow now becomes:

1. Like before, prepare your order, i.e. the structured order data
2. Like before, hash this structured data into a 32-byte digest
3. Unlike before, call the `isValidSignature` on the Smart Contract signer instead of performing the usual ECDSA signature recovery and validation

<figure><img src="https://lh3.googleusercontent.com/vDMQVWDF_1NhqK7a9JMaLL-0UF0AYHZHnhVGXwqopuNtujWbpOB55bXZJZgQfqVQWgQxWSfkLSzigJp8dRyFN41mH7qtzzNxO0YxA9mQamz8BMeVdSMgpqIQUWH91y5oHtjEDeyINE2oPWj7oB_Q-jmuQ6EzxagBsP68YipCjgHx-1YbILK5BI91AODS" alt="" /><figcaption></figcaption></figure>
