const criaNovaLinha = (nome, email, id) => {
  const linhaNovoCliente = document.createElement('tr');
  const conteudo = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>`;
  linhaNovoCliente.innerHTML = conteudo;
  return linhaNovoCliente;
};

const tabela = document.querySelector('[data-tabela]');

const http = new XMLHttpRequest();

http.open('GET', 'http://localhost:3000/profile');

http.onload = () => {
  const data = http.response;
  const clientes = JSON.parse(data);
  clientes.forEach((cliente) => {
    tabela.appendChild(criaNovaLinha(cliente.nome, cliente.email, cliente.id));
  });
};

http.send();
