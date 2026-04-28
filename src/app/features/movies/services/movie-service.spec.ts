import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MovieService } from './movie-service';
import { ApiService } from '../../../core/api.service';

describe('MovieService - getMovieDetail', () => {
  let service: MovieService;
  let apiServiceMock: any;

  beforeEach(() => {
    apiServiceMock = {
      get: jasmine.createSpy('get')
    };

    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: ApiService, useValue: apiServiceMock }
      ]
    });

    service = TestBed.inject(MovieService);
  });

  afterEach(() => {
    apiServiceMock.get.calls.reset();
  });

  it('should fetch details and credits and map to UI model', (done) => {
    const mockDetails = {
      id: 1,
      title: 'Test Movie',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      overview: 'Overview',
      vote_average: 8,
      release_date: '2024-01-01',
      runtime: 120,
      genres: [{ id: 1, name: 'Action' }]
    };

    const mockCredits = {
      cast: [
        {
          id: 10,
          name: 'Actor 1',
          character: 'Hero',
          profile_path: '/actor.jpg'
        }
      ],
      crew: [
        {
          id: 99,
          name: 'Director Name',
          job: 'Director'
        }
      ]
    };

    // forkJoin calls happen in order → mock sequential returns
    apiServiceMock.get.and.returnValues(
      of(mockDetails),
      of(mockCredits)
    );

    service.getMovieDetail(1).subscribe(result => {
      // ✅ API calls
      expect(apiServiceMock.get.calls.count()).toBe(2);
      expect(apiServiceMock.get.calls.argsFor(0)[0]).toBe('/movie/1');
      expect(apiServiceMock.get.calls.argsFor(1)[0]).toBe('/movie/1/credits');

      // ✅ Mapping
      expect(result.id).toBe(1);
      expect(result.title).toBe('Test Movie');
      expect(result.posterUrl).toContain('w500');
      expect(result.backdropUrl).toContain('w780');

      // ✅ Director mapping
      expect(result.director?.name).toBe('Director Name');

      // ✅ Cast mapping
      expect(result.cast.length).toBe(1);
      expect(result.cast[0].name).toBe('Actor 1');
      expect(result.cast[0].profileUrl).toContain('w185');

      done();
    });
  });

  it('should limit cast to 10 actors', (done) => {
    const mockDetails = { id: 1 } as any;

    const mockCredits = {
      cast: Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        name: `Actor ${i}`,
        character: 'Role',
        profile_path: '/actor.jpg'
      })),
      crew: []
    };

    apiServiceMock.get.and.returnValues(
      of(mockDetails),
      of(mockCredits)
    );

    service.getMovieDetail(1).subscribe(result => {
      expect(result.cast.length).toBe(10);
      done();
    });
  });

  it('should handle missing director', (done) => {
    const mockDetails = { id: 1 } as any;

    const mockCredits = {
      cast: [],
      crew: []
    };

    apiServiceMock.get.and.returnValues(
      of(mockDetails),
      of(mockCredits)
    );

    service.getMovieDetail(1).subscribe(result => {
      expect(result.director).toBeUndefined();
      done();
    });
  });

  it('should handle empty cast safely', (done) => {
    const mockDetails = { id: 1 } as any;

    const mockCredits = {
      cast: [],
      crew: []
    };

    apiServiceMock.get.and.returnValues(
      of(mockDetails),
      of(mockCredits)
    );

    service.getMovieDetail(1).subscribe(result => {
      expect(result.cast).toEqual([]);
      done();
    });
  });
});