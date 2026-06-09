const API_URL = "https://localhost:7266/Produtos";

const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");
const formCadastro = document.getElementById("cadastroProduto");

function renderizarProdutos(lista) {
    listaProdutos.innerHTML = "";

    if (lista.length === 0) {
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach((produto) => {
        listaProdutos.innerHTML += `
        <div class="produto">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.valor_Do_Produto.toFixed(2)}</p>
            <div class="acoes">
                <button class="editar" onclick="abrirEdicao(${produto.id}, '${produto.nome}', ${produto.valor_Do_Produto})">
                    Editar
                </button>
                <button class="excluir" onclick="excluirProduto(${produto.id})">
                    Excluir
                </button>
            </div>
        </div>`;
    });
}

function carregarProdutos() {
    fetch(API_URL, {
        method: "GET",
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => renderizarProdutos(data))
    .catch(err => console.error("Erro ao carregar produtos:", err));
}

formCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeProduto").value.trim();
    const valor = parseFloat(document.getElementById("valorProduto").value);

    if (nome === "" || isNaN(valor)) {
        alert("Preencha o nome e o valor do produto!");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            valor_Do_Produto: valor
        })
    })
    .then(response => {
        if (response.status === 201) {
            alert("Produto cadastrado com sucesso!");
            formCadastro.reset();
            carregarProdutos();
        } else {
            alert("Erro ao cadastrar produto!");
        }
    })
    .catch(err => console.error("Erro:", err));
});

function excluirProduto(id) {
    if (confirm("Deseja excluir este produto?")) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => {
            if (response.ok) {
                alert("Produto excluído!");
                carregarProdutos();
            } else {
                alert("Erro ao excluir produto!");
            }
        })
        .catch(err => console.error("Erro:", err));
    }
}

function abrirEdicao(id, nomeAtual, valorAtual) {
    const novoNome = prompt("Novo nome do produto:", nomeAtual);
    const novoValor = prompt("Novo valor do produto:", valorAtual);

    if (novoNome && novoValor) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: novoNome,
                valor_Do_Produto: parseFloat(novoValor)
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Produto atualizado!");
                carregarProdutos();
            } else {
                alert("Erro ao atualizar produto!");
            }
        })
        .catch(err => console.error("Erro:", err));
    }
}

pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase();

    fetch(API_URL, { method: "GET", credentials: "include" })
    .then(response => response.json())
    .then(data => {
        const filtrados = data.filter(produto =>
            produto.nome.toLowerCase().includes(texto)
        );
        renderizarProdutos(filtrados);
    });
});

carregarProdutos();