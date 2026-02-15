import Database from "./database.js";
import { randomUUID } from "node:crypto";

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
    method: "GET",
    url: "/users",
    handler: (req, res) => {
      const users = database.select("users");
      res
        .writeHead(200, { "Content-type": "application/json" })
        .end(JSON.stringify(users));
      // Tava dando erro porque a resposta da requisicao estava sendo mandada como objeto e tem que, nesse caso,
      // ser uma string no formato JSON
    },
  },
  {
    method: "POST",
    url: "/users",
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
    // DELETE
    // {
    //  name: "nome"
    // }
    method: "DELETE",
    url: "/users",
    handler: (req, res) => {
      const deleteFeedback = database.delete("users", req.body.name);
      if (deleteFeedback) {
        res.writeHead(200, { "Content-type": "application/json" }).end();
      } else {
        res.writeHead(404, { "Content-type": "application/json" }).end();
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
    url: "/users",
    handler: (req, res) => {
      // atualizar um usuario
      const putFeedback = database.put(
        "users",
        req.body.name,
        req.body.newName,
      );
      if (putFeedback) {
        res.writeHead(200, { "Content-type": "application/json" }).end();
      } else {
        res.writeHead(200, { "Content-type": "application/json" }).end();
      }
    },
  },
];
