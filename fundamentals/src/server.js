import http from "http";
import json from "./middlewares/json.js";
import { routes } from "./routes.js";
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

const server = http.createServer(async (req, res) => {
  // A req = requisicao. Um objeto contendo informacoes sobre a requisicao
  // A res = resposta. Um objeto com metodos para devolver uma resposta para o cliente
  /* return res.end(JSON.stringify({method: req.method, url: req.url})
  ) */
  // Pegar a stream toda e coloca tudo em um unico buffer para usar e adicionar um novo usuario

  await json(req, res);
  // Lembrando que como a funcao json vai receber a referencia aos objetos req e res, as mudancas que forem
  // aplicadas dentro do escopo da funcao json tambem serao aplicadas dentro do escopo do objeto server
  const { method, url } = req;

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });
  if (route) {
    const routeParams = req.url.match(route.path);
    req.params = { ...routeParams.groups };
    route.handler(req, res);
  }
});
server.listen(3333);
