# ARCHITECTURE

## System Design
The application is built using a modern **Next.js App Router** architecture (React Server Components paradigm) focusing on a clean separation of concerns between server and client operations.

## Layers & Data Flow
1. **Presentation Layer (React Server & Client Components):**
   - Uses Server Components by default for fast initial page loads and SEO.
   - Client components (marked with `'use client'`) are used for interactive UI elements (e.g., charts, sidebars, interactive tables).
2. **Server Actions (Business Logic):**
   - Located in `src/app/actions/`. Functions exported here (e.g., `auth.ts`, `invoice.ts`, `user.ts`) are used directly by client components to mutate data securely on the server.
3. **Data Layer:**
   - Database operations are executed over a `mysql2/promise` connection pool initialized in `src/lib/db.ts`.

## Entry Points
- `src/app/page.tsx`: Application landing page.
- `src/app/dashboard/page.tsx`: Main user dashboard view.
- Server actions act as the API boundaries for client-side interactions.

## Key Abstractions
- **Authentication**: Custom JWT session handling in `src/lib/auth.ts` coupled with login actions in `src/app/actions/auth.ts`.
- **UI Components**: Shadcn UI elements wrapped in generic reusable React components (located in `src/components/ui/`).
