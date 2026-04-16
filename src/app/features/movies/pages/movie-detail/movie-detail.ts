import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MovieCardUI, MovieDetailUI } from '../../models/movie-details.modal';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './movie-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetail {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie = signal<MovieDetailUI | null>(null);
  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovieDetail(id).subscribe(movie => {
      this.movie.set(movie);
      this.loading.set(false);
    });
  }
}
