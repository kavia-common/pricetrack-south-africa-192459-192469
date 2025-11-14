# Web/Mobile Frontend (React)

User-facing interface for registration, wishlists, dashboards, and analytics. This project is wired to talk to the Spring Boot backend.

## Quickstart

1) Install dependencies:
- npm install
  or
- yarn

2) Create env file:
- cp .env.example .env.local
- Ensure REACT_APP_API_BASE_URL points to backend (default http://localhost:8080)
- Optionally set REACT_APP_APP_NAME

3) Run the dev server:
- npm start
  or
- yarn start
- App runs on http://localhost:3000

4) Verify integration via Dev E2E page:
- Navigate to http://localhost:3000/dev-e2e
- Actions:
  - Signup: sends POST /auth/signup
  - Login: sends POST /auth/login
  - Get Me: GET /users/me with Authorization header
  - Fetch Wishlists: GET /wishlists with Authorization header

The token is stored in localStorage as accessToken and automatically attached to protected requests.

## Environment Variables

- REACT_APP_API_BASE_URL: backend base URL (e.g., http://localhost:8080)
- REACT_APP_APP_NAME: application display name

## Notes

- For CORS to pass, ensure backend .env has FRONTEND_ORIGIN=http://localhost:3000 and restart backend.
- In dev, the backend uses H2 and does not seed products; wishlist add item may require product IDs to exist.
