import React from 'react';
import Link from '@docusaurus/Link';

export const explorerByChain = {
  "Mainnet": "https://etherscan.io",
  "Sepolia": "https://sepolia.etherscan.io",
  "Gnosis": "https://gnosisscan.io",
  "Base": "https://basescan.org",
  "Arbitrum One": "https://arbiscan.io",
  "Avalanche": "https://snowscan.xyz",
  "Polygon": "https://polygonscan.com",
  "Lens": "https://explorer.lens.xyz",
  "BNB": "https://bscscan.com",
  "Optimism": "https://optimistic.etherscan.io",
} as const;

export function explorerUrl(chain: string, address: string) {
  if (!(chain in explorerByChain)) {
    throw new Error(`Explorer URL for chain ${chain} is not known`);
  }
  return `${explorerByChain[chain]}/address/${address}`;
}

/**
 * Given an array of chains and an address, it returns a component with all the
 * chains separated by a comma. All chain names are links to that chain's
 * explorer for the given address.
 */
export function explorerLinks(chains: string[], address: string) {
  return chains.reduce(
    (acc, chain) => {
      if (acc.length) {
        acc.push(', ')
      }
      acc.push(<Link to={explorerUrl(chain, address)}>{chain}</Link>)
      return acc
    }
  , []);
}
