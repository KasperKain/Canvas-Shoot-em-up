import GameObject from "./BaseObjects/GameObject.js";

export default class Projectile extends GameObject {
  constructor(axis,t,l, d, x, y, w, h, v, hasCollision) {
    super(axis,t,l, d, x, y, w, h, v, hasCollision);
  }
}
