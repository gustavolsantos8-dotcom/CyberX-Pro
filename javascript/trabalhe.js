document.getElementById("cep").addEventListener("blur", function () {

    let cep = this.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(dados => {

            if (dados.erro) {
                alert("CEP não encontrado");
                return;
            }

            document.getElementById("rua").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("estado").value = dados.uf;
        })
        .catch(() => alert("Erro ao buscar CEP"));
});

const inputArquivo = document.getElementById("arquivo");
const nomeArquivo = document.getElementById("nomeArquivo");

inputArquivo.addEventListener("change", function () {
    if (this.files.length > 0) {
        nomeArquivo.textContent = this.files[0].name;
    } else {
        nomeArquivo.textContent = "Nenhum arquivo selecionado";
    }
});