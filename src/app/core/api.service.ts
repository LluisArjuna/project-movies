import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from './api.config';

@Injectable({ 
    providedIn: 'root' 
})

export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl;

  get<T>(endpoint: string, params: Record<string, any> = {}) {
    let httpParams = new HttpParams()
      .set('api_key', API_CONFIG.apiKey);

    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      params: httpParams
    });
  }
}