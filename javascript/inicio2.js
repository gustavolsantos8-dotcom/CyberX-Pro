const logado = localStorage.getItem("usuarioLogado");
const tipo = localStorage.getItem("tipoUsuario");

if(!logado){
    window.location.href = "login.html";
}

const icone = document.getElementById("iconeUsuario");
const menu = document.getElementById("menuUsuario");

if(tipo === "visitante"){
    menu.innerHTML = `
        <p><strong>Modo visitante</strong></p>
        <p>Faça login para acessar pedidos</p>
        <a href="login.html">Fazer login</a>
        <button onclick="logout()">Sair</button>
    `;
}

function logout(){
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

const usuario = localStorage.getItem("usuarioLogado");

if(!usuario){
    window.location.href = "login.html";
}

localStorage.setItem("usuarioLogado", "true");
localStorage.setItem("tipoUsuario", "visitante");

function logout(){
    localStorage.clear();
    window.location.href = "login.html";
}