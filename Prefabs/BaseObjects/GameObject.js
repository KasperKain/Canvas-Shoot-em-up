// Base class that all Game Objects inherit

import GameObjectManager from "../../Global/GameObjectManager.js";
import CollisionObject from "./CollisionObject.js";
import SpriteObject from "./SpriteObject.js";

export default class GameObject {
  constructor(axis,t,l, d, x, y, w, h, v, hasCollision = false,sprites = []) {
    this.axis = axis;
    this.t = t;
    this.l = l;
    this.d = d;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.hasCollision = hasCollision;
    this.sprites = sprites;
    this.collisionOffset = {x: 30, y: 30}
    if (this.hasCollision) {
      this.collisionBox = new CollisionObject(this.x + this.collisionOffset.x, this.y + this.collisionOffset.y, this.w - this.collisionOffset.x, this.h - this.collisionOffset.y);
      this.isHit = false;
      this.lastCollided = null;
    }
    if(this.sprites.length > 0) {
      this.sprite = new SpriteObject(0,0,sprites);
      this.spriteFrames = [0,1, false];
    }
  }
  draw(ctx) {
    if(this.sprite) {
      this.sprite.animate(ctx,0,this.sprites.length - 1)
    }
    // ctx.strokeStyle = "white";
    // ctx.fillStyle = "black";
    // ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
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
    if(this.sprite) {
      this.sprite.updatePos({x:this.x,y:this.y})
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
        if(this.score) {GameObjectManager.setScore(this.score)}
      }
    }
  }
}
