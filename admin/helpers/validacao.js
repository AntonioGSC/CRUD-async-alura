export const valida = (input) => {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalido');
    input.parentElement.querySelector(
      '.input-mensagem-erro'
    ).innerHTML = mostraMensagemErro(tipoInput, input);
  }
};

const tiposErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
];

const mensagensErro = {
  nome: {
    valueMissing: 'O campo nome não pode estar vazio',
  },
  email: {
    valueMissing: 'O campo e-mail não pode estar vazio',
    typeMismatch: 'O e-mail digitado não é válido',
  },
  senha: {
    valueMissing: 'O campo senha não pode estar vazio',
    patternMismatch:
      'A senha deve conter entre 6 a 12 caracteres.\nDeve conter pelo menos uma letra minúscula, uma maiúscula, um número.\nNão deve conter símbolos',
  },
  dataNascimento: {
    valueMissing: 'O campo data de nascimento não pode estar vazio',
    customError: 'Você deve ser maior de 18 anos para se cadastrar.',
  },
};

const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
};

const mostraMensagemErro = (tipoInput, input) => {
  let mensagem = '';
  tiposErro.forEach((erro) => {
    if (input.validity[erro]) {
      mensagem = mensagensErro[tipoInput][erro];
    }
  });
  return mensagem;
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
