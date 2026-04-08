import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieResponse } from '../models/movie-response.model';
import { MovieUI } from '../models/movie-details.modal';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private api = inject(ApiService);

  private getImageUrl(path: string | null, size: string = 'w500'): string {
    return path
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : 'assets/no-image.png';
  }

  private mapToUI(movie: Movie): MovieUI {
    return {
      id: movie.id,
      title: movie.title,
      posterUrl: this.getImageUrl(movie.poster_path),
      backdropUrl: movie.backdrop_path
        ? this.getImageUrl(movie.backdrop_path, 'w780')
        : null,
      rating: movie.vote_average,
      releaseDate: movie.release_date
    };
  }

  private mapListToUI(movies: Movie[]): MovieUI[] {
    return movies.map(movie => this.mapToUI(movie));
  }

  // 🔥 1. Pel·lícules populars
  getPopularMovies(page: number = 1): Observable<MovieUI[]> {
    return this.api
      .get<MovieResponse>('/movie/popular', { page })
      .pipe(
        map(res => this.mapListToUI(res.results)),
        catchError(this.handleError<MovieUI[]>('getPopularMovies', []))
      );
  }

  // 🔍 Search movies
  searchMovies(query: string, page: number = 1): Observable<MovieUI[]> {
    return this.api
      .get<MovieResponse>('/search/movie', { query, page })
      .pipe(
        map(res => this.mapListToUI(res.results)),
        catchError(this.handleError<MovieUI[]>('searchMovies', []))
      );
  }

  // 📈 Trending
  getTrendingMovies(): Observable<MovieUI[]> {
    return this.api
      .get<MovieResponse>('/trending/movie/day')
      .pipe(
        map(res => this.mapListToUI(res.results)),
        catchError(this.handleError<MovieUI[]>('getTrendingMovies', []))
      );
  }

  // 🎭 Movies by genre
  getMoviesByGenre(genreId: number, page: number = 1): Observable<MovieUI[]> {
    return this.api
      .get<MovieResponse>('/discover/movie', {
        with_genres: genreId,
        page
      })
      .pipe(
        map(res => this.mapListToUI(res.results)),
        catchError(this.handleError<MovieUI[]>('getMoviesByGenre', []))
      );
  }

  // 🎬 Movie detail
  getMovieById(id: number): Observable<MovieUI | null> {
    return this.api
      .get<Movie>(`/movie/${id}`)
      .pipe(
        map(movie => this.mapToUI(movie)),
        catchError(this.handleError<MovieUI | null>('getMovieById', null))
      );
  }

  private handleError<T>(operation: string, result: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result);
    };
  }
}
