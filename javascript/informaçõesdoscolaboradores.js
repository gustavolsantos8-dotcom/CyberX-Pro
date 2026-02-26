let dadosFuncionarios = [];
let funcaoAtual = null;
let editandoIndex = null;

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
        nome: nome.value,
        cargo: cargoSelect.value,
        nascimento: nascimento.value,
        cpf: cpf.value,
        telefone: telefone.value,
        foto: previewFoto.src || ""
    };

    if(editandoIndex !== null){
        dadosFuncionarios[editandoIndex] = funcionario;
        editandoIndex = null;
    } else {
        dadosFuncionarios.push(funcionario);
    }

    formContainer.classList.add("oculto");
    mostrarFuncionarios(funcaoAtual);
};

function mostrarFuncionarios(funcao){
    funcionariosContainer.innerHTML = "";

    let filtrados = dadosFuncionarios.filter(f => f.cargo === funcao);

    const termo = barraPesquisa.value.toLowerCase();
    filtrados = filtrados.filter(f => f.nome.toLowerCase().includes(termo));

    filtrados.forEach((funcionario, index) => {
        const card = document.createElement("div");
        card.classList.add("funcionario-card");

        card.innerHTML = `
            ${funcionario.foto ? `<img src="${funcionario.foto}">` : ""}
            <h3>${funcionario.nome}</h3>
            <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
            <p><strong>Nascimento:</strong> ${funcionario.nascimento}</p>
            <p><strong>CPF:</strong> ${funcionario.cpf}</p>
            <p><strong>Telefone:</strong> ${funcionario.telefone}</p>
            <button class="btn-editar" onclick="editarFuncionario(${index})">Editar</button>
            <button class="btn-excluir" onclick="excluirFuncionario(${index})">Excluir</button>
        `;

        funcionariosContainer.appendChild(card);
    });
}

function excluirFuncionario(index){
    if(confirm("Deseja excluir este funcionário?")){
        dadosFuncionarios.splice(index,1);
        mostrarFuncionarios(funcaoAtual);
    }
}

function editarFuncionario(index){
    const f = dadosFuncionarios[index];
    nome.value = f.nome;
    cargoSelect.value = f.cargo;
    nascimento.value = f.nascimento;
    cpf.value = f.cpf;
    telefone.value = f.telefone;
    previewFoto.src = f.foto;

    editandoIndex = index;
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