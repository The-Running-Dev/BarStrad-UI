---
id: release-workflow
title: Release Workflow
sidebar_position: 3
---

The release workflow builds, publishes Docker images, creates GitHub releases, and triggers documentation updates when code is pushed to the main branch. This is the production deployment pipeline that handles all release activities with containerized deployment strategy.

## Workflow Triggers

The release workflow runs automatically in these scenarios:

- ✅ **Push to `main` branch** - Primary trigger for production releases
- ✅ **Manual trigger (`workflow_dispatch`)** - Emergency or scheduled releases
- ❌ **Pull requests** - Handled by CI workflow instead
- ❌ **Feature branch pushes** - Handled by CI workflow instead

### Path Filters

The workflow includes smart path filtering to avoid unnecessary runs:

**Ignored paths** (workflow won't run for changes to):

- `documentation/**` - Documentation updates don't require releases
- `.github/**` - Workflow changes don't trigger releases

This optimization saves resources and focuses builds on actual code changes.

## Job Architecture

The release workflow uses a single-job architecture for containerized deployment:

### Build Job Configuration

```yaml
Runner: ubuntu-latest
Container: ghcr.io/the-running-dev/build-agent:latest
Permissions:
  packages: write # Push to GitHub Container Registry
  contents: write # Create GitHub releases
  id-token: write # Verify deployment authenticity
```

### Build Agent Container

The workflow uses a custom build agent that includes:

- Node.js runtime with pnpm package manager
- Docker-in-Docker capabilities
- GitVersion for semantic versioning
- Angular CLI and TypeScript compiler
- Custom build scripts and tools

## Workflow Steps

The release workflow follows these sequential steps across two jobs:

### Build Job Steps

#### 1. **Checkout Code**

- Retrieves complete git history (`fetch-depth: 0`)
- Required for GitVersion to calculate proper version numbers
- Ensures all git tags and branch information available

#### 2. **Build & Publish**

- Executes production build using `build node-in-docker`
- Includes flag `--create-github-release true`
- Handles Angular compilation and optimization
- Handles Docker image creation and registry publishing
- Creates GitHub release with auto-generated notes

#### 3. **Documentation Change Detection**

- Checks if documentation files were modified in the commit
- Sets output flag for documentation workflow triggering
- Uses git diff to detect changes in `documentation/` directory

#### 4. **Trigger Documentation Build**

- Conditionally triggers documentation workflow if docs changed
- Uses repository_dispatch to trigger separate documentation deployment
- Provides clean separation between application and documentation updates

## Environment Variables

The workflow uses these environment variables for configuration:

| Variable                  | Purpose                              | Usage                                    |
| ------------------------- | ------------------------------------ | ---------------------------------------- |
| `RegistryToken`           | GitHub operations & registry access  | Authentication for releases and registry |
| `NotificationsWebHookUrl` | Build notification webhook           | Send build status updates                |

### Secret Management

All sensitive variables are stored as GitHub Secrets:

- Encrypted at rest in GitHub
- Only available during workflow execution
- Minimal scope and access permissions

## Key Features

### Automated Production Builds

- **Optimized Docker images** - Multi-stage builds for minimal image size
- **TypeScript compilation** - Full build validation and optimization
- **Dependency optimization** - Production-only dependencies included

### Semantic Versioning

- **GitVersion integration** - Automatic version calculation
- **Branch-based versioning** - Different increment rules per branch type
- **Pre-release support** - Alpha/beta version handling

### Container Registry Publishing

- **GitHub Container Registry** - Pushes to `ghcr.io/the-running-dev/barstrad-ui`
- **Multiple tags** - Version-specific and `latest` tags
- **Private registry** - Secure image storage

### Docker Image Publishing

- **Container Registry** - Publishes to GitHub Container Registry (ghcr.io)
- **Multiple Tags** - Creates both 'latest' and semantic version tags
- **Production Ready** - Optimized Docker images with nginx serving
- **Automatic Updates** - New images published on every release

### GitHub Release Creation

- **Automated releases** - No manual release process required
- **Auto-generated notes** - Changelog from commit messages
- **Proper tagging** - Semantic version tags applied

### Documentation Change Detection

- **Smart Triggering** - Detects documentation changes in commit
- **Automatic Dispatch** - Triggers documentation workflow when needed
- **Repository Dispatch API** - Uses GitHub API for workflow coordination

### Build Notifications

- **Webhook notifications** - Real-time build status updates
- **Success/failure alerts** - Immediate team notification
- **Integration support** - Works with external monitoring systems

## Release Process Flow

The complete release process follows this dual-deployment sequence:

```text
Main Branch Push → Version Calculation → Angular Build →
Docker Build & Registry Push → GitHub Release →
Documentation Detection → Notifications
```

### Detailed Process

1. **Trigger Detection** - Workflow activated by main branch push
2. **Environment Setup** - Build container initialized with tools
3. **Code Checkout** - Full repository history retrieved
4. **Version Calculation** - GitVersion analyzes git history
5. **Angular Build** - TypeScript compilation and production optimization
6. **Docker Image Creation** - Multi-stage container build with nginx
7. **Registry Publication** - Image pushed to GitHub Container Registry
8. **Release Creation** - GitHub release with proper version tag
9. **Documentation Change Detection** - Checks for documentation updates
10. **Documentation Workflow Trigger** - Dispatches docs rebuild if needed
11. **Notification Dispatch** - Build status sent to configured webhooks

## Workflow Outputs

Each successful release workflow produces multiple deployment artifacts:

### Docker Image

- **Location**: `ghcr.io/the-running-dev/barstrad-ui:version`
- **Tags**: Both version-specific (e.g., `1.2.3`) and `latest`
- **Architecture**: Linux AMD64 with nginx serving Angular application
- **Size**: Optimized for production use with Angular build artifacts

### GitHub Release

- **Version Tag**: Semantic version (e.g., `v1.2.3`)
- **Release Notes**: Auto-generated from commit messages
- **Assets**: Docker image reference and build artifacts
- **Timestamp**: Accurate release time tracking

### Registry Tags

- **Latest**: Always points to most recent release
- **Version-specific**: Immutable version tags for rollbacks
- **Pre-release**: Alpha/beta versions when applicable

## Success Criteria

A release is considered successful when:

- ✅ **Docker image builds successfully** - No compilation or build errors
- ✅ **Image pushes to GitHub Container Registry** - No registry access issues
- ✅ **GitHub release created with proper version tag** - Semantic versioning applied correctly
- ✅ **Release notes generated automatically** - Proper changelog creation
- ✅ **Notifications sent successfully** - Team informed of release status

### Validation Checks

The workflow includes several validation points:

- TypeScript compilation must succeed
- Docker build must complete without errors
- Registry authentication must succeed
- Version calculation must be valid
- All required environment variables must be present

## Versioning Strategy

The project uses **GitVersion** for intelligent semantic versioning:

### Version Types

- **Major (X.0.0)**: Breaking changes requiring manual increment
- **Minor (1.X.0)**: New features that are backward compatible
- **Patch (1.1.X)**: Bug fixes and small improvements
- **Pre-release (1.1.1-alpha.1)**: Feature branch versions

### GitVersion Configuration

The versioning follows these rules:

```yaml
mode: ContinuousDeployment
branches:
  main:
    increment: Minor # New features on main
  feature:
    increment: Inherit # Inherit from target branch
  hotfix:
    increment: Patch # Bug fixes only
  develop:
    increment: Minor # Development features
```

### Version Calculation Examples

- `main` branch merge: `1.2.0` → `1.3.0`
- `hotfix` branch merge: `1.2.0` → `1.2.1`
- `feature` branch: `1.2.0-feature-xyz.1`

## Manual Release Trigger

For emergency releases or scheduled deployments:

### Steps to Manually Trigger

1. **Navigate to GitHub Actions**
   - Go to your repository
   - Click the "Actions" tab

2. **Select Release Workflow**
   - Find "Release" in the workflow list
   - Click on the workflow name

3. **Trigger Workflow**
   - Click "Run workflow" button
   - Ensure `main` branch is selected
   - Click the green "Run workflow" button

### Manual Trigger Considerations

⚠️ **Warning**: Manual triggers create production releases

- Only use for emergencies or planned releases
- Ensure main branch is in deployable state
- Coordinate with team before triggering
- Monitor the release process carefully

## Troubleshooting Release Issues

### Common Problems and Solutions

| Issue                      | Symptoms                                 | Solution                                           |
| -------------------------- | ---------------------------------------- | -------------------------------------------------- |
| **Version conflicts**      | Duplicate version tags, release failures | Check GitVersion configuration and tag conflicts   |
| **Registry push fails**    | Authentication errors, permission denied | Verify `REGISTRY_TOKEN` permissions and validity   |
| **Release creation fails** | API errors, missing permissions          | Check repository write permissions and token scope |
| **Docker build fails**     | Compilation errors, dependency issues    | Review Dockerfile, dependencies, and build logs    |

### Debugging Steps

1. **Check Workflow Logs**

   ```text
   GitHub Actions → Release Workflow → Latest Run → View Logs
   ```

2. **Verify Environment Variables**
   - Ensure all required secrets are set
   - Check for typos in secret names
   - Verify token permissions and expiration

3. **Local Reproduction**

   ```bash
   # Test build locally
   docker build -t barstrad-ui-test .

   # Test GitVersion
   gitversion /showvariable SemVer
   ```

4. **Registry Access Test**

   ```bash
   # Test registry authentication
   docker login ghcr.io -u USERNAME -p $REGISTRY_TOKEN
   ```

## Registry Information

### GitHub Container Registry Details

- **Registry URL**: `ghcr.io`
- **Repository**: `ghcr.io/the-running-dev/barstrad-ui`
- **Visibility**: Private (requires authentication)
- **Access**: Via GitHub Personal Access Token

### Image Tags and Management

- **Latest Tag**: Always points to most recent release
- **Version Tags**: Immutable semantic version tags (e.g., `1.2.3`)
- **Retention**: Configurable retention policies
- **Security**: Vulnerability scanning enabled

### Registry Access

```bash
# Login to registry
docker login ghcr.io -u username -p $GITHUB_TOKEN

# Pull latest image
docker pull ghcr.io/the-running-dev/barstrad-ui:latest

# Pull specific version
docker pull ghcr.io/the-running-dev/barstrad-ui:1.2.3
```

## Monitoring and Observability

### Release Monitoring

Monitor releases through multiple channels:

- **GitHub Actions**: Real-time workflow execution status
- **GitHub Releases**: Published releases and version history
- **Container Registry**: Docker image publication status
- **Webhook Notifications**: External system integration

### Key Metrics

Track these release metrics:

- Release frequency and timing
- Build success/failure rates
- Deployment duration trends
- Registry storage usage

### Alerting

Set up alerts for:

- Failed releases
- Registry access issues
- Version conflicts
- Deployment anomalies

## Security Considerations

### Token Management

- **Minimal Permissions**: Tokens have only required scopes
- **Regular Rotation**: Tokens rotated on schedule
- **Secure Storage**: All tokens stored as GitHub Secrets
- **Access Logging**: Token usage monitored and logged

### Container Security

- **Base Image Security**: Regular base image updates
- **Vulnerability Scanning**: Automatic security scans
- **Minimal Attack Surface**: Production images contain only necessary components
- **Access Controls**: Private registry with authentication

### Workflow Security

- **Isolated Execution**: Each workflow run in isolated environment
- **Permission Boundaries**: Strict permission scoping
- **Secret Masking**: Sensitive data masked in logs
- **Audit Trail**: Complete execution history maintained

## Related Files and Configuration

### Core Workflow Files

- **`.github/workflows/release.yml`** - Main release workflow definition
- **`GitVersion.yml`** - Semantic versioning configuration
- **`package.json`** - Build scripts and dependencies
- **`tsconfig.json`** - TypeScript compilation settings

### Container Configuration

- **`Dockerfile`** - Production container definition
- **`docker-compose.yml`** - Local development and testing
- **`.dockerignore`** - Files excluded from Docker build context

## Local Testing

You can test the release workflow locally using Act:

```powershell
# Run release workflow locally (BE CAREFUL - may attempt to publish)
.\scripts\release-workflow.ps1
```

**⚠️ Warning**: The release workflow may attempt to publish artifacts when run locally. For safe local testing instructions, see [Local Testing with Act](./local-testing-with-act).

### Documentation

- **CI/CD Documentation** - This file and related guides
- **Deployment Guide** - Production deployment procedures
- **Troubleshooting Guide** - Issue resolution procedures

---

**Need help with releases?** Check the [deployment guide](./deployment-guide) for detailed procedures.
