const estado = {
  tarefas: []
};

function criarCabecalho() {
  return `
    <header class="cabecalho">
      <span>Programação Front-End</span>
      <h1>Componentes com JavaScript</h1>
      <p>Página construída dinamicamente a partir de componentes e estado.</p>
    </header>
  `;
}

function criarFormulario() {
  return `
    <section class="card">
      <h2>Nova atividade</h2>

      <div class="campo">
        <label for="titulo">Título</label>
        <input id="titulo" type="text" placeholder="Digite uma atividade">
      </div>

      <div class="campo">
        <label for="categoria">Categoria</label>
        <select id="categoria">
          <option value="Faculdade">Faculdade</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
        </select>
      </div>

      <div class="botoes">
        <button class="botao-primario" id="adicionar">Adicionar</button>
        <button class="botao-secundario" id="limparConcluidas">Limpar concluídas</button>
      </div>

      <div class="lista">
        ${criarLista()}
      </div>
    </section>
  `;
}

function criarResumo() {
  const total = estado.tarefas.length;
  const concluidas = estado.tarefas.filter(tarefa => tarefa.concluida).length;
  const pendentes = total - concluidas;

  return `
    <aside class="card">
      <h2>Resumo</h2>

      <div class="resumo">
        <div class="item-resumo">
          Total
          <strong>${total}</strong>
        </div>

        <div class="item-resumo">
          Pendentes
          <strong>${pendentes}</strong>
        </div>

        <div class="item-resumo">
          Concluídas
          <strong>${concluidas}</strong>
        </div>
      </div>
    </aside>
  `;
}

function criarItemTarefa(tarefa, indice) {
  return `
    <div class="tarefa ${tarefa.concluida ? "concluida" : ""}">
      <input
        type="checkbox"
        class="marcar"
        data-indice="${indice}"
        ${tarefa.concluida ? "checked" : ""}
      >

      <span>
        <strong>${tarefa.titulo}</strong><br>
        <small>${tarefa.categoria}</small>
      </span>

      <button class="botao-perigo excluir" data-indice="${indice}">
        Excluir
      </button>
    </div>
  `;
}

function criarLista() {
  if (estado.tarefas.length === 0) {
    return `<div class="vazia">Nenhuma atividade cadastrada.</div>`;
  }

  return estado.tarefas
    .map((tarefa, indice) => criarItemTarefa(tarefa, indice))
    .join("");
}

function criarPagina() {
  return `
    ${criarCabecalho()}

    <main class="painel">
      ${criarFormulario()}
      ${criarResumo()}
    </main>

    <footer class="rodape">
      Semana 10 - Componentização manual com JavaScript
    </footer>
  `;
}

function renderizarPagina() {
  const root = document.querySelector(".root");
  root.innerHTML = criarPagina();
  adicionarEventos();
}

function adicionarEventos() {
  const botaoAdicionar = document.getElementById("adicionar");
  const botaoLimpar = document.getElementById("limparConcluidas");
  const inputTitulo = document.getElementById("titulo");

  botaoAdicionar.addEventListener("click", adicionarTarefa);

  botaoLimpar.addEventListener("click", () => {
    estado.tarefas = estado.tarefas.filter(tarefa => !tarefa.concluida);
    renderizarPagina();
  });

  inputTitulo.addEventListener("keydown", evento => {
    if (evento.key === "Enter") {
      adicionarTarefa();
    }
  });

  document.querySelectorAll(".marcar").forEach(caixa => {
    caixa.addEventListener("change", evento => {
      const indice = Number(evento.target.dataset.indice);
      estado.tarefas[indice].concluida = evento.target.checked;
      renderizarPagina();
    });
  });

  document.querySelectorAll(".excluir").forEach(botao => {
    botao.addEventListener("click", evento => {
      const indice = Number(evento.target.dataset.indice);
      estado.tarefas.splice(indice, 1);
      renderizarPagina();
    });
  });
}

function adicionarTarefa() {
  const titulo = document.getElementById("titulo").value.trim();
  const categoria = document.getElementById("categoria").value;

  if (titulo === "") {
    alert("Digite o título da atividade.");
    return;
  }

  estado.tarefas.push({
    titulo,
    categoria,
    concluida: false
  });

  renderizarPagina();
}

renderizarPagina();
