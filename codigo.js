function cadastrar() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let senha = document.getElementById("senha").value;
    let mensagem = document.getElementById("mensagem");

    if (nome === "" || email === "" || telefone === "" || senha === "") {
        mensagem.style.color = "red";
        mensagem.innerHTML = "⚠️ Preencha todos os campos!";
    } else {
        mensagem.style.color = "green";
        mensagem.innerHTML = "✅ Cadastro realizado com sucesso!";
    }
}
