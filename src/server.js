const express = require('express');
const path = require('path');
// Importe o seu banco de dados e rotas conforme o seu projeto original
// const db = require('./database'); 
// const routes = require('./routes');

const app = express();

// 1. Liberar CORS (garante que o navegador não bloqueie)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// 2. Servir os arquivos estáticos (CSS, JS, imagens) da pasta public
// ISSO CORRIGE O ERRO DE CSS 404 E O BOTÃO NO RAILWAY
app.use(express.static(path.join(__dirname, '..', 'public')));

// 3. Suas rotas da API aqui
// app.use('/transacoes', routes); 
// (Mantenha as rotas que você já tinha aqui!)

// 4. Fallback para o index.html (opcional, mas ajuda se der erro de rota)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});