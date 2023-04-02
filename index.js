import Controls from "./Global/Controls.js";
import Player from "./Prefabs/Player.js";
import CanvasConfigs from "./Configs.js";
import ProjectileController from "./Global/ProjectileController.js";
import EnemyController from "./Global/EnemyControllers.js";
import GameObjectManager from "./Global/GameObjectManager.js";
import GameConfigs from "./GameConfigs.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// CONFIGURATIONS
const controls = new Controls(document.addEventListener("keydown", () => {}));
const player = GameObjectManager.createObject(
  "player",
  new Player(
    {x:0,y:-1},
    'player',
    4,
    20,
    CanvasConfigs.middleWidth,
    CanvasConfigs.middleHeight,
    50,
    50,
    GameConfigs.playerOptions.velocity,
    GameConfigs.playerOptions.hasCollision,
    ['player/Dead.png','player/Special1.png']
  )
);
canvas.width = CanvasConfigs.width;
canvas.height = CanvasConfigs.height;

EnemyController.spawnWave();

const setCommonStyles = () => {
  ctx.shadowColor = CanvasConfigs.commonStyle.shadow;
  ctx.shadowBlur = CanvasConfigs.commonStyle.blur;
  ctx.lineJoin = CanvasConfigs.commonStyle.lineJoin;
  ctx.lineWidth = CanvasConfigs.commonStyle.lineWidth;
};

// const patternManager = new PatternManager({
//   x: CanvasConfigs.width,
//   y: CanvasConfigs.height,
// });
// patternManager.initialize();
// const wave = new Wave(patternManager);
// wave.spawn();
const updatePlayer = () => {
  player.updateFireRate();
  player.move(controls.axis());
  player.checkBoundsX(0, CanvasConfigs.width);
  player.checkBoundsY(CanvasConfigs.height - 250, CanvasConfigs.height);
  if (controls.key("confirm")) {
    player.shoot();
  }
};

const updateScore = () => {
  ctx.fillStyle = 'white'
  ctx.font = "30px Arial";
  ctx.fillText(`Score: ${GameObjectManager.currentScore}`, 10, 50);
}

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  updatePlayer();
  setCommonStyles();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CanvasConfigs.width, CanvasConfigs.height);
  player.draw(ctx);
  GameObjectManager.checkCollisions();
  EnemyController.updateEnemies();
  EnemyController.drawEnemies(ctx);
  ProjectileController.drawBullets(ctx);
  ProjectileController.updateBullets();
  ProjectileController.checkOffScreen();

  updateScore();

  // Debug section
  if (GameConfigs.debugOptions.collisionVisable) {
    player.collisionBox.debugDraw(ctx);
    EnemyController.debugDrawEnemies(ctx);
    ProjectileController.debugDrawProjectiles(ctx);
  }

  if (GameConfigs.debugOptions.firePointVisable) {
    player.drawDebugFirePoint(ctx);
    EnemyController.debugDrawEnemiesFirePoint(ctx);
  }

  if (GameConfigs.debugOptions.collisionHitVisable) {
    GameObjectManager.drawDebugHit(ctx);
  }
};

gameLoop();
