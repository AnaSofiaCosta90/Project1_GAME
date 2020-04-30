// prettier-ignore
class Game {
  constructor($canvas) {
    this.game       = 3;
    this.$canvas    = $canvas;
    this.context    = this.$canvas.getContext('2d');
    this.background = new Background(this);
    this.player     = new Player(this);
    this.reporter   = new Reporter(this);
    // intervalo entre os lançamentos dos newspapers
    this.newspaperThrowTimer = 0;
    this.newspaperThrowInterval = 3000;
    this.victory = false;
    this.defeat  = false;
  }
  start() {

    this.gameStep();
    this.loop();
    
  
  }

  drawEverything() {
    this.context.clearRect(0, 0, 1280, 900);
    this.background.drawBackground();
    this.background.drawGrid();
    this.player.drawPlayer();
    this.player.drawArrow(this.player.degrees);
    this.reporter.drawReporter();
  }

  gameStep() {
    window.addEventListener('keydown', (event) => {
      // Stop the default behavior (moving the screen to the left/up/right/down) = impede a janela de andar
      event.preventDefault();

      // React based on the key pressed
      switch (event.keyCode) {
        case 32:
          this.player.fakeNews();
          break;

        case 37:
          this.player.rotateLeft();
          break;

        case 39:
          this.player.rotateRight();
          break;
      }

    });
  }

  drawbuttons() {


    let button = document.createElement("BUTTON"); 
    button.innerHTML = "Restart";                   
    document.body.appendChild(button);               

  } // botões restart quit etc..

  win() {
    console.log('Game over')
    this.context.clearRect(0, 0, 1280, 900);
    this.victory=true;
    this.background.drawBackground()
    this.victoryImg = new Image()
    this.victoryImg.src = 'Images/trump.png'
    this.context.drawImage(this.victoryImg, 50,50)   
    this.context.fillStyle = "rgba(255, 255, 255, 0.7)";
    this.context.fillRect(0, 0, 900,600)
    this.context.fillStyle = "rgb(255, 0, 0)";
    this.context.font = "100px Impact";
    this.context.fillText("Trump Rules", 350, 300);
    this.drawbuttons()
  }

  lose() {
    console.log('Game over')
    this.context.clearRect(0, 0, 1280, 900);
    this.defeat=true;
    this.background.drawBackground()

    this.context.fillStyle = "rgba(255, 255, 255, 0.7)";
    this.context.fillRect(0, 0, 900,600)
    this.context.fillStyle = "rgb(255, 0, 0)";
    this.context.font = "100px Impact";
    this.context.fillText("GAME OVER", 350, 300);
    this.$canvas    = $canvas;
    this.context    = this.$canvas.getContext('2d');
    this.loseImg = new Image()                    // -------------------------------------------------------------------------
    this.loseImg.src = 'Images/trump.png'
    this.context.drawImage(this.loseImg, 0 , 200,200,200) 
    console.log()  // -------------------------------------------------------------------------
    
    this.drawbuttons()
    // Mostrar imagem com o game over (pode ser cópia do background com o outro trump e a dizer game over) e um botão restart (que tens que fazer no html)
    
  }   

  runLogic(timestamp) {
    if (this.newspaperThrowTimer < timestamp - this.newspaperThrowInterval) {
      this.newspaperThrowTimer = timestamp;
      this.reporter.createNewspaper();
    }
  }

  loop(timestamp) {
    if (this.defeat === false){
      this.drawEverything();
      this.reporter.throwNews();
      //const collided = newspaper.checkCollision(player);
      this.runLogic(timestamp);
      window.requestAnimationFrame((timestamp) => this.loop(timestamp));

      if (this.player.lifes <= 0) {
        this.lose();
      }
    }
  }
}
