const API = 'https://localhost:7266/Funcionarios';
 
// ─── Elementos do DOM ──────────────────────────────────────────────────────────
const myForm        = document.getElementById('cadastroFuncionario');
const formContainer = document.getElementById('formContainer');
const btnCadastrar  = document.getElementById('btnCadastrar');
const tituloForm    = document.getElementById('tituloForm');
const btnSalvar     = document.getElementById('salvar');
const barraPesquisa = document.getElementById('barraPesquisa');
 
// Guarda o id do funcionário sendo editado (null = novo cadastro)
let idEditando = null;
 
// ─── Abrir / fechar formulário ─────────────────────────────────────────────────
btnCadastrar.addEventListener('click', function (e) {
    e.preventDefault();
    idEditando = null;
    tituloForm.textContent = 'Novo Funcionário';
    btnSalvar.textContent  = 'Salvar';
    limparFormulario();
    formContainer.classList.toggle('oculto');
});
 
// ─── Submit do formulário (cadastrar OU editar) ────────────────────────────────
myForm.addEventListener('submit', function (event) {
    event.preventDefault();
 
    const dados = {
        Nome:      document.getElementById('nome').value,
        Email:     document.getElementById('email').value,
        Senha:     document.getElementById('senha').value,
        Telefone:  document.getElementById('telefone').value,
        Cpf:       document.getElementById('cpf').value,
        Cargo:     document.getElementById('cargo').value,
        DataNasc:  document.getElementById('datanasc').value
    };
 
    // Se idEditando tem valor, é PUT; caso contrário, é POST
    const url    = idEditando ? `${API}/${idEditando}` : API;
    const method = idEditando ? 'PUT' : 'POST';
 
    btnSalvar.disabled     = true;
    btnSalvar.textContent  = 'Salvando...';
 
    fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            alert('Erro ao salvar. Verifique os dados!');
            btnSalvar.disabled    = false;
            btnSalvar.textContent = idEditando ? 'Atualizar' : 'Salvar';
            return null;
        }
        return response;
    })
    .then(data => {
        if (!data) return;
        formContainer.classList.add('oculto');
        limparFormulario();
        idEditando = null;
        carregarFuncionarios(); // Atualiza a tabela
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro de conexão. Tente novamente.');
        btnSalvar.disabled    = false;
        btnSalvar.textContent = 'Salvar';
    });
});
 
// ─── Carregar e renderizar tabela de funcionários ─────────────────────────────
function carregarFuncionarios(filtro = '') {
    fetch(API, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(funcionarios => {
        // Filtra pelo nome se houver texto na barra de pesquisa
        if (filtro) {
            funcionarios = funcionarios.filter(f =>
                f.nome.toLowerCase().includes(filtro.toLowerCase())
            );
        }
        renderizarTabela(funcionarios);
    })
    .catch(error => {
        console.error('Erro ao carregar funcionários:', error);
    });
}
 
function renderizarTabela(funcionarios) {
    const container = document.getElementById('funcionariosContainer');
 
    if (funcionarios.length === 0) {
        container.innerHTML = '<p class="vazio">Nenhum funcionário encontrado.</p>';
        return;
    }
 
    // Formata a data ISO para dd/mm/aaaa
    function formatarData(data) {
        if (!data) return '—';
        const d = new Date(data);
        // DateOnly vem como "YYYY-MM-DD" string
        if (typeof data === 'string' && data.includes('-')) {
            const [ano, mes, dia] = data.split('-');
            return `${dia}/${mes}/${ano}`;
        }
        return d.toLocaleDateString('pt-BR');
    }
 
    let html = `
        <table class="tabela-funcionarios">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>CPF</th>
                    <th>Nascimento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
 
    funcionarios.forEach(f => {
        html += `
            <tr>
                <td>${f.id}</td>
                <td>${f.nome}</td>
                <td>${f.cargo}</td>
                <td>${f.email}</td>
                <td>${f.telefone}</td>
                <td>${f.cpf}</td>
                <td>${formatarData(f.dataNasc)}</td>
                <td class="acoes">
                    <button class="btn-editar" onclick="editarFuncionario(${f.id})">✏️ Editar</button>
                    <button class="btn-deletar" onclick="deletarFuncionario(${f.id}, '${f.nome}')">🗑️ Deletar</button>
                </td>
            </tr>
        `;
    });
 
    html += `</tbody></table>`;
    container.innerHTML = html;
}
 
// ─── Editar: busca o funcionário pelo id e preenche o formulário ──────────────
function editarFuncionario(id) {
    fetch(`${API}/${id}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(f => {
        idEditando = f.id;
 
        document.getElementById('nome').value     = f.nome;
        document.getElementById('email').value    = f.email;
        document.getElementById('senha').value    = f.senha;
        document.getElementById('telefone').value = f.telefone;
        document.getElementById('cpf').value      = f.cpf;
        document.getElementById('cargo').value    = f.cargo;
        // DataNasc vem como "YYYY-MM-DD" — formato esperado pelo input[type=date]
        document.getElementById('datanasc').value = f.dataNasc
            ? f.dataNasc.substring(0, 10)
            : '';
 
        tituloForm.textContent = 'Editar Funcionário';
        btnSalvar.textContent  = 'Atualizar';
        btnSalvar.disabled     = false;
 
        formContainer.classList.remove('oculto');
        formContainer.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
        console.error('Erro ao buscar funcionário:', error);
        alert('Não foi possível carregar os dados do funcionário.');
    });
}
 
// ─── Deletar: confirma e chama DELETE ────────────────────────────────────────
function deletarFuncionario(id, nome) {
    if (!confirm(`Tem certeza que deseja deletar "${nome}"?`)) return;
 
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            alert('Erro ao deletar funcionário!');
            return;
        }
        carregarFuncionarios(barraPesquisa.value); // Atualiza tabela
    })
    .catch(error => {
        console.error('Erro ao deletar:', error);
        alert('Erro de conexão. Tente novamente.');
    });
}
 
// ─── Pesquisa em tempo real ───────────────────────────────────────────────────
barraPesquisa.addEventListener('input', function () {
    carregarFuncionarios(this.value);
});
 
// ─── Utilitários ──────────────────────────────────────────────────────────────
function limparFormulario() {
    document.getElementById('nome').value     = '';
    document.getElementById('email').value    = '';
    document.getElementById('senha').value    = '';
    document.getElementById('telefone').value = '';
    document.getElementById('cpf').value      = '';
    document.getElementById('cargo').value    = '';
    document.getElementById('datanasc').value = '';
    btnSalvar.disabled    = false;
    btnSalvar.textContent = 'Salvar';
}
 
// ─── Carrega a tabela ao abrir a página ───────────────────────────────────────
carregarFuncionarios();