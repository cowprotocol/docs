// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

// if you are using dotenv, you can load the env vars here
require('dotenv').config();

const url = process.env.URL ?? 'http://localhost:3000';
const baseUrl = process.env.BASE_URL ?? '/';
const trailingSlash = process.env.TRAILING_SLASH ? process.env.TRAILING_SLASH === "true" : false;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CoW Protocol Documentation',
  tagline: 'Tagline here',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cowprotocol', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock', "docusaurus-json-schema-plugin"],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarItemsGenerator: async function sidebarItemsGenerator({
                    defaultSidebarItemsGenerator,
                    numberPrefixParser,
                    item,
                    version,
                    docs,
                    categoriesMetadata,
                    isCategoryIndex,
                  }) {
                    // Get the default side bar
                    const defaultSidebar = await defaultSidebarItemsGenerator({categoriesMetadata, item, version, docs, isCategoryIndex, numberPrefixParser});
                    // Use a reduce to transform the defaultSidebar into a new sidebar. Do not include any
                    // items that have the property "type" set to "doc" with the id containing "README"
                    const noReadmeSidebar = defaultSidebar.reduce((acc, cur) => {
                      if (cur.type === 'doc' && cur.id.includes('README')) {
                        return acc;
                      }
                      acc.push(cur);
                      return acc;
                    }, []);

                    return noReadmeSidebar;
                  },
          remarkPlugins: [
            math,
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true, converters: ['yarn', 'pnpm'] }],
          ],
          rehypePlugins: [katex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/cowprotocol/docs/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'cow-sdk',
        // TypeDoc options
        entryPoints: ['./external/cow-sdk/src/index.ts'],
        tsconfig: './external/cow-sdk/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/js/cow-sdk',
        sidebar: {
          categoryLabel: 'cow-sdk',
          collapsed: true,
        }
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'app-data',
        // TypeDoc options
        entryPoints: ['./external/app-data/src/index.ts'],
        tsconfig: './external/app-data/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/js/app-data',
        sidebar: {
          categoryLabel: 'app-data',
          collapsed: true,
          position: 1,
        }
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'app-data',
        // TypeDoc options
        entryPoints: ['./external/app-data/src/index.ts'],
        tsconfig: './external/app-data/tsconfig.json',

        // Plugin options
        out: 'cow-protocol/reference/sdks/app-data',
        sidebar: {
          categoryLabel: 'app-data',
          collapsed: true,
          position: 2,
        }
      }
    ]
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/og-meta-cowprotocol.png',
      navbar: {
        title: 'CoW Documentation',
        logo: {
          alt: 'CoW Protocol logo',
          src: 'img/cow-logo.svg',
          srcDark: 'img/cow-logo-dark.svg',
          href: 'https://docs.cow.fi/',
          target: '_self',
          width: 103,
          height: 33,
          className: 'custom-navbar-logo-class',
          style: {    
            width: '103px',
            height: '33px',
            margin: 'auto 12px auto 0',
          },
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://github.com/cowprotocol/docs',
            label: 'GitHub',
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
                label: 'GitHub',
                href: 'https://github.com/cowprotocol',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CoW Protocol`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity', 'json'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
