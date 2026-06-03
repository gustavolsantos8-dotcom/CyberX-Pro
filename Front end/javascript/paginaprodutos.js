const nomeProduto =
document.getElementById("nomeProduto");

const btnCadastrar =
document.getElementById("btnCadastrar");

const listaProdutos =
document.getElementById("listaProdutos");

const pesquisa =
document.getElementById("pesquisa");

let editando = null;
let produtos = [

{
    nome:"Banner Comercial",
    descricao:"Banner em lona para divulgação empresarial.",
    status:"Disponível"
},

{
    nome:"Cartão de Visita",
    descricao:"Cartão de visita frente e verso.",
    status:"Em Produção"
},

{
    nome:"Panfleto",
    descricao:"Panfleto colorido tamanho A5.",
    status:"Indisponível"
}

];

function renderizarProdutos(lista){

    listaProdutos.innerHTML = "";

    lista.forEach((produto,index)=>{
listaProdutos.innerHTML += `

<div class="produto">

    <h3>${produto.nome}</h3>

    <p>
        ${produto.descricao}
    </p>

    <span class="status ${produto.status
        .toLowerCase()
        .replace(" ","")}">

        ${produto.status}

    </span>

    <div class="acoes">

        <button
            class="editar"
            onclick="editarProduto(${index})">
            Editar
        </button>

        <button
            class="excluir"
            onclick="excluirProduto(${index})">
            Excluir
        </button>

    </div>

</div>

`;
    });
}

function excluirProduto(index){

    if(confirm("Deseja excluir este produto?")){

        produtos.splice(index,1);

        renderizarProdutos(produtos);
    }
}

function editarProduto(index){

    nomeProduto.value = produtos[index];

    editando = index;

    btnCadastrar.textContent =
    "Salvar Alteração";
}

btnCadastrar.addEventListener("click",()=>{

    const nome =
    nomeProduto.value.trim();

    if(nome === ""){

        alert("Digite um produto.");

        return;
    }

    if(editando !== null){

        produtos[editando] = nome;

        editando = null;

        btnCadastrar.textContent =
        "Cadastrar Produto";

    }else{

        produtos.push(nome);
    }

    nomeProduto.value = "";

    renderizarProdutos(produtos);
});

pesquisa.addEventListener("input",()=>{

    const texto =
    pesquisa.value.toLowerCase();

    const filtrados =
    produtos.filter(produto =>

        produto.toLowerCase()
        .includes(texto)

    );

    renderizarProdutos(filtrados);
});

renderizarProdutos(produtos);