if(!localStorage.getItem("usuarioLogado")){
    window.location.href = "login.html";
}

// Pedidos de exemplo (visual demonstrativo)
const pedidos = [
    {
        id: 1,
        produto: "Cartões de Visita - 500 unidades",
        data: "18/02/2026",
        status: "Produção",
        valor: "R$ 120,00"
    },
    {
        id: 2,
        produto: "Banner 1x2m - Lona",
        data: "15/02/2026",
        status: "Pronto",
        valor: "R$ 180,00"
    },
    {
        id: 3,
        produto: "Adesivos Personalizados - 200 unidades",
        data: "10/02/2026",
        status: "Entregue",
        valor: "R$ 95,00"
    }
];

const lista = document.getElementById("listaPedidos");

pedidos.forEach(pedido => {

    const div = document.createElement("div");
    div.classList.add("pedido");

    let classeStatus = "";

    if(pedido.status === "Produção") classeStatus = "producao";
    if(pedido.status === "Pronto") classeStatus = "pronto";
    if(pedido.status === "Entregue") classeStatus = "entregue";

    div.innerHTML = `
        <h3>${pedido.produto}</h3>
        <p><strong>Data:</strong> ${pedido.data}</p>
        <p><strong>Valor:</strong> ${pedido.valor}</p>
        <span class="status ${classeStatus}">${pedido.status}</span>
        <br>
        <button class="botao-detalhes" onclick="verDetalhes(${pedido.id})">
            Ver detalhes
        </button>
    `;

    lista.appendChild(div);
});

function verDetalhes(id){
    alert("Detalhes do pedido #" + id + " em desenvolvimento.");
}