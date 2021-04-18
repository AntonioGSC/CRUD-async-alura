const listaClientes = () => {
  return fetch(`http://localhost:3000/profile`).then((res) => {
    return res.json();
  });
};

export const clienteService = {
  listaClientes,
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
