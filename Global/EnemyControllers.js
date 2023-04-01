import CanvasConfigs from "../Configs.js";
import RandomLinePattern from "../Patterns/RandomLinePattern.js";
import StraightLinePattern from "../Patterns/StraightLinePattern.js";
import Enemy from "../Prefabs/Enemy.js";
import GameObjectManager from "./GameObjectManager.js";

export default class EnemyController {
  static screenSize = { x: CanvasConfigs.width, y: CanvasConfigs.height };
  static patterns = [StraightLinePattern, RandomLinePattern];
  static enemies = [{ type: "default", enemy: Enemy }];
  static spawnWave() {
    const newPattern = this.selectRandomPattern();
    newPattern.spawn();
  }

  static selectRandomPattern() {
    return new this.patterns[Math.floor(Math.random() * this.patterns.length)](
      this.screenSize
    );
  }

  static updateEnemies() {
    if (GameObjectManager.objectPool.enemies) {
      if (GameObjectManager.objectPool.enemies.length <= 0) {
        this.spawnWave();
      }
      Object.values(GameObjectManager.objectPool.enemies).forEach((enemy) => {
        enemy.move(enemy.moveAxis);
        enemy.moveFirePoint();
        if (enemy.y > 600) GameObjectManager.deleteObject(enemy);
      });
    }
  }

  static drawEnemies(ctx) {
    if (GameObjectManager.objectPool.enemies) {
      Object.values(GameObjectManager.objectPool.enemies).forEach((enemy) => {
        enemy.draw(ctx);
      });
    }
  }

  static debugDrawEnemies(ctx) {
    if (GameObjectManager.objectPool.enemies) {
      Object.values(GameObjectManager.objectPool.enemies).forEach((enemy) => {
        enemy.collisionBox.debugDraw(ctx);
      });
    }
  }
  static debugDrawEnemiesHit(ctx) {
    if (GameObjectManager.objectPool.enemies) {
      Object.values(GameObjectManager.objectPool.enemies).forEach((enemy) => {
        enemy.collisionBox.debugDrawHit(ctx);
      });
    }
  }
  static debugDrawEnemiesFirePoint(ctx) {
    console.log("called");
    if (GameObjectManager.objectPool.enemies) {
      Object.values(GameObjectManager.objectPool.enemies).forEach((enemy) => {
        console.log("hit");
        enemy.collisionBox.drawDebugFirePoint(ctx);
      });
    }
  }
}
