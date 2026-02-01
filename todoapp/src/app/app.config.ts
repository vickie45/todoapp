import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { provideAnimations } from '@angular/platform-browser/animations'; // Import provideAnimations

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()] // Provide HttpClient and Animations
};
