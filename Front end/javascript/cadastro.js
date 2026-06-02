const myForm = document.getElementById('cadastroCliente');

myForm.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7266/Clientes', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
            credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: document.getElementById("Nome").value,
            email: document.getElementById("Email").value,
            telefone: document.getElementById("Telefone").value,
            senha: document.getElementById("Senha").value
        }),
    }).then(response => {response.json()
        if (response.status == 401){
            alert ("Senha ou email incorretos!");
            }
    }  )
        .then(data => {
                 alert("Cadastro feito com sucesso!")
        })
});