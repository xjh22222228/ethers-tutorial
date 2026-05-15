import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import "dotenv/config";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const conf: Config = {
  title: "Ethers.js 教程",
  favicon: "img/favicon.ico",
  scripts: [],
  // Set the production url of your site here
  url: "https://ethersjs.cn",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "liuzi6612", // Usually your GitHub org/user name.
  projectName: "ethers-tutorial", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/liuzi6612/ethers-tutorial",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["@docusaurus/theme-live-codeblock"],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Ethers.js v6教程",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "快速上手",
        },
        {
          href: "https://github.com/liuzi6612/ethers-tutorial",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "资源",
          items: [
            {
              label: "ethers.js",
              href: "https://ethers.org/",
            },
            {
              label: "以太坊",
              href: "https://ethereum.org/zh/",
            },
            {
              label: "web3资源",
              href: "https://nav3.cn/#/?id=25",
            },
          ],
        },
        {
          title: "关注",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/liuzi6612/ethers-tutorial",
            },
            {
              label: "Author",
              href: "https://github.com/liuzi6612",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${location.hostname}, All Rights Reserved`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

if (process.env.NODE_ENV !== "development") {
  conf.scripts.push({
    src: "//sdk.51.la/js-sdk-pro.min.js",
    async: true,
    defer: true,
  });
  conf.scripts.push({
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2853614204651252",
    async: true,
    crossorigin: "anonymous",
  });
}

const config: Config = conf;

export default config;
