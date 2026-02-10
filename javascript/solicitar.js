const form = document.getElementById("formSolicitar");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Salva dados para usar na outra página
    localStorage.setItem("nome", document.getElementById("nome").value);
    localStorage.setItem("empresa", document.getElementById("empresa").value);
    localStorage.setItem("whatsapp", document.getElementById("whatsapp").value);
    localStorage.setItem("email", document.getElementById("email").value);

    // Vai direto para a página de valores
    window.location.href = "valores.html";
});
