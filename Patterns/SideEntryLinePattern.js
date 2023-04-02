import GameObjectManager from "../Global/GameObjectManager.js";
import Enemy4 from "../Prefabs/Enemy4.js";

export default class SideEntryLinePattern {
  constructor(screenSize) {
    this.screenSize = screenSize;
    this.enemyType = "oneShot";
    this.enemyCount = 5;
  }
  spawn() {
    let enemies = [];
    let enemyGap = 0;
    for (let i = 0; i < this.enemyCount; i++) {
      let enemy = GameObjectManager.createObject("enemies", new Enemy4());
      enemy.axis.x = - 2;
      enemyGap += enemy.w + 10;
      enemy.setPosition({
        x: (600 + enemyGap),
        y: 0,
      });
      enemies.push(enemy);
    }

    return enemies;
  }
}
