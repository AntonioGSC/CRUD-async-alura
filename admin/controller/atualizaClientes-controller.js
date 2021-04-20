import { clienteService } from '../service/client-service.js';

(async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get('id');

  const inputNome = document.querySelector('[data-nome]');
  const inputEmail = document.querySelector('[data-email]');

  try {
    const data = await clienteService.buscaCliente(id);
    inputNome.value = data.nome;
    inputEmail.value = data.email;

    const formulario = document.querySelector('[data-form]');

    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
      try {
        await clienteService.atualizaCliente(
          id,
          inputNome.value,
          inputEmail.value
        );
        window.location.href = '../telas/edicao_concluida.html';
      } catch (err) {
        window.location.href = '../telas/erro.html';
        console.log(err);
      }
    });
  } catch (err) {
    window.location.href = '../telas/erro.html';
    console.log(err);
  }
})();
