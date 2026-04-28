import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetail } from './movie-detail';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { FavoritesService } from '../../services/favorites';

describe('MovieDetail', () => {
  let component: MovieDetail;
  let fixture: ComponentFixture<MovieDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => '1'
            })
          }
        },
        { provide: MovieService, useClass: MovieDetail },
        { provide: FavoritesService, useClass: FavoritesService }
      ]
    });

    fixture = TestBed.createComponent(MovieDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load movie from route param', () => {
    const movie = component.movie();

    expect(movie).not.toBeNull();
    expect(movie?.id).toBe(1);
  });

  it('should have empty favorites initially', () => {
    expect(component.favorites()).toEqual([]);
  })
  it('should add movie to favorites', () => {
    const movie = component.movie()!;
    component.toggleFavorite(movie);

    expect(component.isFavorite(movie.id)).toBe(true);
  });
  
  it('should remove movie from favorites', () => {
    const movie = component.movie()!;

    component.toggleFavorite(movie); // add
    component.toggleFavorite(movie); // remove

    expect(component.isFavorite(movie.id)).toBe(false);
  });
});