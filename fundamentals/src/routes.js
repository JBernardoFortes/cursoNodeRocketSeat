import Database from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

// O writehead esta colocando o content-type de novo mesmo que ele esteja sendo declarado no Json.js
// por motivos de aprendizado.

// Tipos de rotas / requisicoes

// Route Parameter - https://localhost:3333/users?name=bernardo&age=22
// Query Parameter - https://localhost:3333/users/1
// Request Body - Requisicao convencional que foi vista ate aqui
//
// Route Parameter - Usado mais para filtragem, paginacao, nao sao obrigatorios
// Stateful ^
// QUery parameter - Identificacao de recurso
// Request Body - Para envios de formulario, onde os dados da requisicao seriam muito grandes
// para enviar como Route Parameter

// Nas requisicoes que procuram o melhor mesmo seria procurar pelo ID, mas como esta sendo usado
// o randomUUID, por facilidade esta sendo pesquisado pelo nome. INviavel mandar no corpo da requisicao
// uma sequencia de 8+ caracteres aleatorios

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const user = {
        id: randomUUID(),
        name: req.body.name,
        age: req.body.age,
      };
      database.insert("users", user);
      res.writeHead(202, { "Content-type": "application/json" }).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (_req, res) => {
      const users = database.select("users");
      res
        .writeHead(200, { "Content-type": "application/json" })
        .end(Buffer.from(JSON.stringify(users)));
    },
  },
  {
    // DELETE
    // {
    //  name: "nome"
    // }
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const deleteFeedback = database.deleteById("users", req.params.id);
      if (deleteFeedback) {
        return res.writeHead(200, { "Content-type": "application/json" }).end();
      } else {
        return res.writeHead(404, { "Content-type": "application/json" }).end();
      }
    },
  },
  // PUT
  // {
  // name: "nome"
  // newName: "newName"
  // }
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    // Atualizar o metodo em si, para usar o id ao inves do nome
    handler: (req, res) => {
      // atualizar um usuario
      const { name, age } = req.body;
      const putFeedback = database.putById("users", req.params.id, {
        name,
        age,
      });

      if (putFeedback) {
        res.writeHead(200, { "Content-type": "application/json" }).end();
      } else {
        res.writeHead(404, { "Content-type": "application/json" }).end();
      }
    },
  },
];
// How to edit all occurrences of the word under  the cursor in Neovim

// 1) put the cursor on the word you want to change
// 2) Press: *
//  -> this searches for the next occurrence of the same word
// 3) Press: c + gn
//  -> "Change next match"
//  -> Edit the current occurrence
// 4) Press: <Esc> after finishing the edit
// 5) Press: .
//  -> Repeat the same change on the next occurrence
//
// NOTES :
//  -> This is NOT multi-cursor
