export default class GameObjectManager {
  static objectPool = {};
  static allObjs = [];
  static lastCollided = [];
  static createObject(type, obj) {
    if (!this.objectPool[type]) {
      this.objectPool[type] = [];
    }
    this.objectPool[type].push(obj);
    this.allObjs.push(obj);
    return obj;
  }
  static deleteObject(obj) {
    console.log("deleting");
    Object.values(this.objectPool).forEach((cat, index) => {
      cat.forEach((item) => {
        if (item === obj) {
          cat.splice(cat.indexOf(obj), 1);
          this.allObjs.splice(this.allObjs.indexOf(obj), 1);
          return;
        }
      });
    });
  }
  static checkCollisions() {
    this.allObjs.forEach((obj) => {
      if (obj.hasCollision) {
        this.allObjs.forEach((obj2) => {
          if (obj2.hasCollision && obj2 != obj) {
            if (
              obj.collisionBox.x >= obj2.collisionBox.x - obj2.collisionBox.w &&
              obj.collisionBox.x <= obj2.collisionBox.x + obj2.collisionBox.w &&
              obj.collisionBox.y >= obj2.collisionBox.y - obj2.collisionBox.h &&
              obj.collisionBox.y <= obj2.collisionBox.y + obj2.collisionBox.h
            ) {
              this.lastCollided[0] = obj;
              this.lastCollided[1] = obj2;
              this.lastCollided[0].hit(this.lastCollided[1]);
              this.lastCollided[1].hit(this.lastCollided[0]);
            } else if (this.lastCollided[0] && this.lastCollided[1]) {
              this.lastCollided[0].isHit = false;
              this.lastCollided[1].isHit = false;
            }
          }
        });
      }
    });
  }
  static drawDebugHit(ctx) {
    if (this.lastCollided[0]) {
      ctx.fillStyle = "white";
      this.lastCollided[0].collisionBox.debugDrawHit(ctx);
      this.lastCollided[1].collisionBox.debugDrawHit(ctx);
      this.lastCollided = [];
    }
  }
}
