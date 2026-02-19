const dadosFuncionarios = [


    { nome: "Carlos Eduardo Almeida", cargo: "Impressor Offset", nascimento: "1985-06-12", tempoEmpresa: "8 anos" },
    { nome: "Marcos Vinícius Rocha", cargo: "Cortador", nascimento: "1988-04-18", tempoEmpresa: "7 anos" },
    { nome: "Fernando Luiz Costa", cargo: "Brochurista", nascimento: "1991-09-10", tempoEmpresa: "6 anos" },
    { nome: "Ricardo Menezes Lima", cargo: "Operador de Corte e Vinco", nascimento: "1987-02-22", tempoEmpresa: "9 anos" },
    { nome: "Juliana Martins Souza", cargo: "Analista de PCP", nascimento: "1992-03-25", tempoEmpresa: "5 anos" },
    { nome: "Patrícia Oliveira Santos", cargo: "Arte Finalista", nascimento: "1995-07-30", tempoEmpresa: "4 anos" },
    { nome: "Roberta Alves Ferreira", cargo: "Supervisor de Arte Finalista", nascimento: "1984-01-12", tempoEmpresa: "11 anos" },


    { nome: "Lucas Henrique Barros", cargo: "Auxiliar Financeiro", nascimento: "1996-05-14", tempoEmpresa: "3 anos" },
    { nome: "Cláudia Regina Mendes", cargo: "Supervisor Financeiro", nascimento: "1980-08-09", tempoEmpresa: "12 anos" },


    { nome: "Eduardo Pires Gomes", cargo: "Supervisor Comercial", nascimento: "1983-11-21", tempoEmpresa: "10 anos" },
    { nome: "Amanda Ribeiro Costa", cargo: "Consultor de Vendas", nascimento: "1993-06-02", tempoEmpresa: "6 anos" },
    { nome: "Thiago Martins Oliveira", cargo: "Consultor de Vendas", nascimento: "1990-10-15", tempoEmpresa: "5 anos" },
    { nome: "Larissa Fernandes Silva", cargo: "Atendente", nascimento: "1998-12-05", tempoEmpresa: "2 anos" },
    { nome: "Bruno César Almeida", cargo: "Orçamentista", nascimento: "1989-03-19", tempoEmpresa: "7 anos" },


    { nome: "Roberto Lima Santos", cargo: "Motoboy", nascimento: "1990-11-02", tempoEmpresa: "6 anos" },
    { nome: "André Felipe Rocha", cargo: "Motoboy", nascimento: "1994-08-14", tempoEmpresa: "3 anos" },
    { nome: "Maria Aparecida Silva", cargo: "Faxineira", nascimento: "1978-01-20", tempoEmpresa: "10 anos" },
    { nome: "Patrícia Gomes Ferreira", cargo: "Faxineira", nascimento: "1983-09-10", tempoEmpresa: "4 anos" }

];

const funcoesUnicas = [...new Set(dadosFuncionarios.map(f => f.cargo))];

const funcoesContainer = document.getElementById("funcoesContainer");
const funcionariosContainer = document.getElementById("funcionariosContainer");

funcoesUnicas.forEach(funcao => {
    const btn = document.createElement("button");
    btn.classList.add("funcao-btn");
    btn.innerText = funcao;

    btn.addEventListener("click", () => {
        mostrarFuncionarios(funcao);
    });

    funcoesContainer.appendChild(btn);
});

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

function mostrarFuncionarios(funcao) {
    funcionariosContainer.innerHTML = "";

    const filtrados = dadosFuncionarios.filter(f => f.cargo === funcao);

    filtrados.forEach(funcionario => {
        const card = document.createElement("div");
        card.classList.add("funcionario-card");

        card.innerHTML = `
            <h3>${funcionario.nome}</h3>
            <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
            <p><strong>Data de Nascimento:</strong> ${funcionario.nascimento}</p>
            <p><strong>Idade:</strong> ${calcularIdade(funcionario.nascimento)} anos</p>
            <p><strong>Tempo de Empresa:</strong> ${funcionario.tempoEmpresa}</p>
        `;

        funcionariosContainer.appendChild(card);
    });
}
