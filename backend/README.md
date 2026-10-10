# Al Huda Trust Backend

Node.js + Express + MongoDB backend. Architecture: Route -> Middleware -> Controller -> Service -> Model.

## Run

1. Copy `.env.example` to `.env` and update `JWT_SECRET` / `MONGO_URI`.
2. `npm install`
3. `npm run seed`
4. `npm run dev`

API: `http://localhost:5000`
Health: `GET /api/health`

Seed admin: `admin@alhudatrust.local` / `ChangeMe123!` (change it immediately in a real deployment).
