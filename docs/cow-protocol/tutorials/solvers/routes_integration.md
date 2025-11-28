---
sidebar_position: 3
---

# Getting new routes integrated Into CoW Protocol

## Overview

This guide is designed for teams building in DeFi who want to get their routes integrated and supported by CoW Protocol. Integration of new liquidity sources enables CoW Protocol's solvers to access more trading opportunities, potentially leading to better prices for users.

## Why integrate with CoW Protocol?

CoW Protocol's unique batch auction mechanism and competition between multiple solvers provides several advantages:

- Gain access to our growing ecosystem of traders and protocol integrators
- The protocol finds optimal prices by aggregating liquidity across multiple sources
- Trades gain protection from MEV through our batch auction system
- Users benefit from reduced gas costs through our order batching mechanism

## Integration Requirements

### 1. Price Discovery Interface

Solvers need a reliable way to obtain price estimates and available liquidity. This can be provided through:

- On-chain methods to query pool states or oracle prices
- Off-chain API endpoints providing real-time pricing data
- WebSocket feeds for continuous updates
- Documentation of pricing functions or AMM curves

### 2. Settlement Interface

A well-documented smart contract interface for executing trades, including:

- Function specifications for swap execution
- Required parameters and their formats
- Gas consumption estimates
- Safety checks and failure modes

### 3. Technical Documentation

Comprehensive documentation should include:

- Smart contract addresses on supported networks
- API specifications and endpoints
- Authentication requirements (if any)
- Rate limits and other technical constraints
- Example implementations or code snippets

## Self Service Integration

Instead of waiting for solver teams to have the capacity and resources to deliver your integration, few solver teams offer a self service integration.

**Tycho (Propeller heads) - read more [here](https://docs.propellerheads.xyz/tycho/for-dexs/protocol-integration-sdk)**

## Integration Process

1. **Submit Integration Proposal**
    - Use the integration proposal template and make sure to add all necessary information
    - Post on CoW DAO forum, and engage with any follow-up questions
2. **Solver Integration**
    - Solver teams evaluate integration opportunity
    - Development and testing
    - Deployment to production

## Integration Proposal Template

```markdown
# Liquidity Source Integration Proposal

## Title
[Your DEX/Liquidity Source Name] Integration

## Author
[Name(s)]
[Contact Information]

## Simple Summary
[Brief description of your liquidity source and its unique features]

## Motivation
- What unique value does your liquidity source bring?
- How will it improve settlement quality?
- What trading pairs/assets are supported?
- Current trading volumes and liquidity depth

## Technical Specification

### Price Discovery
- How can solvers obtain price information?
- API endpoints or on-chain methods
- Response formats and data structures
- Rate limits and performance characteristics

### Settlement Interface
- Smart contract addresses
- Function signatures
- Parameter specifications
- Gas cost estimates
- Example transactions

## Integration Incentives
- Are you offering integration grants?

## Additional Information
- Security audits
- Known limitations
- Future roadmap
- Testing environment details

## Contact Information
- Development team contacts
- Technical support channels
- Response time expectations

```

## Support and Communication

- Join the CoW Protocol Discord for technical discussions
- Participate in the CoW Protocol forum
- Schedule technical calls with solver teams if needed
