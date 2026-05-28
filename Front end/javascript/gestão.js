const etapas = [
    "Atendente",
    "Arte Finalista",
    "Analista de PCP",
    "Impressor Offset",
    "Cortador",
    "Brochurista",
    "Operador de Corte e Vinco",
    "Motoboy",
    "Pedido Finalizado"
];

let pedidos = [];

function criarPedido() {
    const nome = document.getElementById("nomeCliente").value;
    const descricao = document.getElementById("descricaoPedido").value;

    if (!nome || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const agora = new Date();

    const novoPedido = {
        id: Date.now(),
        cliente: nome,
        descricao: descricao,
        etapaAtual: 0,
        historico: [],
        inicioPedido: agora,
        etapaInicio: agora,
        finalizadoEm: null
    };

    pedidos.push(novoPedido);
    renderizarPedidos();

    document.getElementById("nomeCliente").value = "";
    document.getElementById("descricaoPedido").value = "";
}

function avancarEtapa(id) {
    const pedido = pedidos.find(p => p.id === id);
    const agora = new Date();

    const descricaoEtapa = document.getElementById(`desc-${id}`).value;
    const funcionario = document.getElementById(`func-${id}`).value;

    if (!descricaoEtapa || !funcionario) {
        alert("Preencha o nome do funcionário e a descrição.");
        return;
    }

    const tempoEtapa = calcularDiferencaTempo(pedido.etapaInicio, agora);

    pedido.historico.push({
        etapa: etapas[pedido.etapaAtual],
        funcionario: funcionario,
        descricao: descricaoEtapa,
        horarioFinalizacao: agora.toLocaleString(),
        tempoEtapa: tempoEtapa
    });

    pedido.etapaInicio = new Date();

    if (pedido.etapaAtual < etapas.length - 1) {
        pedido.etapaAtual++;
    }

    if (pedido.etapaAtual === etapas.length - 1) {
        pedido.finalizadoEm = new Date();
    }

    renderizarPedidos();
}

function voltarEtapa(id) {
    const pedido = pedidos.find(p => p.id === id);

    if (pedido.etapaAtual > 0) {
        pedido.etapaAtual--;
    }

    renderizarPedidos();
}

function calcularDiferencaTempo(inicio, fim) {
    const diff = fim - inicio;

    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return `${horas}h ${minutosRestantes}min`;
}

function calcularTempoTotal(pedido) {
    if (!pedido.finalizadoEm) return null;

    return calcularDiferencaTempo(pedido.inicioPedido, pedido.finalizadoEm);
}

function renderizarPedidos() {
    const container = document.getElementById("listaPedidos");
    container.innerHTML = "";

    pedidos.forEach(pedido => {

        let historicoHTML = "";

        pedido.historico.forEach(h => {
            historicoHTML += `
                <p><strong>${h.etapa}</strong></p>
                <p><strong>Funcionário:</strong> ${h.funcionario}</p>
                <p><strong>Descrição:</strong> ${h.descricao}</p>
                <p><strong>Finalizado em:</strong> ${h.horarioFinalizacao}</p>
                <p><strong>Tempo na etapa:</strong> ${h.tempoEtapa}</p>
                <hr>
            `;
        });

        const tempoTotal = calcularTempoTotal(pedido);

        const card = document.createElement("div");
        card.classList.add("pedido-card");

        card.innerHTML = `
            <h3>Cliente: ${pedido.cliente}</h3>
            <p><strong>Pedido:</strong> ${pedido.descricao}</p>
            <p><strong>Etapa Atual:</strong> ${etapas[pedido.etapaAtual]}</p>

            ${pedido.etapaAtual < etapas.length - 1 ? `
                <input type="text" id="func-${pedido.id}" class="funcionario-input"
                placeholder="Nome do funcionário responsável">

                <textarea id="desc-${pedido.id}"
                placeholder="Descreva o que foi feito nesta etapa..."></textarea>

                <div class="botoes">
                    <button class="avancar-btn"
                    onclick="avancarEtapa(${pedido.id})">
                        Concluir Etapa
                    </button>

                    <button class="voltar-btn"
                    onclick="voltarEtapa(${pedido.id})">
                        Voltar Etapa
                    </button>
                </div>
            ` : `<p style="color:lime;">✔ Pedido Finalizado</p>`}

            ${tempoTotal ? `<p class="tempo-total">⏱ Tempo Total do Pedido: ${tempoTotal}</p>` : ""}

            <h4 style="margin-top:15px;">Histórico:</h4>
            ${historicoHTML}
        `;

        container.appendChild(card);
    });
}
