import fs from "node:fs";
// makeshift database module to handle the database functionalities
// CRUD - Create, Read, Update, Delete

const databasePath = new URL("../db.json", import.meta.url).pathname;

export class Database {
  database = {};

  constructor() {
    // Fetch data from database.json
    try {
      this.database = fs.readFile(databasePath, () => {});
    } catch (e) {
      this.persist();
      console.log(e);
    }
  }
  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database), () => {});
  }
  insert(table, data) {
    if (
      this.database[table].length > 0 &&
      Array.isArray(this.database[table])
    ) {
      const { title, description } = data;
      this.database[table].push({ title, description });
      this.persist();
      return true;
    }
    return false;
  }
  update() {}
  select(table) {
    if (
      this.database[table].length > 0 &&
      Array.isArray(this.database[table])
    ) {
      return this.database[table] ?? [];
    }
  }
  delete() {}
}
