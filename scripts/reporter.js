class Reporter {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;

    this.x = (1 + Math.floor(Math.random() * 4)) * 180 - this.width;
    this.y = (6 + Math.floor(Math.random() * 5)) * 60 - this.height;

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
    while (this.x === 440 && this.y === 260) {
      this.x = (1 + Math.floor(Math.random() * 4)) * 180 - this.width;
      this.y = (6 + Math.floor(Math.random() * 5)) * 60 - this.height;
    }
    this.game.context.drawImage(this.reporterImage, this.x, this.y, this.width, this.height);
  }
}
