import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from "@angular/fire/auth";
import { provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUn76r7Y2Dx3jFgum0IVEJtKWyzqWvHG4",
  authDomain: "movies-112233.firebaseapp.com",
  projectId: "movies-112233",
  storageBucket: "movies-112233.firebasestorage.app",
  messagingSenderId: "347288037329",
  appId: "1:347288037329:web:6e5daec56a4e31a3ef22f0",
  measurementId: "G-FJGT03HB7Y"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(()=>getFirestore()),
  ]
};  
 