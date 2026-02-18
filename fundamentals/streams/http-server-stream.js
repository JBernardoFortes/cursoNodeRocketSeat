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

const server = http.createServer(async (req, res) => {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }
  buffer.pipe(new doubleNumber()).pipe(res);
  const entireStreamData = Buffer.concat(buffer).toString();
  // Os comandos acima sao para esperar todas os pedacos do arquivo que esta sendo recebido
  // Isso eh usado para consumir JSON, que eh inviavel consumir ele por partes
  // a fim de trabalhar com ele de uma so vez
  // A requisicao que ele vai receber eh uma Readable Stream
  // PAssar ela por uma transform Stream
  // Lembrando que o PIPE serve como se fosse um canal entre Streams !!

  const readableStream = req;
  return readableStream.pipe(new doubleNumber()).pipe(res);
  // Readable Stream == Pipe == Transform Stream == Pipe == Resposta da requisicao
});
server.listen(3335);
