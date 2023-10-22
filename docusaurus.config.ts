import {themes as prismThemes, themes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import math from 'remark-math';
import katex from 'rehype-katex';

// if you are using dotenv, you can load the env vars here
require('dotenv').config();

const url = process.env.URL ?? 'http://localhost:3000';
const baseUrl = process.env.BASE_URL ?? '/';
const trailingSlash = process.env.TRAILING_SLASH ? process.env.TRAILING_SLASH === "true" : false;

const config: Config = {
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

  onBrokenLinks: 'throw',
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
  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
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
      } satisfies Preset.Options,
    ],
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
    {
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
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
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
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    } satisfies Preset.ThemeConfig,
};

// Reverse the sidebar items ordering (including nested category items)
function reverseSidebarItems(items) {
  // Reverse items in categories
  const result = items.map((item) => {
    if (item.type === 'category') {
      return {...item, items: reverseSidebarItems(item.items)};
    }
    return item;
  });
  // Reverse items at current level
  result.reverse();
  return result;
}

export default config;
