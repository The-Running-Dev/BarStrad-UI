import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DiscordNotificationService {
    private webhookUrl: string;
    
    constructor() {
        this.webhookUrl = environment.discordWebhookUrl;
    }

    async sendMessage(message: string, username?: string, avatarUrl?: string, embeds?: never[]): Promise<void> {
        try {
            const payload = {
                content: message,
                username: username || 'OrderBot',
                avatar_url: avatarUrl || '',
                embeds: embeds || []
            };

            await axios.post(this.webhookUrl, payload);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error Sending Message:', error.response?.data || error.message);
            } else {
                console.error('Unexpected Error:', error);
            }
        }
    }
}