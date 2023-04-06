import GameObjectManager from "../Global/GameObjectManager.js";
import EnemyController from "../Global/EnemyControllers.js";
import ProjectileController from "../Global/ProjectileController.js";
import CanvasConfigs from "../Configs.js";
import GameConfigs from "../GameConfigs.js";
import AudioManager from "../Global/AudioManager.js";

export default class GameScene {
  constructor(ctx, controls, player) {
    this.ctx = ctx;
    this.controls = controls;
    this.player = player;
    this.fadeTime = 100;
    this.currentFadeTime = 0;
    this.heartImages = [];
    this.hasLife = false;
    this.hasStarted = false;
    this.introText = [
      "Stardate 113.something: Captains log:",
      "- - - - -",
      "The Evil Baddie Pirates are still doing pirate things.",
      "Dispite all the might of her majesties royal navy,",
      "the 'British Assault Fleet Of The Upper Sky Ocean',",
      "they refuse to be colonized and subjected.",
      "",
      "(Input more story lines...),",
      "(Input more story lines...)",
      "(Input more story lines...)",
      "(Input more story lines...)",
      "",
      "Press Start",
    ];
  }

  writeIntroText() {
    console.log("Building Text");
    this.ctx.font = "16px monospace";
    this.ctx.fillStyle = "white";
    let lineGap = 35;
    this.introText.forEach((line) => {
      this.ctx.fillText(line, 20, lineGap);
      lineGap += 30;
    });
  }

  makeLifeImages() {
    for (let i = 0; i < this.player.maxL; i++) {
      let newImg = new Image();
      newImg.src = "Assets/Images/life0.png";
      this.heartImages.push(newImg);
    }
    console.log("Building UI Hearts");
  }

  drawLifeImages() {
    this.ctx.fillStyle = "rgba(69, 40, 145, 0.12)";
    this.ctx.fillRect(0, 0, CanvasConfigs.width, 70);
    let firstPos = 360;
    for (let i = 0; i < this.heartImages.length; i++) {
      firstPos += 30;
      if (i < this.player.l) {
        this.heartImages[i].src = "Assets/Images/life0.png";
      } else {
        this.heartImages[i].src = "Assets/images/life1.png";
      }
      this.ctx.drawImage(this.heartImages[i], firstPos, 20, 30, 30);
    }
  }

  fadein() {
    if (this.currentFadeTime >= this.fadeTime) {
      this.currentFadeTime = this.fadeTime;
    } else this.currentFadeTime++;
    const alphaColor = () => {
      let timeConversion = (this.currentFadeTime / this.fadeTime) * 100;
      return timeConversion / 100;
    };
    let alpha = alphaColor();
    this.ctx.fillStyle = `rgba(255, 255, 255, ${1 - alpha})`;
    this.ctx.fillRect(0, 0, CanvasConfigs.width, CanvasConfigs.height);
  }

  updatePlayer() {
    this.player.updateFireRate();
    this.player.move(this.controls.axis());
    this.player.checkBoundsX(0, CanvasConfigs.width);
    this.player.checkBoundsY(CanvasConfigs.height - 250, CanvasConfigs.height);
    if (this.controls.key("confirm")) {
      this.player.shoot();
    }
  }

  updateScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.fillText(`Score: ${GameObjectManager.currentScore}`, 10, 50);
  }

  update() {
    if (!this.hasStarted && this.controls.key("confirm")) {
      this.hasStarted = true;
    }
    if (this.hasStarted) {
      this.updatePlayer();
      this.player.specialDraw(this.controls);
      this.player.draw(this.ctx);
      this.updateScore();
    } else {
      this.writeIntroText();
    }
    GameObjectManager.checkCollisions();
    if (this.currentFadeTime >= this.fadeTime) {
      if (!GameObjectManager.isGameOver && this.hasStarted) {
        EnemyController.updateEnemies();
      }
      EnemyController.drawEnemies(this.ctx);
    }
    ProjectileController.drawBullets(this.ctx);
    ProjectileController.updateBullets();
    ProjectileController.checkOffScreen();

    if (GameObjectManager.isGameOver) {
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Game Over : Restart", 10, 500);

      setTimeout(() => {
        if (this.controls.key("confirm")) {
          GameObjectManager.isGameOver = false;
          this.player.l = this.player.maxL;
          this.player.v = this.player.maxV;
          this.player.canFire = true;
          GameObjectManager.setScore(-GameObjectManager.currentScore);
        }
      }, 1000);
    }

    if (!this.hasLife && this.hasStarted) {
      this.hasLife = true;
      this.makeLifeImages();
      AudioManager.playSong("game");
    } else {
      this.drawLifeImages();
    }

    this.fadein();

    // Debug section
    if (GameConfigs.debugOptions.collisionVisable) {
      this.player.collisionBox.debugDraw(this.ctx);
      EnemyController.debugDrawEnemies(this.ctx);
      ProjectileController.debugDrawProjectiles(this.ctx);
    }

    if (GameConfigs.debugOptions.firePointVisable) {
      this.player.drawDebugFirePoint(this.ctx);
      EnemyController.debugDrawEnemiesFirePoint(this.ctx);
    }

    if (GameConfigs.debugOptions.collisionHitVisable) {
      GameObjectManager.drawDebugHit(this.ctx);
    }
  }
}
