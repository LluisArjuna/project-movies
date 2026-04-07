import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from './api.config';

@Injectable({ 
    providedIn: 'root' 
})

export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl;

  get<T>(endpoint: string, params: any = {}) {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params });
  }
}