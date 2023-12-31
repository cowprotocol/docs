---
sidebar_position: 1
---

# Trade any intent

CoW Protocol allows users to express any type of trade intent on Ethereum and EVM-compatable chains, leveraging [solvers](../introduction/solvers) to execute the transactions through the most optimal route.

The protocol supports any order logic which includes standard market and limit orders, but also advanced order types such as [TWAP](../order-types/twap-orders). Thanks to ERC-1271, smart contracts can also submit intents, paving the way for the [Programmatic Order Framework](../order-types/programmatic-orders) and contracts like [Milkman](../order-types/milkman-orders). 

Finally, intents aren't limited to trading alone. [CoW Hooks](../order-types/cow-hooks) allow users to specify any set of Ethereum actions that they would like the solvers to execute before or after a trade. 

So whether you want to create an automated trading strategy that runs based on on-chain conditions, bridge & swap all in a single intent, or just place a simple market order, CoW Protocol has got you covered.
