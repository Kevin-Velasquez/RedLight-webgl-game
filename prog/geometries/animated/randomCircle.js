/**
 * Specifies a circle which moves randomly.
 *
 * @author "Your Name"
 * @this {RandomCircle}
 */
class RandomCircle extends Circle {
  /**
   * Constructor for RandomCircle.
   *
   * @constructor
   * @param {Number} radius The radius of the random circle being constructed
   * @param {Integer} segements The number of segments composing the circle
   * @param {Number} centerX The x-position of the circle being constructed
   * @param {Number} centerY The y-position of the circle being constructed
   * @returns {RandomCircle} RandomCircle object created
   */
  constructor(radius, segments, centerX, centerY) {
    super(radius, segments, centerX, centerY);
  }

  /**
   * Updates random circle's animation. Changes modelMatrix into a translation
   * matrix translating into a random direction.
   */
  updateAnimation() {
    var translateToCameraPosition = new Matrix4 ();

    //translateToCameraPosition.translate(g_EyeX, g_EyeY, 0);
    translateToCameraPosition.translate(movedX, movedY, 0);

    this.modelMatrix = translateToCameraPosition.multiply(this.modelMatrix);
    /*var randX = Math.floor(Math.random() * 100);
    var randY = Math.floor(Math.random() * 100);
    currentAngle = this.animateRandomly();
    this.modelMatrix.setRotate(currentAngle, 0, 0, 1);
    this.modelMatrix.translate(randX/100, randY/100, 1);*/
  }
  animateRandomly() {
    return Math.floor(Math.random() * 360);
  }
}
