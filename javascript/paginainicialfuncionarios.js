const setores = ["Atendimento", "Design", "Impressão", "Acabamento", "Entrega"];

let setorAtual = "";
let pedidos = [
    {
        id: 1,
        cliente: "Maria Silva",
        produto: "Cartão de Visita",
        descricao: "500 unidades, papel couchê 300g, frente e verso, acabamento fosco.",
        status: "pendente",
        setor: "Atendimento"
    },
    {
        id: 2,
        cliente: "João Souza",
        produto: "Banner 1x1",
        descricao: "Banner em lona com ilhós nas 4 pontas, arte enviada pelo cliente.",
        status: "andamento",
        setor: "Design"
    },
    {
        id: 3,
        cliente: "Empresa X",
        produto: "1000 Panfletos",
        descricao: "Panfletos coloridos, tamanho A5, papel 90g.",
        status: "pendente",
        setor: "Impressão"
    },
    {
        id: 4,
        cliente: "Clínica Vida",
        produto: "Receituário",
        descricao: "Bloco com 100 folhas, impressão preto e branco.",
        status: "finalizado",
        setor: "Acabamento"
    },
    {
        id: 5,
        cliente: "Mercadinho Bom Preço",
        produto: "Faixa Promocional",
        descricao: "Faixa 3 metros, lona reforçada, arte criada pela gráfica.",
        status: "pendente",
        setor: "Atendimento"
    },
    {
        id: 6,
        cliente: "Escola Futuro",
        produto: "Blocos Personalizados",
        descricao: "200 blocos A6 com logotipo da escola.",
        status: "andamento",
        setor: "Design"
    },
    {
        id: 7,
        cliente: "Loja Bella",
        produto: "Adesivos",
        descricao: "Adesivos redondos 5cm, impressão colorida.",
        status: "pendente",
        setor: "Impressão"
    },
    {
        id: 8,
        cliente: "Advocacia Santos",
        produto: "Envelope Timbrado",
        descricao: "Envelope tamanho A4 com logo e dados do escritório.",
        status: "andamento",
        setor: "Acabamento"
    }
];
const listaFuncoes = document.getElementById("listaFuncoes");

setores.forEach(setor => {
    const btn = document.createElement("button");
    btn.classList.add("btn-setor");
    btn.innerText = setor;
    btn.onclick = () => abrirSetor(setor);
    listaFuncoes.appendChild(btn);
});

function abrirSetor(setor) {
    setorAtual = setor;
    document.getElementById("selecionarFuncao").classList.add("hidden");
    document.getElementById("painelPedidos").classList.remove("hidden");
    document.getElementById("tituloFuncao").innerText = "Setor: " + setor;
    mostrarPedidos();
}

function voltarFuncoes() {
    document.getElementById("selecionarFuncao").classList.remove("hidden");
    document.getElementById("painelPedidos").classList.add("hidden");
}

function mostrarPedidos() {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    pedidos
        .filter(p => p.setor === setorAtual)
        .forEach(pedido => {

            const card = document.createElement("div");
            card.classList.add("card-pedido");

         card.innerHTML = `
    <h3>${pedido.produto}</h3>
    <p><strong>Cliente:</strong> ${pedido.cliente}</p>
    <p><strong>Status:</strong> ${pedido.status}</p>
    <p><strong>Descrição:</strong> ${pedido.descricao}</p>

                <select onchange="mudarSetor(${pedido.id}, this.value)">
                    <option value="">Levar para outro setor</option>
                    ${setores
                        .filter(s => s !== setorAtual)
                        .map(s => `<option value="${s}">${s}</option>`)
                        .join("")}
                </select>
            `;

            lista.appendChild(card);
        });
}

function mudarSetor(id, novoSetor) {
    if(!novoSetor) return;

    const pedido = pedidos.find(p => p.id === id);
    pedido.setor = novoSetor;

    alert("Pedido enviado para o setor de " + novoSetor);
    mostrarPedidos();
}

function filtrarPedidos(status) {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    pedidos
        .filter(p => p.setor === setorAtual && p.status === status)
        .forEach(pedido => {

            const card = document.createElement("div");
            card.classList.add("card-pedido");

       card.innerHTML = `
    <h3>${pedido.produto}</h3>
    <p><strong>Cliente:</strong> ${pedido.cliente}</p>
    <p><strong>Status:</strong> ${pedido.status}</p>
    <p><strong>Descrição:</strong> ${pedido.descricao}</p>

                <select onchange="mudarSetor(${pedido.id}, this.value)">
                    <option value="">Levar para outro setor</option>
                    ${setores
                        .filter(s => s !== setorAtual)
                        .map(s => `<option value="${s}">${s}</option>`)
                        .join("")}
                </select>
            `;

            lista.appendChild(card);
        });
}