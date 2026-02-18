import http from "http";

// Todos os dados que o node recebe ou manda sao passados com base em " Streams "
// Basicamente, streams eh um metodo baseado em buffer que segmenta os dados que estao
// sendo recebidos ou mandados de modo que a aplicacao nao seja interrompida para que
// a operacao da API seja concluida.

// Se o dado for muito grande ele manda em "Pedacos" por meio dos Pipes.

// Streams ->
/* process.stdin.pipe(process.stdout) */
// Criar uma stream de leitura do 0 ->

// STREAM DE LEITURA ( READABLE ) => DADOS PARA A API
// STREAM DE ESCRITA ( WRITABLE ) => DADOS PARA RESPOSTA DE REQUISICAO

import { Readable , Writable , Transform} from "node:stream";

class oneToOneHundred extends Readable {
  index = 1;
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i >= 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}


// Um conhecimento fundamental eh que do server criado com base no http, os parametros req e res
// ja sao tratados como uma stream em si. Logo eles possuem esses mesmos metodos ( Pipe , push )
class invertNumber extends Transform { 
  _transform(chunk, encoding, callback)
  {
    // Os parametros desse metodo inerte sao os mesmo de uma classe writable
    const invertedNumber = Number(chunk.toString()) * -1
    const buffer = Buffer.from(String(invertedNumber))
    // Sempre lembrar que o argumento do callback eh um Buffer. Para transformar um dado em buffer tem que usar essa
    // Funcao inerte de cima, passando como argumento uma string
    callback(null, buffer)
    // O primeiro argumento da funcao callback eh um erro. Caso tenha ocorrido algum erro no processamento
    // dos dados pode ser passado no primeiro argumento dessa funcao
  }
}
class multiplyByTen extends Writable { 
  _write(chunk, encoding, callback)
  {
    // O Chunk eh um BUFFER. Entao ele vem em formato de buffer
    // O Encoding eh a maneira como o buffer vai ser codificado. Vai ser falado sobre isso mais na frente
    // A funcao Callback serve para finalizar a funcao _write().
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new oneToOneHundred().pipe(new invertNumber()).pipe(new multiplyByTen())
// O oneToOneHUndred aqui serve como o Readable, ou seja, como fonte de informacao
// O multiplyByTen vai receber da fonte de informacao que eh o Readable por meio do 
// .pipe() e vai executar o _write() de dentro dela

// basicamente o node coloca um evento para olhar o "data" no readable, para cada mudanca ele 
// aciona o pipe, ao qual manda os dados em chunks para a funcao de _write do writable
// O pipe conecta o readable com o writable e quando o chunk eh emitido do readable, ele chama
// writable.write(chunk) que por sua vez chama o metodo _write
// Para cada chunk que o readable emite o push!!!!!!!
// 
// Tem outro tipo de Stream : Transform Stream
// Basicamente ela serve para transformar dados
// Writable Stream : Escreve dados 
// - Recebe os dados
// - Faz algo com eles 
// - Pronto
// Transform Stream : Modifica os dados
// - Recebe os dados
// - Faz algo com eles ( Transforma geralmente )
// - E emite novos dados com base nessa transformacao
//
// Entao se fosse so transformar dados seria mais semantico utilizar uma transformStream ao inves da writableStream que esta sendo usada
// A writable em si seria so para consumir e enviar os dados
//
