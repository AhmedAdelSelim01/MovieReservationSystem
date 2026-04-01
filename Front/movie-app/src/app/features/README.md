# Features Directory

Each feature module contains all code related to a specific domain/feature.

## Feature Structure

```
feature-name/
├── pages/              # Feature pages/containers
│   └── [page-name]/
│       ├── [page-name].ts
│       ├── [page-name].html
│       └── [page-name].css
├── components/         # Feature-specific components
├── services/           # Feature-specific services & API calls
├── guards/             # Route guards (optional)
├── [feature-name].routes.ts  # Feature routes
```

## Guidelines

- **Pages** should be feature containers that manage state and routing
- **Components** should be reusable within the feature or moved to shared
- **Services** handle API calls and business logic
- **Guards** protect routes (e.g., admin-only access)

## Examples

### Auth Feature

Handles login, registration, and authentication logic

### Movies Feature

Handles displaying movies (now-showing, upcoming) and movie details

### Admin Feature

Handles admin dashboard and management interfaces

---

To add a new page to a feature:

1. Create folder in `pages/[page-name]/`
2. Add `[page-name].ts`, `.html`, `.css`
3. Export from `[feature-name].routes.ts`
