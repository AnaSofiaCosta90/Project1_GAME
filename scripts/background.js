class Background {
  constructor(game) {
    this.game = game;
  }

  drawBackground() {
    const background = new Image();

    background.src = './Images/Background.jpg';

    this.game.context.drawImage(background, 0, 0, this.game.$canvas.width, this.game.$canvas.height);
  }

  drawGrid() {
    const context = this.game.context;
    const height = this.game.$canvas.height;
    const width = this.game.$canvas.width;
    const colNumb = 5;
    const col = width / colNumb;

    const rowNumb = 10;
    const row = height / rowNumb;

    context.beginPath();
    for (let i = 0; i <= colNumb; i++) {
      context.moveTo(col * i, 0);
      context.lineTo(col * i, height);
      context.stroke();
    }
    for (let i = 0; i <= rowNumb; i++) {
      context.moveTo(0, row * i);
      context.lineTo(width, row * i);
      context.stroke();
    }
    context.closePath();
  }
}
