Clear-Host

# Check if the container is already running
$container = & docker ps -a --filter "name=barstrad-ui" --format "{{.ID}}"

if ($container) {
    # Stop and remove the existing container
    & docker stop $container | Out-Null
    & docker rm $container | Out-Null
}

& docker run `
    --name barstrad-ui `
    -p 8080:80 `
    -e DiscordWebhookUrl=${env:DiscordWebhookUrl} `
    --dns 8.8.8.8 `
    --dns 8.8.4.4 `
    --restart unless-stopped `
    -t ghcr.io/the-running-dev/barstrad-ui:latest