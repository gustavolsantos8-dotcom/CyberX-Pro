const form = document.getElementById('formulario');
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    
    if (email === "funcionario@teste.com" && senha === "12345678") {
        mensagem.style.color = "green";
        alert("Login concluído ✅")
        window.location.href = "paginainicialfuncionarios.html"
    } 

    else if (email === "gerencia@teste.com" && senha === "12345678"){
        mensagem.style.color = "green";
        alert("Login concluído ✅")
        window.location.href = "gerencia.html"
    }
    else {
        const mensagem = document.getElementById("mensagem");
        mensagem.style.color = "red";
        mensagem.innerHTML = "❌ Email ou senha incorretos";
        
           

            mensagem.style.display = 'block';
        
            
            setTimeout(() => {
                mensagem.style.display = 'none';
            }, 3000);
    }
});