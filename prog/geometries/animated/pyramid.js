/**
 *
 * @author "Your Name Here"
 * @this {pyramid}
 */
class Pyramid extends Geometry {
  /**
   * Constructor for CheckerCube
   *
   * @constructor
   * @returns {pyramid}
   */
  constructor(size, centerX, centerY) {
    super();
    this.generatePyramidVertices(size, centerX, centerY);
    this.vertices.push(pyramidVertices);
    this.x.push(centerX);
    this.y.push(centerY);
    this.goingLeft = true;

    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generatePyramidVertices(size, centerX, centerY) {
    pyramidVertices = new Float32Array([
      centerX, centerY, 0,    centerX, centerY-size, -size,    centerX-size, centerY, -size,
      centerX, centerY, 0,    centerX-size, centerY, -size,    centerX, centerY+size, -size,
      centerX, centerY, 0,    centerX, centerY+size, -size,    centerX+size, centerY, -size,
      centerX, centerY, 0,    centerX+size, centerY, -size,    centerX, centerY-size, -size,

      centerX-size, centerY, -size,    centerX, centerY+size, -size,    centerX+size, centerY, -size,
      centerX-size, centerY, -size,    centerX, centerY-size, -size,    centerX+size, centerY, -size
    ]);
  }
  updateAnimation() {
    var translateRight = new Matrix4();
    var translateLeft = new Matrix4(); 
    
    if(this.x > -1 && this.goingLeft) {
      translateLeft.setTranslate(-0.015, 0, 0);
      this.modelMatrix = translateLeft.multiply(this.modelMatrix);
      this.x = this.x-0.015;
      return;

    } else if(this.goingLeft){
      this.goingLeft = false;
    }
    if(this.x < 1 && this.goingLeft == false) {
      translateRight.setTranslate(0.015, 0, 0);
      this.modelMatrix = translateRight.multiply(this.modelMatrix);
      this.x = this.x+0.015;
    } else if(this.goingLeft == false){
      this.goingLeft = true;
    }
  }
  /**
   * Renders pyramid.
   */
  render() {
    gl.enable(gl.DEPTH_TEST);
    super.render(18, gl.TRIANGLES, 3);
    gl.disable(gl.DEPTH_TEST);
  }
}
