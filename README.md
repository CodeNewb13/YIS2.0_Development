# YIS Project

Youth in STEM Indonesia — a Next.js application with Supabase authentication.

## Requirements

- Node.js 20 or newer (developed on 24.x)
- A Supabase project

## Local setup

```bash
npm run setup
```

This installs dependencies for the root and for `fe/`. Plain `npm install` at the
root is **not** enough — this repo does not use npm workspaces, so a root install
never descends into `fe/`.

Next, supply Supabase credentials:

```bash
cp fe/.env.example fe/.env.local
```

Fill in both values from your Supabase project's
[API settings](https://supabase.com/dashboard/project/_/settings/api). Without
them **every route returns 500** — `fe/src/proxy.ts` runs a session refresh on
every request, and it constructs a Supabase client before any page renders.

Then start the dev server:

```bash
npm run dev
```

- App: http://localhost:3000
- Health check: http://localhost:3000/api/health

## Scripts

Run from the repo root:

| Script | Description |
| --- | --- |
| `npm run setup` | Install dependencies (root + `fe/`) |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Environment variables

Both are required, in every environment. They are read by
`fe/src/lib/client.ts` (browser) and `fe/src/lib/middleware.ts` (server).

| Name | Notes |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | No trailing slash — the client appends paths to it |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key |

`NEXT_PUBLIC_*` values are **inlined at build time**, not read at request time.
Changing them requires a new build; redeploying a cached or previously-built
artifact keeps the old values baked in.

## Structure

```
fe/
  src/app/           App Router pages
    api/             Route handlers (API)
  src/components/    Shared UI
  src/lib/           Supabase clients (browser/server) + session middleware
  src/proxy.ts       Runs the session refresh on every matching request
  public/            Static assets (images, logo)
```

The root `package.json` is a thin wrapper that forwards scripts to `fe/`. It has
no dependencies of its own.

There is no separate backend. An Express service in `be/` was removed — it could
not run on Vercel (it called `app.listen()`, which needs a long-lived process),
its only endpoint was an unused `/api/health`, and the frontend talks to Supabase
directly. That endpoint now lives at `fe/src/app/api/health/route.ts`.

## Deploying to Vercel

Four project settings must be correct. Each of these was wrong at some point and
each produces a different, misleading symptom.

| Setting | Value | Why |
| --- | --- | --- |
| **Root Directory** | `fe` | The app is not at the repo root. Without this, the build installs nothing and fails with `next: command not found` (exit 127) |
| **Framework Preset** | `Next.js` | Must be set explicitly. The project was first created when Root Directory was the repo root, where no framework was detectable, so it defaulted to `Other` — and changing Root Directory does **not** re-run framework detection |
| **Environment Variables** | Both vars, scoped to Production, Preview, and Development | Vercel scopes variables per environment; missing ones cause runtime 500s, not build failures |
| **Production Branch** | `master` | This repo's only branch. If set to `main`, every push deploys as a Preview and the production domain never receives a build |

After changing environment variables, redeploy with **"Use existing Build Cache"
unchecked**, so the new values are compiled in.

## Troubleshooting

Symptoms are easy to misread, because a broken deploy can still report a green
build. Match on the specific signal:

| Symptom | Cause |
| --- | --- |
| Build fails, `tsc`/`next: command not found`, exit 127 | Root Directory is not `fe`, so dependencies were never installed |
| Build succeeds, but every route is `404 NOT_FOUND` **while `/visuals/*` returns 200** | Framework Preset is `Other`. Vercel is serving `fe/public` as a static directory and never running the app. There is no `index.html` there, so `/` has nothing to serve |
| `DEPLOYMENT_NOT_FOUND` | No deployment is bound to that hostname — typically a failed build, or a production domain that has never received a successful deployment |
| `500`, logs show `Your project's URL and Key are required to create a Supabase client!` | Supabase env vars are missing for that environment, or were added after the last build |
| Every local route returns 500 | `fe/.env.local` is missing or empty |

Note that a Vercel-branded 404 page is a *platform* error — the app was never
reached. A missing page inside the app renders Next's own `/_not-found` route
instead, styled like the rest of the site.
