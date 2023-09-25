# Current Orders

CoW Protocol orders are, in essence, just a "blob" of structured data. As you see here, they are a set of order fields that include all the required information for that order. For example, the sell token, buy token, amounts, pro-rated fee, etc.

<figure><img src="https://lh6.googleusercontent.com/rV4NmKo8smr0lp4LGFiHXGC-KI09za3IC4TSfOT9l6CwYw9WEsq4tYXjKOt9K-5hA1W5h-s1dRZU-av84Lq-G47_af3fO6erG6VqMlnloo20vjzdB09ZjPaLAqpjBpIrKJfV6_hX6v5OX8zOy56rVeFwLx-pGvU2NvsEPJfLg9kieLb09jG-lxD9X2pC" alt="" /><figcaption></figcaption></figure>

This structured data is used to produce an order hash. CoW Protocol uses [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed structured data hashing for this. The exact mechanism for how this isn't super important for understanding how CoW Protocol order work. What is important is just understanding that an order can be hashed into a 32-byte digest that is used for signing.



<figure><img src="https://lh4.googleusercontent.com/3mpFJvQVv1vvZcVYfjhXffyF5FousA81mouUKQxRWNN2MuWKSH5nHgNu8r9Z-plr9uehTug3zpjZhWKakS0s8Nz8IxNL6PGHMBpp7SXy4lcMi3W2a5HBc3k3YVBdQuUbSnHVXfqMnbJjreytPWZB2nszTA99kCEzOEIH3ytwTDXNQT4C_evwXgQAyyOF" alt="" /><figcaption></figcaption></figure>



For EOAs (**E**xternally **O**wned **A**ccount), which have a private key, we use ECDSA signing. This uses an elliptic curve, with some fancy math, to produce a signature:

```
{
  r: 0x847eba7d570c3aec0f217fa1db79d49166fa9a9088bfbab237e3168ea2a1c4a4,
  s: 0x291cf356e5639fb4c19ba5bfb4e2f8f82b371573b9d46f36b84cc39ca7472ac4,
  v: 0x1b,
}
```
