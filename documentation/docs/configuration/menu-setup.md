---
id: menu-setup
title: Menu Setup
sidebar_position: 2
---

The menu system is the heart of BarStrad-UI. This guide covers how to configure, customize, and manage your menu files in the Angular application.

## Menu File Structure

BarStrad-UI uses JSON files to store menu data with multilingual support:

- `src/assets/menu-items.json` - Main menu structure
- `src/assets/menu-items.bg.json` - Bulgarian menu data
- `src/assets/i18n/menu-categories.en.json` - English category translations
- `src/assets/i18n/menu-categories.bg.json` - Bulgarian category translations

## Basic Menu Structure

The main menu file follows this structure:

```json
{
  "categories": [
    {
      "id": "shots",
      "name": "Shots",
      "name_bg": "Шотове",
      "icon": "🍸",
      "items": [
        {
          "id": "tequila-silver",
          "name": "Tequila Jose Cuervo Silver 30ml",
          "name_bg": "Текила Jose Cuervo Silver 30мл",
          "price": 4.00,
          "currency": "лв.",
          "icon": "🍸"
        }
      ]
    }
  ]
}
```

### Field Descriptions

#### Category Object

- **`id`** (string, required): Unique identifier for the category
- **`name`** (string, required): English display name for the category
- **`name_bg`** (string, required): Bulgarian display name for the category
- **`icon`** (string, required): Emoji icon for the category
- **`items`** (array, required): Array of menu items in this category

#### Item Object

- **`id`** (string, required): Unique identifier for the item
- **`name`** (string, required): English display name for the item
- **`name_bg`** (string, required): Bulgarian display name for the item
- **`price`** (number, required): Numeric price value
- **`currency`** (string, required): Currency symbol or abbreviation
- **`icon`** (string, required): Emoji icon for the item

## Example Menu Configurations

### Bulgarian Menu Example

```json
[
  {
    "category": "Шотове",
    "icon": "🍸",
    "items": [
      { "name": "Текила Jose Cuervo Silver 30мл", "price": "4.00 лв.", "icon": "🍸" },
      { "name": "Текила Jose Cuervo Gold 30мл", "price": "4.50 лв.", "icon": "🍸" },
      { "name": "Aftershock 30мл", "price": "4.00 лв.", "icon": "🍸" },
      { "name": "Jagermeister 30мл", "price": "4.00 лв.", "icon": "🍸" }
    ]
  },
  {
    "category": "Джин",
    "icon": "🍸",
    "items": [
      { "name": "Tanqueray 50мл", "price": "6.00 лв.", "icon": "🍸" },
      { "name": "Bombay Sapphire 50мл", "price": "6.50 лв.", "icon": "🍸" },
      { "name": "Hendrick's 50мл", "price": "8.00 лв.", "icon": "🍸" }
    ]
  }
]
```

### English Menu Example

```json
[
  {
    "category": "Shots",
    "icon": "🥃",
    "items": [
      { "name": "Tequila Jose Cuervo Silver 30ml", "price": "4.00 лв.", "icon": "🥃" },
      { "name": "Tequila Jose Cuervo Gold 30ml", "price": "4.50 лв.", "icon": "🥃" },
      { "name": "Aftershock 30ml", "price": "4.00 лв.", "icon": "🥃" },
      { "name": "Jagermeister 30ml", "price": "4.00 лв.", "icon": "🥃" }
    ]
  },
  {
    "category": "Gin",
    "icon": "🍸",
    "items": [
      { "name": "Tanqueray 50ml", "price": "6.00 лв.", "icon": "🍸" },
      { "name": "Bombay Sapphire 50ml", "price": "6.50 лв.", "icon": "🍸" },
      { "name": "Hendrick's 50ml", "price": "8.00 лв.", "icon": "🍸" }
    ]
  }
]
```

## Menu Categories

### Common Bar Categories

Here are typical categories for bars and their suggested icons:

| Category (EN) | Category (BG) | Icon | Description |
|---------------|---------------|------|-------------|
| Shots | Шотове | 🥃 | Shot drinks |
| Gin | Джин | 🍸 | Gin-based drinks |
| Whisky | Уиски | 🥃 | Whisky varieties |
| Vodka | Водка | 🍸 | Vodka drinks |
| Rum | Ром | 🍹 | Rum-based drinks |
| Cocktails | Коктейли | 🍹 | Mixed cocktails |
| Beer | Бира | 🍺 | Beer selection |
| Wine | Вино | 🍷 | Wine selection |
| Non-Alcoholic | Безалкохолно | 🥤 | Soft drinks |

### Restaurant Categories

For restaurants, consider these categories:

| Category (EN) | Category (BG) | Icon | Description |
|---------------|---------------|------|-------------|
| Appetizers | Предястия | 🥗 | Starter dishes |
| Main Courses | Основни ястия | 🍽️ | Main dishes |
| Desserts | Десерти | 🍰 | Sweet treats |
| Soups | Супи | 🍲 | Soup varieties |
| Salads | Салати | 🥗 | Fresh salads |
| Pizza | Пица | 🍕 | Pizza options |
| Pasta | Паста | 🍝 | Pasta dishes |
| Seafood | Морски деликатеси | 🐟 | Fish and seafood |

## Item Naming Conventions

### Best Practices

1. **Be Descriptive**: Include key details like size, ingredients, or preparation method
2. **Include Size**: Specify volume (ml, cl) or weight (g, kg) where relevant
3. **Brand Names**: Include brand names for premium products
4. **Consistency**: Use consistent formatting across all items

### Good Examples

```json
{ "name": "Tanqueray Gin 50ml", "price": "6.00 лв.", "icon": "🍸" }
{ "name": "Grilled Salmon with Lemon", "price": "25.00 лв.", "icon": "🐟" }
{ "name": "Cappuccino (Large)", "price": "4.50 лв.", "icon": "☕" }
```

### Avoid These

```json
{ "name": "Gin", "price": "6.00 лв.", "icon": "🍸" }          // Too vague
{ "name": "Fish", "price": "25.00 лв.", "icon": "🐟" }        // Not descriptive
{ "name": "Coffee", "price": "4.50 лв.", "icon": "☕" }       // Missing size
```

## Price Formatting

### Currency and Format

The current examples use Bulgarian Lev (лв.) format:

```json
"price": "4.00 лв."
```

### For Other Currencies

You can adapt the format for your currency:

```json
// USD
"price": "$4.00"

// EUR
"price": "4.00 €"

// GBP
"price": "£3.50"

// Turkish Lira
"price": "45.00 ₺"
```

### Price Range Examples

```json
// Standard pricing
"price": "5.00 лв."

// Premium pricing
"price": "12.50 лв."

// Budget pricing
"price": "2.50 лв."

// Market price (variable)
"price": "Market Price"

// Special offers
"price": "4.00 лв. (Special)"
```

## Icon Selection

### Emoji Guidelines

1. **Relevant**: Choose icons that represent the item or category
2. **Consistent**: Use similar styles within categories
3. **Clear**: Ensure icons display well on all devices
4. **Professional**: Avoid overly playful icons for serious establishments

### Recommended Icons by Category

**Alcoholic Drinks**:

- 🍸 Cocktails, Gin, Martinis
- 🥃 Whisky, Shots, Spirits
- 🍹 Tropical drinks, Rum cocktails
- 🍺 Beer, Lager
- 🍷 Wine, Champagne
- 🥂 Sparkling drinks, Celebrations

**Food Items**:

- 🍽️ Main courses, Complete meals
- 🥗 Salads, Appetizers
- 🍲 Soups, Stews
- 🍕 Pizza
- 🍝 Pasta
- 🐟 Seafood, Fish
- 🥩 Meat dishes
- 🍰 Desserts
- ☕ Coffee, Hot drinks

**Non-Alcoholic**:

- 🥤 Soft drinks, Sodas
- 🧃 Juices
- 🥛 Milk-based drinks
- 🫖 Tea
- ☕ Coffee

## Menu Validation

### JSON Syntax Validation

Ensure your JSON is valid:

```bash
# Check JSON syntax
node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/menu-items.bg.json', 'utf8')))"
```

### Required Fields Validation

Each menu item must have:

- `category` (string)
- `icon` (string)
- `items` (array)

Each item must have:

- `name` (string)
- `price` (string)
- `icon` (string)

### Common Validation Errors

1. **Missing Commas**: JSON requires commas between objects and properties
2. **Trailing Commas**: JSON doesn't allow trailing commas
3. **Quote Consistency**: Use double quotes, not single quotes
4. **Escape Characters**: Properly escape special characters

## Menu Management Tips

### Adding New Items

1. **Choose appropriate category** or create a new one
2. **Follow naming conventions** established in your menu
3. **Use consistent price formatting**
4. **Select appropriate icon**
5. **Test the changes** with `!menu` command

### Updating Prices

1. **Update both language files** to maintain consistency
2. **Use find-and-replace** for bulk price updates
3. **Test after updates** to ensure proper display

### Seasonal Menus

Consider creating seasonal variations:

```bash
# Backup current menu
cp src/data/menu-items.bg.json src/data/menu-items.bg.backup.json

# Create seasonal version
cp src/data/menu-items.bg.summer.json src/data/menu-items.bg.json
```

### Menu Analytics

Track popular items by monitoring order patterns:

- Most frequently ordered items
- Peak ordering times
- Category popularity
- Customer preferences

## Troubleshooting Menu Issues

### Menu Not Loading

1. **Check JSON syntax** using online JSON validators
2. **Verify file paths** are correct
3. **Check file permissions** (readable by the application)
4. **Review console logs** for specific error messages

### Items Not Displaying

1. **Verify required fields** are present
2. **Check for special characters** that might break parsing
3. **Ensure consistent structure** across all categories

### Order Numbers Wrong

The bot auto-numbers items sequentially. If numbering seems off:

1. **Check item order** in the JSON file
2. **Verify no missing items** between categories
3. **Restart the bot** to reload menu data

---

**Need help with setup?** See the [Configuration Overview](./overview) for more configuration options.
