# Roadmap

## Phase 1: Authentication & Database QA
**Goal:** Validar e garantir a estabilidade do fluxo de login e conexão com o banco de dados.
**Requirements:** AUTH-01, DATA-01
**UI hint:** no

**Success Criteria:**
1. Login com credenciais válidas gera e armazena token JWT corretamente.
2. Login com credenciais inválidas retorna erro apropriado.
3. Conexão com MySQL via Server Actions é feita sem exceder o limite do pool (10).

## Phase 2: Dashboard UI QA
**Goal:** Validar a renderização correta do painel principal e seus gráficos com dados reais/mockados do DB.
**Requirements:** DASH-01
**UI hint:** yes

**Success Criteria:**
1. Gráficos do Recharts renderizam adequadamente no modo claro e escuro.
2. Dados mostram o histórico de consumo real ou mockado corretamente.
