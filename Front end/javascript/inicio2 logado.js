const logado = localStorage.getItem("usuarioLogado");
const tipo = localStorage.getItem("tipoUsuario");

if(!logado){
    window.location.href = "CyberX Proinicio2.html";
}

const btnPerfil = document.getElementById("btnPerfil");
const menuPerfil = document.getElementById("menuPerfil");
btnPerfil.addEventListener("click", () => {
    menuPerfil.style.display =
        menuPerfil.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function(event) {
    if (!event.target.closest(".usuario")) {
        menuPerfil.style.display = "none";
    }
});


