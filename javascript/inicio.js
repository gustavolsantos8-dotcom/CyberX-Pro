let precoBase = 0;
let produtoSelecionado = "";

/* MENU */
function toggleMenu() {
    const menu = document.getElementById("menuConfig");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

/* CARROSSEL */
let slideAtual = 0;
const slides = document.querySelectorAll(".slide");
setInterval(() => {
    slides[slideAtual].classList.remove("ativo");
    slideAtual = (slideAtual + 1) % slides.length;
    slides[slideAtual].classList.add("ativo");
}, 3500);

/* PRODUTO */
function abrirProduto(nome, preco) {
    produtoSelecionado = nome;
    precoBase = preco;
    document.getElementById("nomeProduto").innerText = nome;
    document.getElementById("modalProduto").style.display = "flex";
    calcularValorProduto();
}

function calcularValorProduto() {
    const tamanho = document.getElementById("tamanho").value;
    const cor = document.getElementById("cor").value;
    document.getElementById("valorProduto").innerText =
        (precoBase * tamanho * cor).toFixed(2);
}

function fecharModal() {
    document.getElementById("modalProduto").style.display = "none";
}

/* ORÇAMENTO */
function abrirOrcamento() {
    document.getElementById("modalOrcamento").style.display = "flex";
    calcularOrcamento();
}

function fecharOrcamento() {
    document.getElementById("modalOrcamento").style.display = "none";
}

function calcularOrcamento() {
    const produto = document.getElementById("orcProduto").value;
    const qtd = document.getElementById("quantidade").value;
    const tamanho = document.getElementById("orcTamanho").value;
    const cor = document.getElementById("orcCor").value;

    const total = produto * qtd * tamanho * cor;
    document.getElementById("valorOrcamento").innerText = total.toFixed(2);
}

/* ENVIAR PARA WHATSAPP */
function enviarWhatsAppPedido() {
    const valor = document.getElementById("valorProduto").innerText;
    const tamanho = document.getElementById("tamanho").selectedOptions[0].text;
    const cor = document.getElementById("cor").selectedOptions[0].text;

    const mensagem =
        `📄 *Pedido - Gráfica Holliday*%0A%0A` +
        `Produto: ${produtoSelecionado}%0A` +
        `Tamanho: ${tamanho}%0A` +
        `Cor: ${cor}%0A` +
        `💰 Valor: R$ ${valor}`;

    const telefone = "5511999999999"; // Substitua pelo número real
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

function enviarWhatsAppOrcamento() {
    const produto = document.getElementById("orcProduto").selectedOptions[0].text;
    const qtd = document.getElementById("quantidade").value;
    const tamanho = document.getElementById("orcTamanho").selectedOptions[0].text;
    const cor = document.getElementById("orcCor").selectedOptions[0].text;
    const valor = document.getElementById("valorOrcamento").innerText;

    const mensagem =
        `📄 *Orçamento - Gráfica Holliday*%0A%0A` +
        `Produto: ${produto}%0A` +
        `Quantidade: ${qtd}%0A` +
        `Tamanho: ${tamanho}%0A` +
        `Cor: ${cor}%0A` +
        `💰 Total: R$ ${valor}`;

    const telefone = "5511999999999"; // Substitua pelo número real
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

/* ENVIAR PARA E-MAIL */
function enviarEmailPedido() {
    const valor = document.getElementById("valorProduto").innerText;
    const tamanho = document.getElementById("tamanho").selectedOptions[0].text;
    const cor = document.getElementById("cor").selectedOptions[0].text;

    const email = "contato@graficaholliday.com"; // substitua pelo seu email
    const assunto = "Pedido - Gráfica Holliday";
    const corpo = `Produto: ${produtoSelecionado}\nTamanho: ${tamanho}\nCor: ${cor}\nValor: R$ ${valor}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}

function enviarEmailOrcamento() {
    const produto = document.getElementById("orcProduto").selectedOptions[0].text;
    const qtd = document.getElementById("quantidade").value;
    const tamanho = document.getElementById("orcTamanho").selectedOptions[0].text;
    const cor = document.getElementById("orcCor").selectedOptions[0].text;
    const valor = document.getElementById("valorOrcamento").innerText;

    const email = "contato@graficaholliday.com"; // substitua pelo seu email
    const assunto = "Orçamento - Gráfica Holliday";
    const corpo = `Produto: ${produto}\nQuantidade: ${qtd}\nTamanho: ${tamanho}\nCor: ${cor}\nTotal: R$ ${valor}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}