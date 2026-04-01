# Movie Reservation System - Architecture Guide

## Professional Project Structure

Your project has been restructured following Angular best practices for scalability and reusability.

## Architecture Overview

```
src/app/
├── layouts/                    # Layout wrappers
│   ├── main-layout/           # Navbar + Content + Footer
│   └── auth-layout/           # Full-screen auth pages
│
├── features/                  # Feature-based modules
│   ├── auth/                  # Authentication
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── services/
│   │   ├── guards/
│   │   └── auth.routes.ts
│   │
│   ├── movies/                # Movie browsing
│   │   ├── pages/
│   │   │   ├── now-showing/
│   │   │   ├── upcoming/
│   │   │   └── movie-details/
│   │   ├── components/        # Movie-specific components
│   │   ├── services/
│   │   └── movies.routes.ts
│   │
│   └── admin/                 # Admin dashboard
│       ├── pages/
│       │   └── dashboard/
│       ├── components/
│       ├── services/
│       ├── guards/
│       └── admin.routes.ts
│
├── shared/                    # Reusable code
│   ├── components/           # Reusable UI components
│   ├── services/             # Common services (API, HTTP, etc.)
│   ├── models/               # TypeScript interfaces/types
│   ├── pipes/                # Custom pipes
│   ├── directives/           # Custom directives
│   └── README.md
│
├── app.routes.ts             # Main route configuration
├── app.ts                    # Root component
├── app.html                  # Root template (router-outlet)
└── app.config.ts             # App configuration
```

## Routing Flow

```
URL Path                 → Layout          → Component
────────────────────────────────────────────────────────
/auth/login              → AuthLayout      → Login Page
/auth/register           → AuthLayout      → Register Page
/                        → MainLayout      → (redirect to /movies/now-showing)
/movies/now-showing      → MainLayout      → NowShowing Page
/movies/upcoming         → MainLayout      → Upcoming Page
/movies/details/:id      → MainLayout      → Movie Details Page
/admin/dashboard         → MainLayout      → Admin Dashboard
```

## Key Features of This Structure

✅ **Feature Isolation** - Each feature is independent and self-contained
✅ **Lazy Loading Ready** - Easy to implement lazy loading for features
✅ **Component Reusability** - Shared components in one clear location
✅ **Scalability** - Simple to add new features or pages
✅ **Clean Separation** - Pages, services, guards, and components are organized
✅ **Professional Standards** - Follows Angular best practices

## How to Use

### Adding a New Page to a Feature

Example: Adding a "Forgot Password" page to auth feature

1. Create folder: `features/auth/pages/forgot-password/`
2. Create files:
   ```
   forgot-password.ts
   forgot-password.html
   forgot-password.css
   ```
3. Update `features/auth/auth.routes.ts`:
   ```typescript
   {
     path: 'forgot-password',
     loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword),
   }
   ```

### Creating a Reusable Component

Example: Creating a Movie Card button in shared

1. Create folder: `shared/components/movie-card/`
2. Create files:
   ```
   movie-card.ts
   movie-card.html
   movie-card.css
   ```
3. Use in any feature:

   ```typescript
   import { MovieCard } from '../../shared/components/movie-card/movie-card';

   @Component({
     imports: [MovieCard],
     // ...
   })
   ```

### Implementing Route Guards

Example: Protecting admin routes

1. Use the guard in `admin.routes.ts`:

   ```typescript
   import { AdminGuard } from './guards/admin.guard';

   {
     path: 'dashboard',
     component: Dashboard,
     canActivate: [AdminGuard],
   }
   ```

2. Implement `admin.guard.ts` with your logic

## Next Steps

- Move existing components to `/shared/components/`
- Implement services for API calls
- Add route guards for authentication
- Create reusable UI components (buttons, modals, cards, etc.)
- Set up HTTP interceptors in shared services

---

**Note**: The current page components (now-showing, upcoming, etc.) are temporarily referenced from their old locations. You can move them to the shared components directory once fully transitioned.
