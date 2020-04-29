class Newspaper {
  constructor(game) {
    this.game = game;
    this.positionX = 10;
    this.positionY = 10;
    this.player = game.player;
    this.newspaperImage = new Image();
    this.newspaperImage.src = 'Images/news.png';
    this.newspaperWidth = 50;
    this.newspaperHeight = 50;
  }

  updatePosition() {
    this.positionX += 5;
  }

  drawNewspaper() {
    // console.log('drawing NP at', this.positionX, this.positionY);
    this.game.context.drawImage(
      this.newspaperImage,
      this.positionX,
      this.positionY,
      this.newspaperWidth,
      this.newspaperHeight
    );
  }
}
