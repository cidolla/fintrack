# Requisitos — FinTrack

## Requisitos Funcionais (RF)

| ID | Descrição |
|---|---|
| RF01 | O sistema deve permitir cadastrar uma transação com descrição, valor, tipo, categoria e data |
| RF02 | O sistema deve listar todas as transações cadastradas |
| RF03 | O sistema deve permitir editar uma transação existente |
| RF04 | O sistema deve permitir deletar uma transação |
| RF05 | O sistema deve calcular e exibir o saldo atual (entradas - saídas) |
| RF06 | O sistema deve permitir filtrar transações por tipo (entrada/saída) |
| RF07 | O sistema deve classificar transações por categoria (alimentação, transporte, saúde, lazer, salário, outro) |

## Requisitos Não Funcionais (RNF)

| ID | Categoria | Descrição |
|---|---|---|
| RNF01 | Desempenho | O sistema deve responder às requisições em menos de 500ms |
| RNF02 | Persistência | Os dados devem ser persistidos em banco de dados SQLite |
| RNF03 | Usabilidade | A interface deve ser simples e utilizável sem treinamento |
| RNF04 | Portabilidade | A aplicação deve rodar em qualquer sistema com Node.js instalado |
| RNF05 | Manutenibilidade | O código deve seguir padrão de commits e organização por pastas |
| RNF06 | Segurança | O sistema deve validar os campos obrigatórios antes de salvar |