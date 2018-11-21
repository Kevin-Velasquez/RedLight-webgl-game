/**
 * Specifies a triangle which fluctuates in size (grows and shrinks).
 *
 * @author "Your Name"
 * @this {FluctuatingTriangle}
 */
class FluctuatingTriangle extends Triangle {
  /**
   * Constructor for FluctuatingTriangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY) {
    super(size, centerX, centerY);
  }

  /**
   * Updates the animation for FluctuatingTriangle. Grows and shrinks the
   * triangle in size.
   */
  updateAnimation() {    
    var translateRight = new Matrix4();
    var translateLeft = new Matrix4(); 

    //this.modelMatrix.setLookAt(0, -1, 1, 0, 0, 0, 0, 0, 1.903);
    
    if(this.x > -1 && this.goingLeft) {
      translateLeft.setTranslate(-0.05, 0, 0);
      this.modelMatrix = translateLeft.multiply(this.modelMatrix);
      this.x = this.x-0.05;
      return;

    } else if(this.goingLeft){
      this.goingLeft = false;
    }
    if(this.x < 1 && this.goingLeft == false) {
      translateRight.setTranslate(0.05, 0, 0);
      this.modelMatrix = translateRight.multiply(this.modelMatrix);
      this.x = this.x+0.05;
    } else if(this.goingLeft == false){
      this.goingLeft = true;
    }
  }
}
