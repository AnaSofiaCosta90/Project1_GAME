// prettier-ignore
class Player {
  constructor(game) {
    this.game             = game;
    this.lifes            = 3;
    this.bleach           = 0;
    this.degrees          = 0;

    this.arrowImage       = new Image();
    this.arrowImage.src   = 'Images/red arrow.png'

    this.tableHeight      = 161;
    this.playerImage      = new Image();
    this.playerImage.src  = 'Images/trump.png'

    this.width      = 150;
    this.height     = 100;

    this.arrowRadius      = 80;
    this.arrowWidth       = 30;
    this.arrowHeight      = 30;

    this.x = this.game.$canvas.width/2 - this.width/2 -15;
    this.y = this.tableHeight - this.height/3;

    this.status = 'basic';
    
    const basicImage = new Image();
    basicImage.src = 'Images/trump.png';
    const bleachImage = new Image();
    bleachImage.src = 'Images/drink-removebg-preview.png';
    const fakeNewsImage = new Image();
    fakeNewsImage.src =  'Images/fakeNews.png';
    const hitImage = new Image();
    hitImage.src =  'Images/hit-removebg-preview.png';

    this.images = {
        basic: basicImage,
        bleach: bleachImage,
        fakeNews: fakeNewsImage,
        hit: hitImage
    }
  }
  

  drawPlayer() {
    const playerImage = this.images[this.status];

    const context = this.game.context;

    context.save();
    // Check if should be facing oposite direction~
    /*
    if (true) {
      context.translate(this.x, this.y);
      context.scale(-1, 1);
    }
    context.drawImage(playerImage, 0 - this.width, 0, this.width, this.height);
    */
    context.drawImage(playerImage,this.x, this.y, this.width, this.height);
    context.restore();
  }

  drawArrow (degrees) {
    const context = this.game.context
    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();

  
    // move to the center of the canvas
    context.translate(this.game.$canvas.width/2, this.tableHeight + this.height/3);
  
    // rotate the canvas to the specified degrees
    context.rotate((degrees * Math.PI) / 180);
  
    // draw the image
    // since the context is rotated, the image will be rotated also
    context.drawImage(this.arrowImage, -15, this.arrowRadius, this.arrowWidth, this.arrowHeight);
  
    // we’re done with the rotating so restore the unrotated context
    context.restore();
  }

  rotateRight() {
    this.degrees += 15;
    console.log("rotate right",this.degrees)
  }

  rotateLeft() {
    this.degrees -= 15;
    console.log("rotate left",this.degrees)
  }

  fakeNews() {
    console.log('fakeNews')
    this.status  = 'fakeNews'
    setTimeout(() => {
      this.status = 'basic';
    }, 500)
    // grita fake news
  }

  checkCollision (player) {
    return (
      this.arrowX + this.arrowWidth / 2 > this.x - this.width / 2 &&
      this.arrowX - this.arrowWidth / 2 < this.x + this.width / 2 &&
      this.arrowY + this.arrowHeight / 2 > this.y - this.height / 2 &&
      this.arrowY - this.arrowHeight / 2 < this.y + this.height / 2
    );
  }

  fakeNewsCollision() {
    console.log(`Defendeu com sucesso, tem ${this.bleach} lixívias.`)
    this.game.reporter.newspapersArr = []; //apagar jornal
    this.bleach++;
    if (thisbleach === 3) {
      this.drinkBleach()
      
    }

  } // isto acontece quando o player defende um jornal com sucesso

  drinkBleach() {
    this.status  = 'bleach'
    this.lifes++
    this.bleach = 0
    setTimeout(() => {
      this.status = 'bleach';
    }, 500)  
    if (lifes = 10) {
      this.game.win()
    }

  }

  getHitByNewspaper() {

    console.log('in your face');
    this.status  = 'hit'

    setTimeout(() => {
      this.status = 'basic';
    }, 500)

    this.lifes--;
    console.log(`O Trump tem ${this.lifes} vidas`)
    //apagar o jornal
  


    this.game.reporter.newspapersArr = []; // isto apaga todos os jornais que estiverem a voar
// muda boneco e faz fake news
//adiciona 1/3 da lixívia 
//volta ao trump normal

  }
}
