import GameObjectManager from "../Global/GameObjectManager.js";
import Enemy2 from "../Prefabs/Enemy2.js";

export default class RandomLinePattern {
  constructor(screenSize) {
    this.screenSize = screenSize;
    this.enemyType = "default";
    this.enemyCount = Math.floor(Math.random() * 5 + 8);
    this.moveDirection = { x: 0, y: 1 };
  }
  spawn() {
    let enemies = [];
    let enemyGap = 0;
    for (let i = 0; i < this.enemyCount; i++) {
      let randomY = -500 + Math.random() * 400;
      let enemy = GameObjectManager.createObject("enemies", new Enemy2());
      enemyGap += this.screenSize.x / this.enemyCount;
      enemy.setPosition({
        x: enemyGap - this.screenSize.x / this.enemyCount / 2,
        y: randomY,
      });
      enemies.push(enemy);
    }

    return enemies;
  }
}
