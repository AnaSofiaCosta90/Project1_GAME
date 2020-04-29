class Background {
  constructor(game) {
    this.game = game;
  }

  drawBackground() {
    const background = new Image();

    background.src = './Images/Background.jpg';

    this.game.context.drawImage(background, 0, 0, this.game.$canvas.width, this.game.$canvas.height);
  }
}
