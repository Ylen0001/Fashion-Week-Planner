# FW Planner

Fullstack web application to manage showroom appointments during Fashion Week.

## Overview

FW Planner is a personal tool designed to help buyers, stylists, or fashion professionals organize their showroom schedules.

Users can:

* create an account
* log in securely
* add, view, and delete appointments
* manage their own schedule

Each appointment is linked to a specific user, ensuring data isolation and privacy.

---

## Tech Stack

### Frontend

* React (Vite)
* React Router
* Fetch API

### Backend

* Node.js
* Express

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* JSON Web Tokens (JWT)
* Token stored in `localStorage`
* Protected routes via middleware

---

## Features

### Authentication

* User signup
* User login
* JWT-based authentication
* Protected backend routes

### Appointments

* Create appointment
* Fetch user-specific appointments
* Delete appointment
* Each appointment is linked to a user (`userId`)

---

## Project Structure

<pre class="overflow-visible! px-0!" data-start="1128" data-end="1353"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>frontend/</span><br/><span>  src/</span><br/><span>    components/</span><br/><span>    pages/</span><br/><span>    App.jsx</span><br/><br/><span>backend/</span><br/><span>  src/</span><br/><span>    routes/</span><br/><span>      auth.js</span><br/><span>      appointments.js</span><br/><span>    middleware/</span><br/><span>      authMiddleware.js</span><br/><span>    lib/</span><br/><span>      prisma.js</span><br/><span>  prisma/</span><br/><span>    schema.prisma</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## Installation

### 1. Clone the repository

<pre class="overflow-visible! px-0!" data-start="1406" data-end="1489"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼs">git</span><span> clone https://github.com/your-username/fw-planner.git</span><br/><span class="ͼs">cd</span><span> fw-planner</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 2. Backend setup

<pre class="overflow-visible! px-0!" data-start="1518" data-end="1551"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼs">cd</span><span> server</span><br/><span class="ͼs">npm</span><span> install</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Create a `.env` file:

<pre class="overflow-visible! px-0!" data-start="1576" data-end="1644"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>DATABASE_URL=your_postgres_url</span><br/><span>JWT_SECRET=your_secret_key</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Run Prisma migrations:

<pre class="overflow-visible! px-0!" data-start="1670" data-end="1704"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>npx prisma migrate dev</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Start backend:

<pre class="overflow-visible! px-0!" data-start="1722" data-end="1747"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼs">node</span><span> index.js</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 3. Frontend setup

<pre class="overflow-visible! px-0!" data-start="1777" data-end="1824"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼs">cd</span><span> frontend</span><br/><span class="ͼs">npm</span><span> install</span><br/><span class="ͼs">npm</span><span> run dev</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## API Endpoints

### Auth

<pre class="overflow-visible! px-0!" data-start="1859" data-end="1905"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>POST /auth/signup</span><br/><span>POST /auth/login</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### Appointments (protected)

<pre class="overflow-visible! px-0!" data-start="1937" data-end="2015"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>GET    /appointments</span><br/><span>POST   /appointments</span><br/><span>DELETE /appointments/:id</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

All protected routes require:

<pre class="overflow-visible! px-0!" data-start="2048" data-end="2089"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>Authorization: Bearer <token></span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## Authentication Flow

<pre class="overflow-visible! px-0!" data-start="2120" data-end="2344"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>Login → backend generates JWT</span><br/><span>      → frontend stores token (localStorage)</span><br/><br/><span>Subsequent requests:</span><br/><span>      → frontend sends token in headers</span><br/><span>      → backend verifies token</span><br/><span>      → middleware attaches user to req.user</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## Database Schema (simplified)

<pre class="overflow-visible! px-0!" data-start="2384" data-end="2859"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>model User {</span><br/><span>  id           Int           @id @default(autoincrement())</span><br/><span>  username     String</span><br/><span>  email        String        @unique</span><br/><span>  password     String</span><br/><span>  appointments Appointment[]</span><br/><span>}</span><br/><br/><span>model Appointment {</span><br/><span>  id              Int      @id @default(autoincrement())</span><br/><span>  brandName       String</span><br/><span>  appointmentDate DateTime</span><br/><span>  location        String</span><br/><span>  notes           String?</span><br/><span>  userId          Int</span><br/><span>  user            User     @relation(fields: [userId], references: [id])</span><br/><span>}</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## Current Status

Core features implemented:

* JWT authentication
* Protected routes
* User-specific data handling
* CRUD operations (partial: create, read, delete)

---

## Possible Improvements

* Edit appointments
* Image upload (outfitImageUrl)
* Better UI/UX (loading states, error handling)
* Persistent login (rehydrate user from token)
* Form validation improvements
* Deployment (Vercel / Railway / Render)
* Role management (future)

---

## Author

Yoann — Fullstack developer in training (École 42)

Project built as part of a personal portfolio.
