import GameObjectManager from "../Global/GameObjectManager.js";
import Enemy from "../Prefabs/Enemy.js";

export default class StraightLinePattern {
  constructor(screenSize) {
    this.screenSize = screenSize;
    this.enemyType = "default";
    this.enemyCount = 5;
    this.moveDirection = { x: 0, y: 1 };
  }
  spawn() {
    let enemies = [];
    let enemyGap = 0;
    for (let i = 0; i < this.enemyCount; i++) {
      let enemy = GameObjectManager.createObject("enemies", new Enemy());
      enemyGap += this.screenSize.x / this.enemyCount;
      enemy.setPosition({
        x: enemyGap - this.screenSize.x / this.enemyCount / 2,
        y: -200,
      });
      enemies.push(enemy);
    }

    return enemies;
  }
}
