---
draft: true
---

# Smart Orders

### Smart Orders

Smart Order leverage the same signature verification standard, ERC-1271, and work much like the Safe:

1. You would deposit some tokens that you want to trade into the Smart Order
2. Implement ERC-1271 signature verification

**But**, instead of verifying owner ECDSA signatures, you would instead add some custom on-chain validation logic. And **that's it**! It is, in fact conceptually very simple, and takes advantage of just how flexible and powerful the ERC-1271 signature verification scheme is.
