export default class GameObjectManager {
  static objectPool = {};
  static allObjs = [];
  static lastCollided = [];
  static currentScore = 0;
  static isGameOver = false;

  static gameOver() {
    console.log(this.objectPool)
    this.isGameOver = true;
    if(this.objectPool.enemies) {
      let enLength = this.objectPool.enemies.length;
      for(let i = 0; i < enLength; i++) {
        this.deleteObject(this.objectPool.enemies[0])
      }
      this.objectPool.enemies.forEach(enemy => {
        this.deleteObject(enemy)
      })
    }
    console.log(this.objectPool)
  }

  static setScore(amount) {
 this.currentScore+= amount;
  }
  static createObject(type, obj) {
    if (!this.objectPool[type]) {
      this.objectPool[type] = [];
    }
    this.objectPool[type].push(obj);
    this.allObjs.push(obj);
    return obj;
  }
  static deleteObject(obj) {
    Object.values(this.objectPool).forEach((cat, index) => {
      cat.forEach((item) => {
        if (item === obj) {
          console.log('deleting')
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
          if (obj2.hasCollision && obj2 != obj && obj2.t !== obj.t && obj.constructor.name != obj2.constructor.name) {
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
