# Phase 1 Q&A Log

**Area:** QA Approach & Focus
**Question:** Como esta fase é puramente de QA e infraestrutura, precisamos alinhar **como** esse trabalho de validação será conduzido. Quais áreas você deseja discutir antes de iniciarmos os testes?
**User Response:** Nesta fase de QA, quero focar em testar o limite do src/app/actions/login.ts. Verifique se o middleware está protegendo as rotas corretamente, se o token jose expira como deveria e se a conexão com o MySQL na Hostinger aguenta múltiplas requisições sem derrubar o pool. Procure ativamente por falhas de lógica no tratamento de erros do login.
