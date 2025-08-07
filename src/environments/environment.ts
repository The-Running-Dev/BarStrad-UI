export const environment = {
  production: process.env['NODE_ENV'] === 'production',
  discordWebhookUrl: process.env['DiscordWebhookUrl'] || ''
};
