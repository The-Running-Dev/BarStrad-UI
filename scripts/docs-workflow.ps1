Clear-Host

$basePath = Split-Path $PSScriptRoot -Parent

# Get current git branch
$currentBranch = & git branch --show-current

Write-Host "🔍 Testing CI Workflow Locally" -ForegroundColor Cyan
Write-Host "   Current Branch: $currentBranch" -ForegroundColor White
Write-Host "   Workflow File: .github\workflows\docs.yml" -ForegroundColor White

# Define the event and workflow file
$eventType = "push"
$workflow = Join-Path $basePath '.github\workflows\docs.yml'

# Set environment variables to simulate the correct branch
$env:GITHUB_REF = "refs/heads/$currentBranch"
$env:GITHUB_REF_NAME = $currentBranch

Write-Host "`n🚀 Running act with branch simulation..." -ForegroundColor Yellow
Write-Host "   GITHUB_REF: $env:GITHUB_REF" -ForegroundColor Gray

# Run the Act command with proper branch context
& act -W $workflow $eventType --env GITHUB_REF="refs/heads/$currentBranch" --env GITHUB_REF_NAME="$currentBranch"