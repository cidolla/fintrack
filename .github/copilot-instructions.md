# Instruções para Copilot no projeto Fintrack

## Visão geral do projeto
- Aplicação de controle de gastos pessoais em Node.js + Express + SQLite.
- O backend fica em `src/server.js` e `src/database.js`.
- O frontend é estático e fica em `public/` (`index.html`, `style.css`, `app.js`).
- A base de dados é um arquivo SQLite local (`fintrack.db`) criado automaticamente na inicialização.
- Os testes de integração ficam em `tests/transacoes.test.js` e usam Jest + Supertest.

## Comandos de build, teste e validação
- Instalar dependências:
  - `npm install`
- Executar a aplicação:
  - `npm start`
  - `npm run dev` (com nodemon)
- Executar a suíte completa:
  - `npm test`
- Executar um arquivo de teste específico:
  - `npx jest tests/transacoes.test.js --runInBand`
- Executar um caso específico pelo nome do teste:
  - `npx jest tests/transacoes.test.js --runInBand -t "POST /transacoes - criação de transações"`

Observações importantes:
- Não há script de lint configurado em `package.json`.
- O CI do GitHub Actions executa apenas `npm ci` e `npm test` (`.github/workflows/ci.yml`).

## Arquitetura em alto nível
- `src/database.js`:
  - inicializa a conexão com o SQLite usando `better-sqlite3`;
  - cria a tabela `transacoes` se ela ainda não existir;
  - define o schema principal da aplicação.
- `src/server.js`:
  - monta o Express;
  - serve os arquivos estáticos em `public/`;
  - expõe os endpoints de transações (`GET/POST/PUT/DELETE /transacoes`);
  - usa `db.prepare(...).all()` e `db.prepare(...).run()` diretamente para operações no banco.
- `public/app.js`:
  - é o frontend simples em JavaScript puro;
  - consulta a API em `http://localhost:3000`;
  - calcula o saldo com base em todas as transações;
  - aplica filtros por `tipo` (`entrada`/`saida`) na interface.
- `tests/transacoes.test.js`:
  - valida o comportamento da API REST;
  - cria, lista, atualiza e remove transações em testes de integração.

A aplicação é bem simples e não possui camada de serviços, DTOs, ORM ou estrutura em módulos por domínio. A maior parte do comportamento relevante está concentrada em `server.js` e `database.js`.

## Convenções e padrões específicos do repositório
- A API e os campos seguem nomes em português: `descricao`, `valor`, `tipo`, `categoria`, `data`.
- O campo `tipo` é restrito a `entrada` e `saida` no schema SQLite (`CHECK(tipo IN ('entrada', 'saida'))`).
- Operações REST esperadas pelo código:
  - `POST /transacoes` -> `201` e retorno do objeto criado;
  - `PUT /transacoes/:id` -> `200` com mensagem de sucesso;
  - `DELETE /transacoes/:id` -> `200` com mensagem de sucesso;
  - `GET /transacoes` -> lista de transações ordenada por `data DESC`.
- O arquivo `fintrack.db` é um estado persistente do projeto. Não assumir que a base já está populada; os testes criam e removem dados durante a execução.
- O backend exporta `app` em `src/server.js` e só chama `app.listen()` quando executado diretamente. Isso é importante para os testes, que fazem `require('../src/server')` sem iniciar um processo extra.
- A aplicação frontend é de página única e usa `fetch` direto para a API; não há build step, bundler ou framework de UI.
- O projeto é usado para um fluxo de gastos pessoais simples e não é um monorepo; mantenha mudanças pequenas e alinhadas com este modelo de arquitetura leve.

## Diretrizes para alterações no código
- Ao alterar a estrutura da API, mantenha compatibilidade com os campos e os nomes já usados em `public/app.js` e nos testes.
- Ao tocar no schema do banco, prefira ajustes compatíveis com a tabela `transacoes` existente e lembre-se de que o banco é persistente localmente.
- Quando criar ou editar testes, siga o padrão atual de `Jest + Supertest` e valide o comportamento HTTP esperado da rota.
- Mantenha a organização simples do projeto; este repositório não usa TypeScript, migrations complexas, Docker ou pipeline de lint customizado.
