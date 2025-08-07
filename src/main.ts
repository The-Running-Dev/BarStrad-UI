// main.ts file is the entry point of the application.
// It is responsible for bootstrapping the application and loading the root module.

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './components/app/app.module';
import { AppRoutes } from './components/app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(AppRoutes),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    provideAnimations(),
    ...(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers || [])
  ]
}).catch((err) => console.error(err));
