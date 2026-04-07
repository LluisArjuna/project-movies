import { HttpInterceptorFn } from '@angular/common/http';
import { API_CONFIG } from './api.config';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setParams: {
      api_key: API_CONFIG.apiKey
    }
  });

  return next(modifiedReq);
};