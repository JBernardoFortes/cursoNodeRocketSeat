import {http} from "http";

// Todos os dados que o node recebe ou manda sao passados com base em " Streams "
// Basicamente, streams eh um metodo baseado em buffer que segmenta os dados que estao
// sendo recebidos ou mandados de modo que a aplicacao nao seja interrompida para que 
// a operacao da API seja concluida.

// Se o dado for muito grande ele manda em "Pedacos" por meio dos Pipes.
