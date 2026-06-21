const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const mensagem = document.getElementById('mensagem');

let tarefas = [];

function adicionarTarefa() {
    const texto = taskInput.value.trim();

    if (texto === '') {
        mensagem.textContent = 'Digite uma tarefa antes de adicionar.';
        taskInput.focus();
        return;
    }

    tarefas.push({
        id: Date.now(),
        texto: texto,
        concluida: false
    });

    taskInput.value = '';
    mensagem.textContent = '';
    taskInput.focus();
    atualizarTela();
}

function alternarTarefa(id) {
    tarefas = tarefas.map(function (tarefa) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }
        return tarefa;
    });

    atualizarTela();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(function (tarefa) {
        return tarefa.id !== id;
    });

    atualizarTela();
}

function limparConcluidas() {
    tarefas = tarefas.filter(function (tarefa) {
        return !tarefa.concluida;
    });

    atualizarTela();
}

function atualizarContador() {
    const pendentes = tarefas.filter(function (tarefa) {
        return !tarefa.concluida;
    }).length;

    taskCounter.textContent = pendentes === 1
        ? '1 tarefa pendente'
        : pendentes + ' tarefas pendentes';
}

function atualizarTela() {
    taskList.innerHTML = '';

    if (tarefas.length === 0) {
        const itemVazio = document.createElement('li');
        itemVazio.className = 'lista-vazia';
        itemVazio.textContent = 'Nenhuma tarefa adicionada.';
        taskList.appendChild(itemVazio);
        atualizarContador();
        return;
    }

    tarefas.forEach(function (tarefa) {
        const item = document.createElement('li');

        if (tarefa.concluida) {
            item.classList.add('completed');
        }

        const texto = document.createElement('span');
        texto.className = 'texto-tarefa';
        texto.textContent = tarefa.texto;

        const botaoConcluir = document.createElement('button');
        botaoConcluir.className = 'botao-concluir';
        botaoConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
        botaoConcluir.addEventListener('click', function () {
            alternarTarefa(tarefa.id);
        });

        const botaoExcluir = document.createElement('button');
        botaoExcluir.className = 'botao-excluir';
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', function () {
            excluirTarefa(tarefa.id);
        });

        item.appendChild(texto);
        item.appendChild(botaoConcluir);
        item.appendChild(botaoExcluir);
        taskList.appendChild(item);
    });

    atualizarContador();
}

addButton.addEventListener('click', adicionarTarefa);
clearButton.addEventListener('click', limparConcluidas);

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

atualizarTela();
