import fs from "node:fs";
// makeshift database module to handle the database functionalities
// CRUD - Create, Read, Update, Delete

const databasePath = new URL("../", import.meta.url).pathname;
console.log(databasePath);

export class Database {

  database = {};

  constructor() {
    // Fetch data from database.json
    try {
      this.database = fs.readFile(databasePath, "utf8");
    } catch {
      this.persist();
    }
  }
  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database));
  }
  create(table, data) {
    if (true) {
    }
  }
  update() {}
  select() {}
  delete() {}
}
