import { Routes } from '@angular/router';

export const moviesRoutes: Routes = [
  {
    path: 'now-showing',
    loadComponent: () => import('./pages/now-showing/now-showing').then((m) => m.NowShowing),
  },
  {
    path: 'upcoming',
    loadComponent: () => import('./pages/upcoming/upcoming').then((m) => m.Upcoming),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/movie-details/movie-details').then((m) => m.MovieDetails),
  },
];
