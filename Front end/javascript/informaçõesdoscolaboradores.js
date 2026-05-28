let dadosFuncionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
let funcaoAtual = null;
let editandoId = null;

const funcoesContainer = document.getElementById("funcoesContainer");
const funcionariosContainer = document.getElementById("funcionariosContainer");
const cargoSelect = document.getElementById("cargoSelect");
const formContainer = document.getElementById("formContainer");
const barraPesquisa = document.getElementById("barraPesquisa");

const funcoesFixas = [
"Impressor Offset","Cortador","Brochurista",
"Operador de Corte e Vinco","Analista de PCP",
"Arte Finalista","Supervisor de Arte Finalista",
"Auxiliar Financeiro","Supervisor Financeiro",
"Supervisor Comercial","Consultor de Vendas",
"Atendente","Orçamentista","Motoboy","Faxineira"
];


if(dadosFuncionarios.length === 0){
    dadosFuncionarios = [
        {
            id: Date.now(),
            nome: "Carlos Silva",
            cargo: "Arte Finalista",
            nascimento: "1995/06/10",
            cpf: "000.000.000-00",
            telefone: "(79) 99999-0000",
            foto: ""
        },
        {
            id: Date.now()+1,
            nome: "Fernanda Oliveira",
            cargo: "Consultor de Vendas",
            nascimento: "1992/03/22",
            cpf: "111.111.111-11",
            telefone: "(79) 98888-0000",
            foto: ""
        }
    ];

    salvarLocalStorage();
}


funcoesFixas.forEach(funcao => {

    const btn = document.createElement("button");
    btn.classList.add("funcao-btn");
    btn.innerText = funcao;

    btn.onclick = () => {
        funcaoAtual = funcao;
        mostrarFuncionarios(funcao);
    };

    funcoesContainer.appendChild(btn);

    const option = document.createElement("option");
    option.value = funcao;
    option.textContent = funcao;
    cargoSelect.appendChild(option);
});

document.getElementById("btnCadastrar").onclick = () => {
    limparFormulario();
    editandoId = null;
    formContainer.classList.toggle("oculto");
};

document.getElementById("foto").addEventListener("change", function(){
    const reader = new FileReader();
    reader.onload = () => {
        document.getElementById("previewFoto").src = reader.result;
    };
    reader.readAsDataURL(this.files[0]);
});


document.getElementById("salvarFuncionario").onclick = () => {

    const funcionario = {
        id: editandoId || Date.now(),
        nome: nome.value,
        cargo: cargoSelect.value,
        nascimento: nascimento.value,
        cpf: cpf.value,
        telefone: telefone.value,
        foto: previewFoto.src || ""
    };

    if(editandoId){
        const index = dadosFuncionarios.findIndex(f => f.id === editandoId);
        dadosFuncionarios[index] = funcionario;
    } else {
        dadosFuncionarios.push(funcionario);
    }

    salvarLocalStorage();
    formContainer.classList.add("oculto");

    if(funcaoAtual){
        mostrarFuncionarios(funcaoAtual);
    }
};

function mostrarFuncionarios(funcao){

    funcionariosContainer.innerHTML = "";

    let filtrados = dadosFuncionarios.filter(f => f.cargo === funcao);

    const termo = barraPesquisa.value.toLowerCase();
    filtrados = filtrados.filter(f => f.nome.toLowerCase().includes(termo));

    filtrados.forEach(funcionario => {

        const card = document.createElement("div");
        card.classList.add("funcionario-card");

        card.innerHTML = `
            ${funcionario.foto ? `<img src="${funcionario.foto}">` : ""}
            <h3>${funcionario.nome}</h3>
            <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
            <p><strong>Nascimento:</strong> ${funcionario.nascimento}</p>
            <p><strong>CPF:</strong> ${funcionario.cpf}</p>
            <p><strong>Telefone:</strong> ${funcionario.telefone}</p>
            <button class="btn-editar">Editar</button>
            <button class="btn-excluir">Excluir</button>
        `;

        card.querySelector(".btn-editar").onclick = () => editarFuncionario(funcionario.id);
        card.querySelector(".btn-excluir").onclick = () => excluirFuncionario(funcionario.id);

        funcionariosContainer.appendChild(card);
    });
}


function excluirFuncionario(id){
    if(confirm("Deseja excluir este funcionário?")){
        dadosFuncionarios = dadosFuncionarios.filter(f => f.id !== id);
        salvarLocalStorage();
        mostrarFuncionarios(funcaoAtual);
    }
}


function editarFuncionario(id){

    const f = dadosFuncionarios.find(f => f.id === id);

    nome.value = f.nome;
    cargoSelect.value = f.cargo;
    nascimento.value = f.nascimento;
    cpf.value = f.cpf;
    telefone.value = f.telefone;
    previewFoto.src = f.foto;

    editandoId = id;
    formContainer.classList.remove("oculto");
}

function limparFormulario(){
    nome.value="";
    nascimento.value="";
    cpf.value="";
    telefone.value="";
    previewFoto.src="";
}

barraPesquisa.addEventListener("input", () => {
    if(funcaoAtual){
        mostrarFuncionarios(funcaoAtual);
    }
});
function salvarLocalStorage(){
    localStorage.setItem("funcionarios", JSON.stringify(dadosFuncionarios));
}