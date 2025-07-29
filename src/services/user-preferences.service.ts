// src/app/services/user-preferences.service.ts

import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserPreferencesService {
    constructor(private storageService: StorageService) { }

    setPreference(key: string, value: string): void {
        this.storageService.setItem(key, value);
    }

    getPreference(key: string): string | null {
        return this.storageService.getItem(key);
    }

    removePreference(key: string): void {
        this.storageService.removeItem(key);
    }

    clearPreferences(): void {
        this.storageService.clear();
    }

    // New method for setting notification preferences
    setNotificationPreference(enabled: boolean): void {
        this.storageService.setItem('notifications', JSON.stringify(enabled));
    }

    // New method for getting notification preferences
    getNotificationPreference(): boolean {
        const preference = this.storageService.getItem('notifications');
        return preference ? JSON.parse(preference) : false;
    }
}