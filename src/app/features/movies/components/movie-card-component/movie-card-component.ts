import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MovieUI } from '../../models/movie-details.modal';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  movie = input.required<MovieUI>();
  
  get year(): string {
    return this.movie().releaseDate
      ? new Date(this.movie().releaseDate).getFullYear().toString()
      : '';
  }
}
