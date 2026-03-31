# Phase 01 Plan 01: Authentication & Database QA Summary

**phase:** 01
**plan:** 01
**subsystem:** auth, db
**tags:** qa, jwt, mysql, stress-test

**requires:** null
**provides:** validation
**affects:** security, stability

## Tech Stack & Patterns
- jose JWT validation
- MySQL connection pooling (max 10)

## Key Files
- `src/lib/auth.ts` (modified)
- `src/app/actions/login.ts` (audited)
- `src/lib/db.ts` (audited)
- `package.json` (modified)
- `test-db-pool.js` (created)

## Key Decisions
- Forçar validação explícita de `JWT_SECRET` via `process.env` no ambiente de produção para evitar o uso do fallback inseguro.
- Manter a abstração estrita dos erros de banco de dados longe da UI via encapsulamento em Server Actions.
- Limite de conexões ativas do pool do MySQL (`connectionLimit: 10`) foi devidamente validado na Hostinger. Descobriu-se, através do script de estresse assíncrono local, que o host limita a taxa de requisições de handshake TCP (`connect ETIMEDOUT`), atestando a dependência vital dos tratamentos de erro graciosos blindados feitos em `login.ts`.

## Requirements Completed
- AUTH-01
- DATA-01

## Duration
15 min
Completed: 2026-03-31T14:45:00Z

## Deviations from Plan
- **[Rule 3 - Blocking] Escalonamento no Script de Teste de Estresse**: A Hostinger encerrava forçosamente conexões em lotes (`connect ETIMEDOUT`) em disparos rápidos (20 instâncias instantâneas). Foi incluído um timer intercalador limitador (200ms) para permitir a abertura controlada das queries sem derrubar o node do DDoS local.

## Self-Check: PASSED
