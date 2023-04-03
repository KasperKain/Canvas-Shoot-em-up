import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Enemy extends GameObject {
  constructor(axis,t,l, d, x, y, w, h, v, hasCollision,sprites) {
    super(
      axis = {x:0,y:1},
      (t = 'enemy'),
      (l = 3),
      (d = 20),
      (x = 0),
      (y = 0),
      (w = 50),
      (h = 50),
      (v = 2),
      (hasCollision = true),
      sprites = ['player/Dead.png', 'player/Special1.png','player/Special2.png']
    );
    this.fireRate = 14;
    this.firePoint = { x: this.x, y: this.y - 10 };
    this.timeUntilNextFire = Math.random() * this.fireRate;
    this.score = 2;
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
      this.timeUntilNextFire = this.fireRate;
      ProjectileController.makeProjectile(this.firePoint, this.t, 3,{x:0,y:2});
    }
  }
}
