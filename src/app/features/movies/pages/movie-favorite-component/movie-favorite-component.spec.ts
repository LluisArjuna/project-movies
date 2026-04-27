import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFavoriteComponent } from './movie-favorite-component';

describe('MovieFavoriteComponent', () => {
  let component: MovieFavoriteComponent;
  let fixture: ComponentFixture<MovieFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieFavoriteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieFavoriteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
