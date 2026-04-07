import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './api-key.interceptor';

export const appConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([apiKeyInterceptor])
    )
  ]
};

export const API_CONFIG = {
  baseUrl: 'https://api.themoviedb.org/3',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/',
  apiKey: 'YOUR_API_KEY'
};