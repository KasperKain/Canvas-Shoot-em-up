import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Enemy extends GameObject {
  constructor(l, d, x, y, w, h, v, hasCollision) {
    super(
      (l = 3),
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
    this.moveAxis = { x: 0, y: 1 };
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
      ProjectileController.makeProjectile(this.firePoint, { x: 0, y: 1 });
    }
  }
}
