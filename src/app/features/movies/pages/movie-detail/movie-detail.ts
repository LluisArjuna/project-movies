import { ChangeDetectionStrategy, Component, inject, Injector, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MovieDetailUI } from '../../models/movie-details.modal';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FavoritesService } from '../../services/favorites';
import { map, switchMap, take } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-detail',
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './movie-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetail {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);

  private injector = inject(Injector);

  movie = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.movieService.getMovieDetail(id))
    ),
    { initialValue: null, injector: this.injector }
  );

  favorites = toSignal(this.favoritesService.getFavorites(), { initialValue: [], injector: this.injector });
  isFavorite = (id: number) => this.favorites().includes(String(id));

  toggleFavorite(movie: MovieDetailUI) {
    const itemId = movie.id.toString();
    const favs = this.favorites();

    if (favs.includes(itemId)) {
      this.favoritesService.removeFavorite(itemId);
    } else {
      this.favoritesService.addFavorite(itemId);
    }
  }
}
