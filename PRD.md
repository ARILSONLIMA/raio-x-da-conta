# Product Requirements Document (PRD)

## Visão Geral
O "Raio-X da Conta" é uma plataforma web responsiva projetada para ajudar no rastreamento de despesas de utilidades públicas (Água e Eletricidade). O sistema exige autenticação baseada em MySQL e fornece um painel visual para análise histórica.

## Personas
**Carlos, 35 anos, Assistente Administrativo**
* **Contexto:** Assalariado, o orçamento familiar é apertado. Todo mês leva um susto com a conta de luz.
* **Dor:** Não sabe se a conta veio mais cara porque a tarifa aumentou ou se a família gastou mais.
* **Objetivo:** Quer um lugar rápido para anotar os gastos, ver se está melhorando e descobrir como economizar sem precisar virar um especialista.

## User Stories
* **US01:** Como usuário, quero me cadastrar com e-mail e senha para criar meu histórico privado.
* **US02:** Como usuário, quero fazer login para acessar meu painel de controle.
* **US03:** Como usuário, quero inserir os dados da minha conta de água (mês/ano, m³, valor R$) para salvar o registro do mês.
* **US04:** Como usuário, quero inserir os dados da minha conta de energia (mês/ano, kWh, valor R$) para salvar o registro do mês.
* **US05:** Como usuário, quero visualizar um gráfico de barras com os últimos 12 meses de consumo, para comparar meu progresso.
* **US06:** Como usuário, quero ler dicas práticas baseadas nas ODS 6 (Água) e 7 (Energia) para aplicar na minha casa.

## Requisitos Funcionais
* **RF01 - Autenticação:** Sistema de registro (Nome, E-mail, Senha) e Login.
* **RF02 - Inserção de Fatura:** Formulário com os campos: `Tipo (Água/Luz)`, `Mês de Referência`, `Ano`, `Consumo Numérico (m³/kWh)`, `Valor Final (R$)`.
* **RF03 - Dashboard Gráfico:** O sistema deve renderizar dois gráficos distintos: um para o histórico de água e outro para o de energia (eixo X = Meses, eixo Y = Consumo/Valor).
* **RF04 - Dicas:** Uma página estática contendo um catálogo de boas práticas focadas em sustentabilidade e economia.

## Requisitos Não-Funcionais
* **RNF01 - Banco de Dados:** O banco de dados utilizado será MySQL.
* **RNF02 - Segurança:** As senhas devem ser salvas no banco utilizando hash (ex: bcrypt).
* **RNF03 - Responsividade:** O frontend deve ser mobile-first (os usuários tendem a acessar via celular).
* **RNF04 - Performance:** O painel deve carregar em menos de 2 segundos após o login.

## Integrações / Estrutura MySQL
Como definido, o banco será MySQL. Estrutura recomendada de tabelas:
* `users`: `id` (PK), `name`, `email`, `password_hash`, `created_at`
* `invoices`: `id` (PK), `user_id` (FK), `type` (ENUM: 'WATER', 'ENERGY'), `month` (INT), `year` (INT), `consumption` (DECIMAL), `cost` (DECIMAL), `created_at`

## Edge Cases (Casos Extremos)
* **Usuário pula um mês de inserção:** O gráfico deve tratar meses sem dados com o valor '0' ou pular o espaço para não distorcer a linha do tempo.
* **Digitação errada de vírgula/ponto:** O formulário deve validar e normalizar separadores decimais na entrada de dados.
* **Tentativa de inserir duas faturas do mesmo tipo no mesmo mês:** O sistema deve alertar o usuário e perguntar se ele quer atualizar a fatura existente.

## Critérios de Aceitação
* **Para Autenticação:** Usuário só consegue acessar `/dashboard` se tiver um token/sessão válido. Tentar acessar rotas protegidas redireciona para `/login`.
* **Para Gráficos:** Se não houver dados, exibir a mensagem "Adicione sua primeira fatura para visualizar o gráfico".