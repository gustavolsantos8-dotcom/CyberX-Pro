const resumoDiv = document.getElementById("resumo");
const btnConfirmar = document.getElementById("btnConfirmar");
const mensagemFinal = document.getElementById("mensagemFinal");

const pedido = JSON.parse(localStorage.getItem("pedidoAtual"));

if (pedido) {
    resumoDiv.innerHTML = `
        <p><strong>Produto:</strong> ${pedido.produto}</p>
        <p><strong>Tamanho:</strong> ${pedido.tamanho}</p>
        <p><strong>Cor:</strong> ${pedido.cor}</p>
        <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
        <p><strong>Total:</strong> ${pedido.total}</p>
    `;
}

btnConfirmar.addEventListener("click", () => {
    mensagemFinal.textContent = "Pedido confirmado com sucesso! A Gráfica HolliDay entrará em contato.";
});