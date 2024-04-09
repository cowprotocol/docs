---
sidebar_position: 1
---

# Rules

The basic technical requirement to start receiving flow is to build at least 1% of the blocks each week of the previous month. We reserve the right to disconnect a builder who drops significantly below the 1% threshold while connected to MEV blocker. Also, the fee will always be calculated as if the builder won at least 1% of blocks (see the discussion about the fee adjustment below).

Connected builders who support refund bundles and replacementUuid (or uuid) for updateable bundles receive MEV Blocker transactions and bundles immediately. These builders should maximize the refunds received by MEV blocker's users. In particular, they should, for each transaction, always include the highest-paying bundles plus other bundles that do not fail (in the combination that maximizes the refund). If they comply with this rule, they can perform additional blind, end-of-block backrunning.

Connected builders who do not support refund bundles will receive transactions with a delay. The purpose is to give time for searchers connected to MEV Blocker to create bundles. These builders cannot perform any backrunning (internal, blind, whatever).

Independent of their support for bundles, all builders connected to MEV Blocker are expected to:

- **Refrain from unethical activities that may hurt MEV Blocker users.** This includes (but is not limited to): no frontrunning, no sandwiching, no state or transaction sharing/leaking in any form.
- **Provide good service.** This includes (but is not limited to) the timely inclusion of a transaction (or a bundle) if its effective gas price is larger than the lowest-paying transaction included in the block, with the exception of unavoidable technical limitations (i.e., latency) and legal requirements (i.e., OFAC).
- **Do not take actions having the sole purpose of gaming the rules or avoiding paying the fee.** This includes (but is not limited to) creating a separate identity (a "shadow builder") that only receives MEV blocker flow.
- **Deposit a 10 ETH bond in the MEV Blocker smart contract, administered by MEV blocker implementing partners.** These funds will be used to cover late fees and penalties. They will be returned to builders who decide to disconnect from MEV blocker and are in good standing.

We reserve the right to disconnect builders suspected of violating these rules. If wrongdoing was established, we reserve the right to charge the violating builder any damage caused and require a re-subscription fee of 2 ETH. For example, suppose a builder included only one bundle while it was possible to include two bundles for the same transaction, hence failing to maximize the refund. Such a builder may be asked to pay as damage the reward from the missing bundle (plus the reconnection fee).

Finally, in the future, we may ask connected builders to submit their blocks to Agnostic relay (not exclusively and only blocks containing MEV blocker transactions). This would allow us to create meaningful alerts and metrics by checking, for the same slot, how different builders include the same MEV blocker's transactions/bundles. Also, in a future version of the fee mechanism, we may use data from Agnostic relay to calculate the fee (see below). However, for the moment, these tests and alerts are not in place, and hence, submitting to Agnostic relay is not a requirement.