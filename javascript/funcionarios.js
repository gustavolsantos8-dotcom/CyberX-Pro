document.addEventListener("DOMContentLoaded", function () {

    const clientes = [
        { nome: "João Silva", servico: "Cartões", area: "Arte Finalista", status: "pendente" },
        { nome: "Maria Oliveira", servico: "Banner", area: "Impressão Offset", status: "producao" },
        { nome: "Carlos Santos", servico: "Panfletos", area: "Cortador", status: "producao" },
        { nome: "Empresa XPTO", servico: "Revista", area: "Brochurista", status: "pendente" },
        { nome: "Loja Central", servico: "Orçamento Folder", area: "Orçamentista", status: "finalizado" },
        { nome: "Entrega Local", servico: "Distribuição", area: "Motoboy", status: "producao" }
    ];

    const select = document.getElementById("areaSelect");
    const container = document.getElementById("clientesContainer");

    select.addEventListener("change", function () {

        const areaSelecionada = this.value;
        container.innerHTML = "";

        if (!areaSelecionada) return;

        const clientesFiltrados = clientes.filter(cliente => cliente.area === areaSelecionada);

        if (clientesFiltrados.length === 0) {
            container.innerHTML = "<p>Nenhum cliente nesta área.</p>";
            return;
        }

        clientesFiltrados.forEach(cliente => {

            const card = document.createElement("div");
            card.classList.add("cliente-card");

            card.innerHTML = `
                <h3>${cliente.nome}</h3>
                <p><strong>Serviço:</strong> ${cliente.servico}</p>
                <div class="status ${cliente.status}">
                    ${cliente.status.toUpperCase()}
                </div>
            `;

            container.appendChild(card);
        });

    });

});
