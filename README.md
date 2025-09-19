<div align="center">

# AirlineOps CRUD Portal

<!-- Badges -->
<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
<a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
<a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" /></a>
<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>

</div>

Manage airline operations data end‑to‑end with a modern, full‑stack dashboard. The app provides CRUD for Flights, Flight Schedules, Aircraft, Airports, Employees, Crews, and Crew Members. Authentication is handled by Supabase Auth; data is persisted in PostgreSQL with efficient SQL joins and a shared server-side client. The UI is built with the Next.js App Router and streams content via React Suspense with skeleton fallbacks.

---

## Features

- Flights, Flight Schedules, Aircraft, Airports, Employees, Crews, Crew Members (full CRUD)
- Server-side pagination and search across list views
- Authenticated access with Supabase Auth and middleware-protected routes
- Efficient SQL joins and queries on PostgreSQL (via Supabase) through a shared server-side client
- Streaming UI with React Suspense and skeleton fallbacks during data fetch
- Breadcrumb navigation, responsive tables, and accessible forms

## Tech Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS, Heroicons, Lucide
- Supabase (Auth) + PostgreSQL (data)
- postgres (Node.js client) for server-side SQL
- Zod for input validation

## 🚀 Live Demo

**[View Live Application](https://airline-crew-and-flight-logistics-d.vercel.app/)**

## Architecture Overview

- App Router structure in `src/app/*` with route segments per domain (e.g., `dashboard/flights`)
- Server Components for data fetching; Client Components for interactivity where needed
- Supabase Auth session handling via middleware in `src/supabase/middleware.ts` and `src/middleware.ts`
- Database access via a shared Postgres client in `src/app/lib/db.ts` and domain queries in `src/app/lib/data-acfl.ts`
- Server Actions for mutations in `src/app/lib/actions.ts` and auth actions in `src/app/login/actions.ts`
- UI utilities/components in `src/app/ui/*` (tables, forms, buttons, skeletons, breadcrumbs, pagination)

## Screenshots

> Add screenshots to showcase key pages.

```
src/app/page.tsx              # Landing
src/app/dashboard/page.tsx    # Dashboard overview
src/app/dashboard/flights     # Flights list/create/edit
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm/yarn/npm
- A Supabase project (for Auth) and a PostgreSQL connection string

### Environment Variables

Create a `.env.local` at the repo root with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Direct Postgres connection used by the server-side SQL client
POSTGRES_URL=postgres://user:pass@host:port/db?sslmode=require
```

### Install

```bash
# with pnpm (recommended)
pnpm install

# or with npm
npm install

# or with yarn
yarn install
```

### Run

```bash
# Development server (App Router with Turbopack)
pnpm dev

# Production build
pnpm build && pnpm start
```

## Usage Notes

- Sign up or log in to obtain an authenticated session (Supabase Auth).
- Navigate the sidebar to manage Flights, Schedules, Aircraft, Airports, Employees, Crews, and Crew Members.
- Lists support query search and server-side pagination.
- Create/Edit forms prefetch related entities (e.g., aircraft/airports for flights; crews/flights for schedules).

## Key Files

- `src/app/lib/db.ts` — Shared Postgres client
- `src/app/lib/data-acfl.ts` — Domain queries and view models
- `src/app/lib/actions.ts` — Server Actions for create/update/delete
- `src/app/login/actions.ts` — Auth actions (login, signup, sign out)
- `src/supabase/middleware.ts` and `src/middleware.ts` — Session handling and route protection
- `src/app/ui/*` — Tables, forms, buttons, skeletons, breadcrumbs, pagination

## Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}
```

## Roadmap

- Role-based access control (RBAC)
- Bulk import/export (CSV)
- Activity logs and audit trail
- Metrics dashboard (on-time performance, utilization)

## Contributing

Contributions are welcome. Please open an issue to discuss changes or a PR with a clear description and screenshots where relevant.

## License

This project’s license is not specified. If you intend to open-source, consider adding a license (e.g., MIT) at the repository root.
