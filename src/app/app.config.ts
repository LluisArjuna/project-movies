import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';  

import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from "@angular/fire/auth";
import { provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(()=>getFirestore()),
  ]
};  
 