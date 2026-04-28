import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieSearchComponent } from './movie-search-component';

describe('MovieSearchComponent (no spy)', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  let emittedValues: string[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieSearchComponent]
    });

    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;

    emittedValues = [];
    component.search.subscribe(value => emittedValues.push(value));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value after 400ms debounce', fakeAsync(() => {
    component.onInput('jurassic');

    tick(399);
    expect(emittedValues.length).toBe(0);

    tick(1);
    expect(emittedValues).toEqual(['jurassic']);
  }));

  it('should debounce rapid inputs and emit only last value', fakeAsync(() => {
    component.onInput('ju');
    tick(100);

    component.onInput('jura');
    tick(100);

    component.onInput('jurassic');
    tick(100);

    component.onInput('jurassic park');

    tick(399);
    expect(emittedValues.length).toBe(0);

    tick(1);
    expect(emittedValues).toEqual(['jurassic park']);
  }));

  it('should cancel previous debounce when new value arrives', fakeAsync(() => {
    component.onInput('jurassic');
    tick(200);

    component.onInput('jurassic park');

    tick(200);
    expect(emittedValues.length).toBe(0);

    tick(200);
    expect(emittedValues).toEqual(['jurassic park']);
  }));

  it('should update query signal immediately', () => {
    component.onInput('jurassic');
    expect(component.query()).toBe('jurassic');
  });

  it('should clear query and emit empty string after debounce', fakeAsync(() => {
    component.onInput('test');
    tick(400);

    emittedValues = []; 

    component.clear();
    expect(component.query()).toBe('');

    tick(399);
    expect(emittedValues.length).toBe(0);

    tick(1);
    expect(emittedValues).toEqual(['']);
  }));
  
});