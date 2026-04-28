import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieGridComponent } from './movie-grid-component';

describe('MovieGridComponent', () => {
  let component: MovieGridComponent;
  let fixture: ComponentFixture<MovieGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieGridComponent]
    });

    fixture = TestBed.createComponent(MovieGridComponent);
    component = fixture.componentInstance;
  });

  it('should render movie cards', () => {
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

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-movie-card')).toBeTruthy();
  });
});