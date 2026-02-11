import http from "http";

// A depender da rota que o front fazer a requisicao, a API node vai responder com uma funcao

// HTTP:
// A depender do metodo da requisicao
// A depender da URL da requisicao
// Ambas as informacoes podem ser obetidas atraves do req

// Os metodos da requisicao sao muito mais semanticos do que funcionais

// GET, POST, PATCH, DELETE, PUT

// GET => PEgar algo do backend- INformacao
// POST => Criar informacao no backend
// PUT => Sempre que for editar ou editar um recurso no backend
// PATCH => Atualizar uma informacao unica / especifica de um recurso no backend
// Aceitar notificacao ou nao ( Exemplo )
// DELETE => Deletar informacoes do backend

// Uma mesma rota pode ter metodos diferentes
// Exemplo : /users
// GET /users traz uma lista dos usuarios
// POST /users adiciona um novo usuario

// Refazer a base de uma API para armazenar usuarios basicos

const users = [];

const server = http.createServer((req, res) => {
  // A req = requisicao. Um objeto contendo informacoes sobre a requisicao
  // A res = resposta. Um objeto com metodos para devolver uma resposta para o cliente
  /* return res.end(JSON.stringify({method: req.method, url: req.url})
  ) */

  const { method, url } = req;
  if (method === "GET" && url === "/users") {
    res.writeHead(200, {"Content-type" : "application/json"}).end(JSON.stringify(users))
  }
  if (method === "POST" && url === "/users")
  { 
    users.push({name: "bernardo", age: 22})
    res.writeHead(201, {"Content-type" : "application/json"}).end(JSON.stringify(users))
  }

});
server.listen(3333);
