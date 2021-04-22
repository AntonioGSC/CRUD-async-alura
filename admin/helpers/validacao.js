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
  cep: {
    valueMissing: 'O campo CEP não pode estar vazio.',
    patternMismatch: 'O CEP digitado não é válido.',
    customError: 'Não foi possível buscar o CEP.',
  },
  logradouro: {
    valueMissing: 'O campo Logradouro não pode estar vazio.',
  },
  cidade: {
    valueMissing: 'O campo Cidade não pode estar vazio.',
  },
  estado: {
    valueMissing: 'O campo Estado não pode estar vazio.',
  },
  preco: {
    valueMissing: 'O campo Preço não pode estar vazio.',
  },
};

const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
  cpf: (input) => validaCPF(input),
  cep: (input) => recuperarCEP(input),
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
  const cpfFormatado = input.value.replace(/\D/g, '');
  let mensagem = '';

  if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
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

const checaDigitoVerificador = (cpf, multiplicador) => {
  if (multiplicador >= 12) {
    return true;
  }

  let multiplicadorInicial = multiplicador;
  let soma = 0;
  const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
  const digitoVerificador = cpf.charAt(multiplicador - 1);

  for (let i = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
    soma = soma + cpfSemDigitos[i] * multiplicadorInicial;
    i++;
  }

  if (digitoVerificador == confirmaDigito(soma)) {
    return checaDigitoVerificador(cpf, multiplicador + 1);
  }

  return false;
};

const confirmaDigito = (soma) => {
  return 11 - (soma % 11);
};

const recuperarCEP = (input) => {
  const cep = input.value.replace(/\D/g, '');
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8',
    },
  };

  if (!input.validity.patternMismatch && !input.validity.valueMissing) {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          input.setCustomValidity('Não foi possível buscar o CEP');
          return;
        }
        input.setCustomValidity('');
        preencheCamposCep(data);
        return;
      });
  }
};

const preencheCamposCep = (data) => {
  const logradouro = document.querySelector('[data-tipo="logradouro"]');
  const cidade = document.querySelector('[data-tipo="cidade"]');
  const estado = document.querySelector('[data-tipo="estado"]');

  logradouro.value = data.logradouro;
  cidade.value = data.localidade;
  estado.value = data.uf;
};
