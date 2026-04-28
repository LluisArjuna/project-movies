import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ActorDetailComponent } from './actor-detail-component';
import { MovieService } from '../../services/movie-service';

describe('ActorDetailComponent', () => {
  let component: ActorDetailComponent;
  let fixture: ComponentFixture<ActorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: MovieService,
          useValue: new MovieService()
        }
      ]
    });

    fixture = TestBed.createComponent(ActorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load actor data on init', () => {
    const actor = component.actor();

    expect(actor).not.toBeNull();
    expect(actor?.name).toBe('Actor Name');
  });

  it('should load actor movies', () => {
    expect(component.movies().length).toBe(1);
    expect(component.movies()[0].title).toBe('Movie');
  });

  it('should set loading to false after fetch', () => {
    expect(component.loading()).toBe(false);
  });
});