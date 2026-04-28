import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/features/firestore/services/firestore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

  private authService = inject(AuthService);

  user$ = this.authService.user$; // Observable d’usuari

  logout() {
    this.authService.logout();
  }
}
