// prettier-ignore
const $canvas = document.querySelector('canvas'); // $ -> para saber que este canvas representa uma variável do HTML e não do JS.
// para dizer ao js qual é o canvas que chamo quando lhe quero mexer

let game = new Game($canvas);

window.addEventListener('load', () => {
  let audio = document.getElementById('audio');
  audio.preload = 'auto';
});

let $buttonStart = document.getElementById('start');
$buttonStart.addEventListener('click', () => {
  audio.play();
});

let $buttonPause = document.getElementById('pause');
$buttonPause.addEventListener('click', () => {
  audio.pause();
});

let $buttonRestart = document.getElementById('restart');
$buttonRestart.addEventListener('click', () => {
  document.location.reload(); //acelera o jogo ???
});
// 1) fazer mecânica da colisão do jornal com a seta --> collision box da seta quando ele grita
// 2) botão do restart a funcionar
// 3) sons

// PORMENORES:
// - níveis
// - imagens
// - tempos

//
