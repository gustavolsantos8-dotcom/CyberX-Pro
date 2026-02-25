const produtosEl = document.getElementById("produtos");
const tamanhosEl = document.getElementById("tamanhos");
const coresEl = document.getElementById("cores");
const quantidadeEl = document.getElementById("quantidade");
const totalEl = document.getElementById("total");
const btnPedido = document.getElementById("btnPedido");
const areaPersonalizacao = document.getElementById("areaPersonalizacao");

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
    Pastas: 12
};

const produtos = [
    "Adesivos",
    "Blocos",
    "Camisas",
    "Cartao",
    "Logos",
    "Panfletos",
    "Pastas",
    "Personalizar"
];

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

function criarCards(lista, container, tipo) {
    container.innerHTML = "";

    lista.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = item;

        card.addEventListener("click", () => selecionar(card, item, tipo, container));

        container.appendChild(card);
    });
}

function selecionar(card, valor, tipo, container) {
    container.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    if (valor === "Personalizar") {
        areaPersonalizacao.style.display = "block";
        produtoSelecionado = null;
        atualizarTotal();
        return;
    } else {
        areaPersonalizacao.style.display = "none";
    }

    if (tipo === "produto") {
        produtoSelecionado = valor;
        criarCards(tamanhosPorProduto[valor], tamanhosEl, "tamanho");
        criarCards(cores, coresEl, "cor");
    }

    if (tipo === "tamanho") tamanhoSelecionado = valor;
    if (tipo === "cor") corSelecionada = valor;

    atualizarTotal();
    validarPedido();
}

function atualizarTotal() {
    if (!produtoSelecionado) {
        totalEl.textContent = "R$ 0,00";
        return;
    }

    const quantidade = parseInt(quantidadeEl.value);
    const preco = precos[produtoSelecionado] || 0;
    const total = preco * quantidade;

    totalEl.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function validarPedido() {
    btnPedido.disabled = !(produtoSelecionado && tamanhoSelecionado && corSelecionada);
}

quantidadeEl.addEventListener("input", atualizarTotal);

btnPedido.addEventListener("click", () => {
    alert("Pedido enviado com sucesso para a Gráfica HolliDay!");
});

document.getElementById("btnEnviarPersonalizacao")
.addEventListener("click", () => {
    document.getElementById("mensagemSucesso")
    .textContent = "Personalização enviada com sucesso!";
});

criarCards(produtos, produtosEl, "produto");
document.getElementById("btnPedido").addEventListener("click", function() {
    const total = document.getElementById("total").innerText;
    const quantidade = document.getElementById("quantidade").value;
    localStorage.setItem("pedidoTotal", total);
    localStorage.setItem("pedidoQuantidade", quantidade);
    window.location.href = "checkout.html";
});