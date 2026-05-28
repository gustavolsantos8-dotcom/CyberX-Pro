console.log("Página de contato carregada com sucesso!");
const elementosAnimar = document.querySelectorAll('.animar');

function animarAoRolar() {
    const alturaTela = window.innerHeight;

    elementosAnimar.forEach(elemento => {
        const posicao = elemento.getBoundingClientRect().top;

        if (posicao < alturaTela - 100) {
            elemento.classList.add('ativo');
        }
    });
}

window.addEventListener('scroll', animarAoRolar);
window.addEventListener('load', animarAoRolar);

