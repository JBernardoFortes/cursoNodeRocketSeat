import { buildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";

const database = new Database

export const routes = [
  //GET
  {
    method: `GET`,
    path: buildRoutePath(`/users`),
    handler: () => {},
  },
  //POST
  {
    method: `POST`,
    path: buildRoutePath(`/users`),
    handler: () => {},
  },
  //DELETE
  {
    method: `DELETE`,
    path: buildRoutePath(`/users/:id`),
    handler: () => {},
  },
  //PUT
  {
    method: `PUT`,
    path: buildRoutePath(`/users/:id`),
    handler: () => {},
  },
  //PATCH
  {
    method: `PATCH`,
    path: buildRoutePath(`/users/:id`),
    handler: () => {},
  },
];
