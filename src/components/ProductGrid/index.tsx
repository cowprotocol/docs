import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Product {
  title: string;
  emoji: string;
  description: string;
  link: string;
  color: string;
}

const products: Product[] = [
  {
    title: 'CoW Protocol',
    emoji: '🐮',
    description: 'The leading intents-based DEX aggregation protocol protecting users from MEV.',
    link: '/cow-protocol',
    color: '#012f7a',
  },
  {
    title: 'CoW Swap',
    emoji: '🔄',
    description: 'User-friendly interface for trading on CoW Protocol with MEV protection and best prices.',
    link: '/cow-swap',
    color: '#1b6aae',
  },
  {
    title: 'CoW Widget',
    emoji: '🧩',
    description: 'Embeddable widget to bring MEV-protected swaps directly to your website or dApp.',
    link: '/cow-widget',
    color: '#2d9a4d',
  },
  {
    title: 'CoW AMM',
    emoji: '🌊',
    description: 'Automated Market Maker protecting liquidity providers from price exploitation.',
    link: '/cow-amm',
    color: '#0c5d99',
  },
  {
    title: 'MEV Blocker',
    emoji: '🏖️',
    description: 'RPC endpoint protecting transactions from MEV attacks before they reach the mempool.',
    link: '/mevblocker',
    color: '#f2994a',
  },
];

export default function ProductGrid(): JSX.Element {
  return (
    <section className={styles.productGrid}>
      <div className={styles.container}>
        {products.map((product, idx) => (
          <Link
            key={idx}
            to={product.link}
            className={styles.productCard}
            style={{ '--product-color': product.color } as React.CSSProperties}
          >
            <div className={styles.productEmoji}>{product.emoji}</div>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <span className={styles.productLink}>Explore documentation →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
