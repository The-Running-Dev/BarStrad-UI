---
id: overview
title: Overview
sidebar_position: 1
---

BarStrad-UI is designed to be highly configurable to meet the needs of different restaurants, bars, and food service establishments. This section covers all configuration options available for the Angular application.

## Configuration Types

### Environment Configuration

Controls runtime behavior, API endpoints, and external service integration:

- **Environment Variables** - Configure Discord webhooks, API endpoints, and runtime settings in your environment files
- **Build Configuration** - Angular build settings, optimization, and deployment options

### Menu Configuration

Defines the menu structure, items, and display formatting:

- **[Menu Setup](./menu-setup)** - Menu structure, categories, and items in JSON format
- **Multilingual Support** - Translation files and internationalization setup
- **Theme Customization** - Colors, styling, and Angular Material themes

### Application Configuration

Controls Angular application behavior, features, and user experience:

- **PWA Configuration** - Progressive Web App settings and service worker
- **Routing Configuration** - Angular routing and navigation setup
- **Service Configuration** - Angular services and dependency injection
- **[Deployment Guide](../ci-cd/deployment-guide)** - Production deployment procedures

## Quick Configuration Checklist

When setting up BarStrad-UI, follow this checklist:

### ✅ **Essential Setup**

1. **Discord Bot Token** - Create and configure Discord application
2. **Environment Variables** - Set up `.env` file with required variables
3. **Menu Files** - Configure `menu-items.bg.json` and `menu-items.en.json`
4. **Discord Webhook** - Set up order notification webhook (optional)

### ✅ **Advanced Setup**

1. **Custom Menu Categories** - Add your own drink/food categories
2. **Pricing Configuration** - Set your local currency and pricing format
3. **Icon Customization** - Use custom emojis for menu items
4. **Multi-language Support** - Add additional language files

### ✅ **Production Setup**

1. **Environment Variables** - Configure production environment settings
2. **Docker Configuration** - Set up containerized deployment
3. **CI/CD Pipeline** - Configure automated deployment
4. **Monitoring Setup** - Configure logging and error tracking

## Configuration File Locations

```
BarStrad-Bot/
├── .env                          # Environment variables (create this)
├── src/data/
│   ├── menu-items.bg.json       # Bulgarian menu configuration
│   └── menu-items.en.json       # English menu configuration
├── src/environments/
│   └── environment.ts           # Environment configuration logic
├── package.json                 # Node.js dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── docker-compose.yml          # Docker deployment configuration
├── Dockerfile                  # Container build configuration
└── GitVersion.yml             # Semantic versioning configuration
```

## Default Configuration

BarStrad-Bot comes with sensible defaults:

### Default Environment

```typescript
export const environment = {
  production: process.env['NODE_ENV'] === 'production'
};
```

The Discord webhook for order notifications is not part of the environment: everything here ships
to the browser. It is the container's runtime variable `DiscordWebhookUrl`, which nginx uses to
forward `POST /api/notify` (`nginx/templates/default.conf.template`).

### Default Menu Structure

- **Categories**: Shots, Gin, Whisky, Vodka, Rum, etc.
- **Items**: Name, price, and emoji icon
- **Numbering**: Auto-numbered items starting from 1
- **Languages**: Bulgarian (bg) and English (en)

### Default Docker Configuration

- **Base Image**: `node:alpine` for minimal footprint
- **Working Directory**: `/usr/src/app`
- **Port**: Not exposed (Discord bot doesn't need ports)
- **Environment**: Production optimized

## Configuration Best Practices

### Security Best Practices

1. **Never commit secrets** - Keep tokens and webhooks in `.env` files
2. **Use environment variables** - Don't hardcode sensitive values
3. **Rotate tokens regularly** - Update Discord bot tokens periodically
4. **Limit permissions** - Grant minimal required Discord permissions

### Menu Configuration Best Practices

1. **Consistent formatting** - Use consistent price formats and icons
2. **Clear categories** - Group similar items logically
3. **Descriptive names** - Use clear, descriptive item names
4. **Regular updates** - Keep menu items current and accurate

### Development Best Practices

1. **Separate environments** - Use different configurations for dev/staging/prod
2. **Version control** - Track configuration changes in git
3. **Documentation** - Document custom configuration changes
4. **Testing** - Test configuration changes thoroughly

## Common Configuration Scenarios

### Restaurant Setup

For a full-service restaurant:

```json
{
  "category": "Main Courses",
  "icon": "🍽️",
  "items": [
    { "name": "Grilled Salmon", "price": "25.00 лв.", "icon": "🐟" },
    { "name": "Beef Steak", "price": "30.00 лв.", "icon": "🥩" }
  ]
}
```

### Bar Setup

For a cocktail bar:

```json
{
  "category": "Cocktails",
  "icon": "🍹",
  "items": [
    { "name": "Mojito", "price": "12.00 лв.", "icon": "🍹" },
    { "name": "Old Fashioned", "price": "15.00 лв.", "icon": "🥃" }
  ]
}
```

### Café Setup

For a coffee shop:

```json
{
  "category": "Coffee",
  "icon": "☕",
  "items": [
    { "name": "Espresso", "price": "3.00 лв.", "icon": "☕" },
    { "name": "Cappuccino", "price": "4.50 лв.", "icon": "☕" }
  ]
}
```

## Configuration Validation

The bot performs automatic validation:

### Environment Validation

- **Required tokens**: Validates Discord bot token presence
- **Webhook URLs**: Validates webhook URL format (if provided)
- **Environment detection**: Automatically detects development vs production

### Menu Validation

- **JSON syntax**: Validates menu file JSON syntax
- **Required fields**: Ensures all required fields are present
- **File accessibility**: Checks if menu files can be read

### Runtime Validation

- **Discord connection**: Validates bot can connect to Discord
- **Webhook connectivity**: Tests webhook endpoints (if configured)
- **Command processing**: Validates command parsing and response

## Troubleshooting Configuration

### Common Issues

1. **Bot not starting**: Check environment variables and Discord token
2. **Menu not loading**: Verify JSON syntax in menu files
3. **Orders not working**: Check webhook URL and permissions
4. **Build failures**: Review TypeScript and Docker configuration

### Debug Configuration

Enable debug logging by setting:

```env
NODE_ENV=development
DEBUG=true
```

### Configuration Testing

Test your configuration:

```bash
# Test environment variables
npm run dev

# Test menu loading
node -e "console.log(require('./src/data/menu-items.bg.json'))"

# Test Docker configuration
docker-compose config
```

---

**Ready to configure your application?** Start with [Menu Setup](./menu-setup) to configure your menu items.
