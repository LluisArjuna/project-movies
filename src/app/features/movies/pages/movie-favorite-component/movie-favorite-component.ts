import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites';
import { MovieService } from '../../services/movie-service';
import { MovieDetailUI } from '../../models/movie-details.modal';
import { forkJoin, of, switchMap, map } from 'rxjs';
import { MovieGridComponent } from '../../components/movie-grid-component/movie-grid-component';

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [CommonModule, MovieGridComponent],
  templateUrl: './movie-favorite-component.html'
})
export class FavoriteMoviesComponent {
  private favoritesService = inject(FavoritesService);
  private movieService = inject(MovieService);

  movies$ = this.favoritesService.getFavorites().pipe(
    switchMap((ids: string[]) => {
      if (!ids.length) return of([]);

      const requests = ids.map(id =>
        this.movieService.getMovieDetail(Number(id))
      );

      return forkJoin(requests);
    })
  );

  trackById(index: number, movie: MovieDetailUI) {
    return movie.id;
  }
}