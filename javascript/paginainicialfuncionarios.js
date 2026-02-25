const funcoes = [
"Impressor Offset",
"Cortador",
"Brochurista",
"Operador de Corte e Vinco",
"Analista de PCP",
"Arte Finalista",
"Supervisor de Arte Finalista",
"Auxiliar Financeiro",
"Supervisor Financeiro",
"Supervisor Comercial",
"Consultor de Vendas",
"Atendente",
"Orçamentista",
"Motoboy",
"Faxineira"
];

const pedidosMock = [
{ id: 101, cliente: "Empresa Alpha", status: "pendente" },
{ id: 102, cliente: "Cliente João", status: "andamento" },
{ id: 103, cliente: "Loja Beta", status: "finalizado" },
{ id: 104, cliente: "Maria Silva", status: "pendente" },
{ id: 105, cliente: "Gráfica XYZ", status: "andamento" }
];

const listaFuncoes = document.getElementById("listaFuncoes");

funcoes.forEach(funcao => {
    const div = document.createElement("div");
    div.classList.add("card-funcao");
    div.innerText = funcao;
    div.onclick = () => selecionarFuncao(funcao);
    listaFuncoes.appendChild(div);
});

function selecionarFuncao(funcao) {
    document.getElementById("selecionarFuncao").classList.add("hidden");
    document.getElementById("painelPedidos").classList.remove("hidden");
    document.getElementById("tituloFuncao").innerText = "Função: " + funcao;
    filtrarPedidos("pendente");
}

function filtrarPedidos(status) {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    const filtrados = pedidosMock.filter(p => p.status === status);

    filtrados.forEach(pedido => {
        const div = document.createElement("div");
        div.classList.add("card-pedido");
        div.innerHTML = `
            <strong>Pedido #${pedido.id}</strong><br>
            Cliente: ${pedido.cliente}<br>
            Status: ${pedido.status}
        `;
        lista.appendChild(div);
    });
}

function voltarFuncoes() {
    document.getElementById("painelPedidos").classList.add("hidden");
    document.getElementById("selecionarFuncao").classList.remove("hidden");
}