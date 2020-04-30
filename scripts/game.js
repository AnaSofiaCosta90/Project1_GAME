class Game {
  constructor($canvas) {
    this.game = 3;
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
    this.player = new Player(this);
    this.reporters = [new Reporter(this)];

    // intervalo entre os lançamentos dos newspapers
    this.newspaperThrowTimer = 0;
    this.newspaperThrowInterval = 3000;
    // this.newspaperThrowInterval = 5000;

    this.reporterCreationTimer = 0;
    this.reporterCreationInterval = 10000;

    this.victory = false;
    this.defeat = false;

    this.newspapers = [];

    this.setKeyBindings();
  }

  start() {
    this.loop();
  }

  setKeyBindings() {
    window.addEventListener('keydown', (event) => {
      // Stop the default behavior (moving the screen to the left/up/right/down) = impede a janela de andar
      event.preventDefault();

      // React based on the key pressed
      switch (event.keyCode) {
        case 13:
          this.player.drinkBleach();
          break;
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

  win() {
    console.log('Game over');
    this.context.clearRect(0, 0, 1280, 900);
    this.victory = true;
    this.background.drawBackground();
    this.victoryImg = new Image();
    this.victoryImg.src = 'Images/trump.png';
    this.context.drawImage(this.victoryImg, 50, 50);
    this.context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.context.fillRect(0, 0, 900, 600);
    this.context.fillStyle = 'rgb(255, 0, 0)';
    this.context.font = '100px Impact';
    this.context.fillText('Trump Rules', 350, 300);
    this.drawbuttons();
  }

  lose() {
    console.log('Game over');
    this.context.clearRect(0, 0, 1280, 900);
    this.defeat = true;
    this.background.drawBackground();

    this.context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.context.fillRect(0, 0, 900, 600);
    this.context.fillStyle = 'rgb(255, 0, 0)';
    this.context.font = '100px Impact';
    this.context.fillText('GAME OVER', 350, 300);
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.loseImg = new Image(); // -------------------------------------------------------------------------
    this.loseImg.src = 'Images/lose2-removebg-preview (1).png';
    this.loseImg.addEventListener('load', () => {
      this.context.drawImage(this.loseImg, 75, 180, 200, 200);
    });

    console.log('lose'); // -------------------------------------------------------------------------

    this.drawbuttons();
    // Mostrar imagem com o game over (pode ser cópia do background com o outro trump e a dizer game over) e um botão restart (que tens que fazer no html)
  }

  runLogic(timestamp) {
    for (let newspaper of this.newspapers) {
      newspaper.updatePosition();
    }
    //if Level1 - reporter throws 10 newspapers, each 4 seconds
    // if Level2 - 2 reporters throws 20 newspapers, each random time?
    //if Level3 - 4 reporters throws 35newspapers, each random time?
    if (this.newspaperThrowTimer < timestamp - this.newspaperThrowInterval) {
      this.newspaperThrowInterval = this.newspaperThrowInterval * 0.98;
      this.newspaperThrowTimer = timestamp;
      const randomIndexOfReporter = Math.floor(Math.random() * this.reporters.length);
      const randomReporter = this.reporters[randomIndexOfReporter];
      randomReporter.throwNewspaper();
    }
    if (this.reporterCreationTimer < timestamp - this.reporterCreationInterval) {
      this.reporterCreationInterval = this.reporterCreationInterval * 1.1;
      this.reporterCreationTimer = timestamp;
      this.reporters.push(new Reporter(this));
    }
    this.player.runLogic();
  }

  loop(timestamp) {
    if (this.defeat === false) {
      this.runLogic(timestamp);
      this.drawEverything();
      if (this.player.lifes <= 0) {
        this.lose();
      }
      window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
  }

  drawEverything() {
    this.context.clearRect(0, 0, 1280, 900);
    this.background.drawBackground();
    this.background.drawGrid();
    this.player.draw();

    for (let reporter of this.reporters) {
      reporter.drawReporter();
    }
    for (let newspaper of this.newspapers) {
      newspaper.drawNewspaper();
    }
  }
}
