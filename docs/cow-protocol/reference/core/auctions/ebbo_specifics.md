---
id: ebbo-rules
---

# EBBO violations: details

In this section, we will elaborate on the details about what consistutes an EBBO violation, and what actions are taken by the DAO in case such a violation occurs. The content of this section is based on [CIP-52](https://snapshot.org/#/cow.eth/proposal/0x0f2f1fde68d85081a7d60f7ac99dafbdabdbf8c8cf55961f2609b3dff429a24a).


## Certificate of EBBO violation

A certificate for an EBBO violation consists of a reference routing on a block (and log index) between the start of the auction and when the settlement happened onchain. A reference routing for a trade at a given block (and index) is an execution of that trade which only uses liquidity from base protocols and routes through base tokens (see [here](/cow-protocol/reference/core/auctions/competition-rules#base-tokens) for the definition of base protocols and base tokens). The surplus received by users in this routing is used as reference surplus. The difference between the reference surplus and the surplus actually received by the user is the size of the EBBO violation. This amount needs to be reimbursed to a user.

A certificate for an EBBO violation can be challenged by the solver who is accused of the EBBO violation by providing a different block (and index), within 72 hours of the notification of the violation. In this case, a reference routing on this block (and index) might be proposed by the core team and used as certificate instead. The new certificate, if any, cannot be challenged again.

## Reimbursement procedures

The following steps are taken, in case an EBBO violation is detected, either by the core team’s monitoring infrastructure or a third party reach out (for example by the user themselves or by solvers). We clarify here that in order to avoid reports of very old trades that occurred at a time where the protocol was in earlier phases, violations will be inspected only if they are communicated within 3 months from the incident date.

1. A violation is detected, within 3 months from the incident date.

2. The core team calculates the (minimum) value lost to users in a given settlement due to the EBBO violation, as described in the section above.

3. The core team requests the involved solver team to reimburse the user directly, by informing them about the amount:
  - The reimbursement is to be done in the surplus token and sent from a responsible solver’s submission / owned address for clarity about who issued the refund. If the solver has no access to their submission account (in case this is managed by the core team), then the core team should transfer any desired amount from the submission account to a solver-related address (i.e. their rewards account), if such a request is made from the solver.

4. Once the incident is communicated, the violating Solver shall process the reimbursement within 72 hours of this notification.
  - If the violating solver complies, the case is closed.
  - If the violating solver does not comply, the slashing procedure will be triggered (see section below)

## Escalation mechanism: Slashing of solver bond

In the case where there is an EBBO violation and the solver team responsible for this violation does not reimburse a user as per request by the core team within the said timeline or there is reasonable concern that more damage may occur, the solver will be automatically deny-listed and the core team will post a statement in the CoW DAO Forum for visibility and the opportunity for anyone to comment. The calculation of the amount will be appended in that post. After three days (72 hours), the forum post will be moved to a CoW DAO Snapshot vote as a formal escalation of the violation [note that this overrides the standard 1-week-period a post is usually required to be on the forum only for this type of slashing-CIP].

With a successful passing of the CIP:
- The solver bond in question is slashed in the amount of refund calculated and triggers repayment to the user;
- If the vote does not pass, the solver is re-instated.

A solver with a slashed bond can resume activity if the solver bond is replenished. If the solver is part of the CoW DAO bond, CoW DAO may decide in the Solver Bond Slashing CIP to replenish the bond from its own funds. This approach would prevent other bond participants from being negatively impacted.

The CIP vote is then binding for all parties.

We also clarify that if a solver would like to stop operating and obtain the (remainder) of their bond back - which requires a CIP - they can ask to have this transaction included in the same CIP.

## Note for non-colocated drivers

For all CoW DAO bonded and non co-located drivers, MEV blocker rebates from trade settlements are accumulated in the CoW DAO owned MEV Blocker Rebates Safe. As per decision of CoW DAO, the rebates from the MEV Blocker Rebates Safe are redirected to the CoW DAO Treasury Core unit (cf. CIP-33), which is also a one-out-of-two owner of the MEV Blocker Rebates Safe next to CoW DAO itself.

With the successful passing of this proposal, the MEV blocker rebate that is directly associated with the execution of the order in question, if any, shall be used to refund the solver (to clarify: if the MEV blocker rebate is smaller than the solver’s reimbursement to the user, it is used fully to refund the solver to that extent. If the MEV blocker rebate is bigger than the solver’s reimbursement to the user, only the actually reimbursed amount is refunded to the solver). Refunds will be handled by the CoW DAO Treasury Core Unit within a few weeks after the reimbursement is made, and will be sent to the solver address from which the reimbursement has happened. For avoidance of doubt, the CoW DAO Treasury Core unit has autonomy on selecting any position to be liquidated for this purpose in case the MEV Blocker Rebates Safe does not have sufficient accumulated funds.