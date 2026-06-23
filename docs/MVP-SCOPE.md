# MVP Scope definition

## Matriz MoSCoW

**Must Have (Obrigatório para lançar):**
* Banco de dados MySQL configurado e rodando na Hostinger.
* Cadastro de usuário e Login.
* Tela de Dashboard (protegida por login).
* Formulário "Adicionar Fatura" (seleção de Água ou Luz, mês/ano, consumo e valor).
* Gráfico de Barras simples mostrando histórico de consumo (via biblioteca como Chart.js ou Recharts).
* Seção com 5 a 10 dicas de economia (ODS 6 e 7).

**Should Have (Importante, mas pode entrar logo depois):**
* Edição/Exclusão de uma fatura cadastrada erroneamente.
* Recuperação de senha (esqueci minha senha).
* Validação rigorosa de inputs (não aceitar números absurdos).

**Could Have (Legal de ter, mas não essencial):**
* Switch para Dark Mode.
* Exportação do histórico em PDF.

**Won't Have (Fora do Escopo Total):**
* Leitura via foto/OCR da conta.
* Integração automática com APIs da Sabesp/Enel, etc.
* Rankings entre usuários.

## Hipóteses do MVP
1. **Hipótese de Utilidade:** Visualizar o histórico de forma clara (consumo vs dinheiro) incentiva o usuário a gastar menos no mês seguinte.
2. **Hipótese de Fricção:** O formulário de 5 campos (Tipo, Mês, Ano, Consumo, Valor) é rápido o suficiente para o usuário não abandonar a plataforma.

## Métricas do MVP
* Cadastro com sucesso (Tracking via DB).
* Quantidade de faturas registradas por usuário na primeira sessão.
* Taxa de preenchimento correto vs Erros de validação do formulário.