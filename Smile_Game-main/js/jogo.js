//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(acertos, tentativas);

  localStorage.removeItem('tentativas');

  //mostra o botao jogarnovamente alterando a classe css (className)
  btnJogarNovamente.className = 'visivel';
  //oculta o botao reiniciar alterando a classe css (className)
  btnReiniciar.className = 'invisivel';
}

//funçao jogar novamente
function jogarNovamente() {
  jogar = true;//variável jogar volta a ser verdadeira
  //armazenamos todas as div na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  //percorremos todas as divs armazenadas
  for (i = 0; i < divis.length; i++) {
    //verificamos se sao as divs com ids 0 ou 1 ou 2
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5 || divis[i].id == 6 || divis[i].id == 7) {
      //alteramos a classe css das divs 0, 1 e 2 (className)
      divis[i].className = "inicial";
    }
  }

  //armazenamos a imagem do Smile na variável imagem (getElementById)
  let imagem = document.getElementById("imagem");
  let imagem1 = document.getElementById("imagem1");
  //se a imagem nao for vazia (se ela existir)
  if (imagem != "") {
    //removemos a imagem do Smile
    imagem.remove();
    imagem1.remove();
  }
  
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

}

//funçao executada quando o jogador acertou
function acertou(carta) {
  //altera a classe CSS da <div> escolhida pelo jogador (className)
  carta.className = "acertou";
  //Criar uma constante img que armazena um novo cartaeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem";
  //altera o atributo src (source) da imagem criada
  img.src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcThbkeaUKfEc-IOSHLGk4uG_6Vnr5kbCYSfbThIh-muz5QzuhmQ";
  //adiciona a imagem criada na div (carta) escolhida pelo jogador (appendChild)
  carta.appendChild(img);
}
function errou(carta) {
  //altera a classe CSS da <div> escolhida pelo jogador (className)
  carta.className = "errou";
  //Criar uma constante img que armazena um novo cartaeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem1";
  //altera o atributo src (source) da imagem criada
  img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHnA3AiRu_5JV4OP-wsEUNA1d-zUjSanFtg&s";
  //adiciona a imagem criada na div (carta) escolhida pelo jogador (appendChild)
  carta.appendChild(img);
}


//Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
function verifica(carta) {
  //se jogar é verdadeiro
  if (jogar) {
    //jogar passa a ser false
    jogar = false;
    //incrementa as tentativas
    tentativas++;
    //verifica se jogou 3 vezes
    if (tentativas == 20) {
      //oculta o botao joganovamente alterando a classe css (getElementById e className)
      btnJogarNovamente.className = 'invisivel';
      //mostra o botao reiniciar alterando a classe css (getElementById e className)
      btnReiniciar.className = 'visivel';
    }
    //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
    let sorteado = Math.floor(Math.random() * 7);
    //se o id da <div> escolhida pelo jogador for igual ao número sorteado
    if (carta.id == sorteado) {
      //chama a funçao acertou passando a div escolhida pelo jogador
      acertou(carta);
      //incrementa o contador de acertos
      acertos++;
    } else {//se errou a tentativa
      //altera a classe da <div> escolhida pelo jogador para a classe errou
      carta.className = "errou";
      errou(carta);
      //armazena a div aonde Smile está escondido (getElementById)
      const cartaSorteado = document.getElementById(sorteado);
      //chama a funçao acertou para mostrar a div aonde está o Smile
      acertou(cartaSorteado);
    }
    //chama a funçao que atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);