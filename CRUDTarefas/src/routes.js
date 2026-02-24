import { buildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  //GET
  {
    method: `GET`,
    path: buildRoutePath(`/tasks`),
    handler: (req, res) => {
      const feedback = database.select("tasks");
      res
        .writeHead(200, { "Content-type": "application/json" })
        .end(Buffer.from(JSON.stringify(feedback)));
    },
  },
  //POST
  {
    method: `POST`,
    path: buildRoutePath(`/tasks`),
    handler: (req, res) => {
      const task = req.body;
      const feedback = database.insert(`tasks`, task);
      if (feedback) {
        res.writeHead(200, { "Content-type": `application/json` });
      }
      res.writeHead(400, { "Content-type": "application/json" });
    },
  },
  //DELETE
  {
    method: `DELETE`,
    path: buildRoutePath(`/tasks/:id`),
    handler: () => {},
  },
  //PUT
  {
    method: `PUT`,
    path: buildRoutePath(`/tasks/:id`),
    handler: () => {},
  },
  //PATCH
  {
    method: `PATCH`,
    path: buildRoutePath(`/tasks/:id`),
    handler: () => {},
  },
];
