import GameObjectManager from "../Global/GameObjectManager.js";
import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Enemy3 extends GameObject {
  constructor(axis,t,l, d, x, y, w, h, v, hasCollision) {
    super(
      axis = {x:0,y:1},
      (t = 'enemy'),
      (l = 3),
      (d = 2),
      (x = 0),
      (y = 0),
      (w = 50),
      (h = 50),
      (v = 2),
      (hasCollision = true)
    );
    this.firePoint = { x: this.x, y: this.y - 10 };
    this.hasFired = false;
    this.score = 3;
  }

  moveFirePoint() {
    this.firePoint.x = this.x;
    this.firePoint.y = this.y + 35;
  }

  updateFireRate() {
    this.moveFirePoint();
  }

  drawDebugFirePoint(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.firePoint.x - 5, this.firePoint.y - 5, 10, 10);
  }

  shoot() {
    if(GameObjectManager.objectPool.player){
    let player = GameObjectManager.objectPool.player[0];
    let dif = Math.abs(this.x - player.x);
    if (dif > -20 && dif < 20 && !this.hasFired) {
      this.hasFired = true;
      ProjectileController.makeProjectile(this.firePoint, this.t, 3,{x:0,y:2});
    }
  }
  }
}
