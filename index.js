import Controls from "./Global/Controls.js";
import Player from "./Prefabs/Player.js";
import CanvasConfigs from "./Configs.js";
import ProjectileController from "./Global/ProjectileController.js";
import EnemyController from "./Global/EnemyControllers.js";
import GameObjectManager from "./Global/GameObjectManager.js";
import GameConfigs from "./GameConfigs.js";
import GameScene from "./Scenes/GameScene.js";
import MenuScene from "./Scenes/MenuScene.js";
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
    3,
    20,
    CanvasConfigs.middleWidth,
    CanvasConfigs.middleHeight,
    50,
    50,
    GameConfigs.playerOptions.velocity,
    GameConfigs.playerOptions.hasCollision,
    ['player/0.png']
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


const menuScene = new MenuScene(ctx,controls);
const gameScene = new GameScene(ctx,controls,player);

let isInGame = false;
const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  setCommonStyles();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CanvasConfigs.width, CanvasConfigs.height);

  if(isInGame) {
    console.log(isInGame)
    gameScene.update();
  } else {
    isInGame = menuScene.update();
  }

  // gameScene.update();
};

gameLoop();
