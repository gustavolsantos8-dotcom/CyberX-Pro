
function mostrarCadastro() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('cadastro').style.display = 'block';
    }
    
    
    function mostrarLogin() {
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    }
    
    
    function logar() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('tipo').style.display = 'block';
    }
    
    
    function entrarSemLogin() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('tipo').style.display = 'block';
    }
    
    
    function cadastrar() {
    alert('Cadastro realizado com sucesso!');
    mostrarLogin();
    }
    
    
    function selecionar(tipo) {
    alert('Você entrou como ' + tipo);
    }