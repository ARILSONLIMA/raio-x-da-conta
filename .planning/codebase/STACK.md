# STACK

## Core
- **Framework:** Next.js 16.2.0
- **React Version:** 19.2.4
- **Language:** TypeScript 5
- **Node Environment:** Node.js 20+

## Styling & UI
- **CSS Framework:** Tailwind CSS v4
- **Component Library:** Shadcn UI (radix-ui based)
- **Icons:** Lucide React
- **Themes:** next-themes (dark/light mode support)
- **Charts:** Recharts
- **Animation:** tw-animate-css
- **Utilities:** tailwind-merge, clsx, class-variance-authority

## Backend & Database
- **Database Client:** mysql2 (promise-based)
- **Authentication/Session:** `jose` (JWT signing and verification), `bcryptjs` (password hashing)
- **Build configuration:** ESLint 9, PostCSS

## Configuration Notes
- Custom `nextConfig` ignores TypeScript build errors (`ignoreBuildErrors: true`).
- A `proxy.ts` is available in `src/` for API requests proxying.
