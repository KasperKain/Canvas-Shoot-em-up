import Projectile from "../Prefabs/Projectile.js";
import GameObjectManager from "./GameObjectManager.js";

export default class ProjectileController {
  static makeProjectile(pos,team,velocity,axis) {

    const projectile = GameObjectManager.createObject(
      "projectile",
      new Projectile(axis,team,1, 1, pos.x, pos.y, 7, 12, velocity, true)
    );
  }

  static updateBullets() {
    if (GameObjectManager.objectPool.projectile) {
      for (let i = 0; i < GameObjectManager.objectPool.projectile.length; i++) {
        GameObjectManager.objectPool.projectile[i].move(GameObjectManager.objectPool.projectile[i].axis);
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
  static debugDrawProjectiles(ctx) {
    if (GameObjectManager.objectPool.projectile) {
      Object.values(GameObjectManager.objectPool.projectile).forEach((projectile) => {
        projectile.collisionBox.debugDraw(ctx);
      });
    }
  }
  static debugDrawEnemiesHit(ctx) {
    if (GameObjectManager.objectPool.projectile) {
      Object.values(GameObjectManager.objectPool.projectile).forEach((projectile) => {
        projectile.collisionBox.debugDrawHit(ctx);
      });
    }
  }
}
