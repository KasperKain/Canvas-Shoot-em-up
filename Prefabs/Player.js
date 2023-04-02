import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Player extends GameObject {
  constructor(axis,t,l, d, x, y, w, h, v, hasCollision) {
    super(axis,t,l, d, x, y, w, h, v, hasCollision);
    this.fireRate = 2;
    this.firePoint = { x: this.x, y: this.y};
    this.timeUntilNextFire = 0;
    this.canFire = true;
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
    this.firePoint.y = this.y - 20;
  }

  updateFireRate() {
    this.timeUntilNextFire -= 0.1;
    this.moveFirePoint();
  }

  drawDebugFirePoint(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.firePoint.x - 5, this.firePoint.y - 5, 10, 10);
  }

  // override
  hit(obj) {
    if (this.lastCollided != obj) {
      this.lastCollided = obj;
      this.isHit = true;
      this.l -= obj.d;
      if (this.l <= 0) {
        this.l = 0;
        this.v = 0;
        this.canFire = false;
        console.log('game over')
      }
    }
  }

  shoot() {
    if (this.timeUntilNextFire <= 0 && this.canFire) {
      this.timeUntilNextFire = this.fireRate;
      ProjectileController.makeProjectile(this.firePoint, this.t,5,{x:0,y:-1});
    }
  }
}
