const pedido = JSON.parse(localStorage.getItem("pedidoAtual"));

if (pedido) {
    document.getElementById("resProduto").textContent = pedido.produto;
    document.getElementById("resTamanho").textContent = pedido.tamanho;
    document.getElementById("resCor").textContent = pedido.cor;
    document.getElementById("resQuantidade").textContent = pedido.quantidade;
    document.getElementById("resTotal").textContent = pedido.total;
}

function finalizarPagamento() {

    const forma = document.getElementById("formaPagamento").value;

    document.getElementById("mensagemFinal").textContent =
        "Pagamento via " + forma + " confirmado com sucesso! ✔️";

    localStorage.removeItem("pedidoAtual");
}