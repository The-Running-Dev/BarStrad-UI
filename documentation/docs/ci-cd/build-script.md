---
id: build-script
title: Production Build Script
sidebar_position: 7
---

The `build.ps1` script provides a complete production build process for BarStrad-UI using containerized build agents to ensure consistent environments.

## Overview

This PowerShell script automates the entire build pipeline:

- ✅ **Pre-build validation** - Docker availability, build agent access
- ✅ **Angular build** - Compiles TypeScript and builds Angular application
- ✅ **Dependency installation** - Installs Node.js packages
- ✅ **Docker image creation** - Builds deployable container with nginx
- ✅ **Build verification** - Confirms successful artifact creation
- ✅ **Post-build guidance** - Next steps and deployment info

## Prerequisites

### System Requirements

- **PowerShell 5.1+** or **PowerShell 7+**
- **Docker Desktop** installed and running
- **Internet connectivity** for build agent container

### Docker Configuration

Ensure Docker daemon is accessible:

```powershell
# Verify Docker is working
docker --version
docker info
```

## Usage

### Basic Build

```powershell
# Run from project root directory
.\build.ps1
```

### Build Process Steps

1. **🔍 Pre-build Validation**
   - Checks Docker availability
   - Verifies Docker daemon is running
   - Pulls latest build agent container

2. **📦 Node.js in Docker Build**
   - Mounts workspace to build container
   - Compiles TypeScript to JavaScript
   - Installs production dependencies
   - Creates Docker image for deployment

3. **✅ Build Verification**
   - Confirms Docker image was created
   - Validates build artifacts exist
   - Reports build status

4. **📋 Post-build Information**
   - Lists next steps for testing/deployment
   - Provides documentation links
   - Shows available commands

## Build Artifacts

The script produces several artifacts:

| Artifact | Location | Description |
|----------|----------|-------------|
| **Compiled JS** | `./artifacts/` | TypeScript compiled to JavaScript |
| **Docker Image** | Local registry | `barstrad-bot` container image |
| **Dependencies** | `./node_modules/` | Production Node.js packages |

## Build Agent Container

The script uses `ghcr.io/the-running-dev/build-agent:latest` which includes:

- **Node.js runtime** with npm/yarn
- **TypeScript compiler** and build tools
- **Docker client** for image building
- **Build scripts** optimized for this project

## Error Handling

The script includes comprehensive error handling:

### Common Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| **Docker not running** | "Docker daemon not accessible" | Start Docker Desktop |
| **Build agent unavailable** | "Failed to pull build agent" | Check internet connectivity |
| **TypeScript errors** | "Node.js in Docker Build Failed" | Fix TypeScript compilation errors |
| **Permission issues** | "Access denied" | Run as administrator or check Docker permissions |

### Error Messages

The script provides detailed error context:

```powershell
❌ Node.js in Docker Build Failed. Check the following:
   • TypeScript compilation errors
   • Missing dependencies in package.json
   • Docker daemon accessibility
   • Build agent container availability
```

## Integration with Development Workflow

### Development vs Production

| Purpose | Command | Environment |
|---------|---------|-------------|
| **Development** | `npm run dev` | Local TypeScript execution |
| **Production Build** | `.\build.ps1` | Containerized build process |
| **CI/CD Build** | Automated | GitHub Actions workflows |

### Package.json Scripts

The build script complements existing npm scripts:

```json
{
  "scripts": {
    "dev": "npx ts-node src/index.ts",
    "build": "tsc -p .",
    "build:prod": "npm run build",
    "start": "node index.js"
  }
}
```

## Testing the Build

After successful build, test the container:

```powershell
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Test bot commands in Discord
# !menu, !menu-en, !order 1 test

# Stop the application
docker-compose down
```

## CI/CD Integration

The build script is designed for both local and CI/CD use:

### Local Development

```powershell
# Manual production build
.\build.ps1

# Quick development testing
npm run dev
```

### GitHub Actions

The CI/CD workflows use the same build agent container for consistency:

```yaml
container:
  image: ghcr.io/the-running-dev/build-agent:latest
```

## Troubleshooting

### Build Script Issues

#### Docker Socket Issues

```powershell
# Error: Cannot connect to Docker daemon
# Solution: Ensure Docker Desktop is running
docker info
```

#### Container Registry Access

```powershell
# Error: Failed to pull build agent
# Solution: Check internet connectivity and registry access
docker pull ghcr.io/the-running-dev/build-agent:latest
```

#### PowerShell Execution Policy

```powershell
# Error: Execution policy restriction
# Solution: Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Build Verification Failures

If build artifacts are missing:

1. **Check TypeScript compilation**:

   ```powershell
   npm run build
   ```

2. **Verify Docker image**:

   ```powershell
   docker images | findstr barstrad-bot
   ```

3. **Review build logs** for specific error messages

## Advanced Usage

### Custom Build Agent

To use a different build agent:

```powershell
# Edit build.ps1 and change the container image
ghcr.io/your-registry/custom-build-agent:latest
```

### Build Optimization

For faster builds, consider:

- **Layer caching** in Docker builds
- **Dependency caching** for npm packages
- **Parallel processing** where possible

## Related Documentation

- **[CI/CD Overview](./overview)** - Complete automation pipeline
- **[Deployment Guide](./deployment-guide)** - Production deployment
- **[Development Setup](../development/setup)** - Local development environment

## Script Maintenance

### Regular Updates

1. **Build agent updates** - Monitor for new versions
2. **PowerShell compatibility** - Test with latest PowerShell versions
3. **Docker compatibility** - Verify with Docker Desktop updates
4. **Error handling** - Improve based on user feedback

### Version History

| Version | Changes | Date |
|---------|---------|------|
| **1.0** | Initial release with full validation | Current |

---

For the most up-to-date build script and documentation, see the [GitHub repository](https://github.com/The-Running-Dev/BarStrad-Bot).
