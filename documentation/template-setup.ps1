#!/usr/bin/env pwsh
[CmdletBinding()]
param(
    [Parameter()][string]$projectDir = $PSScriptRoot
)

# Handle files with .example fallback
@(
    "sidebars.ts",
    "docusaurus.config.ts"
) | ForEach-Object {
    Write-Host "⚙️ Processing: $_" -ForegroundColor Yellow

    $localPath = Join-Path $projectDir $_
    $localExamplePath = "$localPath.example"

    if (-not (Test-Path $localPath)) {
        try {
            Copy-Item -Path $localExamplePath -Destination $localPath -Force
            Write-Host "  ✓ Copied from .example" -ForegroundColor Green
            Remove-Item -Path $localExamplePath -Force
        }
        catch {
            Write-Error "  ✗ Failed to Copy from .example: $($_.Exception.Message)"
        }
    }

    if (Test-Path $localExamplePath) {
        try {
            Remove-Item -Path $localExamplePath -Force
            Write-Host "  ✓ Removed .example File" -ForegroundColor Green
        }
        catch {
            Write-Error "  ✗ Failed to Remove .example File: $($_.Exception.Message)"
        }
    }
}

Write-Host "Template Setup Completed!" -ForegroundColor Green