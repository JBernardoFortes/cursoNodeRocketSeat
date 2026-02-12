// Um middleware vai ser um interceptador
// Nesse caso vai ser usado para converter a requisicao para o format JSON de modo
// que a API consiga lidar com ele sem precisar deixar o codigo super verboso como
// estava anteriormente no server.js

export default async function json(req, res) {
  // Nessa funcao vai ser recebido o req e o res como parametro
  // Lembrando que ele vai receber a REFERENCIA ao objeto em si
  // logo, mudancas que forem feitas dentro dessa funcao tambem
  // serao aplicadas no escopo de onde foi chamada essa funcao

  // basicamente pegar toda a requisicao, colocar em um buffer e
  // criar um novo atributo no objeto req para armazenar essas informacoes

  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }
  try {
    const entireData = JSON.parse(Buffer.concat(buffer).toString());
    req.body = entireData;
  } catch {
    req.body = null
  }
    res.setHeader("Content-type", "application/json")
}
