/**
 * Specifies a geometric object.
 *
 * @author "Your Name Here"
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.objectIndex;
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.normals = [];
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.x = [];
    this.y = [];
    this.shader = null; // shading program you will be using to shade this geometry
    this.textures = [];
    this.picked = false;
    this.rgb = [nthObjectColor];
    var colorData = [];
    for(var i = 0; i < 200; i++) {
      colorData.push(precision(nthObjectColor/255));
      colorData.push(0);
      colorData.push(0);
    }
    this.clickedColor = new Float32Array(colorData);
    nthObjectColor += 1;
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render(numberOfVertices, renderMethod, space) {
    sendUniformMatToGLSL(this.modelMatrix.elements, u_ModelMatrix);  
    var vertexBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.vertices[0], space, a_Position, vertexBuffer);
    var normalBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.normals[0], space, a_Normal, normalBuffer);
    if(nPressed) {
      var vertexColorBuffer = gl.createBuffer();
      sendAttributeBufferToGLSL(this.normals[0], space, a_Color, vertexColorBuffer);
    } else if(this.picked) {
      var vertexColorBuffer = gl.createBuffer();
      sendAttributeBufferToGLSL(this.clickedColor, space, a_Color, vertexColorBuffer);
    } else {
      var vertexColorBuffer = gl.createBuffer();
      sendAttributeBufferToGLSL(verticesColors, space, a_Color, vertexColorBuffer);
    }
    tellGLSLToDrawCurrentBuffer(renderMethod, numberOfVertices);
  }
  updateAnimation() {
    return;
  }
}

function precision(x) {
  return Number.parseFloat(x).toPrecision(4);
}


