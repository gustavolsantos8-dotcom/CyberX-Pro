const myForm = document.getElementById('cadastroFuncionario');

myForm.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7266/Funcionarios/login', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
            credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Nome: document.getElementById("nome").value,
            Email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
            Telefone: document.getElementById("telefone").value,
             Cpf: document.getElementById("cpf").value,
             Cargo: document.getElementById("cargo").value,
             DataNasc: document.getElementById("datanasc").value
        }),
    }).then(response => {response.json()
        if (response.status == 401){
            alert ("Preencha todos os espaços!");
            }
    }  )
        .then(data => {
                 alert("Cadastro feito com sucesso!")
        })
});

btnCadastrar.addEventListener("click", function(e) {
    e.preventDefault();
    formContainer.classList.toggle("oculto");
});