import fs from "node:fs";
import { processCsv } from "./utils/import-csv-data.js";
// makeshift database module to handle the database functionalities
// CRUD - Create, Read, Update, Delete

const databasePath = new URL("../db.json", import.meta.url).pathname;

export class Database {
  database = {};

  constructor() {
    // Fetch data from database.json
    try {
      const data = fs.readFileSync(databasePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Object.keys(parsed).length === 0) {
        this.loadFiles()
        return;
      }
      this.database = JSON.parse(data);
    } catch (e) {
      this.persist();
      console.log(e);
    }
  }
  async loadFiles() { 
    this.insertCsvData(await processCsv())
  }
  insertCsvData(data) {
    for (const task of data) {
      this.insert("tasks", task);
    }
  }

  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database), () => {});
  }
  insert(table, data) {
    if (Array.isArray(this.database[table])) {
      const { titulo, descricao } = data;
      this.database[table].push({ titulo, descricao });
      this.persist();
      return data;
    }
    this.database[table] = [data];
    this.persist();
    return data;
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
