import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';

import { Firestore, doc, setDoc, docData, serverTimestamp } from '@angular/fire/firestore';

import { Observable, switchMap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$ = authState(this.auth);

  userData$: Observable<any | null> = this.user$.pipe(
    switchMap(user => {
      if (!user) return of(null);

      const ref = doc(this.firestore, `users/${user.uid}`);
      return docData(ref, { idField: 'uid' });
    })
  );

  async register(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name
      });

      await setDoc(doc(this.firestore, 'users', user.uid), {
        uid: user.uid,
        email,
        name,
        createdAt: serverTimestamp()
      });

      return user;

    } catch (error: any) {
      throw new Error(this.mapFirebaseError(error));
    }
  }

  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw new Error(this.mapFirebaseError(error));
    }
  }

  logout() {
    return signOut(this.auth);
  }

  private mapFirebaseError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Aquest email ja està registrat';
      case 'auth/invalid-email':
        return 'Email no vàlid';
      case 'auth/weak-password':
        return 'La contrasenya és massa feble';
      case 'auth/user-not-found':
        return 'Usuari no trobat';
      case 'auth/wrong-password':
        return 'Contrasenya incorrecta';
      default:
        return 'Error inesperat. Torna-ho a intentar';
    }
  }
}