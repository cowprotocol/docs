---
sidebar_position: 4
---

# Additional benefits

CoW Protocol's [intent-based trading model](../introduction/intents) and [batch auctions mechanism]((../introduction/batch-auctions)) come together to provide a number of benefits, including support for expressing any intent, MEV protection, and price improvement. 

There are also several additional benefits unique to CoW Protocol that every order inherits: 
- Gasless trades (users pay settlement fees in their sell token; settlement fees can be lower than gas fees if the trade is included in a batch)
- No fees for failed or cancelled orders (most exchanges make users pay gas fees regardless of whether their order executes or not)
- Order settlement at Ethereum Best Bid Offer or better
- Support for placing multiple orders at once
- Slippage protection on all orders

The protocol's architecture also provides important "passive" benefits and supports niche trading use-cases:
- Minimized smart contract risk as solvers take on the exposure to all on-chain AMMs
- Support for tapping straight into exotic tokens as solvers abstract away intermediate steps like depositing, minting, and staking 
- Tighter spreads from private market makers thanks to fast settlement of off-chain orders
- Increased gas efficiency as all trades are credited directly to user accounts without withdrawals or deposits into an exchange contract 
- Increased security as funds can only be transferred if a trader has approved the contract and signed an order to sell the given token for another
- A guarantee that the limit prices and amounts of any given signed order will always be satisfied
- Signed orders have an expiry date and they can be cancelled on-chain, preventing exploits where orders can be re-executed by relying on old approvals
- Only solvers subject to slashing can execute the batch auction settlement
- Fair, decentralized settlement in which an open competition for order matching replaces a central operator or a constant function market maker

