import {themes as prismThemes} from 'prism-react-renderer';
import getVersion from './scripts/get-version';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const version = getVersion();
const config: Config = {
  title: 'BarStrad',
  tagline: 'Your Bar',
  favicon: 'img/favicon.ico',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  future: {
    v4: true,
  },
  url: 'https://the-running-dev.github.io',
  baseUrl: '/BarStrad-UI',
  trailingSlash: false,
  organizationName: 'The-Running-Dev',
  projectName: 'BarStrad-Bot',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Serve the docs at the site's root
          path: 'docs',
          id: 'default',
        },
        blog: false, // Disable blog since docs is now the root
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'BarStrad',
      logo: {
        alt: 'BarStrad Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Docs',
        },
        {
          label: `v${version}`,
          position: 'right',
          href: '#',
        },
        {
          href: 'https://github.com/The-Running-Dev/BarStrad-UI',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/The-Running-Dev/BarStrad-UI/releases',
          label: 'Releases',
          position: 'right',
        },
        {
          href: 'https://ghcr.io/the-running-dev/barstrad-ui',
          label: 'Container Registry',
          position: 'right',
        }
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
