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
    this.animating = [];
    this.pauseTime = 0;
    this.objectIndex;
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.normals = [];
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.x = [];
    this.y = [];
    this.z = [];
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

    this.collisionRadius = 0.0;
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render(numberOfVertices, renderMethod, space) {
    sendUniformMatToGLSL(this.modelMatrix.elements, u_ModelMatrix);  
    sendAttributeBufferToGLSL(this.vertices[0], space, a_Position, vertexBuffer);
    sendAttributeBufferToGLSL(this.normals[0], space, a_Normal, normalBuffer);
    if(nPressed) {
      sendAttributeBufferToGLSL(this.normals[0], space, a_Color, vertexColorBuffer);
    } else if(this.picked) {
      sendAttributeBufferToGLSL(this.clickedColor, space, a_Color, vertexColorBuffer);
    } else {
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


