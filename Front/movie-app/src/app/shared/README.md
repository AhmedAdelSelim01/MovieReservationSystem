# Project Structure Documentation

## Overview

This project uses a feature-based architecture with shared components and services for maximum reusability and scalability.

## Directory Structure

### `/layouts`

Contains layout components that wrap different sections of the app:

- **main-layout**: Used for most pages (has navbar and footer)
- **auth-layout**: Used for authentication pages (full-screen, no navbar/footer)

### `/features`

Contains feature modules organized by domain:

#### `/features/auth`

Authentication-related pages and services

- `pages/`: Login, Register pages
- `services/`: Auth API calls, auth state
- `guards/`: Route guards for protected routes
- `components/`: Shared auth components

#### `/features/movies`

Movie browsing and details

- `pages/`: Now Showing, Upcoming, Movie Details pages
- `components/`: Movie Card and other movie-specific components
- `services/`: Movie API calls

#### `/features/admin`

Admin dashboard and management

- `pages/`: Admin dashboard
- `components/`: Admin-specific components
- `services/`: Admin API calls
- `guards/`: Admin role verification

### `/shared`

Reusable code across the entire app:

- `components/`: Reusable UI components (buttons, modals, cards, etc.)
- `services/`: Common services like API client, HTTP interceptors
- `models/`: TypeScript interfaces and types
- `pipes/`: Custom Angular pipes
- `directives/`: Custom Angular directives

## Routing Structure

```
/auth/login          → AuthLayout
/auth/register       → AuthLayout

/                    → MainLayout
├── /movies/now-showing
├── /movies/upcoming
├── /movies/details/:id
└── /admin/dashboard
```

## How to Add New Features

1. Create a new folder under `/features/[feature-name]`
2. Add subdirectories: `pages/`, `components/`, `services/`, `guards/`
3. Create a `[feature-name].routes.ts` file
4. Import and register routes in `app.routes.ts`

## How to Create Reusable Components

1. Create component in `/shared/components/[component-name]/`
2. Make it standalone and export properly
3. Import in any feature that needs it

Example:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-button',
  standalone: true,
  templateUrl: './my-button.html',
  styleUrl: './my-button.css',
})
export class MyButton {}
```
