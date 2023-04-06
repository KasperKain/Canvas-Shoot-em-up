import AudioManager from "../Global/AudioManager.js";
import GameObjectManager from "../Global/GameObjectManager.js";
import ProjectileController from "../Global/ProjectileController.js";
import GameObject from "./BaseObjects/GameObject.js";

export default class Player extends GameObject {
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
    );
    this.fireRate = 2;
    this.firePoint = { x: this.x, y: this.y };
    this.timeUntilNextFire = 0;
    this.canFire = true;
    this.maxL = l;
    this.maxV = v;
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

  specialDraw(controls) {
    if (this.sprite) {
      if (controls.key("right")) {
        this.sprite.sprites = [
          "player/player2-1.png",
          "player/player2-2.png",
          "player/player2-3.png",
        ];
      } else if (controls.key("left")) {
        this.sprite.sprites = [
          "player/player3-1.png",
          "player/player3-2.png",
          "player/player3-3.png",
        ];
      } else {
        this.sprite.sprites = [
          "player/player1-1.png",
          "player/player1-2.png",
          "player/player1-3.png",
        ];
      }
    }
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
      AudioManager.playOneShotSound("hit");
      if (this.l <= 0) {
        this.l = 0;
        this.v = 0;
        this.canFire = false;
        console.log("game over");
        GameObjectManager.gameOver();
      }
    }
  }

  shoot() {
    if (this.timeUntilNextFire <= 0 && this.canFire) {
      this.timeUntilNextFire = this.fireRate;
      ProjectileController.makeProjectile(this.firePoint, this.t, 5, {
        x: 0,
        y: -1,
      });
    }
  }
}
