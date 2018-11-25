/**
 * A tilted cube that has a checkerboard texture applied to it. A subclass of
 * TiltedCube.
 *
 * @author "Your Name Here"
 * @this {diamond}
 */
class Diamond extends Geometry {
  /**
   * Constructor for Diamond
   *
   * @constructor
   * @returns {diamond}
   */
  constructor(size, centerX, centerY) {
    super();
    this.generateDiamondVertices(size, centerX, centerY);
    this.generateDiamondNormals();
    this.vertices.push(diamondVertices);
    this.normals.push(diamondNormals);
    this.x.push(centerX);
    this.y.push(centerY);

    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateDiamondVertices(size, centerX, centerY) {
    diamondVertices = new Float32Array([
      //bottom side
      centerX, centerY, -size,    centerX, centerY-size, 0,    centerX-size, centerY, 0, //t0 -X -Y Q3
      centerX, centerY, -size,    centerX-size, centerY, 0,    centerX, centerY+size, 0, //t1 -X +Y Q2
      centerX, centerY, -size,    centerX, centerY+size, 0,    centerX+size, centerY, 0, //t2 +X +Y Q1
      centerX, centerY, -size,    centerX+size, centerY, 0,    centerX, centerY-size, 0, //t3 +X -Y Q4
      //top side
      centerX, centerY, size,    centerX, centerY-size, 0,    centerX-size, centerY, 0,  //t4 -X -Y Q3
      centerX, centerY, size,    centerX-size, centerY, 0,    centerX, centerY+size, 0,  //t5 -X +Y Q2
      centerX, centerY, size,    centerX, centerY+size, 0,    centerX+size, centerY, 0,  //t6 +X +Y Q1
      centerX, centerY, size,    centerX+size, centerY, 0,    centerX, centerY-size, 0   //t7 +X -Y Q4
    ]);
  }

  generateDiamondNormals() {
    diamondNormals = new Float32Array([
      -1.0, -1.0, -1.0,    -1.0, -1.0, -1.0,     -1.0, -1.0, -1.0,   
      -1.0,  1.0, -1.0,    -1.0,  1.0, -1.0,     -1.0,  1.0, -1.0,  
       1.0,  1.0, -1.0,     1.0,  1.0, -1.0,      1.0,  1.0, -1.0,  
       1.0, -1.0, -1.0,     1.0, -1.0, -1.0,      1.0, -1.0, -1.0,

      -1.0, -1.0, 1.0,    -1.0, -1.0, 1.0,     -1.0, -1.0, 1.0,  
      -1.0,  1.0, 1.0,    -1.0,  1.0, 1.0,     -1.0,  1.0, 1.0,  
       1.0,  1.0, 1.0,     1.0,  1.0, 1.0,      1.0,  1.0, 1.0,  
       1.0, -1.0, 1.0,     1.0, -1.0, 1.0,      1.0, -1.0, 1.0
    ]);
  }

  updateAnimation() {
    var translateToOrigin = new Matrix4 ();
    var rotateInPlace = new Matrix4 ();
    var translateBack  = new Matrix4 ();

    translateToOrigin.setTranslate(-this.x[0], -this.y[0], 0);
    rotateInPlace.setRotate(4, 0, 0, 1);
    translateBack.setTranslate(this.x[0], this.y[0], 0);

    this.modelMatrix = translateToOrigin.multiply(this.modelMatrix);
    this.modelMatrix = rotateInPlace.multiply(this.modelMatrix);
    this.modelMatrix = translateBack.multiply(this.modelMatrix);
  }
  /**
   * Renders diamond.
   */
  render() {
    gl.enable(gl.DEPTH_TEST);
    super.render(24, gl.TRIANGLES, 3);
    gl.disable(gl.DEPTH_TEST);
  }
}
