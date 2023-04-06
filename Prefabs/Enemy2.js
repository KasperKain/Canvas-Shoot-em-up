import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Enemy2 extends GameObject {
  constructor(
    axis,
    t,
    l,
    d,
    x,
    y,
    w,
    h,
    v,
    hasCollision,
    sprites,
    spriteSize,
    collisionOffset
  ) {
    super(
      (axis = {
        x:
          Math.ceil(Math.random()) * (Math.round(Math.random()) ? 1 : -1) * 0.3,
        y: 1,
      }),
      (t = "enemy"),
      (l = 1),
      (d = 20),
      (x = 0),
      (y = 0),
      (w = 50),
      (h = 50),
      (v = Math.random() * 2 + 5),
      (hasCollision = true),
      (sprites = [
        "enemy/enemy2-1.png",
        "enemy/enemy2-2.png",
        "enemy/enemy2-3.png",
      ]),
      (spriteSize = { x: 100, y: 100 }),
      (collisionOffset = { x: 10, y: 0 })
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
      this.timeUntilNextFire = this.fireRate;
      //ProjectileController.makeProjectile(this.firePoint, this.t, 2,{x:0,y:2});
    }
  }
}
