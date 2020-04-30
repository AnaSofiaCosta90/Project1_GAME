// prettier-ignore
class Newspaper {
  constructor(game, reporterX, reporterY) {
    this.game      = game;
    this.positionX = reporterX;
    this.positionY = reporterY;
    this.player    = game.player;

    this.newspaperImage = new Image();
    this.newspaperImage.src = 'Images/news.png';

    this.width  = 50;
    this.height = 50;

    this.trumpPositionY = 161 - this.game.player.height / 3;
    this.trumpPositionX = this.game.$canvas.width / 2 - this.game.player.width / 2 - 1;

    this.a = (this.trumpPositionY - this.positionY) / (this.trumpPositionX - this.positionX);
    this.b = this.positionY - this.a * this.positionX;
    this.speed = (this.trumpPositionX - this.positionX) / 200;
  }

  updatePosition() {
    this.positionX += this.speed;
    this.positionY = this.a * this.positionX + this.b;

    if (this.checkCollision(this.player)) {
      console.log('in your face');
      this.game.player.getHitByNewspaper();
      //apagar o jornal
      //trump getHitByNewspaper, tirar uma vida
    }
  }

  drawNewspaper() {
    // console.log('drawing NP at', this.positionX, this.positionY);
    this.game.context.drawImage(this.newspaperImage, this.positionX, this.positionY, this.width, this.height);
  }

  checkCollision(player) {
    return (
      450 + 200 / 2 > this.positionX - this.width / 2 &&
      450 - 200 / 2 < this.positionX + this.width / 2 &&
      player.y + 200 / 2 > this.positionY - this.height / 2 &&
      player.y - 200 / 2 < this.positionY + this.height / 2
    );
  }
}
