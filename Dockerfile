# Use the official nginx image
FROM nginx:alpine

ENV artifactsDir=./artifacts

# The Discord webhook for order notifications is read at container start,
# never at build time, so it is never baked into the browser bundle.
# Empty by default: /api/notify then answers 503 instead of nginx failing
# to start. NGINX_ENTRYPOINT_LOCAL_RESOLVERS makes the entrypoint export the
# container's DNS servers for the template's resolver directive.
ENV DiscordWebhookUrl=""
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1

# Site configuration, rendered by the nginx entrypoint at container start
COPY nginx/templates/ /etc/nginx/templates/

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the built application from the artifacts directory
COPY $artifactsDir/browser .

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]