const elementos = document.querySelectorAll(".animar");

function animarScroll() {
    const topoPagina = window.pageYOffset;

    elementos.forEach((elemento) => {
        if (elemento.offsetTop < topoPagina + window.innerHeight - 100) {
            elemento.classList.add("ativo");
        }
    });
}

window.addEventListener("scroll", animarScroll);
animarScroll();
