// Vai pegare e criar uma requisicao fake para o http-server-stream.js
// utilizando a Fetch API
import { Readable, Writable } from "node:stream";

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100);
};

class RandomNumberStream extends Readable {
  _read() {
    setTimeout(() => {
      const randomNumber = getRandomNumber();
      const buffer = Buffer.from(String(randomNumber));
      this.push(buffer);
    }, 100);
  }
}

const response = await fetch("http://localhost:3335", {
  method: "POST",
  body: new RandomNumberStream(),
  duplex: "half",
});