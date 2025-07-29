---
id: workflow-comparison
title: Workflow Comparison
sidebar_position: 5
---

This document provides a comprehensive side-by-side comparison of all three GitHub Actions workflows: CI, Release, and Documentation.

## At a Glance

| Aspect | CI | Release | Documentation |
|--------|-------------|------------------|----------------------|
| **File** | `.github/workflows/ci.yml` | `.github/workflows/release.yml` | `.github/workflows/docs.yml` |
| **Purpose** | Validate changes | Deploy to production | Deploy documentation |
| **Triggers** | PRs, feature branches, manual | Main branch, manual | Manual, API dispatch |
| **Artifacts** | None (dry-run) | Docker image, GitHub release, GitHub Pages | Static documentation site |
| **Duration** | ~2-3 minutes | ~5-10 minutes | ~3-5 minutes |
| **Resource Usage** | Low | Medium | Low-Medium |
| **Output Location** | None | GitHub Container Registry + GitHub Pages | GitHub Pages |

## Detailed Comparison

### Triggers

| Event | CI | Release | Documentation |
|-------|-------------|------------------|----------------------|
| Pull Request | ✅ Yes | ❌ No | ❌ No |
| Push to feature branch | ✅ Yes | ❌ No | ❌ No |
| Push to main branch | ❌ No | ✅ Yes | ❌ No |
| Manual trigger | ✅ Yes | ✅ Yes | ✅ Yes |
| Repository dispatch | ❌ No | ❌ No | ✅ Yes (Update-Documentation) |

### Permissions

| Permission | CI | Release | Documentation |
|------------|-------------|------------------|----------------------|
| `packages: write` | ✅ Yes | ✅ Yes | ❌ No |
| `contents: write` | ❌ No | ✅ Yes | ❌ No |
| `pages: write` | ❌ No | ✅ Yes (Deploy job) | ✅ Yes (Deploy job) |
| `id-token: write` | ❌ No | ✅ Yes (Deploy job) | ✅ Yes (Deploy job) |

### Build Commands

| Workflow | Command | Purpose |
|----------|---------|---------|
| CI | `node-in-docker-build --dry-run true` | Validation only |
| Release | `node-in-docker-build --create-github-release true` | Production deployment |
| Documentation | `node-template-build -appDir 'documentation'` | Documentation site build |

### Job Architecture

| Workflow | Jobs | Dependencies |
|----------|------|--------------|
| CI | 1 job (Build) | None |
| Release | 2 jobs (Build, Deploy) | Deploy depends on Build |
| Documentation | 2 jobs (Build, Deploy) | Deploy depends on Build |

### Outputs

| Output Type | CI | Release | Documentation |
|-------------|-------------|------------------|----------------------|
| Docker Image | ❌ None | ✅ Published to registry | ❌ None |
| GitHub Release | ❌ None | ✅ Created with notes | ❌ None |
| Registry Tags | ❌ None | ✅ Latest + version tags | ❌ None |
| Artifacts | ❌ None | ✅ Release assets + Pages artifact | ✅ Pages artifact |
| Static Site | ❌ None | ✅ GitHub Pages deployment | ✅ GitHub Pages deployment |

### Container Environment

| Aspect | CI | Release | Documentation |
|--------|-------------|------------------|----------------------|
| **Container Image** | `build-agent:latest` | `build-agent:latest` | `build-agent:latest` |
| **Runner** | `ubuntu-latest` | `ubuntu-latest` | `ubuntu-latest` |
| **Build Tools** | Node.js, Docker | Node.js, Docker | Node.js, documentation tools |
| **Custom Commands** | `node-in-docker-build` | `node-in-docker-build` | `node-template-build` |

### Environment Variables

All workflows use these common environment variables:

| Variable | CI | Release | Documentation |
|----------|-------------|------------------|----------------------|
| `GitHubRepositoryToken` | ✅ Yes | ✅ Yes | ✅ Yes (implicit) |
| `BuildNotificationsWebHookUrl` | ✅ Yes | ✅ Yes | ❌ No |
| `DiscordBotToken` | ✅ Yes | ✅ Yes | ❌ No |
| `DiscordWebhookUrl` | ✅ Yes | ✅ Yes | ❌ No |

### Path Exclusions

All workflows ignore the same paths:

| Path Pattern | CI | Release | Documentation |
|--------------|-------------|------------------|----------------------|
| `documentation/**` | ✅ Excluded | ✅ Excluded | ❌ Not excluded |
| `.github/**` | ✅ Excluded | ✅ Excluded | ✅ Excluded |

## When to Use Each Workflow

### Use CI Workflow For

- ✅ Validating pull requests
- ✅ Testing feature branches
- ✅ Quick code validation
- ✅ Pre-merge checks
- ✅ Development testing

### Use Release Workflow For

- ✅ Production deployments
- ✅ Creating versioned releases
- ✅ Publishing Docker images
- ✅ Main branch updates
- ✅ Emergency releases (manual trigger)

### Use Documentation Workflow For

- ✅ Updating documentation site
- ✅ Publishing documentation changes
- ✅ Manual documentation deployments
- ✅ External documentation updates (via API)
- ✅ Documentation-only releases

## Workflow Execution Flow

### Development Flow

```text
Feature Branch → CI Workflow (validation)
      ↓
Pull Request → CI Workflow (validation)
      ↓
Main Branch → Release Workflow (deployment)
```

### Documentation Flow

```text
Documentation Changes → Manual Trigger → Documentation Workflow
                             ↓
External API Call → Documentation Workflow → GitHub Pages
```

### Decision Matrix

| Scenario | Recommended Workflow |
|----------|---------------------|
| **Feature development** | CI Workflow |
| **Pull request validation** | CI Workflow (automatic) |
| **Production release** | Release Workflow (automatic) |
| **Emergency hotfix** | Release Workflow (manual) |
| **Documentation update** | Documentation Workflow (manual) |
| **External doc sync** | Documentation Workflow (API) |

## Resource Usage Comparison

### CI Workflow

- **CPU**: Low (validation only)
- **Memory**: Low (no artifact creation)
- **Storage**: Minimal (no publishing)
- **Network**: Low (no registry pushes)
- **Duration**: ~2-3 minutes

### Release Workflow

- **CPU**: Medium (full build + publish)
- **Memory**: Medium (image creation)
- **Storage**: Medium (registry storage)
- **Network**: Medium (registry uploads)
- **Duration**: ~5-10 minutes

### Documentation Workflow

- **CPU**: Low-Medium (static site generation)
- **Memory**: Low (documentation build)
- **Storage**: Low (static files)
- **Network**: Low-Medium (GitHub Pages upload)
- **Duration**: ~3-5 minutes

## Success Criteria

### CI Workflow Success

- ✅ Build completes without errors
- ✅ TypeScript compilation passes
- ✅ Docker build succeeds (dry-run)
- ✅ No test failures
- ✅ Lint checks pass

### Release Workflow Success

- ✅ Production build completes
- ✅ Docker image publishes successfully
- ✅ GitHub release created
- ✅ Version tag applied correctly
- ✅ GitHub Pages deployment successful  
- ✅ Notifications sent
- ✅ Registry tags updated
- ✅ Documentation workflow triggered (if needed)

### Documentation Workflow Success

- ✅ Documentation build completes
- ✅ Static site generation successful
- ✅ Artifact upload completes
- ✅ GitHub Pages deployment successful
- ✅ Site accessible at deployment URL

## Common Failure Scenarios

### CI Workflow Failures

- ❌ TypeScript compilation errors
- ❌ Missing dependencies
- ❌ Docker build issues
- ❌ Environment variable problems
- ❌ Lint or formatting errors

### Release Workflow Failures

- ❌ Registry authentication issues
- ❌ Version conflicts
- ❌ GitHub release creation problems
- ❌ Network connectivity issues
- ❌ Docker build failures

### Documentation Workflow Failures

- ❌ Docusaurus build errors
- ❌ Missing documentation dependencies
- ❌ GitHub Pages deployment issues
- ❌ Artifact upload failures
- ❌ Container access problems

## Monitoring and Observability

All workflows can be monitored through:

### GitHub Actions Dashboard

- **Workflow Status** - Success/failure indicators
- **Execution Logs** - Detailed step-by-step logs
- **Duration Tracking** - Build time analytics
- **Resource Usage** - CPU and memory consumption

### Notification Systems

- **Webhook Notifications** - CI and Release workflows only
- **Email Notifications** - Configurable via GitHub settings
- **Status Badges** - Repository README integration
- **Third-party Integrations** - Slack, Teams, Discord

### Deployment Tracking

- **GitHub Releases** - Release workflow only
- **Container Registry** - Release workflow image tracking
- **GitHub Pages** - Documentation workflow site status
- **Environment History** - Deployment environment tracking

## Security Considerations

### Permission Models

| Security Aspect | CI | Release | Documentation |
|------------------|-------------|------------------|----------------------|
| **Registry Access** | Read-only validation | Read-write publishing | Read-only container access |
| **Repository Access** | Read-only | Read-write (releases) | Read-write (Pages) |
| **Secret Access** | Build secrets only | All deployment secrets | Minimal secrets |
| **External Access** | None | Registry publishing | GitHub Pages deployment |

### Best Practices Applied

- **Least Privilege** - Minimal required permissions
- **Secret Management** - GitHub Secrets for sensitive data
- **Container Isolation** - Each run in fresh container
- **Audit Trail** - Complete execution logging

## Troubleshooting Quick Reference

### Workflow Not Triggering

| Issue | CI | Release | Documentation |
|-------|-------------|------------------|----------------------|
| **Wrong Branch** | Check PR/feature branch | Check main branch push | Manual trigger required |
| **Path Exclusions** | Excluded paths modified | Excluded paths modified | No path exclusions |
| **Permissions** | Check PR permissions | Check push permissions | Check manual permissions |

### Build Failures

| Issue Type | Primary Workflow | Secondary Workflows | Solution Reference |
|------------|------------------|-------------------|-------------------|
| **TypeScript Errors** | CI (most common) | Release | Check source code |
| **Docker Build** | All workflows | - | Check Dockerfile |
| **Dependencies** | All workflows | - | Check package.json |
| **Environment** | Release, Docs | CI | Check secrets/variables |

## Related Documentation

For detailed information about each workflow:

- **[CI Workflow Details](./ci-workflow)** - Complete CI workflow documentation
- **[Release Workflow Details](./release-workflow)** - Production deployment process
- **[Documentation Workflow Details](./docs-workflow)** - GitHub Pages deployment process
- **[CI/CD Overview](./overview)** - High-level pipeline architecture
- **[Troubleshooting Guide](../troubleshooting)** - Common issues and solutions

---

**Quick Navigation:**

- **Need validation?** → [CI Workflow](./ci-workflow)
- **Ready to deploy?** → [Release Workflow](./release-workflow)  
- **Update docs?** → [Documentation Workflow](./docs-workflow)
- **Having issues?** → [Troubleshooting](../troubleshooting)
