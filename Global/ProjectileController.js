import Projectile from "../Prefabs/Projectile.js";
import GameObjectManager from "./GameObjectManager.js";

export default class ProjectileController {
  static makeProjectile(pos, velDir) {
    const projectile = GameObjectManager.createObject(
      "projectile",
      new Projectile(1, 1, pos.x, pos.y, 7, 12, 4, 2, true)
    );
    projectile.velocity = 4;
  }

  static updateBullets() {
    if (GameObjectManager.objectPool.projectile) {
      for (let i = 0; i < GameObjectManager.objectPool.projectile.length; i++) {
        GameObjectManager.objectPool.projectile[i].move({ x: 0, y: -1 });
      }
    }
  }
  static drawBullets(ctx) {
    if (GameObjectManager.objectPool.projectile) {
      for (let i = 0; i < GameObjectManager.objectPool.projectile.length; i++) {
        GameObjectManager.objectPool.projectile[i].draw(ctx);
      }
    }
  }

  static checkOffScreen() {
    if (GameObjectManager.objectPool.projectile) {
      GameObjectManager.objectPool.projectile.forEach((projectile, index) => {
        if (projectile.y <= 0 || projectile.y > 600) {
          GameObjectManager.deleteObject(projectile);
        }
      });
    }
  }
}
