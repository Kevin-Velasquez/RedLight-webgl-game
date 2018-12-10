/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {ClosingGate}
 */
class ClosingGate extends Geometry {
  /**
   * Constructor for ClosingGate.
   */
  constructor(size, centerX, centerY, centerZ, top, index, pauseTime) {
    super();
    this.animating.push(1);
    this.objectIndex = index;
    this.generateGateVertices(size, centerX, centerY);
    this.generateGateNormals();
    this.vertices.push(gateVertices);
    this.normals.push(gateNormals);
    this.x.push(centerX);
    this.y.push(centerY);
    this.z.push(centerZ);
    this.goingUpward = true;
    this.height = top;
    this.wait = 0;

    this.pauseTime = pauseTime;
    this.size = size;

    this.bottomLeftXYPoint = [];
    this.topRightXYPoint = [];
  }

  /**
   * Generates the vertices of ClosingGate. Just a regular cube.
   *
   * @private
   */
  generateGateVertices(size, centerX, centerY) {
    gateVertices = new Float32Array([
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
  }

  generateGateNormals() {
    gateNormals = new Float32Array([
      0.0, 0.0, 1.0,    0.0, 0.0, 1.0,     0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,    0.0, 0.0, 1.0,     0.0, 0.0, 1.0,

      1.0, 0.0, 0.0,    1.0, 0.0, 0.0,     1.0, 0.0, 0.0, 
      1.0, 0.0, 0.0,    1.0, 0.0, 0.0,     1.0, 0.0, 0.0, 

      0.0, 0.0, -1.0,    0.0, 0.0, -1.0,     0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,    0.0, 0.0, -1.0,     0.0, 0.0, -1.0,

      -1.0, 0.0, 0.0,    -1.0, 0.0, 0.0,     -1.0, 0.0, 0.0, 
      -1.0, 0.0, 0.0,    -1.0, 0.0, 0.0,     -1.0, 0.0, 0.0,
      
      0.0, 1.0, 0.0,    0.0, 1.0, 0.0,     0.0, 1.0, 0.0, 
      0.0, 1.0, 0.0,    0.0, 1.0, 0.0,     0.0, 1.0, 0.0, 

      0.0, -1.0, 0.0,    0.0, -1.0, 0.0,     0.0, -1.0, 0.0, 
      0.0, -1.0, 0.0,    0.0, -1.0, 0.0,     0.0, -1.0, 0.0
    ]);
  }

  generateXYPoints() {
    this.bottomLeftXYPoint.push(this.x[0]-(2*this.size));
    this.bottomLeftXYPoint.push(this.y[0]-this.size);
    this.topRightXYPoint.push(this.x[0]+(2*this.size));
    this.topRightXYPoint.push(this.y[0]+this.size);
  }

  /**
   * Updates the animation of the ClosingGate. Should make it rotate.
   */
  updateAnimation() {
    var translateUpward = new Matrix4();
    var translateDownward = new Matrix4(); 
    //console.log(this.height);
    if(!this.picked && this.pauseTime == 0) {
      if(this.wait == 0){
        if(this.height < 0.8 && this.goingUpward) {
          this.z[0] += 0.05;
          translateUpward.setTranslate(0, 0, 0.05);
          this.modelMatrix = translateUpward.multiply(this.modelMatrix);
          this.height = this.height+0.05;
          return;
        } else if(this.goingUpward){
          this.goingUpward = false;
          this.wait = 25;
          return;
        }
        if(this.height > 0.4 && this.goingUpward == false && this.wait == 0) {
          this.z[0] -= 0.05;
          translateDownward.setTranslate(0, 0, -0.05);
          this.modelMatrix = translateDownward.multiply(this.modelMatrix);
          this.height = this.height-0.05;
        } else if(this.goingUpward == false){
          this.goingUpward = true;
          if(  myPlayer.playerX > this.bottomLeftXYPoint[0] 
            && myPlayer.playerX < this.topRightXYPoint[0]
            && myPlayer.playerY > this.bottomLeftXYPoint[1]
            && myPlayer.playerY < this.topRightXYPoint[1]) {
            document.getElementById("deathReason").innerHTML = "CRUSHED BY GATE";
            gameOver();
          } 
        }
      } else {
        this.wait -= 1;
      }
    } else {
      this.pauseTime -= 1;
      if(this.pauseTime == 0) {
        this.picked = false;
      }
    }
  }
  render() {
    gl.enable(gl.DEPTH_TEST);
    super.render(36, gl.TRIANGLES, 3);
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
    tellGLSLToDrawCurrentBuffer(gl.TRIANGLES, 36);
  }
}
