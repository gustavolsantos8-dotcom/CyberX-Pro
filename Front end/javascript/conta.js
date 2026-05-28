if(!localStorage.getItem("usuarioLogado")){
    window.location.href = "login.html";
}

document.getElementById("nome").value =
    localStorage.getItem("nome") || "Cliente Holliday";

document.getElementById("email").value =
    localStorage.getItem("email") || "cliente@email.com";

document.getElementById("telefone").value =
    localStorage.getItem("telefone") || "(00) 00000-0000";

document.getElementById("empresa").value =
    localStorage.getItem("empresa") || "Empresa do Cliente";

bloquearCampos(true);

function bloquearCampos(status){
    document.querySelectorAll("input").forEach(input=>{
        input.disabled = status;
    });
}

function editar(){
    bloquearCampos(false);
}

function salvar(){
    localStorage.setItem("nome", nome.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("telefone", telefone.value);
    localStorage.setItem("empresa", empresa.value);

    bloquearCampos(true);
    alert("Dados atualizados com sucesso!");
}

function logout(){
    localStorage.clear();
    window.location.href = "login.html";
}
const pedidos = [
    "Cartões de Visita - 500 unidades",
    "Banner 1x2m - Lona",
    "Adesivos personalizados - 200 unidades"
];

const lista = document.getElementById("listaPedidos");

pedidos.forEach(pedido=>{
    const li = document.createElement("li");
    li.textContent = pedido;
    lista.appendChild(li);
});
function voltarInicio(){
    window.location.href = "CyberX Proinicio2.html"; 
}