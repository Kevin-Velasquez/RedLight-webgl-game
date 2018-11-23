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
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.normals = [];
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.x = [];
    this.y = [];
    this.shader = null; // shading program you will be using to shade this geometry
    this.textures = [];
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render(numberOfVertices, renderMethod, space) {
    sendUniformMatToGLSL(this.modelMatrix.elements, u_ModelMatrix);  
    sendAttributeBufferToGLSL(this.vertices[0], this.normals[0], space, a_Position);
    tellGLSLToDrawCurrentBuffer(renderMethod, numberOfVertices);
  }
  updateAnimation() {
    return;
  }
}


