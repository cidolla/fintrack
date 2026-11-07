# User Stories — FinTrack

## US01 — Cadastrar Transação
**Como** usuário,  
**quero** registrar uma transação com descrição, valor, tipo, categoria e data,  
**para que** eu possa controlar meus gastos e receitas.

### Critérios de Aceite
```gherkin
Dado que estou na página principal
Quando preencho todos os campos e clico em "Adicionar"
Então a transação deve aparecer na lista
E o saldo deve ser atualizado automaticamente
```

---

## US02 — Visualizar Saldo
**Como** usuário,  
**quero** ver meu saldo atual na tela,  
**para que** eu saiba rapidamente se estou no positivo ou negativo.

### Critérios de Aceite
```gherkin
Dado que tenho transações cadastradas
Quando acesso a página principal
Então devo ver o saldo em verde se positivo
E em vermelho se negativo
```

---

## US03 — Filtrar Transações
**Como** usuário,  
**quero** filtrar as transações por tipo (entrada/saída),  
**para que** eu possa visualizar apenas o que me interessa.

### Critérios de Aceite
```gherkin
Dado que tenho transações de entrada e saída cadastradas
Quando seleciono o filtro "Entradas"
Então apenas as transações do tipo entrada devem aparecer
```

---

## US04 — Deletar Transação
**Como** usuário,  
**quero** excluir uma transação cadastrada,  
**para que** eu possa corrigir lançamentos errados.

### Critérios de Aceite
```gherkin
Dado que existe uma transação na lista
Quando clico no botão de excluir e confirmo
Então a transação deve ser removida da lista
E o saldo deve ser recalculado
```