/**
 *
 * @author "Your Name Here"
 * @this {Player}
 */
class Player {
  /**
   * Constructor for Player
   *
   * @constructor
   * @returns {Player}
   */
  constructor() {
    this.collisionRadius = 0.06;
    this.playerX = 0.0;
    this.playerY = -1.75;
  }

  detectCollision(k) {
    var dx = this.playerX - myScene.geometries[k].x[0];
    var dy = this.playerY - myScene.geometries[k].y[0];
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.collisionRadius + myScene.geometries[k].collisionRadius) {
      return true;
    } else {
      return false;
    }
  }
}
