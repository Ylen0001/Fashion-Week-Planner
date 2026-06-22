# FW Planner

Fullstack web application to manage showroom appointments during Fashion Week.

## Overview

FW Planner helps buyers, stylists, and fashion professionals organize their showroom schedules.

Users can:

- create an account and log in securely
- create, view, edit, and delete appointments
- manage a personal schedule with per-user data isolation

---

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React (Vite), React Router, Fetch API |
| Backend | Node.js, Express |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT (bcrypt passwords, token in `localStorage`) |

---

## Project Structure

```
client/                 # React frontend (Vite)
  src/
    components/
    pages/
    App.jsx

server/                 # Express API
  src/
    routes/
      auth.js
      appointments.js
    middleware/
      middleware.js
    lib/
      prisma.js
  prisma/
    schema.prisma
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ylen0001/Fashion-Week-Planner.git
cd Fashion-Week-Planner
```

### 2. Install dependencies

```bash
make install
```

Or manually:

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Backend setup

```bash
cd server
cp .env.example .env
```

Set in `server/.env`:

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
```

Run migrations:

```bash
npx prisma migrate dev
npm run dev
```

### 4. Frontend setup

```bash
cd client
cp .env.example .env
```

Set in `client/.env`:

```
VITE_API_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

### 5. Run both (from repo root)

```bash
make dev
```

---

## API Endpoints

### Auth

```
POST /auth/signup
POST /auth/login
GET  /auth/me          (protected)
```

### Appointments (protected)

```
GET    /appointments
POST   /appointments
PUT    /appointments/:id
DELETE /appointments/:id
```

Protected routes require:

```
Authorization: Bearer <token>
```

---

## Authentication Flow

```
Login → backend returns JWT
     → frontend stores token in localStorage

Page reload → GET /auth/me restores user profile

Subsequent requests → Authorization: Bearer <token>
                     → middleware verifies JWT
```

---

## Deployment

| Service | Role |
|---------|------|
| Vercel | Frontend (`client/`) — set `VITE_API_URL` to your API URL at build time |
| Render | Backend (`server/`) — set `DATABASE_URL`, `JWT_SECRET` |

Both should auto-deploy on push to `main` when connected to GitHub.

---

## Current Status

- JWT authentication with session rehydration (`/auth/me`)
- User-scoped appointments (CRUD including edit)
- CI: lint + build (frontend), lint + Prisma validate (backend)

---

## Author

Yoann — Fullstack developer in training (École 42)

Project built as part of a personal portfolio.
