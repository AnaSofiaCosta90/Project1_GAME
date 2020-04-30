class Newspaper {
  constructor(game, x, y) {
    this.game = game;

    this.x = x;
    this.y = y;

    this.width = 50;
    this.height = 50;

    const trumpPositionY = 161 - game.player.height / 3;
    const trumpPositionX = game.$canvas.width / 2 - game.player.width / 2 - 1;

    this.speed = 1;

    this.degrees = Math.atan2(this.y - trumpPositionY, this.x - trumpPositionX);

    this.newspaperImage = new Image();
    this.newspaperImage.src = 'Images/news.png';
  }

  updatePosition() {
    const speedX = Math.cos(this.degrees - Math.PI) * this.speed;
    const speedY = Math.sin(this.degrees) * this.speed;

    this.x += speedX;
    this.y -= speedY;
  }

  drawNewspaper() {
    this.game.context.drawImage(this.newspaperImage, this.x, this.y, this.width, this.height);
  }
}
