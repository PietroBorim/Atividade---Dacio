function mostrarTabela() {
    document.getElementById("areaTabela").innerHTML =
        "<img src='Tabela_Jogos.png' alt='Tabela de Jogos da Copa do Mundo'>";
}

function revelar() {
    document.getElementById("fotoJogador").src = "_vinicius_junior.png";

    document.getElementById("nome").innerText =
        "Vinícius José Paixão de Oliveira Júnior";

    document.getElementById("data").innerText =
        "12/07/2000 (25 anos)";

    document.getElementById("altura").innerText =
        "1,76 m";

    document.getElementById("posicao").innerText =
        "Ponta-esquerda / Atacante";

    document.getElementById("rank").innerText =
        "9,5";

    let elementos = document.querySelectorAll(".placeholder");

    elementos.forEach(function(elemento) {
        elemento.classList.remove("placeholder");
        elemento.classList.add("card-text");
    });
}