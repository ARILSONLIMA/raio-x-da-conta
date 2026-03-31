# Raio-X da Conta

## What This Is

Um Dashboard de Gestão de Faturas web focado em analisar e gerenciar contas de consumo recorrentes (como energia e água). Permite que indivíduos ou pequenos negócios acompanhem seu histórico de faturas e obtenham insights visuais sobre seus gastos.

## Core Value

Visibilidade clara, rápida e confiável do histórico de despesas de consumo para permitir decisões financeiras informadas.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Controle de sessão e autenticação customizada com JWT (jose) e senhas cacheadas (bcryptjs) — existing
- ✓ Tabela interativa de visualização de faturas (`invoice-table`) — existing
- ✓ Gráficos analíticos de consumo usando Recharts (`charts.tsx`) — existing
- ✓ Filtros de visualização por ano (`year-filter.tsx`) — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] (A definir nas próximas fases)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Funcionalidades não relacionadas a despesas recorrentes (ex: aba de investimentos ou carteira de ações) — para manter o foco exclusivo no gerenciamento das contas mensais de consumo básico.

## Context

- **Stack Técnico:** Next.js 16.2.0 (App Router), React 19, TypeScript, Tailwind CSS v4, Shadcn UI.
- **Banco de Dados:** MySQL na Hostinger, acessado via `mysql2/promise` (limite do pool de conexões = 10).
- **Ambiente:** Trata-se de um projeto brownfield. Todo o ecossistema básico (UI, Auth, BD) já está estabelecido de implementações anteriores. 
- **Qualidade/Tech Debt:** O projeto não possui testes automatizados atualmente e possui marcação de ignorar erros de build de TypeScript (`ignoreBuildErrors: true`).

## Constraints

- **Database**: Limite de pool de conexão configurado para 10 — O uso do MySQL deve ser otimizado para evitar gargalos em operações paralelas.
- **Testing**: Ausência de suíte automatizada — Mudanças estruturais exigem homologação manual estrita até que testes de integração sejam adicionados.
- **Security**: Fallback hardcoded para segredo JWT em `auth.ts` — É mandatório garantir que as chaves de ambiente sejam fornecidas em produção.

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Aproveitar a arquitetura atual de Next.js + MySQL | A base já implementa os recursos primários e fornece o estilo completo via Tailwind + Shadcn | — Pending |

---
*Last updated: 2026-03-31 after initialization*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
