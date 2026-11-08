const API = 'http://localhost:3000';
let grafico = null;

async function carregarTransacoes() {
  const filtro = document.getElementById('filtro').value;
  const res = await fetch(`${API}/transacoes`);
  const todos = await res.json();

  // Cards
  const entradas = todos.filter(t => t.tipo === 'entrada').reduce((acc, t) => acc + t.valor, 0);
  const saidas = todos.filter(t => t.tipo === 'saida').reduce((acc, t) => acc + t.valor, 0);
  const saldo = entradas - saidas;

  document.getElementById('total-entradas').textContent = `R$ ${entradas.toFixed(2).replace('.', ',')}`;
  document.getElementById('total-saidas').textContent = `R$ ${saidas.toFixed(2).replace('.', ',')}`;
  document.getElementById('saldo').textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;
  document.getElementById('saldo').style.color = saldo >= 0 ? '#1976D2' : '#e53935';

  // Gráfico
  const categorias = {};
  todos.filter(t => t.tipo === 'saida').forEach(t => {
    categorias[t.categoria] = (categorias[t.categoria] || 0) + t.valor;
  });

  const labels = Object.keys(categorias);
  const valores = Object.values(categorias);
  const cores = ['#e53935','#FB8C00','#FDD835','#43A047','#1976D2','#8E24AA'];

  if (grafico) grafico.destroy();

  if (labels.length > 0) {
    grafico = new Chart(document.getElementById('grafico'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Gastos (R$)',
          data: valores,
          backgroundColor: cores.slice(0, labels.length)
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // Lista filtrada
  let dados = filtro === 'todos' ? todos : todos.filter(t => t.tipo === filtro);
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  if (dados.length === 0) {
    lista.innerHTML = '<p style="text-align:center;color:#888;padding:20px">Nenhuma transação encontrada.</p>';
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
        <div class="acoes">
          <button class="btn-editar" onclick="prepararEdicao(${t.id}, '${t.descricao}', ${t.valor}, '${t.tipo}', '${t.categoria}', '${t.data}')">✏️</button>
          <button class="btn-deletar" onclick="deletar(${t.id})">🗑</button>
        </div>
      </div>
    `;
  });
}

async function salvarTransacao() {
  const id = document.getElementById('edit-id').value;
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipo').value;
  const categoria = document.getElementById('categoria').value;
  const data = document.getElementById('data').value;

  if (!descricao || !valor || !data) {
    alert('Preencha todos os campos!');
    return;
  }

  if (id) {
    await fetch(`${API}/transacoes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, valor, tipo, categoria, data })
    });
  } else {
    await fetch(`${API}/transacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, valor, tipo, categoria, data })
    });
  }

  cancelarEdicao();
  carregarTransacoes();
}

function prepararEdicao(id, descricao, valor, tipo, categoria, data) {
  document.getElementById('edit-id').value = id;
  document.getElementById('descricao').value = descricao;
  document.getElementById('valor').value = valor;
  document.getElementById('tipo').value = tipo;
  document.getElementById('categoria').value = categoria;
  document.getElementById('data').value = data;
  document.getElementById('form-titulo').textContent = '✏️ Editar Transação';
  document.getElementById('btn-salvar').textContent = 'Salvar';
  document.getElementById('btn-cancelar').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicao() {
  document.getElementById('edit-id').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('data').value = '';
  document.getElementById('form-titulo').textContent = 'Nova Transação';
  document.getElementById('btn-salvar').textContent = 'Adicionar';
  document.getElementById('btn-cancelar').style.display = 'none';
}

async function deletar(id) {
  if (!confirm('Deseja excluir esta transação?')) return;
  await fetch(`${API}/transacoes/${id}`, { method: 'DELETE' });
  carregarTransacoes();
}

carregarTransacoes();