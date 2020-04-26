const $canvas = document.querySelector('canvas'); // $ -> para saber que este canvas representa uma variável do HTML e não do JS.
// para dizer ao js qual é o canvas que chamo quando lhe quero mexer

const context = $canvas.getContext('2d');
// método que retorna um objecto que me dá os métodos e propriedades para desenhar no canvas

const width = $canvas.width;
const height = $canvas.height;

function drawEverything() {}
