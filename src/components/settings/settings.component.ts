// src/app/settings/settings.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserPreferencesService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    settingsForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userPreferencesService: UserPreferencesService
    ) {
        this.settingsForm = this.fb.group({
            theme: [this.userPreferencesService.getPreference('theme') || 'light', Validators.required],
            language: [this.userPreferencesService.getPreference('language') || 'en', Validators.required]
        });
    }

    ngOnInit(): void {
        // Load initial preferences and update form if needed
        const currentTheme = this.userPreferencesService.getPreference('theme') || 'light';
        const currentLanguage = this.userPreferencesService.getPreference('language') || 'en';
        
        this.settingsForm.patchValue({
            theme: currentTheme,
            language: currentLanguage
        });
    }

    savePreferences(): void {
        if (this.settingsForm.valid) {
            const { theme, language } = this.settingsForm.value;
            this.userPreferencesService.setPreference('theme', theme);
            this.userPreferencesService.setPreference('language', language);
        }
    }
}