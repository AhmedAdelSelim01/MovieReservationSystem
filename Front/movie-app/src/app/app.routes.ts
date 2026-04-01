import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authRoutes } from './features/auth/auth.routes';
import { moviesRoutes } from './features/movies/movies.routes';
import { adminRoutes } from './features/admin/admin.routes';

export const routes: Routes = [
  // Auth routes with auth layout
  {
    path: 'auth',
    component: AuthLayout,
    children: authRoutes,
  },

  // Main app routes with main layout
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'movies',
        children: moviesRoutes,
      },
      {
        path: 'admin',
        children: adminRoutes,
      },
      {
        path: '',
        redirectTo: 'movies/now-showing',
        pathMatch: 'full',
      },
    ],
  },
];
