import GameObjectManager from "../Global/GameObjectManager.js";
import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Enemy3 extends GameObject {
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
      (axis = { x: 0, y: 1 }),
      (t = "enemy"),
      (l = 1),
      (d = 20),
      (x = 0),
      (y = 0),
      (w = 50),
      (h = 50),
      (v = 2),
      (hasCollision = true),
      (sprites = [
        "enemy/enemy2-1.png",
        "enemy/enemy2-2.png",
        "enemy/enemy2-3.png",
      ]),
      (spriteSize = { x: 100, y: 100 }),
      (collisionOffset = { x: 12, y: 12 })
    );
    this.firePoint = { x: this.x, y: this.y - 10 };
    this.hasFired = false;
    this.score = 1;
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
    if (GameObjectManager.objectPool.player) {
      let player = GameObjectManager.objectPool.player[0];
      let dif = Math.abs(this.x - player.x);
      if (dif > -20 && dif < 20 && !this.hasFired) {
        this.hasFired = true;
        ProjectileController.makeProjectile(this.firePoint, this.t, 3, {
          x: 0,
          y: 2,
        });
      }
    }
  }
}
