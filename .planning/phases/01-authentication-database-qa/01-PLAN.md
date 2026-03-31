---
wave: 1
depends_on: []
files_modified: []
autonomous: false
---

# Plan 01: Authentication & Database QA

**Requirements addressed:** AUTH-01, DATA-01

## Objective
Verificar a segurança do fluxo JWT e middleware, revisar e proteger o tratamento de erros do `login.ts`, e criar um teste de estresse contínuo do pool do banco de dados (max 10 conexões) para assegurar a estabilidade.

## Task 1: Revisão de Proteção JWT (Middleware/Auth)
<read_first>
- src/middleware.ts
- src/lib/auth.ts
- src/app/actions/login.ts
</read_first>
<action>
1. Auditar `src/lib/auth.ts` para garantir que o tempo de expiração (`exp`) do token gerado pela biblioteca `jose` existe e está usando `JWT_SECRET`.
2. Validar que `src/middleware.ts` checa de fato o token via `jose` de forma assíncrona.
3. Não se deve criar arquivos adicionais nesta task, apenas corrigir eventuais vulnerabilidades encontradas nos arquivos acima e certificar a devida validação da secret env.
</action>
<acceptance_criteria>
- O arquivo `src/lib/auth.ts` possui configuração correta para usar `.setExpirationTime(...)`.
- `src/middleware.ts` valida o token e o `src/app/actions/login.ts` processa adequadamente quando sem cookie.
</acceptance_criteria>

## Task 2: Robustez no Tratamento de Erros de Login
<read_first>
- src/app/actions/login.ts
</read_first>
<action>
1. Auditar em `src/app/actions/login.ts` os blocos de verificação de DB e Senhas e blocos generais de erro.
2. Garantir que as senhas incorretas retornem formulários de erro (ex: `{ error: "..." }`) e que falhas do DB não lancem exceptions crudas mascarando dados nas telas.
3. Checar a integração com `bcryptjs.compare`.
</action>
<acceptance_criteria>
- O arquivo `src/app/actions/login.ts` possui instruções de retorno estruturadas (ex: `{ error: "Credenciais inválidas" }`) para erros conhecidos.
</acceptance_criteria>

## Task 3: Simulação de Estresse DB (Max Pool 10)
<read_first>
- src/lib/db.ts
- package.json
</read_first>
<action>
1. No arquivo `src/lib/db.ts`, confirmar ou refatorar a configuração da string de conexão para que declare explícito o `connectionLimit: 10`.
2. Criar o arquivo `test-db-pool.js` no root (ou src/scripts) que dispare, com promises simultâneas (`Promise.all`), 20 chamadas à mesma query simples validando se o Node sobrevive empilhando o Pool de Conexões.
3. Adicionar Task no `package.json` `"test:stress": "node test-db-pool.js"`.
</action>
<acceptance_criteria>
- O `package.json` possui um subcomando novo `"test:stress"`.
- O `src/lib/db.ts` possui a instrução explícita de `connectionLimit: 10`.
- O script `test-db-pool.js` existe e executa loop assíncrono.
</acceptance_criteria>

## Verification
- Ao executar `npm run test:stress`, todos os 20 requests não devem derrubar o node process resultando em código de saída falha (0 exit code) demonstrando queuing tolerante.

## must_haves
- [ ] Validação do `connectionLimit: 10` concluída em código explícito.
- [ ] O middleware confirma integridade de fallback em `src/lib/auth.ts` forçando as environments certas.
