---
title: Affiliate Program FAQ
sidebar_label: FAQ
sidebar_position: 2
---

This page expands on the [CoW Swap Affiliate Program overview](/cow-protocol/affiliate-program).

## Overview

### What is the CoW Swap Affiliate Program?

The CoW Swap Affiliate Program is a 6-month pilot that rewards affiliates who refer new retail traders when those referred wallets generate qualifying CoW Swap trading volume. The program operates within a governance-approved parameter envelope and hard budget cap. It is not an investment scheme or brokerage arrangement. Rewards are provided solely for marketing and referral services.

### Who can participate?

Anyone can participate by generating a referral code tied to their wallet and sharing it. Traders who use these codes or links and meet eligibility and jurisdiction requirements can be attributed as referred users.

### How do I apply?

The Affiliate Program is open and permissionless.

To participate, generate your referral link from the CoW Swap interface and start sharing it. There is no approval process required.

You may join the [CoW Protocol Discord](https://discord.gg/cowprotocol) for support, updates, and community discussion. Participation in Discord is optional.

### How long will the program run?

The program runs for 6 months from launch. Renewal or material expansion requires a new CIP.

## How It Works

### How do referral links work?

Affiliates generate unique links or codes. A trader becomes attributed when they access CoW Swap via that link or code.

### Can I change my code or link?

No. Once a code or link is created, it cannot be changed.

### When does a trader become attributed to me?

A trader is bound to an affiliate for up to 90 days starting when they click a referral link or enter a referral code manually and execute their first qualifying trade.

### How long does attribution last?

Attribution lasts for up to 90 days per wallet.

### Can one trader be referred by multiple affiliates?

No. Once a trader uses a referral link or code and completes a first qualifying trade, that wallet becomes attributed to that affiliate for up to 90 days. During that attribution window, the trader cannot be referred by another affiliate.

### When do rewards start counting?

Rewards start counting when the referred trader wallet reaches cumulative qualifying volume milestones.

## Rewards

### How are rewards calculated?

Rewards are paid in `USDC` when eligible referred trader wallets reach cumulative qualifying volume milestones. The current setting is `10 USDC` per `250,000 USD` in cumulative qualifying volume generated.

Reward parameters, including milestone thresholds and amounts, may be adjusted within the governance-approved parameter envelope with public disclosure.

### What is a milestone?

A milestone is a cumulative qualifying volume threshold that triggers a reward payout when it is reached.

### What are the current reward settings?

The launch configuration is `10 USDC` per `250,000 USD` in cumulative qualifying volume generated.

### Who earns rewards?

Both the affiliate and the referred trader receive the reward amount of `10 USDC` per milestone.

### Is there a maximum reward per wallet?

Yes. Rewards stop once a referred wallet exceeds `50,000,000 USD` in qualifying volume.

### Can reward parameters change?

Yes. Parameters can change within the governance-approved envelope, with public disclosure and reporting.

## Eligibility

### What qualifies as a new wallet?

A new wallet is a wallet that has never executed a trade through the CoW Swap UI before activating a referral link. Only these wallets are eligible to be attributed to an affiliate.

If a wallet has already traded through the CoW Swap UI in the past, it will not qualify as a referred trader.

### Do trades on partner integrations affect new wallet eligibility?

No. A wallet is still considered new if it has not traded directly on CoW Swap, even if it has executed trades through partner integrations that use CoW Protocol in the background.

### Are there jurisdiction restrictions?

Yes. Participation is prohibited if you are located in, or a citizen of, jurisdictions listed in [cow.fi/terms](https://cow.fi/terms).

### What counts as qualifying volume?

Qualifying volume is counted under a defined methodology and subject to exclusions such as low-fee pairs, disallowed categories, and suspected wash trading.

### Are all swaps eligible?

No. Swaps that are economically non-meaningful, below minimum protocol-fee thresholds, or fall into excluded categories such as suspected self-trading, certain stable-to-stable swaps, or farming patterns may not qualify.

### Is the Affiliate Program available on all chains?

The program applies to all supported CoW Swap chains except Ink and Sepolia.

## Payouts and Tracking

### How and when are rewards paid?

Rewards are paid in `USDC` on a weekly basis, typically by Friday. Payouts are distributed through batch transfers, with Ethereum Mainnet as the default payout chain.

### Are payouts transparent?

Yes. Payout transactions are recorded on a public blockchain and remain visible to the community.

### Is there a minimum payout threshold?

Yes. The minimum payout threshold is `10 USDC`. Balances below that amount roll over to the next payout period.

### Can I change my payout wallet?

No. The payout wallet is fixed and cannot be changed under any circumstances.

### What happens if I lose access to my wallet?

Rewards are distributed on-chain to the registered wallet. If you lose access to that wallet, the program cannot recover previously distributed rewards.

If access is lost before payout, contact the team immediately. The team may review the situation, but recovery or changes are not guaranteed.

### What if I believe my rewards are incorrect?

Please share the following in the Affiliate Discord channel on the [CoW Protocol Discord](https://discord.gg/cowprotocol):

1. Your wallet address, never your private keys
2. Your referral code
3. Relevant transaction hashes

## Volume and Reward Nuances

### Is volume counted gross or net of fees?

Volume is counted gross of fees.

### Is volume calculated in USD at the time of trade?

Yes. Volume is calculated from the USD value of each swap at execution time.

### Are partially filled orders counted?

Yes. Only the filled portion of an order counts toward qualifying volume.

### Do limit orders count?

Yes. Filled limit orders are eligible and count toward qualifying volume.

### Do cross-chain swaps count?

Yes. Cross-chain swaps are included in qualifying volume.

### Are failed or reverted transactions counted?

No. Only successful trades executed on-chain count toward qualifying volume. Failed, reverted, or canceled transactions do not count.

### What if a trade is later canceled?

Canceled trades do not count. Only successfully executed swaps are included in qualifying volume calculations.

## Abuse and Disqualification

### What counts as self-referral?

Self-referral includes referring a wallet that you directly or indirectly control, or participating in circular referral schemes designed to generate rewards from your own trading activity.

### Can I refer wallets I control?

No. That would be considered self-referral and is not allowed.

### What happens if I'm flagged for abuse?

The program reserves the right to:

- Disqualify participants
- Deny unpaid rewards
- Pause payouts
- Restrict or terminate participation

A forum notice may be published if there are material program changes or pauses.

### Will unpaid rewards be clawed back?

If abuse or fraud is suspected, unpaid rewards may be denied.

### Can rewards be retroactively revoked?

Once rewards have been distributed on-chain, they cannot be reversed. However, the program may disqualify participants and deny unpaid rewards in cases of fraud, abuse, or terms violations. Future participation and payouts may also be restricted.

## Dashboard and Reporting

### Is there an affiliate dashboard?

Yes. You can use the [Affiliate Dashboard](https://swap.cow.fi/#/account/affiliate).

### What can I track as an affiliate or trader?

- Traders can use [My Rewards](https://swap.cow.fi/#/account/my-rewards) to see all-time earnings.
- Affiliates can use the [Affiliate Dashboard](https://swap.cow.fi/#/account/affiliate) to see referred volume, referred traders, and all-time earnings.

### Where can I see my expected rewards?

- Traders can use [My Rewards](https://swap.cow.fi/#/account/my-rewards) to see expected rewards for the next payout cycle and past payout amounts.
- Affiliates can use the [Affiliate Dashboard](https://swap.cow.fi/#/account/affiliate) to see expected rewards for the next payout cycle and past payout amounts.

### How often does the rewards data update?

Rewards data updates four times per day at `01:00`, `07:00`, `13:00`, and `17:00` UTC. Data may be delayed and should not be considered real-time.

### Where can I see my payout history?

Payout history is visible in the relevant account page. All payouts are also recorded on-chain.

## Communication and Support

### Where will affiliate updates be shared?

Official Affiliate Program updates are shared in the Affiliate Discord channel on the [CoW Protocol Discord](https://discord.gg/cowprotocol).

### Is support available?

Yes. If you have questions about tracking, rewards, attribution, or payouts, please post in the dedicated Affiliate Discord channel on the [CoW Protocol Discord](https://discord.gg/cowprotocol).

### How do I request support?

When contacting support, please provide:

- Your wallet address
- The referral code you are using, if relevant
- A transaction hash, if you are reporting a specific issue

This helps the team locate your referral data and investigate efficiently. Requests without a wallet address may not be reviewed.

### What materials are available to me as an affiliate?

Affiliates can access a dedicated Discord channel (`#affiliate-program`) with:

- Brand kit assets such as logos and approved assets
- Launch assets
- Program updates and parameter changes

Materials are updated periodically.

### Can I run paid ads with my referral link?

Affiliates must comply with the program's conduct rules.

Misleading claims, spam, or guaranteed income language are strictly prohibited. Paid advertising may be subject to additional review and compliance requirements depending on jurisdiction and platform rules.
