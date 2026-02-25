function logar(){
    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if(emailDigitado === email && senhaDigitada === 12345678){
        mensagem.style.color = "green";
        mensagem.innerHTML = "Login realizado com sucesso!";

      
    }
    else{
        mensagem.style.color = "red";
        mensagem.innerHTML = "Email ou senha incorretos";
    }
}