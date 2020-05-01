class Background {
  constructor(game) {
    this.game = game;
    this.image = new Image();
    this.image.src = './Images/Background.jpg';
  }

  drawBackground() {
    this.game.context.drawImage(this.image, 0, 0, this.game.$canvas.width, this.game.$canvas.height);
  }
}
