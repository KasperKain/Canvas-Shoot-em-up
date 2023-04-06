import Controls from "./Global/Controls.js";
import Player from "./Prefabs/Player.js";
import CanvasConfigs from "./Configs.js";
import EnemyController from "./Global/EnemyControllers.js";
import GameObjectManager from "./Global/GameObjectManager.js";
import GroundImageManager from "./Global/GroundImageManager.js";
import GameConfigs from "./GameConfigs.js";
import GameScene from "./Scenes/GameScene.js";
import MenuScene from "./Scenes/MenuScene.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// CONFIGURATIONS
canvas.width = CanvasConfigs.width;
canvas.height = CanvasConfigs.height;
const controls = new Controls(document.addEventListener("keydown", () => {}));
GroundImageManager.initialize();
const player = GameObjectManager.createObject(
  "player",
  new Player(
    { x: 0, y: -1 },
    "player",
    3,
    20,
    CanvasConfigs.middleWidth,
    CanvasConfigs.middleHeight,
    64,
    64,
    GameConfigs.playerOptions.velocity,
    GameConfigs.playerOptions.hasCollision,
    ["player/player1-1.png", "player/player1-2.png", "player/player1-3.png"],
    { x: 64, y: 64 },
    { x: 30, y: 30 }
  )
);
EnemyController.spawnWave();

const menuScene = new MenuScene(ctx, controls);
const gameScene = new GameScene(ctx, controls, player);

let isInGame = false;
const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CanvasConfigs.width, CanvasConfigs.height);

  if (isInGame) {
    GroundImageManager.animate(ctx);
    gameScene.update();
  } else {
    isInGame = menuScene.update();
  }
};

gameLoop();
