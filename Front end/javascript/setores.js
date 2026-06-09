// =============================================
// CONFIGURAÇÃO DA API
// =============================================
const API_URL = "https://localhost:7266/Setores";

// =============================================
// ELEMENTOS DO DOM
// =============================================
const formCadastro = document.getElementById("cadastroSetor");
const listaSetores = document.getElementById("listaSetores");
const pesquisa     = document.getElementById("pesquisa");
const emptyState   = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const totalCount   = document.getElementById("totalCount");
const modalEdicao  = document.getElementById("modalEdicao");

let editandoId = null;

// =============================================
// TOAST
// =============================================
function showToast(mensagem, tipo = "ok") {
    const toast = document.getElementById("toast");
    toast.textContent = mensagem;
    toast.className = "toast" + (tipo === "erro" ? " erro" : "");
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
}

// =============================================
// LOADING
// =============================================
function mostrarLoading() {
    loadingState.classList.remove("hidden");
    emptyState.classList.add("hidden");
    listaSetores.innerHTML = "";
}

function ocultarLoading() {
    loadingState.classList.add("hidden");
}

// =============================================
// RENDERIZAR LISTA
// =============================================
function renderizarSetores(lista) {
    listaSetores.innerHTML = "";
    totalCount.textContent = lista.length;

    if (lista.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    lista.forEach((setor) => {
        listaSetores.innerHTML += `
        <div class="setor-item">
            <div class="setor-info">
                <div class="setor-nome">${setor.nome_de_Setor}</div>
                <div class="setor-id">ID: ${setor.id}</div>
            </div>
            <div class="setor-acoes">
                <button
                    class="btn-acao"
                    onclick="abrirModal(${setor.id}, '${setor.nome_de_Setor.replace(/'/g, "\\'")}')"
                    ✎ Editar
                </button>
                <button
                    class="btn-acao excluir"
                    onclick="excluirSetor(${setor.id})">
                    ✕ Excluir
                </button>
            </div>
        </div>`;
    });
}

// =============================================
// CARREGAR SETORES (GET)
// =============================================
function carregarSetores() {
    mostrarLoading();

    fetch(API_URL, {
        method: "GET",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar setores");
        return response.json();
    })
    .then(data => {
        ocultarLoading();
        renderizarSetores(data);
    })
    .catch(err => {
        ocultarLoading();
        emptyState.classList.remove("hidden");
        console.error("Erro:", err);
    });
}

// =============================================
// CADASTRAR SETOR (POST)
// =============================================
formCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeSetor").value.trim();

    if (nome === "") {
        showToast("Informe o nome do setor!", "erro");
        return;
    }

    const btnCadastrar = document.getElementById("btnCadastrar");
    btnCadastrar.disabled = true;
    btnCadastrar.textContent = "Cadastrando...";

    fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_de_Setor: nome })
    })
    .then(response => {
        if (response.status === 201) {
            showToast("Setor cadastrado com sucesso!");
            formCadastro.reset();
            carregarSetores();
        } else {
            showToast("Erro ao cadastrar setor.", "erro");
        }
    })
    .catch(err => {
        showToast("Erro de conexão com o servidor.", "erro");
        console.error("Erro:", err);
    })
    .finally(() => {
        btnCadastrar.disabled = false;
        btnCadastrar.innerHTML = '<span class="btn-icon">+</span> Cadastrar Setor';
    });
});

// =============================================
// EXCLUIR SETOR (DELETE)
// =============================================
function excluirSetor(id) {
    if (!confirm("Deseja excluir este setor?")) return;

    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
            showToast("Setor excluído.");
            carregarSetores();
        } else {
            showToast("Erro ao excluir setor.", "erro");
        }
    })
    .catch(err => {
        showToast("Erro de conexão.", "erro");
        console.error("Erro:", err);
    });
}

// =============================================
// MODAL DE EDIÇÃO
// =============================================
function abrirModal(id, nome) {
    editandoId = id;
    document.getElementById("editNome").value = nome;
    modalEdicao.classList.remove("hidden");
}

function fecharModal() {
    modalEdicao.classList.add("hidden");
    editandoId = null;
}

modalEdicao.addEventListener("click", function (e) {
    if (e.target === modalEdicao) fecharModal();
});

function salvarEdicao() {
                                                                                                                                                                                               if (nome === "") {
        showToast("O nome do setor é obrigatório.", "erro");
        return;                                            
    }

    fetch(`${API_URL}/${editandoId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_de_Setor: nome })
    })
    .then(response => {
        if (response.ok) {
            showToast("Setor atualizado!");
            fecharModal();
            carregarSetores();
        } else {
            showToast("Erro ao atualizar setor.", "erro");
        }
    })
    .catch(err => {
        showToast("Erro de conexão.", "erro");
        console.error("Erro:", err);
    });
}

// =============================================
// PESQUISA EM TEMPO REAL
// =============================================
pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase();

    fetch(API_URL, {
        method: "GET",
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        const filtrados = data.filter(setor =>
            setor.nome_de_Setor.toLowerCase().includes(texto)
        );
        renderizarSetores(filtrados);
    })
    .catch(err => console.error("Erro:", err));
});

// =============================================
// INICIALIZA
// =============================================
carregarSetores();
