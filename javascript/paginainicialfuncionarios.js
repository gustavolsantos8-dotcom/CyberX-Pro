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

const pedidos = [
{ id: 101, cliente: "Empresa Alpha", area: "Impressor Offset", status: "pendente", inicio: null, fim: null },
{ id: 102, cliente: "Cliente João", area: "Cortador", status: "pendente", inicio: null, fim: null },
{ id: 103, cliente: "Loja Beta", area: "Arte Finalista", status: "pendente", inicio: null, fim: null }
];

let funcaoAtual = "";
let filtroAtual = "pendente";

const listaFuncoes = document.getElementById("listaFuncoes");

funcoes.forEach(funcao => {
    const div = document.createElement("div");
    div.classList.add("card-funcao");
    div.innerText = funcao;
    div.onclick = () => selecionarFuncao(funcao);
    listaFuncoes.appendChild(div);
});

function selecionarFuncao(funcao){
    funcaoAtual = funcao;

    document.getElementById("selecionarFuncao").classList.add("hidden");
    document.getElementById("painelPedidos").classList.remove("hidden");

    document.getElementById("tituloFuncao").innerText = "Área: " + funcao;

    filtrarPedidos("pendente");
}

function filtrarPedidos(status){
    filtroAtual = status;
    renderPedidos();
}

function renderPedidos(){

    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    const filtrados = pedidos.filter(p =>
        p.area === funcaoAtual && p.status === filtroAtual
    );

    if(filtrados.length === 0){
        lista.innerHTML = "<p>Nenhum pedido encontrado.</p>";
        return;
    }

    filtrados.forEach(pedido => {

        const div = document.createElement("div");
        div.classList.add("card-pedido", "status-" + pedido.status);

        div.innerHTML = `
            <strong>Pedido #${pedido.id}</strong><br>
            Cliente: ${pedido.cliente}<br>
            Status: ${pedido.status.toUpperCase()}<br>
            ${pedido.inicio ? "Início: " + pedido.inicio + "<br>" : ""}
            ${pedido.fim ? "Finalizado: " + pedido.fim + "<br>" : ""}
        `;

        if(pedido.status === "pendente"){
            const btn = document.createElement("button");
            btn.innerText = "Iniciar Etapa";
            btn.classList.add("btn-acao", "btn-iniciar");
            btn.onclick = () => iniciarPedido(pedido.id);
            div.appendChild(btn);
        }

        if(pedido.status === "andamento"){
            const btn = document.createElement("button");
            btn.innerText = "Finalizar Etapa";
            btn.classList.add("btn-acao", "btn-finalizar");
            btn.onclick = () => finalizarPedido(pedido.id);
            div.appendChild(btn);
        }

        lista.appendChild(div);
    });
}

function iniciarPedido(id){
    const pedido = pedidos.find(p => p.id === id);
    pedido.status = "andamento";
    pedido.inicio = new Date().toLocaleTimeString();
    renderPedidos();
}

function finalizarPedido(id){
    const pedido = pedidos.find(p => p.id === id);
    pedido.status = "finalizado";
    pedido.fim = new Date().toLocaleTimeString();
    renderPedidos();
}

function voltarFuncoes(){
    document.getElementById("painelPedidos").classList.add("hidden");
    document.getElementById("selecionarFuncao").classList.remove("hidden");
}