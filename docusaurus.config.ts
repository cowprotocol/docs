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
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [
            remarkMath,
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
          ],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/cowprotocol/docs/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
        lazyLoad: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'cow-sdk',
        // TypeDoc options
        entryPoints: [
          './external/cow-sdk/packages/sdk/src/typedoc-entry.ts',
        ],
        tsconfig: './external/cow-sdk/packages/sdk/tsconfig.json',
    
        // Plugin options
        out: 'cow-protocol/reference/sdks/cow-sdk',
        sidebar: {
          categoryLabel: 'cow-sdk',
          collapsed: true,
          position: 1,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-trading',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/trading/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/trading/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-trading',
        sidebar: {
          categoryLabel: 'sdk-trading',
          collapsed: true,
          position: 1,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-order-book',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/order-book/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/order-book/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-order-book',
        sidebar: {
          categoryLabel: 'sdk-order-book',
          collapsed: true,
          position: 2,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'contracts-ts',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/contracts-ts/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/contracts-ts/tsconfig.json',
        excludeNotDocumented: true,

        // Plugin options
        out: 'cow-protocol/reference/sdks/core-utilities/sdk-contracts-ts',
        sidebar: {
          categoryLabel: 'sdk-contracts-ts',
          collapsed: true,
          position: 3,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-order-signing',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/order-signing/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/order-signing/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-order-signing',
        sidebar: {
          categoryLabel: 'sdk-order-signing',
          collapsed: true,
          position: 3,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-cow-shed',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/cow-shed/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/cow-shed/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-cow-shed',
        sidebar: {
          categoryLabel: 'sdk-cow-shed',
          collapsed: true,
          position: 4,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-composable',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/composable/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/composable/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-composable',
        sidebar: {
          categoryLabel: 'sdk-composable',
          collapsed: true,
          position: 5,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-bridging',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/bridging/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/bridging/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-bridging',
        sidebar: {
          categoryLabel: 'sdk-bridging',
          collapsed: true,
          position: 6,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-subgraph',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/subgraph/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/subgraph/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-subgraph',
        sidebar: {
          categoryLabel: 'sdk-subgraph',
          collapsed: true,
          position: 7,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-weiroll',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/weiroll/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/weiroll/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/protocol-components/sdk-weiroll',
        sidebar: {
          categoryLabel: 'sdk-weiroll',
          collapsed: true,
          position: 8,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-common',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/common/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/common/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/core-utilities/sdk-common',
        sidebar: {
          categoryLabel: 'sdk-common',
          collapsed: true,
          position: 1,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-config',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/config/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/config/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/core-utilities/sdk-config',
        sidebar: {
          categoryLabel: 'sdk-config',
          collapsed: true,
          position: 2,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-ethers-v5-adapter',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/providers/ethers-v5-adapter/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/providers/ethers-v5-adapter/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/provider-adapters/sdk-ethers-v5-adapter',
        sidebar: {
          categoryLabel: 'sdk-ethers-v5-adapter',
          collapsed: true,
          position: 1,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-ethers-v6-adapter',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/providers/ethers-v6-adapter/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/providers/ethers-v6-adapter/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/provider-adapters/sdk-ethers-v6-adapter',
        sidebar: {
          categoryLabel: 'sdk-ethers-v6-adapter',
          collapsed: true,
          position: 2,
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'sdk-viem-adapter',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/providers/viem-adapter/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/providers/viem-adapter/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/provider-adapters/sdk-viem-adapter',
        sidebar: {
          categoryLabel: 'sdk-viem-adapter',
          collapsed: true,
          position: 3,
        },
        excludeExternals: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'app-data',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/packages/app-data/src/index.ts'],
        tsconfig: './external/cow-sdk/packages/app-data/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/app-data',
        sidebar: {
          categoryLabel: 'app-data',
          collapsed: true,
          position: 5,
        },
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
      title: 'Documentation - CoW DAO',
      logo: {
        alt: 'Documentation - CoW DAO',
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
    },
  } satisfies Preset.ThemeConfig,
}

module.exports = config
