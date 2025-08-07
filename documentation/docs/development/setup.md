---
id: setup
title: Setup
sidebar_position: 1
---

This guide helps you set up a complete development environment for contributing to BarStrad-UI.

## Prerequisites

Ensure you have the following tools installed:

### Required Tools

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v10 or higher) - [Install](https://pnpm.io/installation)
- **Git** - [Download](https://git-scm.com/)
- **Docker** - [Download](https://docs.docker.com/get-docker/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Recommended VS Code Extensions

- **Angular Language Service** - Angular template support
- **TypeScript and JavaScript Language Features** (built-in)
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Angular Snippets** - Angular code snippets
- **Docker** - Docker container management
- **GitLens** - Enhanced Git capabilities

## Initial Setup

### 1. Fork and Clone Repository

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/BarStrad-UI.git
cd BarStrad-UI

# Add upstream remote for staying in sync
git remote add upstream https://github.com/The-Running-Dev/BarStrad-UI.git
```

### 2. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Or if you prefer yarn
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Discord Bot Configuration
DiscordWebhookUrl=your_development_webhook_url_here

# Environment Settings
NODE_ENV=development
DEBUG=true
```

**Important**: Never commit your `.env` file. It's already in `.gitignore`.

### 4. Discord Development Bot Setup

For development, create a separate Discord bot:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application (e.g., "BarStrad-UI-Dev")
3. Create a bot and copy the token
4. Create a test Discord server for development
5. Invite your development bot to the test server

## Development Workflow

### Starting Development Server

```bash
# Start with hot reload
npm run dev

# Or with yarn
yarn dev
```

This uses `ts-node` to run TypeScript directly with automatic restarts on file changes.

### Code Structure Understanding

```
src/
├── Bot.ts                    # Main bot class - handles Discord events
├── index.ts                  # Application entry point
├── Menu.ts                   # Menu management logic
├── data/                     # Menu data files (JSON)
│   ├── menu-items.bg.json    # Bulgarian menu
│   └── menu-items.en.json    # English menu
├── models/                   # TypeScript interfaces
│   ├── menu-item.model.ts    # Menu item structure
│   ├── menu-category.model.ts # Category structure
│   └── menu-data.model.ts    # Overall menu structure
├── services/                 # Business logic services
│   └── discord-notification.service.ts # Webhook notifications
└── environments/             # Environment configuration
    └── environment.ts        # Environment settings
```

### Development Commands

| Command         | Purpose                                  |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript           |
| `npm run start` | Start production build                   |
| `npm test`      | Run tests (when available)               |

### Code Style and Standards

#### TypeScript Configuration

The project uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "CommonJS",
    "outDir": "./artifacts",
    "rootDir": "./src",
    "strict": true
  }
}
```

#### Coding Standards

1. **TypeScript**: Use strict typing, avoid `any`
2. **Naming**: Use PascalCase for classes, camelCase for variables
3. **Imports**: Use explicit import/export statements
4. **Error Handling**: Always handle errors gracefully
5. **Comments**: Document complex logic and public APIs

#### Example Code Style

```typescript
// Good - Explicit types and error handling
export class Menu {
  private data: MenuData;
  private currentLanguage: string;

  constructor() {
    this.currentLanguage = 'bg';
    this.data = this.loadMenu(this.currentLanguage);
  }

  private loadMenu(language: string): MenuData {
    try {
      const fileContent = fs.readFileSync(
        `data/menu-items.${language}.json`,
        'utf-8'
      );
      return { categories: JSON.parse(fileContent) };
    } catch (error) {
      console.error(`Error loading menu: ${error}`);
      return { categories: [] };
    }
  }
}
```

## Testing Your Changes

### Manual Testing

1. **Start Development Bot**

   ```bash
   npm run dev
   ```

2. **Test Basic Commands** in your Discord test server:

   ```
   !menu
   !menu-en
   !order 1 Test User
   ```

3. **Verify Console Output** for errors or warnings

### Menu Changes Testing

When modifying menu files:

1. **Validate JSON Syntax**:

   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/menu-items.bg.json', 'utf8')))"
   ```

2. **Test Both Languages**:

   ```
   !menu    # Test Bulgarian menu
   !menu-en # Test English menu
   ```

3. **Test Order Numbers**:

   ```
   !order 1 Test
   !order [last_item_number] Test
   ```

### Docker Testing

Test your changes in a containerized environment:

```bash
# Build production version
npm run build

# Build Docker image
docker build -t barstrad-ui-dev .

# Run container with your environment
docker run --env-file .env barstrad-ui-dev
```

### CI/CD Workflow Testing

Test your changes against the actual CI/CD workflows before pushing:

```powershell
# Test CI workflow locally (validates your code)
.\scripts\ci-workflow.ps1
```

This validates your changes using the same environment as the CI/CD pipeline. For detailed instructions, see [Local Testing with Act](../ci-cd/local-testing-with-act).

## Making Changes

### Feature Development Process

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow existing code patterns
   - Add appropriate error handling
   - Update documentation if needed

3. **Test Thoroughly**
   - Test all affected commands
   - Verify no regressions
   - Test edge cases

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

5. **Push and Create PR**

   ```bash
   git push origin feature/your-feature-name
   ```

### Common Development Tasks

#### Adding New Commands

1. **Update Bot.ts** - Add new command handler in `messageCreate` event
2. **Add Logic** - Create appropriate service methods
3. **Update Documentation** - Add command to documentation
4. **Test Thoroughly** - Verify command works as expected

#### Modifying Menu System

1. **Update Models** - Modify TypeScript interfaces if needed
2. **Update Menu.ts** - Modify menu loading/display logic
3. **Update Menu Files** - Modify JSON menu data
4. **Test Both Languages** - Ensure consistency

#### Adding New Services

1. **Create Service File** - Add new file in `src/services/`
2. **Define Interface** - Create TypeScript interfaces
3. **Integrate Service** - Connect to main Bot class
4. **Add Error Handling** - Handle service failures gracefully

## Debugging

### Console Debugging

The bot provides detailed console logging:

```typescript
console.log(`✅ Logged in as ${this.client.user?.tag}`);
console.error('❌ No Bot Token Found in .env File!');
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug BarStrad-UI",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/index.ts",
      "outFiles": ["${workspaceFolder}/artifacts/**/*.js"],
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

### Common Debug Scenarios

1. **Bot Not Connecting**: Check Discord token and internet connection
2. **Commands Not Working**: Verify bot permissions and command syntax
3. **Menu Not Loading**: Check JSON syntax and file paths
4. **Webhooks Failing**: Verify webhook URL and permissions

## Contributing Guidelines

### Before Submitting a PR

1. **Code Review Checklist**:
   - [ ] Code follows project style guidelines
   - [ ] All new code has appropriate error handling
   - [ ] Changes are tested manually
   - [ ] Documentation is updated if needed
   - [ ] No console errors or warnings

2. **PR Description Should Include**:
   - Clear description of changes
   - Steps to test the changes
   - Screenshots if UI-related
   - Related issue references

### Code Review Process

1. **Automated Checks**: CI workflow runs automatically
2. **Manual Review**: Maintainers review code and functionality
3. **Testing**: Changes tested in development environment
4. **Merge**: Approved changes merged to main branch
5. **Deployment**: Release workflow deploys to production

## Staying in Sync

### Syncing with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### Resolving Conflicts

```bash
# If conflicts occur during merge
git status                    # See conflicted files
# Edit files to resolve conflicts
git add .                     # Stage resolved files
git commit                    # Complete merge
```

## Development Resources

### Documentation

- **[Discord.js Guide](https://discordjs.guide/)** - Discord bot development
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript language guide
- **[Node.js Documentation](https://nodejs.org/docs/)** - Node.js API reference

### Tools

- **[JSON Validator](https://jsonlint.com/)** - Validate menu JSON files
- **[Discord Developer Portal](https://discord.com/developers/applications)** - Manage Discord apps
- **[GitHub CLI](https://cli.github.com/)** - Command-line GitHub operations

---

**Ready to contribute?** Check out our [open issues](https://github.com/The-Running-Dev/BarStrad-UI/issues) or suggest new features!
