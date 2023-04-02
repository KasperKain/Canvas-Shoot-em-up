import CanvasConfigs from "../Configs.js";
import GameObjectManager from "../Global/GameObjectManager.js";
import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Enemy3 extends GameObject {
  constructor(axis,t,l, d, x, y, w, h, v, hasCollision) {
    super(
      axis = {x:0,y:0.7},
      (t = 'enemy'),
      (l = 2),
      (d = 2),
      (x = 0),
      (y = 0),
      (w = 50),
      (h = 50),
      (v = 2),
      (hasCollision = true)
    );
    this.fireRate = 14;
    this.firePoint = { x: this.x, y: this.y - 10 };
    this.timeUntilNextFire = Math.random() * this.fireRate;
    this.score = 1;
  }

  moveFirePoint() {
    this.firePoint.x = this.x;
    this.firePoint.y = this.y + 35;
  }

  updateFireRate() {
    this.timeUntilNextFire -= 0.1;
    this.moveFirePoint();
  }

  drawDebugFirePoint(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.firePoint.x - 5, this.firePoint.y - 5, 10, 10);
  }

  shoot() {
    if (this.timeUntilNextFire <= 0) {
      let player = GameObjectManager.objectPool.player[0];
      let bulletAxis = Math.abs(this.x - player.x) / CanvasConfigs.width
      if (player.x < this.x) bulletAxis = bulletAxis * -1;
      this.timeUntilNextFire = this.fireRate;
      ProjectileController.makeProjectile(this.firePoint, this.t, 2,{x: bulletAxis, y: 1});
    }
  }
}
