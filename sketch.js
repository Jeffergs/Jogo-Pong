//CLIQUE NA TELA PRETA COM O PONTEIRO DO MOUSE PARA PODER MOVIMENTAR A SUA RAQUETE.

//Variáveis da bolinha
let: xBolinha = 300;
let: yBolinha = 200;
let: diametro = 16;
let: raio = diametro / 2

//Velocidade da bolinha
let: velocidadexBolinha = 6;
let: velocidadeyBolinha = 6;
let: raqueteComprimento = 10;
let: raqueteAltura = 90;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente =150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let = colidiu = false;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

let esquerdaBolinha = xBolinha - raio;
let superiorBolinha = yBolinha - raio;
let inferiorBolinha = yBolinha + raio;
    
let direitaRaquete = xRaquete + raqueteComprimento;
let superiorRaquete = yRaquete;
let inferiorRaquete = yRaquete + raqueteAltura;	



function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0); // Cor de fundo
  mostraBolinha(); // Desenha a bolinha
  movimentaBolinha(); // Movimenta a bolinha
  VerificaColisao(); // Verifica Colisão da bolinha
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();  
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
  
  //No final volta para o início da função draw() 
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha,diametro);
}

function movimentaBolinha (){
  xBolinha += velocidadexBolinha
  yBolinha += velocidadeyBolinha
}

function VerificaColisao(){
   if (xBolinha + raio> width ||
  xBolinha - raio < 0){ 
   velocidadexBolinha *= -1;
 }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0) {
    velocidadeyBolinha *= -1
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete = constrain(yRaquete, 10, 310);
}

function  verificaColisaoRaquete(){
if (esquerdaBolinha < direitaRaquete // bolinha alcançou a raquete
&& superiorBolinha < inferiorRaquete // bolinha não está abaixo da raquete
&& inferiorBolinha > superiorRaquete) { // bolinha não está acima da raquete
  velocidadeXBolinha *= -1;
  raquetada.play();
    }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
  velocidadexBolinha *= -1;
  raquetada.play();
  }

  
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 -30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);

 
function incluiPlacar(){
  stroke (255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 130, 0))
  rect(150, 10, 40, 20)
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 130, 0))
  rect(450, 10, 40, 20)
  fill(255);
  text(pontosDoOponente, 470, 26);
}

 function marcaPonto(){
   if (xBolinha > 590){
     meusPontos += 1;
     ponto.play();
   } 
   if (xBolinha < 10){
     pontosDoOponente += 1;
     ponto.play();
 }

 }

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}



   
  