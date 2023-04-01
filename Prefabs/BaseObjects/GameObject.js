// Base class that all Game Objects inherit

import GameObjectManager from "../../Global/GameObjectManager.js";
import CollisionObject from "./CollisionObject.js";

export default class GameObject {
  constructor(l, d, x, y, w, h, v = 0, hasCollision = false) {
    this.l = l;
    this.d = d;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.hasCollision = hasCollision;
    if (this.hasCollision) {
      this.collisionBox = new CollisionObject(this.x, this.y, this.w, this.h);
      this.isHit = false;
      this.lastCollided = null;
    }
  }
  draw(ctx) {
    if (this.isHit) {
    }
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
  setPosition(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }

  move(axis) {
    this.x += this.v * axis.x;
    this.y += this.v * axis.y;

    if (this.collisionBox) {
      this.collisionBox.updatePos({ x: this.x, y: this.y });
    }
  }
  hit(obj) {
    if (this.lastCollided != obj) {
      this.lastCollided = obj;
      this.isHit = true;
      this.l -= obj.d;
      if (this.l <= 0) {
        this.l = 0;
        GameObjectManager.deleteObject(this);
      }
    }
  }
}
