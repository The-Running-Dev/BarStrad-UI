---
id: ci-workflow
title: CI Workflow
sidebar_position: 2
---

The CI workflow validates code changes on feature branches and pull requests without publishing artifacts.

## Triggers

- ✅ Pull requests (all events)
- ✅ Push to any branch except `main`
- ✅ Manual trigger (`workflow_dispatch`)
- ❌ Push to `main` branch (handled by release workflow)

:::info Dual Execution
When you push to a feature branch that has an open PR, CI will run **twice**:

1. Once for the `push` event (immediate developer feedback)
2. Once for the `pull_request` event (PR validation for reviewers)

This is intentional to provide both immediate feedback and PR context.
:::

## Path Filters

**Ignored paths** (workflow won't run):

- `documentation/**`
- `.github/**`

## Job Configuration

```yaml
Runner: ubuntu-latest
Container: ghcr.io/the-running-dev/build-agent:latest
Permissions: packages: write
```

## Steps

1. **Checkout** - Full git history (`fetch-depth: 0`)
2. **Build** - Dry-run validation (`node-in-docker-build --dry-run true`)

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `RegistryToken` | GitHub operations authentication |
| `NotificationsWebHookUrl` | Build notification webhook |
| `DiscordWebhookUrl` | Discord notification webhook |

## Key Features

- **Dry-run mode**: Validates build without publishing
- **Branch protection**: Only runs on non-main branches
- **Resource efficient**: No artifact publishing
- **Fast feedback**: Quick validation for developers

## When It Runs

```text
Feature Branch Push → CI Workflow
Pull Request → CI Workflow
Manual Trigger → CI Workflow
Main Branch Push → Release Workflow (not CI)
```## Success Criteria

- ✅ Code compiles successfully
- ✅ Docker build completes
- ✅ No build errors or failures
- ✅ All environment variables are accessible

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check TypeScript compilation errors |
| Container issues | Verify `build-agent` availability |
| Permission errors | Check `REGISTRY_TOKEN` permissions |
| Missing secrets | Verify all required secrets are configured |

## Manual Trigger

To manually trigger the CI workflow:

1. Go to **Actions** tab in GitHub
2. Select **CI** workflow
3. Click **Run workflow**
4. Choose the branch to test
5. Click **Run workflow**

## Local Testing

You can test the CI workflow locally using Act:

```powershell
# Run CI workflow locally
.\scripts\ci-workflow.ps1
```

For detailed local testing instructions, see [Local Testing with Act](./local-testing-with-act).

## Related Files

- **Workflow**: `.github/workflows/ci.yml`
- **Build Config**: `package.json`, `tsconfig.json`
- **Docker**: `Dockerfile`, `docker-compose.yml`
- **Versioning**: `GitVersion.yml`
