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
  constructor(size, centerX, centerY, index) {
    super();
    this.objectIndex = index;
    this.generatePyramidVertices(size, centerX, centerY);
    this.generatePyramidNormals();
    this.vertices.push(pyramidVertices);
    this.normals.push(pyramidNormals);
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
      centerX, centerY, 0,    centerX, centerY-size, -size,    centerX-size, centerY, -size,  //t0 -X -Y Q3
      centerX, centerY, 0,    centerX-size, centerY, -size,    centerX, centerY+size, -size,  //t1 -X +Y Q2
      centerX, centerY, 0,    centerX, centerY+size, -size,    centerX+size, centerY, -size,  //t2 +X +Y Q1
      centerX, centerY, 0,    centerX+size, centerY, -size,    centerX, centerY-size, -size,  //t3 +X -Y Q4

      centerX-size, centerY, -size,    centerX, centerY+size, -size,    centerX+size, centerY, -size, //t4
      centerX-size, centerY, -size,    centerX, centerY-size, -size,    centerX+size, centerY, -size  //t5
    ]);
  }

  generatePyramidNormals() {
    pyramidNormals = new Float32Array([
      -1.0, -1.0, 1.0,    -1.0, -1.0, 1.0,     -1.0, -1.0, 1.0,  //t0 
      -1.0,  1.0, 1.0,    -1.0,  1.0, 1.0,     -1.0,  1.0, 1.0,  //t1
       1.0,  1.0, 1.0,     1.0,  1.0, 1.0,      1.0,  1.0, 1.0,  //t2
       1.0, -1.0, 1.0,     1.0, -1.0, 1.0,      1.0, -1.0, 1.0,  //t3

      0.0, 0.0, -1.0,    0.0, 0.0, -1.0,     0.0, 0.0, -1.0, //t4
      0.0, 0.0, -1.0,    0.0, 0.0, -1.0,     0.0, 0.0, -1.0  //t5
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
  renderRed() {
    sendUniformMatToGLSL(this.modelMatrix.elements, u_ModelMatrix);  
    var vertexBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.vertices[0], 3, a_Position, vertexBuffer);
    var normalBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.normals[0], 3, a_Normal, normalBuffer);
    var vertexColorBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.clickedColor, 3, a_Color, vertexColorBuffer);
    tellGLSLToDrawCurrentBuffer(gl.TRIANGLES, 18);
  }
}
