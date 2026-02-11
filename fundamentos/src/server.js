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

let users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(method, url);

  if (method == "GET" && url == "/users") {
    res
      .setHeader("Content-type", "application/json")
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method == "POST" && url == "/users") {
    users.push({
      name: "bernardo",
      age: 22,
    });
    res.writeHead(201).end("Aqui ele adiciona um novo usuario");
  }
});

server.listen(3333);
