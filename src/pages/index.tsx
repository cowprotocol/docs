import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

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
    description: 'Fully permissionless trading protocol leveraging fair combinatorial batch auctions as its price finding mechanism.',
    link: '/cow-protocol',
    color: '#012f7a',
  },
  {
    title: 'CoW Swap',
    emoji: '🔄',
    description: 'User-friendly trading interface built on CoW Protocol, offering MEV protection and optimal prices for swaps.',
    link: '/cow-swap',
    color: '#1b6aae',
  },
  {
    title: 'CoW AMM',
    emoji: '🌊',
    description: 'New type of AMM built to protect LPs from price exploitation in the form of LVR (Loss Versus Rebalancing).',
    link: '/cow-amm',
    color: '#0c5d99',
  },
  {
    title: 'MEV Blocker',
    emoji: '🏖️',
    description: 'RPC endpoint protecting user transactions from MEV attacks such as frontrunning and sandwiching.',
    link: '/mevblocker',
    color: '#f2994a',
  },
];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>CoW DAO Documentation</h1>
        <p className={styles.heroSubtitle}>
          Building the most user-protective products in Ethereum
        </p>
        <p className={styles.heroDescription}>
          CoW DAO is on a mission to innovate the most user-protective products in Ethereum.
          Explore our products and learn how to build on top of our protocols.
        </p>
      </div>
    </header>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={product.link}
      className={styles.productCard}
      style={{ '--product-color': product.color } as React.CSSProperties}
    >
      <div className={styles.productEmoji}>{product.emoji}</div>
      <h3 className={styles.productTitle}>{product.title}</h3>
      <p className={styles.productDescription}>{product.description}</p>
      <span className={styles.productLink}>Explore documentation →</span>
    </Link>
  );
}

function GovernanceSection() {
  return (
    <div className={styles.governanceSection}>
      <div className={styles.governanceCard}>
        <div className={styles.governanceEmoji}>🗳️</div>
        <div className={styles.governanceContent}>
          <h3 className={styles.governanceTitle}>CoW DAO</h3>
          <p className={styles.governanceDescription}>
            CoW DAO is of its community, by its community, and for its community.
            Learn about our decentralized governance model, token, and how to participate.
          </p>
        </div>
        <Link to="/cow-dao" className={styles.governanceButton}>
          Learn about governance →
        </Link>
      </div>
    </div>
  );
}

function MethodologySection() {
  return (
    <div className={styles.methodologySection}>
      <h2 className={styles.methodologyTitle}>How to use this documentation</h2>
      <p className={styles.methodologyDescription}>
        Our documentation follows a structured approach to help you find what you need:
      </p>
      <div className={styles.methodologyGrid}>
        <div className={styles.methodologyCard}>
          <h3>💡 Concepts</h3>
          <p>Learn <strong>what</strong> something is (e.g., batch auctions, order types)</p>
        </div>
        <div className={styles.methodologyCard}>
          <h3>🎓 Tutorials</h3>
          <p>Learn <strong>how</strong> to do something (e.g., create an order, integrate CoW Protocol)</p>
        </div>
        <div className={styles.methodologyCard}>
          <h3>📚 Technical Reference</h3>
          <p>Access <strong>technical</strong> information (e.g., SDKs, APIs, contracts)</p>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}
    >
      <Hero />
      <main className={styles.main}>
        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Our Products</h2>
          <div className={styles.productsGrid}>
            {products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </section>

        <GovernanceSection />

        <MethodologySection />
      </main>
    </Layout>
  );
}
