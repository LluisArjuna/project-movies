import { Routes } from '@angular/router';
import { MovieListComponent } from './features/movies/pages/movie-list-component/movie-list-component';
import { MovieDetail } from './features/movies/pages/movie-detail/movie-detail';
import { ActorDetailComponent } from './features/movies/pages/actor-detail-component/actor-detail-component';
import { RegisterComponent } from './features/firestore/components/register/register';
import { LoginComponent } from './features/firestore/components/login/login';
import { FavoriteMoviesComponent } from './features/movies/pages/movie-favorite-component/movie-favorite-component';

export const routes: Routes = [
    {path: '', component: MovieListComponent},
    {path: 'movies', component: MovieListComponent},
    {path: 'movie/:id', component: MovieDetail},
    {path: 'actor/:id', component: ActorDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'favorites', component: FavoriteMoviesComponent},

    {path: '**', redirectTo: ''}
];
