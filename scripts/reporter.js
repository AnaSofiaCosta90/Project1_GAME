class Reporter {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;

    this.x = Math.random() * 900 - this.width;
    this.y = 300 + Math.random() * 300 - this.height;

    // à esquerda a posição mínima é 0, à direita será 900 - tamanho dela

    this.reporterImage = new Image();
    this.reporterImage.src = 'Images/reporter.png';

    // novos newspapers
    this.newspapers = [];
  }

  throwNewspaper() {
    this.game.newspapers.push(new Newspaper(this.game, this.x, this.y));
  }

  drawReporter() {
    this.game.context.drawImage(this.reporterImage, this.x, this.y, this.width, this.height);
  }
}
