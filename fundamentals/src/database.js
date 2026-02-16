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
  delete(table, name) {
    if (
      Array.isArray(this.database[table]) &&
      this.database[table].length > 0
    ) {
      this.database[table] = this.database[table].filter((user) => {
        return user.name !== name;
      });
      // O metodo filter nao altera o array original, entao tem que reatribuir
    } else {
      return false;
    }
    this.persist();
    return true;
  }
  put(table, name, newName) {
    if (
      Array.isArray(this.database[table]) &&
      this.database[table].length > 0
    ) {
      this.database[table].map((user) => {
        if (user.name === name) {
          user.name = newName;
        }
      });
      this.persist();
      return true;
    } else {
      return false;
    }
  }
  // Refazer o metodo DELETE e PUT mas agora usando o ID do usuario para buscar no banco de dados

  deleteById(table, id) {
    if (
      !Array.isArray(this.database[table]) ||
      this.database[table].length < 1
    ) {
      return null;
    } else {
      // De fato procurar no array da tabela ( table ) pelo ID que foi informado e retirar ele do database provisorio

      const dataIndex = this.database[table].findIndex((data) => {
        return data.id === id;
      });
      // The findIndex() method of ARRAY instances returns the index
      // of the first element in an array that satisfies the
      // provided testing function.
      if (dataIndex < 0) {
        return null;
      }
      let [deletedData] = this.database[table].splice(dataIndex, 1);
      // The splice() method of Array instances changes the contents
      // of an array by removing or replacing existings elements
      // and/or adding new elements in place.

      // splice(start,deleteCount,item1,item2, /*...,*/ itemN)

      // It returns a array containing the deleted elements
      // If only one element is removed, an array of one element
      // is returned
      this.persist();
      return deletedData;
    }
  }
}
