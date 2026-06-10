// Redireciona para login se não houver sessão ativa
if (!localStorage.getItem("usuarioLogado")) {
    window.location.href = "login.html";
}
 
// ─── Busca os pedidos reais do back-end ───────────────────────────────────────
fetch("https://localhost:7266/Pedidos", {
    method: "GET",
    credentials: "include",
})
    .then(response => {
        if (response.status === 401) {
            alert("Sessão expirada. Faça login novamente!");
            window.location.href = "login.html";
            return null;
        }
        return response.json();
    })
    .then(pedidos => {
        if (!pedidos) return;
 
        const lista = document.getElementById("listaPedidos");
        lista.innerHTML = "";
 
        if (pedidos.length === 0) {
            lista.innerHTML = "<p>Você ainda não possui pedidos.</p>";
            return;
        }
 
        pedidos.forEach(pedido => {
            const div = document.createElement("div");
            div.classList.add("pedido");
 
            let classeStatus = "";
            if (pedido.status === "Produção")   classeStatus = "producao";
            if (pedido.status === "Pronto")     classeStatus = "pronto";
            if (pedido.status === "Entregue")   classeStatus = "entregue";
            if (pedido.status === "Aguardando") classeStatus = "aguardando";
 
            const valorFormatado = Number(pedido.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
 
            div.innerHTML = `
                <h3>${pedido.descricao}</h3>
                <p><strong>Valor:</strong> ${valorFormatado}</p>
                <span class="status ${classeStatus}">${pedido.status}</span>
                <br>
                <button class="botao-detalhes" onclick="verDetalhes(${pedido.id})">
                    Ver detalhes
                </button>
            `;
 
            lista.appendChild(div);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar pedidos:", error);
        alert("Erro ao carregar pedidos. Verifique sua conexão.");
    });
 
// ─── Detalhes do pedido ───────────────────────────────────────────────────────
function verDetalhes(id) {
    fetch(`https://localhost:7266/Pedidos/${id}`, {
        method: "GET",
        credentials: "include",
    })
        .then(response => {
            if (response.status === 404) {
                alert("Pedido não encontrado!");
                return null;
            }
            return response.json();
        })
        .then(pedido => {
            if (!pedido) return;
 
            const valorFormatado = Number(pedido.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
 
            alert(
                `Pedido #${pedido.id}\n` +
                `Descrição: ${pedido.descricao}\n` +
                `Status: ${pedido.status}\n` +
                `Valor: ${valorFormatado}`
            );
        })
        .catch(error => {
            console.error("Erro ao buscar detalhes:", error);
        });
}
 