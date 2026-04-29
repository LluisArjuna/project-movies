import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesComponent } from './movie-favorite-component';

describe('FavoriteMoviesComponent', () => {
  let component: FavoriteMoviesComponent;
  let fixture: ComponentFixture<FavoriteMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMoviesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteMoviesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
