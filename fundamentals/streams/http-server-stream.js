// Criar um server HTTP que vai recebeer uma requisicao fake de outro arquivo
// Ele vai receber uma READABLE STREAM
// Vai transformar utilizando uma Transform STREAM
// Vai enviar para o RES porque ele eh uma Writable Stream
//
import http from "node:http";
import { Transform } from "node:stream";

class doubleNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const doubleNumber = Number(chunk.toString()) * 2;
    const buffer = Buffer.from(String(doubleNumber));
    callback(null, buffer);
  }
}

const server = http.createServer((req, res) => {
  // A requisicao que ele vai receber eh uma Readable Stream
  // PAssar ela por uma transform Stream
  // Lembrando que o PIPE serve como se fosse um canal entre Streams !!

  const readableStream = req;
  return readableStream.pipe(new doubleNumber()).pipe(res);
  // Readable Stream == Pipe == Transform Stream == Pipe == Resposta da requisicao
});
server.listen(3335);
