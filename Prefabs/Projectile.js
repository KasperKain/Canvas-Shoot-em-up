import GameObject from "./BaseObjects/GameObject.js";

export default class Projectile extends GameObject {
  constructor(l, d, x, y, w, h, v, hasCollision) {
    super(l, d, x, y, w, h, v, hasCollision);
  }
}
