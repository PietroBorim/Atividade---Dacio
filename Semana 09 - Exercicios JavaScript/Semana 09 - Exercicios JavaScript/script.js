function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function definirResultado(elemento, texto, classe) {
  elemento.className = `resultado ${classe}`;
  elemento.innerHTML = texto;
}

function formatarDinheiro(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// EXERCÍCIO 01 - CPF
const cpfInput = document.getElementById("cpfInput");
const resultadoCpf = document.getElementById("resultadoCpf");

cpfInput.addEventListener("input", () => {
  let numeros = somenteNumeros(cpfInput.value).slice(0, 11);

  numeros = numeros
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  cpfInput.value = numeros;
});

document.getElementById("validarCpf").addEventListener("click", () => {
  const cpf = somenteNumeros(cpfInput.value);

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    definirResultado(resultadoCpf, "CPF inválido.", "erro");
    return;
  }

  function calcularDigito(base, pesoInicial) {
    let soma = 0;

    for (let i = 0; i < base.length; i++) {
      soma += Number(base[i]) * (pesoInicial - i);
    }

    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  const primeiro = calcularDigito(cpf.slice(0, 9), 10);
  const segundo = calcularDigito(cpf.slice(0, 10), 11);
  const valido = primeiro === Number(cpf[9]) && segundo === Number(cpf[10]);

  definirResultado(
    resultadoCpf,
    valido ? "CPF válido." : "CPF inválido.",
    valido ? "sucesso" : "erro"
  );
});

// EXERCÍCIO 02 - TEMPERATURA
const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");
let atualizandoTemperatura = false;

celsius.addEventListener("input", () => {
  if (atualizandoTemperatura) return;
  atualizandoTemperatura = true;

  fahrenheit.value = celsius.value === ""
    ? ""
    : ((Number(celsius.value) * 9 / 5) + 32).toFixed(2);

  atualizandoTemperatura = false;
});

fahrenheit.addEventListener("input", () => {
  if (atualizandoTemperatura) return;
  atualizandoTemperatura = true;

  celsius.value = fahrenheit.value === ""
    ? ""
    : ((Number(fahrenheit.value) - 32) * 5 / 9).toFixed(2);

  atualizandoTemperatura = false;
});

// EXERCÍCIO 03 - MÉDIA
const resultadoMedia = document.getElementById("resultadoMedia");

document.getElementById("calcularMedia").addEventListener("click", () => {
  const nome = document.getElementById("nomeAluno").value.trim();
  const notas = [
    Number(document.getElementById("nota1").value),
    Number(document.getElementById("nota2").value),
    Number(document.getElementById("nota3").value)
  ];

  const camposVazios = [...document.querySelectorAll("#media input[type='number']")]
    .some(input => input.value === "");

  if (!nome || camposVazios || notas.some(nota => nota < 0 || nota > 10)) {
    definirResultado(resultadoMedia, "Preencha o nome e notas válidas entre 0 e 10.", "erro");
    return;
  }

  const media = notas.reduce((soma, nota) => soma + nota, 0) / notas.length;

  if (media >= 7) {
    definirResultado(
      resultadoMedia,
      `<strong>${nome}</strong>: média ${media.toFixed(2)} — Aprovado.`,
      "info"
    );
  } else if (media >= 4) {
    const falta = 10 - media;
    definirResultado(
      resultadoMedia,
      `<strong>${nome}</strong>: média ${media.toFixed(2)} — Exame. Faltam ${falta.toFixed(2)} pontos para atingir 10.`,
      "sucesso"
    );
  } else {
    definirResultado(
      resultadoMedia,
      `<strong>${nome}</strong>: média ${media.toFixed(2)} — Reprovado.`,
      "erro"
    );
  }
});

// EXERCÍCIO 04 - TAXAS
const resultadoTaxas = document.getElementById("resultadoTaxas");

document.getElementById("calcularTaxas").addEventListener("click", () => {
  const bandeira = document.getElementById("bandeira").value;
  const valor = Number(document.getElementById("valorVenda").value);
  const parcelas = Number(document.getElementById("parcelas").value);

  if (valor <= 0 || parcelas < 1) {
    definirResultado(resultadoTaxas, "Informe um valor e uma quantidade de parcelas válidos.", "erro");
    return;
  }

  let percentualBandeira;

  switch (bandeira) {
    case "visa":
      percentualBandeira = 0.02;
      break;
    case "master":
      percentualBandeira = 0.0185;
      break;
    case "elo":
      percentualBandeira = 0.03;
      break;
    default:
      percentualBandeira = 0;
  }

  const taxaBandeira = valor * percentualBandeira;
  const juros = valor * (0.0035 * parcelas);
  const taxaMensal = 12.5 * parcelas;
  const total = valor + taxaBandeira + juros + taxaMensal;
  const valorParcela = total / parcelas;

  definirResultado(
    resultadoTaxas,
    `<strong>Taxa da bandeira:</strong> ${formatarDinheiro(taxaBandeira)}<br>
     <strong>Juros:</strong> ${formatarDinheiro(juros)}<br>
     <strong>Taxa mensal:</strong> ${formatarDinheiro(taxaMensal)}<br>
     <strong>Total:</strong> ${formatarDinheiro(total)}<br>
     <strong>Valor de cada parcela:</strong> ${formatarDinheiro(valorParcela)}`,
    "info"
  );
});

// EXERCÍCIO 05 - CONVIDADOS
const convidados = [];
const listaConvidados = document.getElementById("listaConvidados");
const nomeConvidado = document.getElementById("nomeConvidado");
const contadorConvidados = document.getElementById("contadorConvidados");

function renderizarConvidados() {
  listaConvidados.innerHTML = "";

  convidados.forEach((convidado, indice) => {
    const item = document.createElement("li");
    if (convidado.presente) item.classList.add("presente");

    const nome = document.createElement("span");
    nome.textContent = convidado.nome;

    const concluir = document.createElement("button");
    concluir.textContent = convidado.presente ? "Desfazer" : "Concluir";
    concluir.addEventListener("click", () => {
      convidados[indice].presente = !convidados[indice].presente;
      renderizarConvidados();
    });

    const editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.className = "editar";
    editar.addEventListener("click", () => {
      const novoNome = prompt("Digite o novo nome:", convidado.nome);

      if (novoNome && novoNome.trim()) {
        convidados[indice].nome = novoNome.trim();
        renderizarConvidados();
      }
    });

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.className = "excluir";
    excluir.addEventListener("click", () => {
      convidados.splice(indice, 1);
      renderizarConvidados();
    });

    item.append(nome, concluir, editar, excluir);
    listaConvidados.appendChild(item);
  });

  const presentes = convidados.filter(convidado => convidado.presente).length;

  definirResultado(
    contadorConvidados,
    convidados.length === 0
      ? "Nenhum convidado cadastrado."
      : `${convidados.length} convidado(s) cadastrado(s) e ${presentes} presente(s).`,
    "neutro"
  );
}

document.getElementById("adicionarConvidado").addEventListener("click", () => {
  const nome = nomeConvidado.value.trim();

  if (!nome) {
    alert("Digite o nome do convidado.");
    return;
  }

  convidados.push({ nome, presente: false });
  nomeConvidado.value = "";
  nomeConvidado.focus();
  renderizarConvidados();
});

nomeConvidado.addEventListener("keydown", evento => {
  if (evento.key === "Enter") {
    document.getElementById("adicionarConvidado").click();
  }
});

// EXERCÍCIO 06 - EVENTOS
const resultadoEvento = document.getElementById("resultadoEvento");

document.getElementById("calcularEvento").addEventListener("click", () => {
  const valorPacote = Number(document.getElementById("pacote").value);
  const pessoas = Number(document.getElementById("quantidadePessoas").value);

  if (pessoas < 1) {
    definirResultado(resultadoEvento, "Informe uma quantidade válida de pessoas.", "erro");
    return;
  }

  const custoBruto = valorPacote * pessoas;
  const taxaServico = custoBruto * 0.10;
  const subtotal = custoBruto + taxaServico;
  const desconto = pessoas > 100 ? subtotal * 0.05 : 0;
  const total = subtotal - desconto;

  definirResultado(
    resultadoEvento,
    `<strong>Custo bruto:</strong> ${formatarDinheiro(custoBruto)}<br>
     <strong>Taxa de serviço:</strong> ${formatarDinheiro(taxaServico)}<br>
     <strong>Desconto:</strong> ${formatarDinheiro(desconto)}<br>
     <strong>Total final:</strong> ${formatarDinheiro(total)}`,
    "sucesso"
  );
});

// EXERCÍCIO 07 - LUHN
const numeroCartao = document.getElementById("numeroCartao");
const resultadoCartao = document.getElementById("resultadoCartao");

numeroCartao.addEventListener("input", () => {
  const numeros = somenteNumeros(numeroCartao.value).slice(0, 16);
  numeroCartao.value = numeros.replace(/(.{4})/g, "$1 ").trim();
});

function validarLuhn(numero) {
  let soma = 0;
  let dobrar = false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = Number(numero[i]);

    if (dobrar) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }

    soma += digito;
    dobrar = !dobrar;
  }

  return soma % 10 === 0;
}

function identificarBandeira(numero) {
  if (/^4/.test(numero)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(numero)) return "Mastercard";
  if (/^(4011|4312|4389|4514|4576|5041|5066|5067|509)/.test(numero)) return "Elo";
  if (/^3[47]/.test(numero)) return "American Express";
  if (/^6(?:011|5)/.test(numero)) return "Discover";
  return "Não identificada";
}

function identificarSetor(primeiroDigito) {
  const setores = {
    "1": "Companhias aéreas",
    "2": "Companhias aéreas e finanças",
    "3": "Viagens e entretenimento",
    "4": "Bancos e finanças",
    "5": "Bancos e finanças",
    "6": "Comércio e finanças",
    "7": "Petróleo e indústria",
    "8": "Saúde e telecomunicações",
    "9": "Uso nacional"
  };

  return setores[primeiroDigito] || "Não identificado";
}

function identificarBanco(numero) {
  const prefixo = numero.slice(0, 6);
  const bancos = {
    "411111": "Número de teste Visa",
    "555555": "Número de teste Mastercard",
    "401288": "Número de teste Visa"
  };

  return bancos[prefixo] || "Emissor não identificado na base local";
}

document.getElementById("analisarCartao").addEventListener("click", () => {
  const numero = somenteNumeros(numeroCartao.value);

  if (numero.length < 13 || numero.length > 16) {
    definirResultado(resultadoCartao, "O cartão deve possuir entre 13 e 16 dígitos.", "erro");
    return;
  }

  const valido = validarLuhn(numero);
  const bandeira = identificarBandeira(numero);
  const setor = identificarSetor(numero[0]);
  const banco = identificarBanco(numero);

  definirResultado(
    resultadoCartao,
    `<strong>Status:</strong> ${valido ? "Válido" : "Inválido"}<br>
     <strong>Bandeira:</strong> ${bandeira}<br>
     <strong>Categoria de setor:</strong> ${setor}<br>
     <strong>Banco emissor:</strong> ${banco}`,
    valido ? "sucesso" : "erro"
  );
});
