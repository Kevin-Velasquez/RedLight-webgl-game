/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   */
  constructor(size, centerX, centerY) {
    super();
    this.generateCubeVertices(size, centerX, centerY);
    this.vertices.push(cubeVertices);
    this.x.push(centerX);
    this.y.push(centerY);
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices(size, centerX, centerY) {
    cubeVertices = new Float32Array([
      // Vertex coordinates and color
      centerX-size,  centerY+size,  size,      centerX-size, centerY-size,  size,       centerX+size, centerY-size,  size,    //t0
      centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,    //t1

      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,       centerX+size, centerY-size, -size,    //t2
      centerX+size,  centerY+size,  size,      centerX+size, centerY-size, -size,    centerX+size,  centerY+size, -size,      //t3

      centerX+size,  centerY+size, -size,   centerX+size, centerY-size, -size,    centerX-size, centerY-size, -size,          //t4
      centerX+size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size,  centerY+size, -size,         //t5
        
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size, centerY-size,  size,          //t6
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size,  size,       centerX-size,  centerY+size,  size,      //t7
       
      centerX-size,  centerY+size, -size,   centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      //t8
      centerX-size,  centerY+size, -size,   centerX+size,  centerY+size,  size,      centerX+size,  centerY+size, -size,      //t9

      centerX-size, centerY-size,  size,       centerX-size, centerY-size, -size,    centerX+size, centerY-size, -size,       //t10
      centerX-size, centerY-size,  size,       centerX+size, centerY-size, -size,    centerX+size, centerY-size,  size        //t11
    ]);

    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better.
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    //this.modelMatrix.setLookAt(0, -1, 0, 0, 0, 0, 0, 0, 1);
    //this.modelMatrix.setLookAt(0, -1, 1, 0, 0, 0, 0, 0, 1.903);
    /*var translateToOrigin = new Matrix4 ();
    var rotateInPlace = new Matrix4 ();
    var translateBack  = new Matrix4 ();

    translateToOrigin.setTranslate(-this.x[0], -this.y[0], 0);
    rotateInPlace.setRotate(2, 0, 1, 0);
    translateBack.setTranslate(this.x[0], this.y[0], 0);

    this.modelMatrix = translateToOrigin.multiply(this.modelMatrix);
    this.modelMatrix = rotateInPlace.multiply(this.modelMatrix);
    this.modelMatrix = translateBack.multiply(this.modelMatrix);*/
  }
  render() {
    gl.enable(gl.DEPTH_TEST);
    super.render(36, gl.TRIANGLES, 3);
    gl.disable(gl.DEPTH_TEST);
  }
}
