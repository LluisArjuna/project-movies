import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-search-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSearchComponent {
  
  search = output<string>();
  query = signal('');

  private searchSubject = new Subject<string>();

  // input handler
  onInput(value: string) {
    this.query.set(value);
    this.searchSubject
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(value => this.search.emit(value));
  }

  clear() {
    this.query.set('');
    this.searchSubject.next('');
  }
}
