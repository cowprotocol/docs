import React, { Component } from 'react';
import Link from '@docusaurus/Link';

export const explorerByChain = {
  "Ethereum": "https://etherscan.io",
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

interface ExplorerUrlOptions {
  /**
   * Which parameters to append after the Explorer URL. For example, #code
   * points to the contract code.
   */
  urlTrailing?: string | undefined,
}
export function explorerUrl(chain: string, address: string, params?: ExplorerUrlOptions) {
  const urlTrailing = params?.urlTrailing ?? "";
  if (!(chain in explorerByChain)) {
    throw new Error(`Explorer URL for chain ${chain} is not known`);
  }
  return `${explorerByChain[chain]}/address/${address}/${urlTrailing}`;
}

interface ExplorerLinksOptions {
  /**
   * Which string or React component to insert between links.
   * Defaults to the string ", ".
   */
  separator?: string | Component | undefined;
  /**
   * Which parameters to append after the URL. For example, #code points to the
   * contract code.
   * Defaults to #code.
   */
  urlTrailing?: string | undefined,
}
/**
 * Given an array of chains and an address, it returns a component with all the
 * chains separated by a comma. All chain names are links to that chain's
 * explorer for the given address.
 */
export function explorerLinks(chains: string[] | string, address: string, options?: ExplorerLinksOptions): Component[] {
  chains = (typeof chains == "string")? [chains] : chains;
  const separator = options?.separator ?? ", ";
  const urlTrailing = options?.urlTrailing ?? "#code";
  return chains.reduce(
    (acc, chain) => {
      if (acc.length) {
        acc.push(separator)
      }
      acc.push(<Link to={explorerUrl(chain, address, {urlTrailing})}>{chain}</Link>)
      return acc
    }
  , []);
}
