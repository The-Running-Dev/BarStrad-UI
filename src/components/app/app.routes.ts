// 
import { AppComponent } from './app.component';
import { SettingsComponent } from '../settings/settings.component';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'settings', component: SettingsComponent }
];