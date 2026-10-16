---
id: deployment-guide
title: Deployment Guide
sidebar_position: 6
---

BarStrad-UI uses automated CI/CD workflows for deployment to ensure consistent and reliable releases. This guide covers all aspects of deployment from automated pipelines to manual procedures and troubleshooting.

## Deployment Architecture

The deployment process involves multiple components working together:

- **GitHub Actions**: Automated CI/CD workflows
- **Docker**: Containerized application deployment with nginx
- **GitHub Container Registry**: Docker image storage
- **Container Registry**: Docker image hosting for production deployment
- **Build Agent**: Custom containerized build environment
- **Semantic Versioning**: Automated version management

## Deployment Environments

### Development Environment

- **Purpose**: Local development and testing
- **Access**: Developer workstations
- **Server**: Angular dev server (ng serve)
- **Deployment**: Manual via `pnpm start`

### Production Environment

- **Purpose**: Live Angular application serving users via dual deployment strategy
- **Access**: Restricted to deployment workflows
- **Data**: Production menu data and configurations
- **Deployment**: Automated via GitHub Actions to Docker Registry
- **Hosting**: Docker containers with nginx serving

## Automated Deployment Workflows

### CI Workflow (Validation)

**Purpose**: Validate all changes before deployment
**Trigger**: Every push and pull request
**Duration**: ~2-3 minutes

**Process Overview:**

1. **Environment Setup**
   - Checkout code from repository
   - Setup Node.js 18 environment
   - Install project dependencies

2. **Build Process**
   - Compile TypeScript to JavaScript
   - Run build validation checks
   - Generate build artifacts

3. **Testing & Validation**
   - Run unit tests (when available)
   - Validate menu data structure
   - Check Docker build process

4. **Quality Checks**
   - Lint code style compliance
   - TypeScript type checking
   - Security vulnerability scanning

**Success Criteria**: All steps pass without errors

### Release Workflow (Production Deployment)

**Purpose**: Deploy validated changes to production via dual deployment strategy
**Trigger**: Pushes to main branch
**Duration**: ~5-10 minutes

**Process Overview:**

1. **Version Management**
   - Calculate semantic version using GitVersion
   - Generate automated release notes
   - Tag repository with new version

2. **Angular Build Process**
   - Build production-ready Angular application
   - Optimize bundles with tree shaking and minification
   - Generate static assets for multiple deployment targets

3. **Docker Deployment Path**
   - Create optimized Docker image with nginx
   - Push image to GitHub Container Registry
   - Tag with semantic version and 'latest'

4. **Documentation Integration**
   - Detect documentation changes in the commit
   - Trigger documentation workflow if needed
   - Coordinate documentation updates with releases

5. **Post-Deployment**
   - Send deployment notifications to configured webhooks
   - Update monitoring systems and status dashboards
   - Log deployment events for auditing and tracking

**Success Criteria**: Angular application is accessible via Docker image

### Documentation Workflow

**Purpose**: Deploy updated documentation
**Trigger**: Manual or API dispatch
**Duration**: ~3-5 minutes

**Process Overview:**

1. **Build Documentation**
   - Install Docusaurus dependencies
   - Build static documentation site
   - Optimize for production

2. **Deploy Documentation** (if docs changed)
   - Build documentation site
   - Upload build artifacts to GitHub Pages
   - Update live documentation site

## Pre-deployment Checklist

Before deploying changes, ensure:

### Code Quality

- [ ] All tests pass locally
- [ ] Code follows project style guidelines
- [ ] No console errors or warnings
- [ ] TypeScript compilation successful

### Functionality Testing

- [ ] All bot commands work correctly
- [ ] Menu displays properly in both languages
- [ ] Order processing functions as expected
- [ ] Error handling works appropriately

### Documentation

- [ ] Code changes documented
- [ ] API changes noted in documentation
- [ ] User-facing changes documented
- [ ] Deployment notes updated if needed

## Manual Deployment Procedures

### Emergency Deployment

For urgent fixes or special circumstances:

#### Local Build and Deploy

```bash
# Build production version
pnpm build

# Build Docker image
docker build -t barstrad-ui:latest .

# Run container
docker run -d -p 80:80 barstrad-ui:latest
```

#### Direct Docker Deployment

```bash
# Pull latest image
docker pull ghcr.io/the-running-dev/barstrad-ui:latest

# Stop existing container
docker stop barstrad-ui

# Remove old container
docker rm barstrad-ui

# Start new container
docker run -d \
  --name barstrad-ui \
  -p 80:80 \
  --restart unless-stopped \
  ghcr.io/the-running-dev/barstrad-ui:latest
```

## Docker Configuration

### Container Setup

The Angular application runs in a containerized environment with:

- **Base Image**: `nginx:alpine`
- **Working Directory**: `/usr/share/nginx/html`
- **Port**: `80` (HTTP)
- **Serving**: Static Angular build files via nginx

### Environment Variables

Optional for production deployment, set on the running container:

```env
# Discord order notifications (optional). Read by nginx at container start
# and used to forward POST /api/notify; never baked into the image or bundle.
DiscordWebhookUrl=https://discord.com/api/webhooks/<id>/<token>

# Application Settings
NODE_ENV=production

# Optional: Build Configuration
BUILD_OPTIMIZATION=true
```

### Docker Compose Deployment

For easier management, use Docker Compose:

```yaml
version: '3.8'

services:
  barstrad-ui:
    image: ghcr.io/the-running-dev/barstrad-ui:latest
    container_name: barstrad-ui
    restart: unless-stopped
    ports:
      - '80:80'
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost/']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Deploy with:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Version Management

### Semantic Versioning Strategy

The project uses semantic versioning (SemVer):

- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features, backward compatible
- **Patch** (1.1.X): Bug fixes, backward compatible

### GitVersion Configuration

Automated versioning based on git history:

```yaml
# GitVersion.yml
mode: Mainline
branches:
  main:
    regex: ^main$
    increment: Minor
  feature:
    regex: ^feature?[/-]
    increment: Minor
  hotfix:
    regex: ^hotfix?[/-]
    increment: Patch
```

### Version Lifecycle

Versions are automatically calculated and applied:

1. **Development**: `1.2.3-alpha.4`
2. **Pre-release**: `1.2.3-beta.1`
3. **Release**: `1.2.3`

## Deployment Monitoring

### Health Checks

Monitor deployment success through:

#### Application Health

- Bot connection status
- Command response times
- Error rates and patterns
- Memory usage monitoring

#### Infrastructure Health

- Container status and uptime
- Network connectivity
- Resource utilization
- Log file growth and rotation

### Monitoring Commands

#### Container Monitoring

```bash
# Check container status
docker ps

# View resource usage
docker stats barstrad-ui

# Check logs
docker logs barstrad-ui --tail 100 -f
```

#### Application Monitoring

```bash
# Check application status
curl -f http://localhost/ || echo "Application not responding"

# Monitor nginx logs for errors
docker logs barstrad-ui | grep "error"

# Check container health
docker exec barstrad-ui ls -la /usr/share/nginx/html/
```

## Rollback Procedures

### Automatic Rollback

In case of deployment failure:

1. **Detection**: Health checks fail
2. **Alert**: Monitoring system triggers alert
3. **Rollback**: Automatic revert to previous version
4. **Verification**: Confirm rollback success

### Manual Rollback

For immediate rollback needs:

```bash
# Stop current container
docker stop barstrad-ui

# Remove current container
docker rm barstrad-ui

# Deploy previous version
docker run -d \
  --name barstrad-bot \
  --env-file .env \
  --restart unless-stopped \
  ghcr.io/the-running-dev/barstrad-bot:1.2.2  # Previous version
```

### Rollback Verification

After rollback:

1. **Functionality Test**: Verify bot commands work
2. **Log Review**: Check for errors or warnings
3. **Performance Check**: Monitor response times
4. **User Notification**: Inform users if necessary

## Troubleshooting Deployments

### Common Issues

#### Container Won't Start

```bash
# Check container logs
docker logs barstrad-bot

# Common causes:
# - Missing environment variables
# - Invalid Discord token
# - Port conflicts
# - Permission issues
```

#### Bot Not Responding to Commands

```bash
# Verify bot is online in Discord
# Check token validity
# Verify bot permissions in server
# Check network connectivity
```

#### Build Failures

- Check TypeScript compilation errors
- Verify dependency installation
- Check Docker build context
- Review CI/CD workflow logs

### Debugging Procedures

#### Local Debugging

```bash
# Run container interactively
docker run -it --env-file .env barstrad-bot:latest sh

# Debug inside container
cd /app
npm run start

# Check file structure
ls -la
```

#### Production Debugging

```bash
# Access running container
docker exec -it barstrad-bot sh

# Check application status
ps aux | grep node

# Review configuration
env | grep Discord
```

## Security Considerations

### Environment Security

- Store secrets in secure environment variables
- Use GitHub Secrets for CI/CD workflows
- Rotate tokens regularly
- Monitor for token exposure in logs

### Container Security

- Use minimal Alpine Linux base images
- Run applications as non-root user
- Scan for security vulnerabilities
- Keep dependencies updated

### Network Security

- Limit container network access
- Use secure Discord API connections
- Monitor network traffic patterns
- Implement rate limiting

## Performance Optimization

### Container Optimization

- Use Alpine Linux base image for smaller size
- Minimize Docker image layers
- Remove development dependencies in production
- Optimize application startup time

### Application Optimization

- Implement connection pooling for APIs
- Cache frequently accessed data
- Monitor memory usage patterns
- Optimize Discord API call frequency

## Deployment Best Practices

### Before Deployment

- Test thoroughly in development environment
- Review all changes for potential issues
- Check for breaking changes
- Prepare rollback plan

### During Deployment

- Monitor deployment progress closely
- Watch for errors or warnings
- Verify functionality immediately after deployment
- Check performance metrics

### After Deployment

- Monitor for issues for at least 30 minutes
- Verify all features work as expected
- Check error logs for new issues
- Update documentation if needed

## Related Documentation

For workflow-specific details:

- **[CI Workflow](./ci-workflow)** - Continuous integration process
- **[Release Workflow](./release-workflow)** - Production deployment
- **[Documentation Workflow](./docs-workflow)** - Documentation deployment
- **[Workflow Comparison](./workflow-comparison)** - Side-by-side comparison

---

**Need help with deployment?** Check the troubleshooting section above or contact the development team!
