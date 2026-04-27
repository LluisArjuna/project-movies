import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, user } from '@angular/fire/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { Observable, of, switchMap, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter, take } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private app = inject(FirebaseApp);
  private auth = inject(Auth);
  private firestore = getFirestore(this.app);

  user$ = user(this.auth);

  async addFavorite(itemId: string) {
    const currentUser = await firstValueFrom(
      this.user$.pipe(
        filter((u): u is NonNullable<typeof u> => u !== null),
        take(1)
      )
    );

    const ref = doc(this.firestore, 'users', currentUser.uid, 'favorites', itemId);

    await setDoc(ref, {
      itemId,
      createdAt: serverTimestamp()
    });
  }

  async removeFavorite(itemId: string) {
    const currentUser = await firstValueFrom(
      this.user$.pipe(
        filter((u): u is NonNullable<typeof u> => u !== null),
        take(1)
      )
    );

    const ref = doc(this.firestore, 'users', currentUser.uid, 'favorites', itemId);
    await deleteDoc(ref);
  }

  getFavorites(): Observable<string[]> {
    return this.user$.pipe(
      switchMap(currentUser => {
        if (!currentUser) return of([]);

        return new Observable<string[]>(subscriber => {
          const ref = collection(this.firestore, 'users', currentUser.uid, 'favorites');

          const unsubscribe = onSnapshot(
            ref,
            snapshot => {
              const ids = snapshot.docs.map(doc => doc.data()['itemId'] as string);
              subscriber.next(ids);
            },
            error => {
              console.error('Error leyendo favoritos:', error);
              subscriber.error(error);
            }
          );

          return () => unsubscribe();
        });
      })
    );
  }

  isFavorite(itemId: string): Observable<boolean> {
    return this.getFavorites().pipe(
      map(items => items.includes(itemId))
    );
  }
}