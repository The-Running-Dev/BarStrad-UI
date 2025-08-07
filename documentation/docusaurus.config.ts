import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import { SiteConfig, SiteThemeConfig } from './config/site-config';
import type { NavbarLink } from './src/entities';
import navbarData from './src/navbarLinks.json';

const navbarLinks: NavbarLink[] = (navbarData?.links || []) as NavbarLink[];

const config: Config = {
  // Use base defaults
  ...SiteConfig,
  // Add additional configuration
  trailingSlash: false,
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'docs',
          id: 'default'
        },
        theme: {
          customCss: './static/themes/default.css'
        }
      } satisfies Preset.Options
    ]
  ],
  themeConfig: {
    // Merge base theme config
    ...SiteThemeConfig,
    // Add additional theme configuration
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      ...SiteThemeConfig.navbar,
      hideOnScroll: false,
      items: [
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Docs'
        },
        {
          type: 'custom-gitHubLinks',
          position: 'right'
        },
        {
          type: 'custom-versionDisplay',
          position: 'right'
        },
        {
          type: 'custom-themeSwitcher',
          position: 'right'
        },
        // ...auto generated links,
        ...navbarLinks
      ]
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
};

export default config;
