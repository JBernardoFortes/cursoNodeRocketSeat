export function insertCsvData(data, database) {
  for (const task of data) {
    database.insert("tasks", task);
  }
}
