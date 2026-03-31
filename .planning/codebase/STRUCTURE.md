# STRUCTURE

## Overview
The codebase follows standard Next.js App Router conventions with a strict separation between application routes and internal libraries.

## Directory Layout
- **`src/app/`**: Application routes and pages.
  - `actions/`: Server actions (`auth.ts`, `invoice.ts`, `user.ts`).
  - `api/`: Traditional API routes.
  - `dashboard/`: Authenticated routes with domain-specific components (e.g., `invoice-table.tsx`, `charts.tsx`, `year-filter.tsx`).
  - `login/` & `register/`: Authentication pages.
- **`src/components/`**: Reusable generic UI elements.
  - `ui/`: Shadcn UI components.
  - `theme-provider.tsx` & `theme-toggle.tsx`.
- **`src/lib/`**: Core utilities, database setups, and helpers.
  - `auth.ts`: JWT session logic.
  - `db.ts`: MySQL connection pool.
  - `utils.ts`: Tailwind generic class mergers.
- **`src/types/`**: TypeScript type definitions.
- **`public/`**: Static assets.

## Naming Conventions
- React components use `PascalCase` internally but file names use `kebab-case.tsx` (`invoice-table.tsx`, `export-button.tsx`).
- Utility functions and server actions are typically named with `camelCase` in `camelCase.ts` files.
- Pages and routing files strictly adhere to Next.js conventions (`page.tsx`, `layout.tsx`, `loading.tsx`).
