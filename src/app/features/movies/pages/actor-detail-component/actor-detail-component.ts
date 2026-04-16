import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MovieGridComponent } from '../../components/movie-grid-component/movie-grid-component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MovieCardUI } from '../../models/movie-details.modal';

@Component({
  selector: 'app-actor-detail-component',
  imports: [CommonModule, MovieGridComponent],
  templateUrl: './actor-detail-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorDetailComponent {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  actor = signal<any | null>(null);
  movies = signal<MovieCardUI[]>([]);
  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getActorDetail(id).subscribe(({ person, movies }) => {
      this.actor.set(person);
      this.movies.set(movies);
      this.loading.set(false);
    });
  }

  // helper imatge
  getImage(path: string | null) {
    return path
      ? `https://image.tmdb.org/t/p/w300${path}`
      : 'assets/no-image.png';
  }
}

