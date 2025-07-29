// src/app/services/menu.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuCategory, MenuItem } from '../models';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    constructor(private http: HttpClient) {}

    getCategories(language: string): Observable<MenuCategory[]> {
        const filePath = `assets/i18n/menu-categories.${language}.json`;

        return this.http.get<MenuCategory[]>(filePath);
    }
    
    getItems(language: string): Observable<MenuItem[]> {
        const filePath = `assets/i18n/menu-items.${language}.json`;
        
        return this.http.get<MenuItem[]>(filePath);
    }
}