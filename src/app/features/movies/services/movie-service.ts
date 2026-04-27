import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieResponse } from '../models/movie-response.model';
import { MovieCredits, MovieDetail, MovieCardUI, MovieDetailUI } from '../models/movie-details.modal';
import { API_CONFIG } from '../../../core/api.config';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { MovieCredit, Person, PersonCredits } from '../models/actor.modal';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private api = inject(ApiService);
  private headers = new HttpHeaders(({
    Authorization: `Bearer ${API_CONFIG.apiKey}`
  }));

  private getImageUrl(path: string | null, size: string = 'w500'): string {
    return path
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : 'assets/no-image.png';
  }

  private mapToUI(movie: Movie): MovieCardUI {
    return {
      id: movie.id,
      title: movie.title,
      posterUrl: this.getImageUrl(movie.poster_path),
      backdropUrl: movie.backdrop_path
        ? this.getImageUrl(movie.backdrop_path, 'w780')
        : null,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      overview: movie.overview,
    };
  }

  private mapToUIDetail(movie: MovieDetail, credits: MovieCredits): MovieDetailUI {

    const director = credits.crew?.find(person => person.job === 'Director');

    return {
      id: movie.id,
      title: movie.title,
      posterUrl: this.getImageUrl(movie.poster_path),
      backdropUrl: movie.backdrop_path
        ? this.getImageUrl(movie.backdrop_path, 'w780')
        : null,

      overview: movie.overview,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      runtime: movie.runtime,

      genres: movie.genres || [],

      director: director
        ? { id: director.id, name: director.name }
        : undefined,

      cast: credits.cast.slice(0, 10).map(actor => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profileUrl: this.getImageUrl(actor.profile_path, 'w185')
      }))
    };
  }

  private mapListToUI(movies: Movie[]): MovieCardUI[] {
    return movies.map(movie => this.mapToUI(movie));
  }

  private mapCreditToUI(movie: MovieCredit): MovieCardUI {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: this.getImageUrl(movie.poster_path),
    backdropUrl: null,
    rating: movie.vote_average,
    releaseDate: movie.release_date,
    overview: ''
  };
}

  getPopularMovies(page: number = 1): Observable<MovieCardUI[]> {
    const params = new HttpParams().set('page', page);
    return this.api
      .get<MovieResponse>('/movie/popular', { headers: this.headers, params })
      .pipe(
        map(res => this.mapListToUI(res.results)),
        catchError(this.handleError<MovieCardUI[]>('getPopularMovies', []))
      );
  }

  searchMovies(query: string, page: number = 1): Observable<MovieCardUI[]> {
    return this.api
      .get<MovieResponse>('/search/movie', { query, page })
      .pipe(
        map(res => this.mapListToUI(res.results)),
        catchError(this.handleError<MovieCardUI[]>('searchMovies', []))
      );
  }

  getMovieDetail(id: number): Observable<MovieDetailUI> {
  return forkJoin({
    details: this.api.get<MovieDetail>(`/movie/${id}`),
    credits: this.api.get<MovieCredits>(`/movie/${id}/credits`)
  }).pipe(
    map(({ details, credits }) =>
      this.mapToUIDetail(details, credits)
    )
  );
}
  
  getActorDetail(id: number): Observable<{ person: Person; movies: MovieCardUI[] }> {
    return forkJoin({
      person: this.api.get<Person>(`/person/${id}`),
      credits: this.api.get<PersonCredits>(`/person/${id}/movie_credits`)
    }).pipe(
      map(({ person, credits }) => ({
        person,
        movies: credits.cast.map(movie => this.mapCreditToUI(movie))
      }))
    );
  }

  private handleError<T>(operation: string, result: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result);
    };
  }
}
