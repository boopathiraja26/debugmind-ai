# DebugMind AI — Frontend (Phase 5: Foundation + Authentication)

React 19 + Vite frontend for DebugMind AI. This phase covers project setup,
routing, the Axios API layer, authentication (register/login/logout/auto-login),
protected routes, and the public marketing Home page. The AI Analysis
Dashboard, History, and Profile pages are built in the next phase and will
replace `DashboardPlaceholder`.

## Folder structure

```
src/
├── assets/
├── components/
│   ├── common/        # DiffPanel (shared visual, not tied to one page)
│   ├── layout/         # Navbar, Footer, Layout
│   └── ui/               # Button, Input, Card, Spinner (design system primitives)
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   └── DashboardPlaceholder.jsx   # temporary, replaced next phase
├── context/
│   └── AuthContext.jsx
├── services/
│   ├── api.js            # Axios instance + interceptors
│   └── authService.js    # /api/auth/* request functions
├── hooks/
│   └── useAuth.js
├── utils/
│   ├── constants.js
│   ├── token.js
│   └── validators.js
├── routes/
│   └── ProtectedRoute.jsx
├── App.jsx
└── main.jsx
```

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your backend
npm run dev
```

Requires the DebugMind AI backend running (default `http://localhost:5000/api`).

## Auth flow

- `POST /api/auth/register` and `POST /api/auth/login` are called via
  `services/authService.js`.
- On success, the JWT is stored via `utils/token.js` (localStorage) and the
  Axios instance in `services/api.js` attaches it as `Authorization: Bearer <token>`
  to every request automatically.
- On app load, `AuthContext` calls `GET /api/auth/me` with any stored token to
  restore the session ("auto login") and clears it if the token is invalid or
  expired.
- A 401 response from any request clears the session and redirects to
  `/login`.
- `ProtectedRoute` guards `/dashboard` and any future authenticated routes.

## Design system

Dark, developer-tool aesthetic. Palette: near-black charcoal base (`#0B0F14`),
amber brand accent (`#F5B942`), plus a green/red diff pairing (`#3DDC97` /
`#FF5D5D`) used for the signature before/after code diff motif on the Home
hero. Typography: Sora (display), Inter (body), JetBrains Mono (code/labels).
