import { clienteService } from '../service/client-service.js';

const url = new URL(window.location);
const id = url.searchParams.get('id');

const inputNome = document.querySelector('[data-nome]');
const inputEmail = document.querySelector('[data-email]');

clienteService.buscaCliente(id).then((data) => {
  inputNome.value = data.nome;
  inputEmail.value = data.email;
});

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  clienteService
    .atualizaCliente(id, inputNome.value, inputEmail.value)
    .then(() => {
      window.location.href = '../telas/edicao_concluida.html';
    });
});
