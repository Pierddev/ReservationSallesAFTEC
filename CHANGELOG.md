# Changelog

## [0.1.0] - 2026-06-15

### Added
- **Authentication**: register, login, logout, JWT session restoration via `GET /api/me`
- **JWT middleware** with cookie-based token management
- **Role-based dashboard** routing and authentication guard
- **Frontend**: login/register pages with validation, Pinia auth store, Axios + Vite proxy
- **Backend**: TypeORM entities, database seeder (Faker), Zod DTOs
- **API documentation**: Swagger + Redoc via swagger-jsdoc
- **CI**: GitFlow workflow, Biome code quality checks, Jest test infrastructure
- **Entities**: équipements, réservations, rôles, utilisateurs

### Changed
- Routes standardisées sous le préfixe `/api`
- Table names en snake_case
- Refactored card layout utilities (frontend)

### Fixed
- API route consistency across backend and frontend proxy

### Infrastructure
- Express 5, Vue 3, Tailwind CSS v4, TypeORM, MySQL
- Postman collections for API testing
