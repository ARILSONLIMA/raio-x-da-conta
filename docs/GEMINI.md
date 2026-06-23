<!-- GSD:project-start source:PROJECT.md -->
## Project

**Raio-X da Conta**

Um Dashboard de Gestão de Faturas web focado em analisar e gerenciar contas de consumo recorrentes (como energia e água). Permite que indivíduos ou pequenos negócios acompanhem seu histórico de faturas e obtenham insights visuais sobre seus gastos.

**Core Value:** Visibilidade clara, rápida e confiável do histórico de despesas de consumo para permitir decisões financeiras informadas.

### Constraints

- **Database**: Limite de pool de conexão configurado para 10 — O uso do MySQL deve ser otimizado para evitar gargalos em operações paralelas.
- **Testing**: Ausência de suíte automatizada — Mudanças estruturais exigem homologação manual estrita até que testes de integração sejam adicionados.
- **Security**: Fallback hardcoded para segredo JWT em `auth.ts` — É mandatório garantir que as chaves de ambiente sejam fornecidas em produção.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

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
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Design
## Layers & Data Flow
## Entry Points
- `src/app/page.tsx`: Application landing page.
- `src/app/dashboard/page.tsx`: Main user dashboard view.
- Server actions act as the API boundaries for client-side interactions.
## Key Abstractions
- **Authentication**: Custom JWT session handling in `src/lib/auth.ts` coupled with login actions in `src/app/actions/auth.ts`.
- **UI Components**: Shadcn UI elements wrapped in generic reusable React components (located in `src/components/ui/`).
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
