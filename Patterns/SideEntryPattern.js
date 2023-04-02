import GameObjectManager from "../Global/GameObjectManager.js";
import Enemy3 from "../Prefabs/Enemy3.js";

export default class SideEntryPattern {
  constructor(screenSize) {
    this.screenSize = screenSize;
    this.enemyType = "side";
    this.enemyCount = 5;
  }
  spawn() {
    let enemies = [];
    let enemyGap = 0;
    let left = true;
    let xOffset = 10;
    let xAxis = 1;
    for (let i = 0; i < this.enemyCount; i++) {
      let enemy = GameObjectManager.createObject("enemies", new Enemy3());
      enemy.axis.x = xAxis;
      enemyGap -= enemy.h + 25;
      xOffset += 40;
      left = !left;
        xAxis = xAxis * -1;
      enemy.setPosition({
        x: (left === true ? 500 : 0) + (left === true ? xOffset : -xOffset),
        y: 30 + enemyGap,
      });
      enemies.push(enemy);
    }

    return enemies;
  }
}
