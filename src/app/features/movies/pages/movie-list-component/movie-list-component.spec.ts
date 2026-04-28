import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { MovieListComponent } from './movie-list-component';
import { MovieService } from '../../services/movie-service';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  let movieServiceMock: {
    getPopularMovies: () => any;
    searchMovies: (query: string) => any;
  };

  beforeEach(() => {
    movieServiceMock = {
      getPopularMovies: () => of([]),
      searchMovies: () => of([])
    };

    TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceMock }
      ]
    });

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should load popular movies on init', () => {
    let called = false;

    movieServiceMock.getPopularMovies = () => {
      called = true;
      return of([]);
    };

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;

    expect(called).toBe(true);
  });

  it('should set movies on successful load', () => {
    const mockMovies = [
      { id: 1, title: 'Movie A' }
    ] as any;

    movieServiceMock.getPopularMovies = () => of(mockMovies);

    component.loadPopularMovies();

    expect(component.movies()).toEqual(mockMovies);
    expect(component.loading()).toBe(false);
    expect(component.error()).toBe(false);
  });

  it('should set error state when popular movies fail', () => {
    movieServiceMock.getPopularMovies = () =>
      throwError(() => new Error('fail'));

    component.loadPopularMovies();

    expect(component.error()).toBe(true);
    expect(component.loading()).toBe(false);
  });

  
  it('should handle search error', () => {
    movieServiceMock.searchMovies = () =>
      throwError(() => new Error('search failed'));

    component.onSearch('batman');

    expect(component.error()).toBe(true);
    expect(component.loading()).toBe(false);
  });
});