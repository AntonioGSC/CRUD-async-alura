const listaClientes = () => {
  return fetch(`http://localhost:3000/profile`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Não foi possível listar os clientes');
  });
};

const criaCliente = (nome, email) => {
  return fetch(`http://localhost:3000/profile`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      email,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.body;
    }
    throw new Error('Não foi possível criar o cliente');
  });
};

const deletaCliente = (id) => {
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Não foi possível deletar o cliente');
    }
  });
};

const buscaCliente = (id) => {
  return fetch(`http://localhost:3000/profile/${id}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Não foi possível buscar o cliente');
  });
};

const atualizaCliente = (id, nome, email) => {
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      email,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.body;
    }
    throw new Error('Não foi possível atualizar o cliente');
  });
};

export const clienteService = {
  listaClientes,
  criaCliente,
  deletaCliente,
  buscaCliente,
  atualizaCliente,
};

// const promise = new Promise((resolve, reject) => {
//   const http = new XMLHttpRequest();

//   http.open('GET', 'http://localhost:3000/profile');

//   http.onload = () => {
//     if (http.status >= 400) {
//       reject(JSON.parse(http.response));
//     } else {
//       resolve(JSON.parse(http.response));
//     }
//   };

//   http.send();
// });
// return promise;
