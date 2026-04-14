import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';
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

  private debounceTimeout: any;

  private searchEffect = effect(() => {
    const value = this.query();

    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      this.search.emit(value);
    }, 400);
  });

  onInput(value: string) {
    this.query.set(value);
  }

  clear() {
    this.query.set('');
  }
}
