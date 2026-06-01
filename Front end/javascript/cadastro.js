const myForm = document.getElementById('cadastroCliente');

myForm.addEventListener('submit', function (event) {
    // 1. Prevenir o recarregamento da página ao submeter form
    event.preventDefault();

    fetch('https://localhost:7266/Cliente', {
        method: 'POST', //Para outros métodos, basta alterar aqui. Obs: Delete remove a parte do body e headers, e no get é conforme todos os exemploes feitos na Unidade interação com API 
            
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

        alert("Cadastro feito com sucesso!")
        window.location.href = "../html/cli_login.html";
    }  )
        .then(data => {
            +"Seu ID gerado foi: "+data.id+"</h4>";        
        })
});