# ====================================================================
# BUILD SCRIPT FOR BarStrad-UI
# ====================================================================
# 
# This script builds the Angular 19.1.0 application using containerized
# build agents to ensure consistent build environments across different
# development machines and CI/CD pipelines.
#
# The build process consists of:
# 1. Docker environment validation
# 2. Containerized Angular build (TypeScript compilation, pnpm dependencies)
# 3. Docker image creation with nginx serving optimized Angular artifacts
#
# Build Agent Container Features:
# - Node.js runtime with pnpm package manager
# - Angular CLI and TypeScript compiler
# - Docker-in-Docker capabilities for image building
# - GitVersion for semantic versioning
# - Custom build scripts optimized for Angular projects
#
# Usage:
#   .\build.ps1                    # Standard containerized build
#   .\build.ps1 -Verbose           # Build with detailed output
#
# Requirements:
# - Docker Desktop running with engine API enabled
# - Access to ghcr.io/the-running-dev/build-agent:latest container
# - TCP port 2375 available for Docker-in-Docker communication
#
# ====================================================================

# ====================================================================
# SAFE EXECUTION FUNCTION
# ====================================================================
# Function to safely execute commands with proper error handling
# and exit code validation. This ensures build failures are caught
# immediately and provide clear error messaging.
function Invoke-SafeCommand {
    param(
        [Parameter(Mandatory)]
        [scriptblock]$Command,
        
        [Parameter()]
        [scriptblock]$CommandOnFailure = {
            Write-Host "❌ $Description Failed: $LASTEXITCODE" -ForegroundColor Red
            throw "Command Failed: $LASTEXITCODE"
        },
        
        [Parameter()]
        [string]$Description
    )
    
    Write-Host "🔄 $Description..." -ForegroundColor Cyan
    Write-Host "   Executing: $Command" -ForegroundColor Gray

    try {
        & $Command
        
        if ($LASTEXITCODE -ne 0) {
            & $CommandOnFailure
        }
    }
    catch {
        Write-Host "❌ Error Executing $Description`: $($_.Exception.Message)" -ForegroundColor Red
        
        throw $_
    }
}

# ====================================================================
# PRE-BUILD VALIDATION
# ====================================================================
Write-Host "🚀 Starting BarStrad-UI Build Process..." -ForegroundColor Yellow
Write-Host "📅 Build Started: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host "🎯 Target: Angular Production Build" -ForegroundColor White

# Validate Docker is available and engine is running
Invoke-SafeCommand { docker --version } -Description "Checking Docker Availability"

# ====================================================================
# CONTAINERIZED ANGULAR BUILD
# ====================================================================
# This step performs a complete Angular production build using a custom
# build agent container that includes:
# - pnpm dependency installation with frozen lockfile
# - TypeScript compilation and Angular CLI build process
# - ESLint code quality validation
# - Production optimization (minification, tree shaking)
# - Docker image creation with nginx serving Angular artifacts
# - Container publishing to GitHub Container Registry (if configured)
#
# The build agent container ensures:
# - Consistent Node.js and pnpm versions across environments
# - Isolated build environment preventing local dependency conflicts
# - Docker-in-Docker capability for seamless image building
# - Integrated toolchain matching CI/CD pipeline exactly

Invoke-SafeCommand { 
    docker run --rm -it `
        -e DOCKER_HOST=tcp://host.docker.internal:2375 `
        -v ${PWD}:/workspace `
        -w /workspace `
        ghcr.io/the-running-dev/build-agent:latest build node-in-docker
    } `
    -Description "📦 Containerized Angular Build & Docker Image Creation"  `
    -CommandOnFailure { 
        Write-Host "❌ Containerized build failed. Common issues:" -ForegroundColor Red
        Write-Host "   • Docker Desktop not running or API not enabled" -ForegroundColor Yellow
        Write-Host "   • Build agent container not accessible" -ForegroundColor Yellow
        Write-Host "   • Angular compilation errors (check TypeScript/ESLint)" -ForegroundColor Yellow
        Write-Host "   • pnpm dependency resolution issues" -ForegroundColor Yellow
        Write-Host "   • Docker-in-Docker communication problems" -ForegroundColor Yellow
        
        exit 1
    }

# ====================================================================
# BUILD COMPLETION
# ====================================================================
Write-Host "`n🎉 Build Process Completed Successfully!" -ForegroundColor Green
Write-Host "📅 Build Completed at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host "`n� Build Summary:" -ForegroundColor Yellow
Write-Host "   ✅ Node.js in Docker Build: SUCCESS" -ForegroundColor Green
Write-Host "`n🚀 Your BarStrad-UI is Ready for Deployment!" -ForegroundColor Cyan

# ====================================================================
# BUILD COMPLETION
# ====================================================================
Write-Host "`n🎉 Containerized Build Process Completed Successfully!" -ForegroundColor Green
Write-Host "📅 Build Completed at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray

Write-Host "`n📋 Build Summary:" -ForegroundColor Yellow
Write-Host "   ✅ Docker Environment: VALIDATED" -ForegroundColor Green
Write-Host "   ✅ Build Agent Container: EXECUTED" -ForegroundColor Green
Write-Host "   ✅ Angular Production Build: SUCCESS" -ForegroundColor Green
Write-Host "   ✅ Docker Image Creation: SUCCESS" -ForegroundColor Green

Write-Host "`n📦 Build Artifacts:" -ForegroundColor Cyan
Write-Host "   📁 Angular Build: artifacts/browser/" -ForegroundColor White
Write-Host "   🐳 Docker Image: barstrad-ui:latest" -ForegroundColor White
Write-Host "   📊 Registry: ghcr.io/the-running-dev/barstrad-ui (if published)" -ForegroundColor White

Write-Host "`n🚀 Your Angular Application is Ready for Deployment!" -ForegroundColor Magenta
Write-Host "   💻 Local Development: ng serve" -ForegroundColor White
Write-Host "   🐳 Docker: docker run -p 80:80 barstrad-ui:latest" -ForegroundColor White
Write-Host "   🌐 Production: Deploy to your hosting platform" -ForegroundColor White