import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

// if you are using dotenv, you can load the env vars here
require("dotenv").config()

const url = process.env.URL ?? "http://localhost:3000"
const baseUrl = process.env.BASE_URL ?? "/"
const trailingSlash = process.env.TRAILING_SLASH
  ? process.env.TRAILING_SLASH === "true"
  : false

const config: Config = {
  title: "CoW Protocol Documentation",
  tagline: "Better than the best prices",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "cowprotocol", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  trailingSlash,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    format: "detect",
    mermaid: true,
  },
  themes: [
    "@docusaurus/theme-mermaid",
    "@docusaurus/theme-live-codeblock",
    "docusaurus-json-schema-plugin",
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [
            remarkMath,
            [
              require("@docusaurus/remark-plugin-npm2yarn"),
              { sync: true, converters: ["yarn", "pnpm"] },
            ],
          ],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/cowprotocol/docs/tree/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        disableInDev: false,
        lazyLoad: true,
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "cow-sdk",
        // TypeDoc options
        entryPoints: ["./external/cow-sdk/src/index.ts"],
        tsconfig: "./external/cow-sdk/tsconfig.json",

        // Plugin options
        out: "cow-protocol/reference/sdks/cow-sdk",
        sidebar: {
          categoryLabel: "cow-sdk",
          collapsed: true,
          position: 1,
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "app-data",
        // TypeDoc options
        entryPoints: ["./external/app-data/src/index.ts"],
        tsconfig: "./external/app-data/tsconfig.json",

        // Plugin options
        out: "cow-protocol/reference/sdks/app-data",
        sidebar: {
          categoryLabel: "app-data",
          collapsed: true,
          position: 2,
        },
      },
    ],
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-FC7FBG6T06",
        anonymizeIP: true,
      },
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/og-meta-cowprotocol.png",
    navbar: {
      title: "CoW Documentation",
      logo: {
        alt: "CoW Protocol logo",
        src: "img/cow-logo.svg",
        srcDark: "img/cow-logo-dark.svg",
        href: "/",
        target: "_self",
        width: 103,
        height: 33,
        className: "custom-navbar-logo-class",
        style: {
          width: "103px",
          height: "33px",
          margin: "auto 12px auto 0",
        },
      },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Forum",
              href: "https://forum.cow.fi",
            },
            {
              label: "Discord",
              href: "https://discord.com/invite/cowprotocol",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/CoWSwap",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Website",
              href: "https://cow.fi",
            },
            {
              label: "GitHub",
              href: "https://github.com/cowprotocol",
            },
            {
              label: "Snapshot",
              href: "https://snapshot.org/#/cow.eth",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CoW Protocol`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["solidity", "json"],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
}

module.exports = config
