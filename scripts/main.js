// prettier-ignore
const $canvas = document.querySelector('canvas'); // $ -> para saber que este canvas representa uma variável do HTML e não do JS.
// para dizer ao js qual é o canvas que chamo quando lhe quero mexer

const game = new Game($canvas);
game.start();

// 1) fazer mecânica da colisão do jornal com a seta --> collision box da seta quando ele grita
// 2) botão do restart a funcionar
// 3) sons

// PORMENORES:
// - níveis
// - imagens
// - tempos
// - papel higiénico

//
