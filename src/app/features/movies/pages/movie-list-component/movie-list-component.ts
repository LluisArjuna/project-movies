import { Component, inject, signal } from '@angular/core';
import { MovieGridComponent } from '../../components/movie-grid-component/movie-grid-component';
import { CommonModule } from '@angular/common';
import { MovieUI } from '../../models/movie-details.modal';
import { MovieService } from '../../services/movie-service';
import { MovieSearchComponent } from '../../components/movie-search-component/movie-search-component';

@Component({
  selector: 'app-movie-list-component',
  imports: [CommonModule, MovieGridComponent, MovieSearchComponent],
  templateUrl: './movie-list-component.html',
})
export class MovieListComponent {
  private movieService = inject(MovieService);

  movies = signal<MovieUI[]>([]);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  constructor() {
    this.loadPopularMovies();
  }

  loadPopularMovies() {
    this.loading.set(true);
    this.error.set(false);

    this.movieService.getPopularMovies().subscribe({
      next: (movies) => {
        this.movies.set(movies);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  onSearch(query: string) {
    if (!query || query.trim() === '') {
      this.loadPopularMovies();
      return;
    }

    this.loading.set(true);
    this.error.set(false);

    this.movieService.searchMovies(query).subscribe({
      next: (movies) => {
        this.movies.set(movies);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
