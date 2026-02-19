function logar(){
    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){
        mensagem.style.color = "red";
        mensagem.innerHTML = "Nenhum usuário cadastrado";
        return;
    }

    if(emailDigitado === usuario.email && senhaDigitada === usuario.senha){
        mensagem.style.color = "green";
        mensagem.innerHTML = "Login realizado com sucesso!";

        setTimeout(()=>{
            window.location.href = "index.html"; 
        },1000);
    }
    else{
        mensagem.style.color = "red";
        mensagem.innerHTML = "Email ou senha incorretos";
    }
}