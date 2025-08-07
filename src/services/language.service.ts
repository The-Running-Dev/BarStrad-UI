// src/app/services/language.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Default language
  defaultLanguage = 'en';
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  constructor(
    private translate: TranslateService,
    private storageService: StorageService
  ) {
    const storedLanguage =
      this.storageService.getItem('language') || this.defaultLanguage;

    this.currentLanguageSubject = new BehaviorSubject<string>(storedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  setLanguage(language: string) {
    this.currentLanguageSubject.next(language);
    this.translate.use(language);
    this.storageService.setItem('language', language);

    console.warn(`setLanguage: Language Set to: ${language}`);
  }
}
