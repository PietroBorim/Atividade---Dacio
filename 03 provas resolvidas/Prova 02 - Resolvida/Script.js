function proximo() {
    document.getElementById("grupos").innerHTML = `
        <div class="grupo-card">
            <h3>🅳 Grupo D</h3>
            <h4>Seleções</h4>
            <ul>
                <li>Estados Unidos</li>
                <li>Paraguai</li>
                <li>Austrália</li>
                <li>Turquia</li>
            </ul>
            <details>
                <summary>Saiba Mais</summary>
                <p>Os EUA jogam em casa, vantagem histórica em Copas. Austrália enfrenta frequentemente seleções sul-americanas em torneios.</p>
            </details>
        </div>

        <div class="grupo-card">
            <h3>🅴 Grupo E</h3>
            <h4>Seleções</h4>
            <ul>
                <li>Alemanha</li>
                <li>Equador</li>
                <li>Costa do Marfim</li>
                <li>Curaçao</li>
            </ul>
            <details>
                <summary>Saiba Mais</summary>
                <p>Alemanha costuma dominar fases de grupos. Equador e Costa do Marfim têm estilos físicos semelhantes.</p>
            </details>
        </div>

        <div class="grupo-card">
            <h3>🅵 Grupo F</h3>
            <h4>Seleções</h4>
            <ul>
                <li>Holanda</li>
                <li>Japão</li>
                <li>Tunísia</li>
                <li>Suécia</li>
            </ul>
            <details>
                <summary>Saiba Mais</summary>
                <p>Holanda e Japão costumam apresentar bom futebol coletivo. Tunísia e Suécia completam um grupo competitivo.</p>
            </details>
        </div>
    `;
}

function add() {
    document.getElementById("areaJogadores").innerHTML += `
        <div class="jogador-card">
            <img src="Lucas_Paqueta.webp" alt="Lucas Paquetá">
            <h3>Lucas Tolentino Coelho de Lima</h3>
            <p><strong>Data de Nascimento:</strong> 27/08/1997 (28 anos)</p>
            <p><strong>Altura:</strong> 1,80 m</p>
            <p><strong>Posição:</strong> Meio-campista</p>
            <p><strong>Rank:</strong> 8,8</p>
        </div>
    `;
}