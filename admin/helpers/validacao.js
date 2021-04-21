export const valida = (input) => {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }
};

const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
};

const validaDataNascimento = (input) => {
  const dataRecebida = new Date(input.value);

  let mensagem = '';

  if (!maiorDeIdade(dataRecebida)) {
    mensagem = 'Você deve ser maior de 18 anos para se cadastrar.';
  }

  input.setCustomValidity(mensagem);
};

const maiorDeIdade = (data) => {
  const dataAtual = new Date();
  const dataMaioridade = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  );
  return dataMaioridade <= dataAtual;
};
