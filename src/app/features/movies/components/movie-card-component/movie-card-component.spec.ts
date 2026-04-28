import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card-component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieCardComponent]
    });

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
  });

  it('should extract year from release date', () => {
    fixture.componentRef.setInput('movie', {
      id: 1,
      title: 'Test',
      posterUrl: '',
      backdropUrl: null,
      rating: 0,
      releaseDate: '2024-01-01',
      overview: ''
    });
    fixture.detectChanges();
    expect(component.year).toBe('2024');
  });

  it('should return empty string for invalid date', () => {
    fixture.componentRef.setInput('movie', {
      id: 1,
      title: 'Test',
      posterUrl: '',
      backdropUrl: null,
      rating: 0,
      releaseDate: 'invalid date',
      overview: ''
    });
    fixture.detectChanges();
    expect(component.year).toBe('');
  });

  it('should return empty string when no date', () => {
    fixture.componentRef.setInput('movie', {
      id: 1,
      title: 'Test',
      posterUrl: '',
      backdropUrl: null,
      rating: 0,
      releaseDate: '',
      overview: ''
    });
    fixture.detectChanges();
    expect(component.year).toBe('');
  });
});