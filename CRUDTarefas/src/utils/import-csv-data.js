import csvParse from "csv-parser";
import fs from "node:fs";

const __dirname = new URL("../../", import.meta.url).pathname;

export const processCsv = async () => {
  const data = [];
  const parser = fs.createReadStream(`${__dirname}/tasks.csv`).pipe(csvParse());

  for await (const chunk of parser) {
    data.push(chunk);
  }
  return data
};