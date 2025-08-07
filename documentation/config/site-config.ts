import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as path from 'path';

export const PreBuildConfig = {
  ProjectRoot: path.join(__dirname, '../../'),
  OverwriteExistingFiles: true,
  DefaultTheme: 'sunset'
};

// Base configuration with only the essential defaults
export const SiteConfig = {
  title: 'BarStrad UI',
  tagline: 'BarStrad UI Documentation',
  url: 'https://the-running-dev.github.io',
  baseUrl: '/BarStrad-UI',
  organizationName: 'The-Running-Dev',
  projectName: 'BarStrad-UI'
} as const;

export const SiteThemeConfig = {
  navbar: {
    title: 'BarStrad UI',
    logo: {
      alt: 'BarStrad Logo',
      src: 'img/logo.svg'
    }
  }
} as const;

// For backward compatibility
export const config: Config = {
  ...SiteConfig,
  themeConfig: SiteThemeConfig satisfies Preset.ThemeConfig
};

export default config;
