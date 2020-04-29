class Reporter {
  constructor(game) {
    this.game = game;
    this.reporterWidth = 100;
    this.reporterHeight = 100;

    this.reporterX = Math.random() * 900 - this.reporterWidth;
    this.reporterY = 300 + Math.random() * 300 - this.reporterHeight;

    // à esquerda a posição mínima é 0, à direita será 900 - tamanho dela

    this.reporterImage = new Image();
    this.reporterImage.src = 'Images/reporter.png';
  }

  // prettier-ignore
  drawReporter() {
    this.game.context.drawImage(this.reporterImage, this.reporterX, this.reporterY, this.reporterWidth, this.reporterHeight);
  }

  throwNews() {
    console.log('throwing');
    this.paper = new Newspaper(this.game);
    this.paper.drawNewspaper(this.game, this.reporterX, this.reporterY);
    //if Level1 - reporter throws 10 newspapers, each 4 seconds
    // if Level2 - 2 reporters throws 20 newspapers, each random time?
    //if Level3 - 4 reporters throws 35newspapers, each random time?
  }
}