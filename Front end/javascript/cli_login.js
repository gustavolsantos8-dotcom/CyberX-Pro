const form = document.getElementById('formulario');
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    
    if (email === "cliente@teste.com" && senha === "12345678") {
        mensagem.style.color = "green";
        alert("Login concluído ✅")
        window.location.href = "CyberX Proinicio2 logado.html"
    } 
        
    else {
        const mensagem = document.getElementById("mensagem");
        mensagem.style.color = "red";
        mensagem.innerHTML = "❌ Email ou senha incorretos";

            mensagem.style.display = 'block';
        
            setTimeout(() => {
                mensagem.style.display = 'none';
            }, 5000);
        
    }
});