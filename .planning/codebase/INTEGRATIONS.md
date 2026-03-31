# INTEGRATIONS

## Database
- **Provider:** Hostinger MySQL Database
- **Connection Details:** Connected via `mysql2/promise` pool with connection limit set to 10 (`src/lib/db.ts`). Connects to `srv1074.hstgr.io`.

## Authentication & Security
- **JWT Provider:** Built-in `jose` library handling session tokens via `HS256` encryption (`src/lib/auth.ts`).
- **Passwords:** `bcryptjs` used for secure password storage formatting.

## API Services
- Internal API routes located in `src/app/api/` (currently has a `test` route).
- `src/proxy.ts` is used for potential external proxying or forwarding.
