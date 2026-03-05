document.addEventListener("DOMContentLoaded", function () {

    const clientes = [
        { nome: "João Silva", servico: "Cartões", area: "Arte Finalista", status: "Pendente" },
        { nome: "Maria Oliveira", servico: "Banner", area: "Impressão Offset", status: "Producao" },
        { nome: "Carlos Santos", servico: "Panfletos", area: "Cortador", status: "Producao" },
        { nome: "Empresa XPTO", servico: "Revista", area: "Brochurista", status: "Pendente" },
        { nome: "Loja Central", servico: "Orçamento Folder", area: "Orçamentista", status: "Finalizado" },
        { nome: "Entrega Local", servico: "Distribuição", area: "Motoboy", status: "Producao" }
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
