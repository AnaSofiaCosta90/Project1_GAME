class Game {
  constructor($canvas) {
    this.game = 3;
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.background = new Background(this);
    this.player = new Player(this);
    this.reporter = new Reporter(this);
  }
  start() {
    this.victory = false;
    this.defeat = false;
    this.gameStep();
    this.loop();
  }

  drawEverything() {
    this.context.clearRect(0, 0, 1280, 900);
    this.background.drawBackground();
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
        case 37:
          this.player.rotateLeft();
          break;

        case 39:
          this.player.rotateRight();
          break;
      }

      // collisions box --> com a lixívia e com os jornais
    });
  }

  win() {}

  lose() {}

  loop() {
    this.drawEverything();
    window.requestAnimationFrame(() => this.loop());
  }
}

// GOAL: get 10 lifes

//START: - 3 lifes --> 3 paper rolls
//       - Trump saying "My fellow Americans"
//       - Music starts after that --> Crazy Frog- AxelF
//       - One reporter throwing newspapers

// RULES:
// 1) Each time you can defend yourself you get 1/3 of a bleach bootle
//    - Trumps shout "Fake News!"
//    - show in which level is the bleach bottle
//    - Trump drinks the bleach bottle when he defends himself 3 times

// 2) One full bleach bottle gives you a life
//    - each time that you fill a bleach bottle, a toilet paper appears

// 3) Each time you get hit you lose a life
//    - Trumps say "AI" do dame tu cosita

//LEVELS:
// 1 --> one reporter throws newspapers each six seconds
// 2 --> two reporters (appears in random positions) throws newspapers each random seconds
// 3 --> four reporters appears in random positions and throws newspapers each random seconds

// FLOATING IDEAS:
//   - videos: quiet, quiet, quiet / wait, wait, wait
