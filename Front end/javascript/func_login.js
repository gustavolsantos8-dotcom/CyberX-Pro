const myForm = document.getElementById('loginFuncionario');

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
            nome: "",
            email: document.getElementById("email").value,
            cargo:"",
            telefone: "",
            cpf:"",
            senha: document.getElementById("senha").value
        }),
    }).then(response => {response.json()
        if (response.status == 401){
            alert ("Senha ou email incorretos!");
            }
    }  )
        .then(data => {
                 alert("Login feito com sucesso!")
        })
});