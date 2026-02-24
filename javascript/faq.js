const perguntas = document.querySelectorAll(".faq-question");

perguntas.forEach(botao => {
    botao.addEventListener("click", () => {
        const resposta = botao.nextElementSibling;

        resposta.style.display =
            resposta.style.display === "block" ? "none" : "block";
    });
});