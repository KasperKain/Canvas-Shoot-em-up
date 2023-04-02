import CanvasConfigs from "../Configs.js";
import RandomLinePattern from "../Patterns/RandomLinePattern.js";
import SideEntryLinePattern from "../Patterns/SideEntryLinePattern.js";
import SideEntryPattern from "../Patterns/SideEntryPattern.js";
import StraightLinePattern from "../Patterns/StraightLinePattern.js";
import GameObjectManager from "./GameObjectManager.js";

export default class EnemyController {
  static lastPatternIndex = 0;
  static screenSize = { x: CanvasConfigs.width, y: CanvasConfigs.height };
  static patterns = [StraightLinePattern,RandomLinePattern,SideEntryPattern,SideEntryLinePattern];
  static spawnWave() {
    const newPattern = this.selectRandomPattern();
    newPattern.spawn();
  }

  static selectRandomPattern() {
    while(true) {
      let newPatternIndex = Math.floor(Math.random() * this.patterns.length);

      if(newPatternIndex != this.lastPatternIndex){
        this.lastPatternIndex = newPatternIndex
    return new this.patterns[newPatternIndex](
      this.screenSize
    );
      }
    }
  }

  static updateEnemies() {
    if (GameObjectManager.objectPool.enemies) {
      if (GameObjectManager.objectPool.enemies.length <= 0) {
        this.spawnWave();
      }
      Object.values(GameObjectManager.objectPool.enemies).forEach((enemy) => {
        enemy.move(enemy.axis);
        enemy.moveFirePoint();
        enemy.updateFireRate();
        enemy.shoot();
        if (enemy.y > 600) GameObjectManager.deleteObject(enemy);
        if(enemy.x < -300) GameObjectManager.deleteObject(enemy);
        if(enemy.x > 900) GameObjectManager.deleteObject(enemy)
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
    if (GameObjectManager.objectPool.enemies) {
      Object.values(GameObjectManager.objectPool.enemies).forEach((enemy) => {
        enemy.drawDebugFirePoint(ctx);
      });
    }
  }
}
