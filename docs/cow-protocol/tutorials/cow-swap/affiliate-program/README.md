---
title: CoW Swap Affiliate Program
sidebar_label: Overview
sidebar_position: 1
---

The CoW Swap Affiliate Program rewards affiliates and referred traders when referred wallets generate qualifying trading volume on CoW Swap. Rewards are milestone-based and paid in USDC.

The program operates within a governance-approved framework with defined parameters, eligibility requirements, and enforcement rights.

For operational details, see the [Affiliate Program FAQ](/cow-protocol/tutorials/cow-swap/affiliate-program/faq).

## Definitions

- **Affiliate**: A participant who generates and distributes a referral link tied to their wallet
- **Trader**: A wallet that activates an affiliate referral link and executes at least one qualifying trade on CoW Swap
- **Attribution window**: The period during which a referred wallet's qualifying volume is attributed to an affiliate
- **Qualifying volume**: Eligible trading volume on CoW Swap counted toward milestone rewards, subject to exclusions

## Program Flow

1. An affiliate generates a unique referral link tied to their wallet.
2. A trader activates the link and executes a qualifying trade.
3. The trader wallet becomes attributed to the affiliate.
4. Qualifying volume is tracked during the attribution window.
5. Rewards are distributed when milestone thresholds are reached.

Attribution is wallet-based and not retroactive.

## Initial Launch Parameters

The program launches with the following default configuration:

- Reward per milestone: `10 USDC`
- Milestone volume: `250,000 USD` of cumulative qualifying volume
- Attribution window: `90 days`
- Maximum rewardable volume per referred wallet: `50,000,000 USD`
- Rewards are paid weekly in `USDC` through batch transfers

These parameters may be adjusted within governance-approved limits.

## Attribution Rules

- Each referred wallet may be attributed to only one affiliate.
- Attribution starts when a trader activates a referral link and completes a first qualifying trade.
- Only volume executed within the attribution window is eligible.
- Volume executed before attribution does not count.

Attribution logic is deterministic and wallet-based.

## Qualifying Volume

Qualifying volume includes eligible trades executed on CoW Swap during the attribution window.

The program may exclude:

- Economically non-meaningful swaps
- Low-fee or zero-fee pairs
- Artificial volume generation
- Trades determined to be abusive or manipulative

Eligibility rules may be refined within governance-approved parameters.

## Rewards and Payouts

Rewards are triggered when cumulative qualifying volume reaches the defined milestone thresholds.

- Rewards are paid in `USDC`.
- At launch, both the affiliate and the referred trader receive rewards when eligible milestones are reached.
- Payouts are processed weekly.
- A defined data cut-off applies to each payout cycle.
- Rewards may be withheld pending review if suspicious activity is detected.

Payouts are executed as batch transfers.

## Enforcement and Disqualification

The program enforces anti-abuse protections to maintain protocol integrity.

Prohibited behavior includes:

- Self-referrals
- Circular referral schemes
- Sybil activity
- Wash trading
- Artificial volume generation
- Misleading or deceptive marketing practices

Program Managers reserve the right to:

- Disqualify participants
- Deny unpaid rewards
- Withhold payouts pending investigation
- Modify eligibility within approved parameters
- Pause or terminate participation

## Parameter Adjustments

Certain program parameters may be adjusted within a governance-approved envelope.

Adjustable parameters include:

- Reward per milestone
- Milestone volume
- Attribution window
- Maximum rewardable volume per wallet
- Affiliate and trader reward split
- Eligibility refinements
- Volume exclusions

Changes outside the approved envelope require a new governance proposal.

## Program Term and Cap

- The program operates for a 6-month term from the launch date. Renewal or material expansion requires a new CIP.
- A hard incentive cap of `500,000 USDC` applies.
- Once the cap is reached, no further rewards will be distributed.
- The program may be paused or terminated in case of abuse, critical issues, or material risk.

## Irreversibility and Finality

- Referral links are wallet-bound and permanent.
- Attribution cannot be reassigned.
- Rewards are calculated according to the program's eligibility rules.
- Decisions regarding abuse and eligibility are final.

## Support

For support requests, please provide:

- Your registered wallet address
- Your referral code, if applicable
- A transaction hash, if applicable

Program updates and support are handled through the CoW Protocol Discord.
