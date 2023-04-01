export default class CollisionObject {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  updatePos(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }
  debugDraw(ctx) {
    ctx.fillStyle = "rgba(232, 255, 56, 0.65)";
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
  debugDrawHit(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    setTimeout(() => {
      ctx.clearRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }, 1000);
  }
}
