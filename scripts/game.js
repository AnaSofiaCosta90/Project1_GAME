class Game {
  constructor($canvas) {
    this.game = 3;
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
    this.player = new Player(this);
    this.reporters = []; // [new Reporter(this)];

    // intervalo entre os lançamentos dos newspapers
    this.newspaperThrowTimer = 0;
    this.newspaperThrowInterval = 3000;
    // this.newspaperThrowInterval = 5000;

    this.reporterCreationTimer = 0;
    this.reporterCreationInterval = 5000;

    this.victory = false;
    this.defeat = false;

    this.newspapers = [];

    this.isRunning = false;

    this.gameMusic = new Audio('sons/startGame.mp3');

    this.setKeyBindings();
  }

  restart() {
    this.background = new Background(this);
    this.player = new Player(this);
    this.reporters = [];

    this.newspaperThrowTimer = 0;
    this.reporterCreationTimer = 0;
    this.victory = false;
    this.defeat = false;
    this.newspapers = [];

    this.gameMusic.play();
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }
  start() {
    console.log(this.isRunning);
    if (!this.isRunning) {
      this.gameMusic.play();
      this.isRunning = true;
      this.loop();
    }
  }

  pause() {
    if (!this.isRunning) {
      this.gameMusic.play();
      console.log('I ran');
      this.isRunning = !this.isRunning;
      this.loop();
    } else if (this.isRunning) {
      this.gameMusic.pause();
      this.isRunning = !this.isRunning;
    }
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
    console.log('Win');
    this.context.clearRect(0, 0, 1280, 900);
    this.victory = true;
    this.background.drawBackground();

    this.context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.context.fillRect(0, 0, 900, 600);
    this.context.fillStyle = 'rgb(255, 0, 0)';
    this.context.font = '100px Impact';
    this.context.fillText(`\"I'm the best!\"`, 250, 325);
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.winImg = new Image();
    this.winImg.src = 'Images/win2-removebg-preview.png';
    this.winImg.addEventListener('load', () => {
      this.context.drawImage(this.winImg, 75, 180, 200, 200);
    });

    window.addEventListener('load', () => {
      let win = document.getElementById('win');
      win.preload = 'auto';
    });
    audio.pause();
    win.play();
  }

  lose() {
    console.log('Game over');
    this.context.clearRect(0, 0, 1280, 900);
    //this.defeat = true;
    this.background.drawBackground();

    this.context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.context.fillRect(0, 0, 900, 600);
    this.context.fillStyle = 'rgb(255, 0, 0)';
    this.context.font = '100px Impact';
    this.context.fillText('GAME OVER', 350, 300);
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.loseImg = new Image();
    this.loseImg.src = 'Images/lose2-removebg-preview (1).png';
    this.loseImg.addEventListener('load', () => {
      this.context.drawImage(this.loseImg, 75, 180, 200, 200);
    });

    window.addEventListener('load', () => {
      let lose = document.getElementById('lose');
      lose.preload = 'auto';
    });
    this.gameMusic.pause();
    lose.play();
  }

  runLogic(timestamp) {
    //let newTimestamp = timestamp ? timestamp : this.reporterCreationInterval + 1;
    if (this.reporterCreationTimer < timestamp - this.reporterCreationInterval || !timestamp) {
      this.reporterCreationInterval = this.reporterCreationInterval * 1.05;
      this.reporterCreationTimer = timestamp ? timestamp : 0;
      console.log(this.reporterCreationTimer);
      console.log('im running');
      //console.log('timestamps ', this.reporterCreationInterval);
      this.reporters.push(new Reporter(this));
      //console.log('THIS REPORTERS', this.reporters);
    }

    for (let newspaper of this.newspapers) {
      newspaper.updatePosition();
    }

    if (this.newspaperThrowTimer < timestamp - this.newspaperThrowInterval && this.reporters) {
      this.newspaperThrowInterval = this.newspaperThrowInterval * 0.98;
      this.newspaperThrowTimer = timestamp;
      const randomIndexOfReporter = Math.floor(Math.random() * this.reporters.length);
      const randomReporter = this.reporters[randomIndexOfReporter];
      randomReporter.throwNewspaper();
    }

    this.player.runLogic();
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    if (this.isRunning) {
      this.drawEverything();
      window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
  }

  drawEverything() {
    this.context.clearRect(0, 0, 1280, 900);
    this.background.drawBackground();
    this.player.draw();

    for (let reporter of this.reporters) {
      reporter.drawReporter();
    }
    for (let newspaper of this.newspapers) {
      newspaper.drawNewspaper();
    }
  }
}

const playGame = new Audio('sons/drinkBleach.mp3');
