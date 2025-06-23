import { Routes } from '@angular/router';
import { MovieListComponent } from './pages/movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './pages/movies/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./pages/calendar/upcoming-movies.component').then(m => m.UpcomingMoviesComponent)
  }
];
