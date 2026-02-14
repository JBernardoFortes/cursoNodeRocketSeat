import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);
export default class Database {
  database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.database = JSON.parse(data);
      })
      .catch(() => {
        this.persist();
      });
  }

  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database));
    // O Objeto JSON nativo tem basicamente dois metodos:

    // - Stringify : Passar um objeto no formato JSON para string
    // - Parse : Passar uma string no formato JSON para um objeto JSON
  }
  select(table) {
    return this.database[table] ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data);
    } else {
      this.database[table] = [data];
    }
    this.persist();
    return data;
  }
}
