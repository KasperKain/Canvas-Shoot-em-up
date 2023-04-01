import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Player extends GameObject {
  constructor(l, d, x, y, w, h, v, hasCollision) {
    super(l, d, x, y, w, h, v, hasCollision);
    this.fireRate = 1;
    this.firePoint = { x: this.x, y: this.y - 10 };
    this.timeUntilNextFire = 0;
  }

  checkBoundsX(min, max) {
    if (this.x < min + this.w / 2) this.x = min + this.w / 2;
    if (this.x > max - this.w / 2) this.x = max - this.w / 2;
  }
  checkBoundsY(min, max) {
    if (this.y < min + this.h / 2) this.y = min + this.h / 2;
    if (this.y > max - this.h / 2) this.y = max - this.h / 2;
  }

  moveFirePoint() {
    console.log();
    this.firePoint.x = this.x;
    this.firePoint.y = this.y - 80;
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
      ProjectileController.makeProjectile(this.firePoint, { x: 0, y: -1 });
    }
  }
}
