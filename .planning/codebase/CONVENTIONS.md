# CONVENTIONS

## Coding Style
- **Linter:** ESLint 9 configured via `eslint.config.mjs` extending `next/core-web-vitals` and `next/typescript`.
- **TypeScript:** Strict typing preferred, though `ignoreBuildErrors: true` is currently set in `next.config.ts`, indicating some tolerance for typing errors during build phases.

## Component Patterns
- UI components reside in `src/components/ui/` and are built atop Radix UI via `shadcn/ui`.
- Styling heavily relies on Tailwind utility classes, often combined using `cn()` utility from `src/lib/utils.ts` (combining `clsx` and `tailwind-merge`).
- Components are mostly default exported for pages, and named exported for UI library components.

## Error Handling & Data Fetching
- Server Actions (`src/app/actions/`) are used to handle mutations.
- Try-catch blocks are frequently used in Server Actions to catch database or logic errors before returning predictable payloads to the client.
- `jose` is used to catch and handle unverified session tokens within a try-catch returning `null` in `src/lib/auth.ts`.
