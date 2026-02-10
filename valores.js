const produto = document.getElementById("produto");
const quantidade = document.getElementById("quantidade");
const tamanho = document.getElementById("tamanho");
const unitarioSpan = document.getElementById("unitario");
const totalSpan = document.getElementById("total");
const clienteP = document.getElementById("cliente");

// Dados do cliente
const nome = localStorage.getItem("nome");
const empresa = localStorage.getItem("empresa");
clienteP.textContent = `${nome} - ${empresa}`;

// Preços base
const precos = {
    adesivos: 2,
    blocos: 4,
    camisas: 25,
    cartao: 1.5,
    panfletos: 1,
    pastas: 8,
    logos: 200
};

// Multiplicador por tamanho
const tamanhos = {
    pp: 0.9,
    p: 1,
    m: 1.1,
    g: 1.2,
    gg: 1.3,
    xg: 1.4
};

function calcular() {
    if (!produto.value) {
        unitarioSpan.textContent = "R$ 0,00";
        totalSpan.textContent = "R$ 0,00";
        return;
    }

    const q = Number(quantidade.value);
    let valorBase = precos[produto.value];
    let multiplicador = tamanhos[tamanho.value];

    let valorUnitario = valorBase * multiplicador;
    let total;

    if (produto.value === "logos") {
        total = valorBase;
        valorUnitario = valorBase;
    } else {
        total = valorUnitario * q;
    }

    unitarioSpan.textContent = `R$ ${valorUnitario.toFixed(2)}`;
    totalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

produto.addEventListener("change", calcular);
quantidade.addEventListener("change", calcular);
tamanho.addEventListener("change", calcular);

document.getElementById("finalizar").addEventListener("click", () => {
    if (!produto.value) {
        alert("Selecione um produto!");
        return;
    }

    const coresSelecionadas = [...document.querySelectorAll(".cores input:checked")]
        .map(c => c.value)
        .join(", ");

    alert(
        `Orçamento finalizado!\n\n` +
        `Produto: ${produto.value}\n` +
        `Quantidade: ${quantidade.value}\n` +
        `Tamanho: ${tamanho.value.toUpperCase()}\n` +
        `Cores: ${coresSelecionadas || "Nenhuma"}\n` +
        `Total: ${totalSpan.textContent}`
    );
});

calcular();
