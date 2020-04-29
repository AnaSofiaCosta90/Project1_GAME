// prettier-ignore
class Player {
  constructor(game) {
    this.game             = game;
    this.lifes            = 3;
    this.bleach           = 0;
    this.degrees          = 0;

    this.arrowImage       = new Image();
    this.arrowImage.src   = 'Images/red arrow.png'

    //this.oneLife = 3*defesa 
    this.tableHeight      = 161;
    this.playerImage      = new Image();
    this.playerImage.src  = 'Images/trump.png'

    this.playerWidth      = 150;
    this.playerHeight     = 100;

    this.arrowRadius      = 80;
    this.arrowWidth       = 30;
    this.arrowHeight      = 30;
  }
  

  drawPlayer() {
    this.game.context.drawImage(this.playerImage,this.game.$canvas.width/2 - this.playerWidth/2 -15, this.tableHeight - this.playerHeight/3, this.playerWidth, this.playerHeight);
  }

  drawArrow (degrees) {
    const context = this.game.context
    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();
  
    // move to the center of the canvas
    context.translate(this.game.$canvas.width/2, this.tableHeight + this.playerHeight/3);
  
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

  fakeNews() {}

  drinkBleach() {
    //if defend himself 3 times he drinks the bleach and get a new life(toilet paper)
  }

  getHitByNewspaper() {}
}

//SE O NEWS.POSITION ===
