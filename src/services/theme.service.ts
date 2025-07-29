// src/app/services/theme.service.ts

import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(private storageService: StorageService) {}

    setTheme(theme: string) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        }
        this.storageService.setItem('theme', theme);
    }

    getTheme(): string {
        return this.storageService.getItem('theme') || 'dark';
    }

    applyTheme() {
        const theme = this.getTheme();
        this.setTheme(theme);
    }
}