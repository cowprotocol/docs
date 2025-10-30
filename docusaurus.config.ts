import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const config: Config = {
  title: 'CoW Protocol Documentation',
  tagline: 'The leading intents-based DEX aggregation protocol',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.cow.fi',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cowprotocol', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',

  trailingSlash: false,

  clientModules: [
    require.resolve('./src/clientModules/gtagFix.js'),
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'detect',
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock', 'docusaurus-json-schema-plugin'],

  presets: [
    [
      'classic',
      {
        docs: false, // Disable default docs
        blog: false, // Disable blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cow-protocol',
        path: 'docs/cow-protocol',
        routeBasePath: 'cow-protocol',
        sidebarPath: require.resolve('./sidebars-cow-protocol.ts'),
        remarkPlugins: [
          remarkMath,
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
        ],
        rehypePlugins: [rehypeKatex],
        editUrl: 'https://github.com/cowprotocol/docs/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cow-swap',
        path: 'docs/cow-swap',
        routeBasePath: 'cow-swap',
        sidebarPath: require.resolve('./sidebars-cow-swap.ts'),
        remarkPlugins: [
          remarkMath,
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
        ],
        rehypePlugins: [rehypeKatex],
        editUrl: 'https://github.com/cowprotocol/docs/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cow-widget',
        path: 'docs/cow-widget',
        routeBasePath: 'cow-widget',
        sidebarPath: require.resolve('./sidebars-cow-widget.ts'),
        remarkPlugins: [
          remarkMath,
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
        ],
        rehypePlugins: [rehypeKatex],
        editUrl: 'https://github.com/cowprotocol/docs/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cow-amm',
        path: 'docs/cow-amm',
        routeBasePath: 'cow-amm',
        sidebarPath: require.resolve('./sidebars-cow-amm.ts'),
        remarkPlugins: [
          remarkMath,
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
        ],
        rehypePlugins: [rehypeKatex],
        editUrl: 'https://github.com/cowprotocol/docs/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'mevblocker',
        path: 'docs/mevblocker',
        routeBasePath: 'mevblocker',
        sidebarPath: require.resolve('./sidebars-mevblocker.ts'),
        remarkPlugins: [
          remarkMath,
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
        ],
        rehypePlugins: [rehypeKatex],
        editUrl: 'https://github.com/cowprotocol/docs/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cow-dao',
        path: 'docs/governance',
        routeBasePath: 'cow-dao',
        sidebarPath: require.resolve('./sidebars-cow-dao.ts'),
        remarkPlugins: [
          remarkMath,
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
        ],
        rehypePlugins: [rehypeKatex],
        editUrl: 'https://github.com/cowprotocol/docs/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
        lazyLoad: true,
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-FC7FBG6T06',
        anonymizeIP: true,
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    metadata: [
      {
        name: 'description',
        content: 'Documentation for CoW Protocol, CoW AMM, MEV blocker and other CoW DAO products.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'og:type', content: 'website' },
      { name: 'og:image', content: 'img/og-meta-cowprotocol.png' },
      { name: 'og:title', content: 'Documentation - CoW DAO' },
      {
        name: 'og:description',
        content: 'Documentation for CoW Protocol, CoW AMM, MEV blocker and other CoW DAO products.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@CoWSwap' },
      { name: 'twitter:title', content: 'Documentation - CoW DAO' },
      { name: 'twitter:image', content: 'https://docs.cow.fi/img/og-meta-cowprotocol.png' },
    ],
    // Replace with your project's social card
    image: 'img/og-meta-cowprotocol.png',
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'CoW DAO Documentation',
        src: 'img/cow-logo.svg',
        srcDark: 'img/cow-logo-dark.svg',
        href: '/',
        target: '_self',
        width: 160,
        height: 30,
        className: 'custom-navbar-logo-class',
        style: {
          width: '160px',
          height: '30px',
          margin: 'auto 12px auto 0',
        },
      },
      items: [
        {
          type: 'dropdown',
          label: 'Products',
          position: 'left',
          items: [
            {
              label: 'CoW Protocol',
              to: '/cow-protocol',
            },
            {
              label: 'CoW Swap',
              to: '/cow-swap',
            },
            {
              label: 'CoW Widget',
              to: '/cow-widget',
            },
            {
              label: 'CoW AMM',
              to: '/cow-amm',
            },
            {
              label: 'MEV Blocker',
              to: '/mevblocker',
            },
          ],
        },
        {
          label: 'CoW DAO',
          to: '/cow-dao',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://forum.cow.fi',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/cowprotocol',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/CoWSwap',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://cow.fi',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/cowprotocol',
            },
            {
              label: 'Snapshot',
              href: 'https://snapshot.org/#/cow.eth',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CoW Protocol`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'json'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    algolia: {
      appId: '9SHPK9O441',
      apiKey: '03080030278ba4994327d955f694f2a4',
      indexName: 'cow',
      contextualSearch: true,
      searchParameters: {
        facetFilters: ['type:content'],
      },
    },
  } satisfies Preset.ThemeConfig,
}

module.exports = config
