function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const senha2 = document.getElementById("senha2");
    const mensagem = document.getElementById("mensagem");
    

    if (nome === ""   || telefone === "") {
        mensagem.style.color = "red";
        mensagem.innerHTML = "⚠️ Preencha todos os campos!";
    } else if(senha2 != senha){
        mensagem.style.color = "red";
        mensagem.innerHTML = "As senhas não coincidem"; 
    } 
     else {
        mensagem.style.color = "green";
        mensagem.innerHTML = "✅ Cadastro realizado com sucesso!";
    }

}
