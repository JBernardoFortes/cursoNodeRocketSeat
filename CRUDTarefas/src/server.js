import { json } from "./middlewares/json.js";
import http from "http";
import { Database } from "./database.js";
import { processCsv } from "./utils/import-csv-data.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";
import { insertCsvData } from "./utils/insert-csv-data.js";


const data = await processCsv();
const database = new Database();

const server = http.createServer(async (req, res) => {
  // tratar as rotas do server
  await json(req, res);
  const { method, url } = req;

  
  insertCsvData(data, database)
  
  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });
  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};
    route.handler(req, res);
  }

  res.end();
});

server.listen(3334);
