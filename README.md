# BarStrad-UI

[![CI](https://github.com/The-Running-Dev/BarStrad-UI/actions/workflows/ci.yml/badge.svg)](https://github.com/The-Running-Dev/BarStrad-UI/actions/workflows/ci.yml)
[![Release](https://github.com/The-Running-Dev/BarStrad-UI/actions/workflows/release.yml/badge.svg)](https://github.com/The-Running-Dev/BarStrad-UI/actions/workflows/release.yml)
[![Docs](https://github.com/The-Running-Dev/BarStrad-UI/actions/workflows/docs.yml/badge.svg)](https://github.com/The-Running-Dev/BarStrad-UI/actions/workflows/docs.yml)
[![Docker](https://img.shields.io/badge/docker-ghcr.io-blue?logo=docker&logoColor=white)](https://github.com/The-Running-Dev/BarStrad-UI/pkgs/container/barstrad-ui)
[![Live Demo](https://img.shields.io/badge/demo-barstrad.com-green?logo=angular&logoColor=white)](https://barstrad.com)

A modern Angular-based bar menu application with multi-language support, theme customization, and Discord notifications.

## 🚀 Overview

BarStrad is an interactive bar menu application built with Angular 19 that allows customers to browse menu items, place orders, and interact with the establishment. The application features a responsive design, internationalization support, and real-time notifications.

## ✨ Features

- **Multi-language Support**: Built-in internationalization with English and Bulgarian translations
- **Theme Customization**: Light and dark theme options with user preference storage
- **Interactive Menu**: Browse menu items by categories with search functionality
- **Table Service**: Table number integration for order management
- **Discord Integration**: Real-time notifications sent to Discord webhooks
- **Responsive Design**: Optimized for both desktop and mobile devices
- **PWA Ready**: Progressive Web App capabilities for mobile installation

## 🌐 Live Demo

Experience BarStrad-UI in action at **[https://barstrad.com](https://barstrad.com)**

Try out all the features including:

- Language switching between English and Bulgarian
- Light/dark theme toggling
- Interactive menu browsing and search
- Responsive design across different devices

## 🛠 Tech Stack

- **Framework**: Angular 19.1.0
- **UI Library**: Angular Material 19.1.3
- **Icons**: FontAwesome 6.7.2
- **Internationalization**: ngx-translate 16.0.4
- **HTTP Client**: Axios 1.7.9
- **Styling**: CSS with Angular Material theming
- **Build Tool**: Angular CLI 19.1.5

## 📁 Project Structure

```text
src/
├── components/
│   ├── app/                 # Main application component
│   └── settings/           # Settings component
├── services/
│   ├── discord-notifications.service.ts  # Discord webhook integration
│   ├── language.service.ts              # Internationalization service
│   ├── menu.service.ts                  # Menu data management
│   ├── storage.service.ts               # Local storage utilities
│   ├── table.service.ts                 # Table management
│   ├── theme.service.ts                 # Theme switching
│   └── user-preferences.service.ts      # User preference storage
├── models/
│   ├── menu-category.model.ts           # Menu category data model
│   └── menu-item.model.ts               # Menu item data model
├── assets/
│   ├── i18n/                           # Translation files
│   ├── flags/                          # Country flag icons
│   └── menu-items.json                 # Menu data
└── environments/
    └── environment.ts                   # Environment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd BarStrad-UI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development Server

To start a local development server, run:

```bash
npm start
```

Or use the Angular CLI directly:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Environment Setup

The project uses environment-specific configuration. To set up your environment:

1. Configure your environment variables in `src/environments/environment.ts`
2. Set up Discord webhook URL for notifications (optional)
3. Run the pre-start script to initialize environment:

   ```bash
   npm run prestart:dev
   ```

## 🏗 Building

The project includes a comprehensive PowerShell build script (`build.ps1`) that handles the entire build process with proper validation and error handling.

### Using the Build Script (Recommended)

**Development Build:**

```pwsh
.\build.ps1
```

**Production Build:**

```pwsh
.\build.ps1 -Production
```

**Build without Docker:**

```pwsh
.\build.ps1 -SkipDocker
```

**Skip Tests and Linting:**

```pwsh
.\build.ps1 -SkipTests
```

The build script automatically:

- Validates environment (Node.js, npm, Angular CLI, Docker)
- Sets up environment variables
- Installs/updates dependencies
- Runs code quality checks (linting and tests)
- Builds the Angular application
- Creates Docker container image
- Provides detailed build summary and next steps

### Manual Build Commands

If you prefer to run individual build steps manually:

**Development Build:**

```bash
npm run build
```

**Production Build:**

```bash
npm run build:prod
```

This will compile your project and store the build artifacts in the `artifacts/` directory. The production build optimizes your application for performance and speed.

### Watch Mode

For continuous development with automatic rebuilds:

```bash
npm run watch
```

## 🧪 Testing

### Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner:

```bash
npm test
```

### Linting

To run ESLint for code quality checks:

```bash
npm run lint
```

## 🐳 Docker Deployment

The application includes Docker configuration for easy deployment:

### Build Docker Image

```bash
docker build -t barstrad-ui .
```

### Run with Docker Compose

```bash
docker-compose up
```

The application will be available at `http://localhost:80`.

## 🌐 Internationalization

The application supports multiple languages through ngx-translate:

- **English** (default)
- **Bulgarian**

Translation files are located in `src/assets/i18n/`. To add a new language:

1. Create new translation files in the `i18n` directory
2. Update the language service configuration
3. Add corresponding flag icons in `src/assets/flags/`

## 🎨 Theming

The application supports light and dark themes using Angular Material theming. Users can switch between themes, and their preference is stored locally.

## 📱 Mobile Support

The application is fully responsive and includes:

- Mobile-optimized layouts
- Touch-friendly interfaces
- Progressive Web App capabilities

## 🔧 Configuration

### Environment Variables

- `DiscordWebhookUrl`: Discord webhook URL for notifications
- `NODE_ENV`: Environment mode (development/production)

### Menu Data

Menu items and categories are configured in `src/assets/menu-items.json` and support multiple languages.

## 🔄 Running Workflows Locally with `act`

To test GitHub Actions workflows locally, you can use a tool called `act`. This tool allows you to run your GitHub Actions workflows on your local machine.

### Act Prerequisites

1. **Install `act`**:
   - On macOS, you can use Homebrew:

     ```sh
     brew install act
     ```

   - On Windows, you can use Scoop:

     ```sh
     winget install nektos.act
     ```

   - Alternatively, you can download the binary from the [act releases page](https://github.com/nektos/act/releases).

2. **Configure `act`**:
   - Create a `.secrets` file in the root of your repository to store any secrets required by your workflows. For example:

     ```sh
     GITHUBPACKAGESTOKEN=<your_github_token>
     DISCORDWEBHOOKURL=<your_discord_webhook_url>
     ```

### Running the Workflows

**Build the Agent: in the root of the repository**:

```pwsh
.\workflows\build-agent-container.ps1
```

**Build the Bot: in the root of the repository**:

```pwsh
.\workflows\build-bot-container.ps1
```

**Build the UI: In the root of the repository**:

```pwsh
.\workflows\build-ui-container.ps1
```

**Deploy the UI: In the root of the repository**:

```pwsh
.\workflows\deploy-ui.ps1
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team.

---

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
