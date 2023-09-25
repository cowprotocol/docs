# Social Consensus Rules

Social consensus rules are not enforced by the smart contract. However, by voting on them in a CoW improvement proposal (CIP), the DAO has decided that these rules should be followed to ensure a healthy competition. A violation of these rules can lead to penalizing or even slashing (if the DAO decides so).&#x20;

* **No provision of unfair solutions** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))\
  Uniform clearing prices computed by solvers should be in line (or even better) than what the users would get elsewhere. This becomes particularly relevant for solutions where CoWs happen, i.e., when some volume is settled as part of a CoW and not by routing through an AMM.
*   **Inflation of the objective function** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

    Using tokens for the sole purpose of inflating the objective value or maximizing the reward is forbidden (e.g., by creating fake tokens, or wash-trading with real tokens).
*   **Illegal use of internal buffers** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

    The internal buffers may only be used to replace legitimate AMM interactions available to the general public for the purpose of saving transaction costs.
*   **Failure to report correct transacted values for encoded transactions** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

    Solvers may choose to include encoded transactions in their solution, by providing relevant calldata, but when doing so they must also truthfully specify the amounts transferred by each encoded transaction. This is required in order to be able to verify the proposed token conservation constraints, and can be checked retrospectively.
*   **Other malicious behavior** ([CIP-11](https://snapshot.org/#/cow.eth/proposal/0x16d8c681d52b24f1ccd854084e07a99fce6a7af1e25fd21ddae6534b411df870))

    Malicious solver behavior is not limited to the above examples. Slashing can still happen for other reasons where there is intentional harm caused to the user and/or the protocol at the discretion of the CoW DAO. A concrete such example is a solver intentionally not including the pre/post [hooks](https://docs.cow.fi/overview/cow-hooks) associated with an order.
