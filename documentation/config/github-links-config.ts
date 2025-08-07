/**
 * GitHub Links Configuration
 * Configure the GitHub-related links displayed in the navbar
 */
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export interface GitHubLink {
  /** URL for the link */
  href: string;
  /** Display label for the link */
  label: string;
  /** Position in navbar (usually 'right') */
  position?: 'left' | 'right';
  /** Whether to open in new tab */
  target?: '_blank' | '_self';
  /** Tooltip text on hover */
  title?: string;
  /** Custom CSS class for styling */
  className?: string;
  /** FontAwesome icon definition */
  icon?: IconDefinition;
}

export class GitHubLinksConfig {
  /** Whether to show the GitHub links */
  static enabled: boolean = true;

  /** Array of GitHub-related links */
  static links: GitHubLink[] = [
    {
      href: 'https://github.com/The-Running-Dev/BarStrad-UI',
      label: 'GitHub',
      position: 'right',
      title: 'Source code on GitHub',
      icon: faGithub
    },
    {
      href: 'https://github.com/The-Running-Dev/BarStrad-UI/releases',
      label: 'Releases',
      position: 'right',
      title: 'Releases and changelog',
      icon: faTag
    },
    {
      href: 'https://ghcr.io/the-running-dev/barstrad-ui',
      label: 'Container Registry',
      position: 'right',
      title: 'Containers',
      icon: faDocker
    }
  ];

  /** Whether to show as dropdown menu */
  static dropdown?: boolean = false;

  /** Custom CSS class for the container */
  static className?: string = undefined;

  /** Dropdown label (only used if dropdown is true) */
  static dropdownLabel?: string = 'GitHub';

  /** Whether to show icons alongside labels */
  static showIcons?: boolean = true;
}
