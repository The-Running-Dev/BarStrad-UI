---
id: local-testing-with-act
title: Local Testing with Act
sidebar_position: 7
---

This guide covers how to test GitHub Actions workflows locally using Act, a tool that runs GitHub Actions workflows on your local machine using Docker containers.

## What is Act?

**Act** is a command-line tool that allows you to run GitHub Actions workflows locally. It reads your workflow files and executes them in Docker containers, providing a way to test and debug workflows without pushing to GitHub.

### Benefits of Local Testing

- **Faster Development**: Test workflow changes without committing and pushing
- **Cost Effective**: No GitHub Actions minutes consumed during development
- **Debugging**: Easier to debug issues in a local environment
- **Offline Development**: Work on workflows without internet connectivity
- **Validation**: Ensure workflows work before pushing to production

## Prerequisites

### Required Software

1. **Docker**: Act uses Docker to run workflow steps

   ```bash
   # Install Docker Desktop for Windows
   # Download from: https://docs.docker.com/desktop/windows/
   ```

2. **Act**: The GitHub Actions runner

   ```bash
   # Install using winget (Windows Package Manager)
   winget install nektos.act
   
   # Or using Chocolatey
   choco install act-cli
   
   # Or using Scoop
   scoop install act
   ```

3. **PowerShell**: For running the provided scripts (included with Windows)

### Verification

Verify installations:

```powershell
# Check Docker
docker --version

# Check Act
act --version

# Check PowerShell
$PSVersionTable.PSVersion
```

## Project Setup

The BarStrad-Bot project includes three PowerShell scripts for running workflows locally:

### Available Scripts

| Script | Workflow | Purpose |
|--------|----------|---------|
| `scripts/ci-workflow.ps1` | CI Workflow | Code validation and testing |
| `scripts/release-workflow.ps1` | Release Workflow | Production builds and releases |
| `scripts/docs-workflow.ps1` | Documentation Workflow | Documentation site generation |

### Script Structure

Each script follows the same pattern:

```powershell
Clear-Host

$basePath = Split-Path $PSScriptRoot -Parent

# Define the event and workflow file
$eventType = "push"  # Change to "pull_request", "workflow_dispatch", etc.
$workflow = Join-Path $basePath '.github\workflows\[workflow-name].yml'

# Run the Act command
act -W $workflow $eventType
```

## Running Workflows Locally

### Basic Usage

#### 1. CI Workflow (Code Validation)

```powershell
# Navigate to project root
cd /path/to/your/BarStrad-Bot  # For Unix-like systems
# cd C:\path\to\BarStrad-Bot  # For Windows systems

# Run CI workflow
.\scripts\ci-workflow.ps1
```

**What it does:**

- Validates TypeScript compilation
- Runs build process
- Performs code quality checks
- Executes dry-run builds (no publishing)

#### 2. Release Workflow (Production Build)

```powershell
# Run release workflow
.\scripts\release-workflow.ps1
```

**What it does:**

- Builds production artifacts
- Creates Docker images
- Generates semantic versions
- Simulates release process

#### 3. Documentation Workflow

```powershell
# Run documentation workflow
.\scripts\docs-workflow.ps1
```

**What it does:**

- Builds Docusaurus documentation
- Generates static site
- Simulates GitHub Pages deployment

### Advanced Usage

#### Custom Event Types

Modify the scripts to test different trigger events:

```powershell
# Test pull request event
$eventType = "pull_request"

# Test manual workflow dispatch
$eventType = "workflow_dispatch"

# Test schedule event
$eventType = "schedule"
```

#### Specific Job Testing

Run specific jobs within a workflow:

```powershell
# Run only the build job
act -W .github\workflows\ci.yml -j build push

# Run only the test job
act -W .github\workflows\ci.yml -j test push
```

#### With Environment Variables

```powershell
# Set environment variables
act -W .github\workflows\ci.yml --env NODE_ENV=development push

# Use environment file
act -W .github\workflows\ci.yml --env-file .env.local push
```

## Configuration

### Act Configuration File

Create `.actrc` in project root for consistent settings:

```ini
# .actrc
--container-architecture linux/amd64
--artifact-server-path /tmp/artifacts
--env-file .env.local
--verbose
```

### Environment Variables

Create `.env.local` for local testing (never commit this file):

```env
# .env.local
NODE_ENV=development
DEBUG=true
DISCORD_BOT_TOKEN=test_token_for_local_testing
DISCORD_WEBHOOK_URL=https://httpbin.org/post
```

### Secrets Configuration

For workflows requiring secrets, create `.secrets` file:

```env
# .secrets (add to .gitignore)
REGISTRY_TOKEN=ghp_your_token_here
NOTIFICATIONS_WEBHOOK_URL=https://your-webhook-url
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_WEBHOOK_URL=your_webhook_url
```

Use with Act:

```powershell
act -W .github\workflows\release.yml --secret-file .secrets push
```

## Troubleshooting

### Common Issues

#### 1. Docker Permission Issues

**Problem**: Act fails with Docker permission errors

**Solution**:

```powershell
# Ensure Docker Desktop is running
# Add your user to docker-users group (requires restart)
```

#### 2. Container Architecture Issues

**Problem**: Workflow fails with architecture mismatches

**Solution**:

```powershell
# Force Linux AMD64 architecture
act --container-architecture linux/amd64 -W .github\workflows\ci.yml push
```

#### 3. Missing Secrets

**Problem**: Workflow fails due to missing secrets

**Solution**:

```powershell
# Create .secrets file with required values
act --secret-file .secrets -W .github\workflows\release.yml push
```

#### 4. Network Issues

**Problem**: Cannot pull Docker images or access external resources

**Solution**:

```powershell
# Pre-pull required images
docker pull node:18-alpine
docker pull ghcr.io/the-running-dev/build-agent:latest

# Check Docker network settings
docker network ls
```

### Debugging Workflows

#### Verbose Output

```powershell
# Enable verbose logging
act -v -W .github\workflows\ci.yml push

# Enable debug logging
act --verbose -W .github\workflows\ci.yml push
```

#### Interactive Debugging

```powershell
# Run interactively (stops on failure)
act -W .github\workflows\ci.yml --interactive push

# Bind mount for file inspection
act -W .github\workflows\ci.yml --bind push
```

#### Dry Run Mode

```powershell
# Show what would run without executing
act -n -W .github\workflows\ci.yml push

# List available events
act -l
```

## Workflow-Specific Notes

### CI Workflow

- **Container**: Uses `ghcr.io/the-running-dev/build-agent:latest`
- **Duration**: ~2-3 minutes locally
- **Purpose**: Code validation, no artifacts produced
- **Safe to run**: No external side effects

### Release Workflow

- **Container**: Same as CI workflow
- **Duration**: ~5-10 minutes locally
- **Purpose**: Production build simulation
- **Caution**: May attempt to publish artifacts (disable in local testing)

### Documentation Workflow

- **Container**: Uses Node.js for Docusaurus
- **Duration**: ~3-5 minutes locally
- **Purpose**: Documentation site generation
- **Output**: Static files in `build/` directory

## Best Practices

### Development Workflow

1. **Local Testing First**: Always test workflows locally before pushing
2. **Incremental Changes**: Test small changes frequently
3. **Environment Isolation**: Use separate environment files for local testing
4. **Resource Management**: Clean up Docker containers after testing

### Security Considerations

1. **Never Commit Secrets**: Use `.env.local` and `.secrets` files (add to `.gitignore`)
2. **Test Tokens**: Use dedicated test tokens for local development
3. **Network Isolation**: Be cautious with workflows that make external calls
4. **Resource Limits**: Set Docker resource limits for local testing

### Performance Optimization

1. **Image Caching**: Pre-pull Docker images to speed up runs
2. **Artifact Cleanup**: Regularly clean up local artifacts
3. **Selective Testing**: Run specific jobs instead of entire workflows
4. **Resource Monitoring**: Monitor Docker resource usage

## Script Customization

### Enhanced CI Script

Create an enhanced version of the CI script:

```powershell
# scripts/ci-workflow-enhanced.ps1
param(
    [string]$EventType = "push",
    [switch]$Verbose,
    [switch]$DryRun,
    [string]$Job = $null
)

Clear-Host

$basePath = Split-Path $PSScriptRoot -Parent
$workflow = Join-Path $basePath '.github\workflows\ci.yml'

# Build Act command
$actCommand = "act -W `"$workflow`""

if ($Verbose) { $actCommand += " --verbose" }
if ($DryRun) { $actCommand += " --dryrun" }
if ($Job) { $actCommand += " -j $Job" }

$actCommand += " $EventType"

Write-Host "Running: $actCommand" -ForegroundColor Green
Invoke-Expression $actCommand
```

Usage:

```powershell
# Standard run
.\scripts\ci-workflow-enhanced.ps1

# Verbose dry run
.\scripts\ci-workflow-enhanced.ps1 -Verbose -DryRun

# Run specific job
.\scripts\ci-workflow-enhanced.ps1 -Job build

# Test pull request event
.\scripts\ci-workflow-enhanced.ps1 -EventType pull_request
```

## Integration Tips

### IDE Integration

#### VS Code

Add tasks to `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run CI Workflow (Act)",
            "type": "shell",
            "command": "powershell",
            "args": ["-File", ".\\scripts\\ci-workflow.ps1"],
            "group": "test",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new"
            }
        }
    ]
}
```

#### Terminal Aliases

Add to PowerShell profile:

```powershell
# Add to $PROFILE
function Test-CI { .\scripts\ci-workflow.ps1 }
function Test-Release { .\scripts\release-workflow.ps1 }
function Test-Docs { .\scripts\docs-workflow.ps1 }

Set-Alias -Name ci -Value Test-CI
Set-Alias -Name release -Value Test-Release
Set-Alias -Name docs -Value Test-Docs
```

## Related Documentation

- **[CI Workflow Details](./ci-workflow)** - Complete CI workflow documentation
- **[Release Workflow Details](./release-workflow)** - Production release process
- **[Documentation Workflow](./docs-workflow)** - Documentation deployment
- **[Development Setup](../development/setup)** - Development environment setup

---

**Ready to test locally?** Start with the CI workflow: `.\scripts\ci-workflow.ps1` 🚀
