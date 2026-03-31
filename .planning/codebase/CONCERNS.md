# CONCERNS

## Technical Debt & Fragile Areas
- **TypeScript Strictness Overridden:** Build errors for TypeScript are currently suppressed via `ignoreBuildErrors: true` in `next.config.ts`. This poses a long-term maintainability risk.
- **Testing Absence:** Zero automated test suite (no unit, integration, or E2E tests). Validating functionality requires complete manual testing, leading to fragile deployments as the project scales.

## Security & Performance
- **Database Connection Limitations:** Connection pooling is set with a limit of 10. For a larger user base, this might become a bottleneck requiring an external pgbouncer equivalent (like Prisma Accelerate or adjusting Hostinger MySQL settings).
- **Hardcoded Secrets Fallback:** `src/lib/auth.ts` uses `'secret'` as a fallback for `process.env.JWT_SECRET`. If the environment variable isn't injected correctly, sessions are vulnerable.

## Bugs / Known Issues
- Currently, no specific "TODOs" or "FIXMEs" are explicitly marked in the code.
