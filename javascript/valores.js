const produtosDiv = document.getElementById("Produtos");
const tamanhosDiv = document.getElementById("Tamanhos");
const coresDiv = document.getElementById("Cores");
const quantidadeInput = document.getElementById("Quantidade");
const totalSpan = document.getElementById("Total");

let produtoSelecionado = null;
let tamanhoSelecionado = null;
let corSelecionada = null;

const precos = {
    Adesivos: 2,
    Blocos: 15,
    Camisas: 35,
    Cartao: 1.5,
    Logos: 150,
    Panfletos: 0.80,
    Pastas: 12,
};

const produtos = ["Adesivos", "Blocos", "Camisas", "Cartao", "Logos", "Panfletos", "Pastas"];

const tamanhosPorProduto = {
    Adesivos: ["5x5", "10x10"],
    Blocos: ["75g", "90g", "120g"],
    Camisas: ["PP", "P", "M", "G", "GG"],
    Cartao: ["9x5cm"],
    Logos: ["Digital"],
    Panfletos: ["A5", "A4", "A3"],
    Pastas: ["A4"]
};

const cores = ["Preto", "Branco", "Azul", "Vermelho", "Verde", "Amarelo"];

function criarCard(nome, tipo, container) {
    const card = document.createElement("div");
    card.classList.add("card");

    let caminhoImagem = "imagens/";

    if (tipo === "produto") {
        caminhoImagem = `imagens/produtos/${nome}.jpg`;
    }

    if (tipo === "tamanho" && produtoSelecionado) {
        caminhoImagem = `imagens/${produtoSelecionado}/tamanhos/${nome}.jpg`;
    }

    if (tipo === "cor" && produtoSelecionado) {
        caminhoImagem = `imagens/${produtoSelecionado}/cores/${nome}.jpg`;
    }

    card.innerHTML = `
        <img src="${caminhoImagem}" onerror="this.src='/imagens/${nome}.jpg'">
        <p>${nome}</p>
    `;

    card.addEventListener("click", () => {
        container.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");

        if (tipo === "produto") {
            produtoSelecionado = nome;
            carregarTamanhos();
        }

        if (tipo === "tamanho") tamanhoSelecionado = nome;
        if (tipo === "cor") corSelecionada = nome;

        calcularTotal();
    });

    container.appendChild(card);
}

function carregarProdutos() {
    produtos.forEach(prod => criarCard(prod, "produto", produtosDiv));
}

function carregarTamanhos() {
    tamanhosDiv.innerHTML = "";
    coresDiv.innerHTML = "";

    tamanhoSelecionado = null;
    corSelecionada = null;

    if (!produtoSelecionado) return;

    tamanhosPorProduto[produtoSelecionado].forEach(t =>
        criarCard(t, "tamanho", tamanhosDiv)
    );

    cores.forEach(c =>
        criarCard(c, "cor", coresDiv)
    );
}

function calcularTotal() {
    if (!produtoSelecionado) {
        totalSpan.textContent = "R$ 0,00";
        return;
    }

    const quantidade = parseInt(quantidadeInput.value);
    
    const preco = precos[produtoSelecionado.toLowerCase()] || 0;
    const total = preco * quantidade;

    totalSpan.textContent = "R$ " + total.toFixed(2);
}

quantidadeInput.addEventListener("input", calcularTotal);

carregarProdutos();
function voltarInicio(){
    window.location.href = "CyberX Proinicio2.html";
}
