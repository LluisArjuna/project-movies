import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MovieCardComponent } from '../movie-card-component/movie-card-component';
import { CommonModule } from '@angular/common';
import { MovieCardUI } from '../../models/movie-details.modal';

@Component({
  selector: 'app-movie-grid',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-grid-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieGridComponent {
  movies = input.required<MovieCardUI[]>();
}
