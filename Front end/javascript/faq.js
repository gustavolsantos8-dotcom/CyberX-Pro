const perguntas = document.querySelectorAll(".faq-pergunta");

perguntas.forEach(botao => {
    botao.addEventListener("click", () => {
        const resposta = botao.nextElementSibling;

        resposta.style.display =
            resposta.style.display === "block" ? "none" : "block";
    });
});