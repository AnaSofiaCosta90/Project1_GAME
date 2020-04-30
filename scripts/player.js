class Player {
  constructor(game) {
    this.game = game;
    this.lifes = 3;
    this.bleach = 0;
    this.degrees = Math.PI * 0.5;

    this.arrowImage = new Image();
    this.arrowImage.src = 'Images/red arrow.png';

    this.tableHeight = 161;
    this.playerImage = new Image();
    this.playerImage.src = 'Images/trump.png';

    this.width = 150;
    this.height = 100;

    this.arrowRadius = 80;
    this.arrowWidth = 30;
    this.arrowHeight = 30;

    // amount of cathed fake news > when reaches to 3 gets a toiletpaper/life
    this.catchFakeNews = 3;

    this.x = this.game.$canvas.width / 2 - this.width / 2 - 15;
    this.y = this.tableHeight - this.height / 3;

    this.status = 'basic';

    const basicImage = new Image();
    basicImage.src = 'Images/trump.png';
    const bleachImage = new Image();
    bleachImage.src = 'Images/drink-removebg-preview.png';
    const fakeNewsImage = new Image();
    fakeNewsImage.src = 'Images/fakeNews.png';
    const hitImage = new Image();
    hitImage.src = 'Images/hit-removebg-preview.png';

    this.images = {
      basic: basicImage,
      bleach: bleachImage,
      fakeNews: fakeNewsImage,
      hit: hitImage
    };

    this.toiletPaperImg = new Image();
    this.toiletPaperImg.src = 'Images/life.png';

    this.bottleBleachImg = new Image();
    this.bottleBleachImg.src = 'Images/bleach.png';
  }

  rotateRight() {
    this.degrees = Math.min(this.degrees + (Math.PI * 15) / 180, Math.PI);
  }

  rotateLeft() {
    this.degrees = Math.max(this.degrees - (Math.PI * 15) / 180, 0);
  }

  fakeNews() {
    this.status = 'fakeNews';

    setTimeout(() => {
      this.status = 'basic';
    }, 1000);
  }

  checkCollision() {
    const newspapers = this.game.newspapers;

    for (let newspaper of newspapers) {
      const collision =
        450 + 200 / 2 > newspaper.x - newspaper.width / 2 &&
        450 - 200 / 2 < newspaper.x + newspaper.width / 2 &&
        this.y + 200 / 2 > newspaper.y - newspaper.height / 2 &&
        this.y - 200 / 2 < newspaper.y + newspaper.height / 2;

      if (collision) {
        const newspaperDegrees = newspaper.degrees;
        const arrowDegrees = this.degrees;
        const arrowIsPointing = Math.abs(newspaperDegrees - Math.PI + arrowDegrees) < 0.45;
        if (this.status === 'fakeNews' && arrowIsPointing) {
          this.avoidNewspaper();
        } else {
          this.getHitByNewspaper();
        }
        const indexOfCurrentNewspaper = this.game.newspapers.indexOf(newspaper);
        this.game.newspapers.splice(indexOfCurrentNewspaper, 1);
        // this.game.newspapers = [];
      }
    }
  }

  getHitByNewspaper() {
    this.lifes--;

    this.status = 'hit';
    setTimeout(() => {
      this.status = 'basic';
    }, 500);
  }

  avoidNewspaper() {
    if (this.bleach < 3) {
      this.bleach++;
    }
  }

  drinkBleach() {
    if (this.bleach === 3) {
      this.lifes++;
      this.bleach = 0;

      this.status = 'bleach';

      // Drink bleach sound

      setTimeout(() => {
        this.status = 'basic';
      }, 1000);
    }
  }

  runLogic() {
    if (this.lifes >= 10) {
      this.game.win();
    }

    this.checkCollision();
  }

  drawScore() {
    const context = this.game.context;
    context.fillStyle = 'rgb(255, 0, 0)';
    context.font = '18px Impact';
    context.fillText(`LIVES:`, 50, 50);

    for (let i = 0; i < this.lifes; i++) {
      context.drawImage(this.toiletPaperImg, 100 + i * 50, 30, 50, 50);
    }
  }

  drawPlayer() {
    const playerImage = this.images[this.status];

    const context = this.game.context;

    context.save();
    context.drawImage(playerImage, this.x, this.y, this.width, this.height);
    context.restore();
  }

  drawArrow() {
    const context = this.game.context;

    const degrees = this.degrees;

    // console.log(degrees);
    context.save();

    // move to the center of the canvas
    context.translate(this.game.$canvas.width / 2, this.tableHeight + this.height / 3);
    // rotate the canvas to the specified degrees
    context.rotate(Math.PI * 0.5 - this.degrees);
    // draw the image
    // since the context is rotated, the image will be rotated also
    context.drawImage(this.arrowImage, -15, this.arrowRadius, this.arrowWidth, this.arrowHeight);

    context.restore();
  }

  drawBleach() {
    const bleach = this.bleach;
    const context = this.game.context;

    // when trump catches 2 fakenews
    const height = this.bottleBleachImg.height;
    const rightLimit = this.game.$canvas.width - 100;

    if (bleach === 1) {
      //  context.drawImage(this.bottleBleachImg, 0, 0, 645, 220, this.game.$canvas.width - 100, 50, 75,33)
      context.drawImage(this.bottleBleachImg, 0, (height * 2) / 3, 645, 660, rightLimit, 66, 75, 66);
    } else if (bleach === 2) {
      // context.drawImage(this.bottleBleachImg, 0, 0, 645, 440, this.game.$canvas.width - 100, 50, 75, 66)
      context.drawImage(this.bottleBleachImg, 0, (height * 1) / 3, 645, 660, rightLimit, (66 * 2) / 3, 75, 66);
    } else if (bleach === 3) {
      context.drawImage(this.bottleBleachImg, 0, 0, 645, 660, rightLimit, (66 * 1) / 3, 75, 66);
    }
  }

  draw() {
    this.drawPlayer();
    this.drawScore();
    this.drawBleach();
    this.drawArrow();
  }
}
