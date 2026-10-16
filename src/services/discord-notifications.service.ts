import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscordNotificationService {
  // Same-origin relay: nginx forwards the post to the Discord webhook, whose
  // URL stays on the server (nginx/templates/default.conf.template).
  private readonly notifyUrl = 'api/notify';

  private lastSentAt = 0;

  async sendMessage(
    message: string,
    username?: string,
    avatarUrl?: string,
    embeds?: never[]
  ): Promise<void> {
    // Input validation and sanitization
    if (!message || typeof message !== 'string' || message.length > 2000) {
      throw new Error('Invalid message length');
    }

    // Basic sanitization: remove control characters
    // Remove non-printable ASCII except newline and carriage return
    const sanitizedMessage = message
      .replace(/[^\x20-\x7E\r\n]/g, '')
      .substring(0, 2000);
    let sanitizedUsername = username || 'OrderBot';

    sanitizedUsername = sanitizedUsername
      .replace(/[^\x20-\x7E]/g, '')
      .substring(0, 80);
    let sanitizedAvatarUrl = avatarUrl || '';

    if (sanitizedAvatarUrl && typeof sanitizedAvatarUrl === 'string') {
      // Only allow http/https URLs
      if (!/^https?:\/\//.test(sanitizedAvatarUrl)) {
        sanitizedAvatarUrl = '';
      }
    }

    // Rate limiting (basic in-memory, per instance)
    if (!this.lastSentAt) this.lastSentAt = 0;

    const now = Date.now();

    if (now - this.lastSentAt < 1000) {
      // 1 message per second
      throw new Error('Rate limit exceeded');
    }

    this.lastSentAt = now;

    try {
      const payload = {
        content: sanitizedMessage,
        username: sanitizedUsername,
        avatar_url: sanitizedAvatarUrl,
        embeds: embeds || []
      };

      await axios.post(this.notifyUrl, payload);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error Sending Message:',
          error.response?.data || error.message
        );
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  }
}
