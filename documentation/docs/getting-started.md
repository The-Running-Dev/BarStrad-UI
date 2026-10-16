---
id: getting-started
title: Getting Started
sidebar_position: 2
---

This guide will help you get BarStrad-UI up and running in minutes.

## 🌐 Try it Live

Before setting up locally, you can experience BarStrad-UI live at **[https://barstrad.com](https://barstrad.com)** to see all features in action.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (v10 or higher) - preferred package manager
- **Docker** (for containerized deployment)
- **Git** (for version control)

## Installation Methods

Choose the installation method that best fits your needs:

### 🚀 Quick Start with Docker (Recommended)

The fastest way to get started is using our pre-built Docker image:

1. **Pull and run the container**

   ```bash
   docker run -p 80:80 ghcr.io/the-running-dev/barstrad-ui:latest
   ```

2. **Open your browser**

   Navigate to [http://localhost](http://localhost) to see the application.

### 🛠 Development Setup

For development and customization:

1. **Clone the repository**

   ```bash
   git clone https://github.com/The-Running-Dev/BarStrad-UI.git
   cd BarStrad-UI
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create environment files for development:

   ```bash
   # Create environment files
   cp src/environments/environment.ts.example src/environments/environment.ts
   cp src/environments/environment.prod.ts.example src/environments/environment.prod.ts
   ```

   The Discord webhook URL does not go in the environment files: everything there ships to the
   browser. See *Discord Webhook Setup* below.

4. **Start the development server**

   ```bash
   pnpm start
   ```

5. **Open your browser**

   Navigate to [http://localhost:4200](http://localhost:4200) to see the application.

### 🏗️ Build for Production

To build the application for production deployment:

1. **Build the application**

   ```bash
   pnpm run build:prod
   ```

2. **Serve the built files**

   The built files will be in the `artifacts/browser` directory. You can serve them with any web server:

   ```bash
   # Using a simple HTTP server
   npx http-server artifacts/browser -p 8080
   ```

### 🐳 Build Docker Image

To build your own Docker image:

1. **Build the image**

   ```bash
   docker build -t barstrad-ui .
   ```

2. **Run the container**

   ```bash
   docker run -p 80:80 barstrad-ui
   ```

## Configuration

### Menu Customization

The application uses a JSON file for menu data. You can customize the menu by editing:

```json
// src/assets/menu-items.json
{
  "categories": [
    {
      "name": "Shots",
      "name_bg": "Шотове",
      "items": [
        {
          "name": "Tequila Jose Cuervo Silver 30ml",
          "name_bg": "Текила Jose Cuervo Silver 30мл",
          "price": 4.0
        }
      ]
    }
  ]
}
```

### Language Configuration

The application supports multiple languages through translation files:

- `src/assets/i18n/en.json` - English translations
- `src/assets/i18n/bg.json` - Bulgarian translations

### Discord Webhook Setup (Optional)

For order notifications:

1. Create a Discord webhook in your server
2. Copy the webhook URL
3. Pass it to the container at runtime:

```bash
docker run -p 8080:80 -e DiscordWebhookUrl='https://discord.com/api/webhooks/<id>/<token>' ghcr.io/the-running-dev/barstrad-ui:latest
```

The browser posts orders to `/api/notify` on the same server, and nginx forwards them to the
webhook. The webhook URL is a credential (anyone holding it can post to the channel), so it is
never part of the build or the browser bundle. Without it, `/api/notify` answers `503`.

## Verification

After setup, verify your application:

1. **Check the application loads**

   Navigate to [http://localhost:4200](http://localhost:4200) and verify the menu displays.

2. **Test language switching**

   Click the language flags to switch between English and Bulgarian.

3. **Test theme switching**

   Use the theme toggle to switch between light and dark themes.

4. **Test order functionality**

   Try placing a test order and check for Discord notifications (if configured).

## Next Steps

Now that your application is running, here are the recommended next steps:

### 🎨 **Customization**

- **[Customize the menu](./configuration/menu-setup)** - Add your own items and categories to match your establishment
- **Configure branding** - Update colors, logos, and styling to match your brand
- **Explore advanced features** - Check out theme customization and PWA features

### 🚀 **Deployment & Development**

- **[Set up production deployment](./ci-cd/deployment-guide)** - Deploy to production environment
- **[Configure the application](./configuration/overview)** - Advanced application configuration options
- **[Set up development environment](./development/setup)** - If you want to contribute or customize further

## Common Setup Issues

### Application Not Loading

- **Check configuration**: Ensure your environment variables are set correctly
- **Check port conflicts**: Verify port 4200 (development) or 80 (Docker) is available
- **Check console logs**: Look at the browser console for error messages

### Orders Not Working

- **Check webhook URL**: Ensure the Discord webhook URL is correct and valid
- **Check channel permissions**: Verify the webhook has permissions to send messages
- **Check network connectivity**: Ensure your application can reach Discord's servers

### Build Issues

- **Node.js version**: Ensure you're using Node.js v20 or higher
- **Dependencies**: Try deleting `node_modules` and running `pnpm install` again
- **TypeScript errors**: Check for syntax errors in any modified files
- **Memory issues**: Increase Node.js memory limit if builds fail: `NODE_OPTIONS="--max-old-space-size=4096"`

Need more help? [Open an Issue](https://github.com/The-Running-Dev/BarStrad-UI/issues).
