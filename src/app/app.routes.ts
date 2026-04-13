import { Routes } from '@angular/router';
import { MovieListComponent } from './features/movies/pages/movie-list-component/movie-list-component';

export const routes: Routes = [
    {path: '', component: MovieListComponent},
    {path: 'movies', component: MovieListComponent},
    /*
    {path: 'movies/:movieId', component: MovieDetails},
    {path: 'favorites', component: FavoriteMoviesComponent},
*/
    {path: '**', redirectTo: ''}
];
