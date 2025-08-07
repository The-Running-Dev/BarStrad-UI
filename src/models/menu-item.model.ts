// src/app/models/menu-item.model.ts

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  icon?: string;
  category: string;
  items: MenuItem[];
}
