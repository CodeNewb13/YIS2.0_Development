# YIS Project

Aplikasi Next.js dengan Supabase auth.

## Menjalankan project

```bash
npm run setup
```

Frontend butuh kredensial Supabase. Copy `fe/.env.example` ke `fe/.env.local`
dan isi nilainya — tanpa ini semua route akan 500, karena `fe/src/proxy.ts`
menjalankan session refresh di setiap request:

```bash
cp fe/.env.example fe/.env.local
```

Lalu:

```bash
npm run dev
```

- App: http://localhost:3000
- Health check: http://localhost:3000/api/health

Script lain: `npm run build`, `npm run typecheck`, `npm run lint`.

## Struktur

- `fe/`: Next.js App Router + TypeScript + Tailwind CSS + Supabase auth
  - `src/app/api/`: route handlers (API)
  - `src/lib/`: Supabase client (browser/server) + session middleware
  - `src/proxy.ts`: proxy yang me-refresh session di tiap request

Root `package.json` hanya wrapper tipis ke `fe/` — tidak ada dependency di root.

## Deploy (Vercel)

Set **Root Directory** ke `fe` di project settings, dan tambahkan
`NEXT_PUBLIC_SUPABASE_URL` serta `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
di Environment Variables untuk semua environment.
