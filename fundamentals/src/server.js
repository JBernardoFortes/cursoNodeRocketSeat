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

const server = http.createServer(async (req, res) => {
  // A req = requisicao. Um objeto contendo informacoes sobre a requisicao
  // A res = resposta. Um objeto com metodos para devolver uma resposta para o cliente
  /* return res.end(JSON.stringify({method: req.method, url: req.url})
  ) */
  // Pegar a stream toda e coloca tudo em um unico buffer para usar e adicionar um novo usuario
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const objectReqString = Buffer.concat(buffers).toString();
  // QUando usa o toString() do buffer ele retorna uma string, que nao da para acessar como se fosse um objeto no JS
  // Logo, se usa a funcao JSON.parse(string : String) para converter uma string no formato de JSON em um objeto JSON

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }
  console.log(req)
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    res
      .writeHead(200, { "Content-type": "application/json" })
      .end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    users.push(req.body);
    res
      .writeHead(201, { "Content-type": "application/json" })
      .end(JSON.stringify(users));
  }
});
server.listen(3333);
