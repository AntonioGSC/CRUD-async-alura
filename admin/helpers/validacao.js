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
    valueMissing: 'O campo nome não pode estar vazio.',
  },
  email: {
    valueMissing: 'O campo e-mail não pode estar vazio.',
    typeMismatch: 'O e-mail digitado não é válido.',
  },
  senha: {
    valueMissing: 'O campo senha não pode estar vazio.',
    patternMismatch:
      'A senha deve conter entre 6 a 12 caracteres.\nDeve conter pelo menos uma letra minúscula, uma maiúscula, um número.\nNão deve conter símbolos.',
  },
  dataNascimento: {
    valueMissing: 'O campo data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior de 18 anos para se cadastrar.',
  },
  cpf: {
    valueMissing: 'O campo CPF não pode estar vazio.',
    customError: 'O CPF digitado não é válido.',
  },
};

const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
  cpf: (input) => validaCPF(input),
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

const validaCPF = (input) => {
  const cpfFormatado = input.value.replace('/D/g', '');
  let mensagem = '';

  if (!checaCPFRepetido(cpfFormatado)) {
    mensagem = 'O CPF digitado não é válido';
  }
  input.setCustomValidity(mensagem);
};

const checaCPFRepetido = (cpf) => {
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];
  let cpfValido = true;
  valoresRepetidos.forEach((valor) => {
    if (valor == cpf) {
      cpfValido = false;
    }
  });

  return cpfValido;
};

const checaEstruturaCPF = (cpf) => {
  const multiplicador = 10;
  return checaDigitoVerificador(cpf, multiplicador);
};

const confirmaDigito = (soma) => {
  return 11 - (soma % 11);
};

const checaDigitoVerificador = (cpf, multiplicador) => {};
