import { MenuItem } from './menu-item.model';

export interface MenuCategory {
  category: string;
  icon?: string;
  items: MenuItem[];
}
