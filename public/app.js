const API = 'http://localhost:3000';

async function carregarTransacoes() {
  const filtro = document.getElementById('filtro').value;
  const res = await fetch(`${API}/transacoes`);
  let dados = await res.json();

  if (filtro !== 'todos') {
    dados = dados.filter(t => t.tipo === filtro);
  }

  // Saldo (sempre calcula sobre todos)
  const todos = await fetch(`${API}/transacoes`).then(r => r.json());
  const saldo = todos.reduce((acc, t) => {
    return t.tipo === 'entrada' ? acc + t.valor : acc - t.valor;
  }, 0);

  document.getElementById('saldo').textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;
  document.getElementById('saldo').style.color = saldo >= 0 ? '#4CAF50' : '#e53935';

  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  if (dados.length === 0) {
    lista.innerHTML = '<p style="text-align:center;color:#888">Nenhuma transação encontrada.</p>';
    return;
  }

  dados.forEach(t => {
    lista.innerHTML += `
      <div class="transacao">
        <div class="info">
          <strong>${t.descricao}</strong><br>
          <span>${t.categoria} · ${t.data}</span>
        </div>
        <div class="valor ${t.tipo}">
          ${t.tipo === 'entrada' ? '+' : '-'} R$ ${t.valor.toFixed(2).replace('.', ',')}
        </div>
        <button onclick="deletar(${t.id})">🗑</button>
      </div>
    `;
  });
}

async function salvarTransacao() {
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipo').value;
  const categoria = document.getElementById('categoria').value;
  const data = document.getElementById('data').value;

  if (!descricao || !valor || !data) {
    alert('Preencha todos os campos!');
    return;
  }

  await fetch(`${API}/transacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao, valor, tipo, categoria, data })
  });

  document.getElementById('descricao').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('data').value = '';

  carregarTransacoes();
}

async function deletar(id) {
  if (!confirm('Deseja excluir esta transação?')) return;
  await fetch(`${API}/transacoes/${id}`, { method: 'DELETE' });
  carregarTransacoes();
}

carregarTransacoes();